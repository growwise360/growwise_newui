import { CANONICAL_HOST, CANONICAL_ORIGIN, collectSitemapUrls, uniqueCanonicalUrls } from './indexnow-lib.mjs'

export const PRIORITY_PATHS = [
  '/',
  '/book-assessment',
  '/academic',
  '/academic/math',
  '/academic/english',
  '/camps/summer',
  '/camps/academic-summer-programs-dublin-ca',
  '/resources',
  '/resources/back-to-school-math-assessment-dublin-ca',
  '/resources/middle-school-math-readiness-checklist',
  '/resources/tutoring-dublin-ca',
  '/resources/careless-math-mistakes',
  '/resources/why-grades-hide-learning-gaps',
  '/resources/reading-fluency-vs-comprehension',
  '/resources/when-to-start-sat-prep',
  '/growwise-blogs',
]

export const AI_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Bingbot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
]

const SEARCH_CONSOLE_ENDPOINT = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect'
const BING_URL_SUBMISSION_ENDPOINT = 'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch'
const BING_SITEMAP_SUBMISSION_ENDPOINT = 'https://ssl.bing.com/webmaster/api.svc/json/SubmitSiteMap'

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function extractTagAttribute(html, tagPattern, attr) {
  const tag = html.match(tagPattern)?.[0]
  if (!tag) return null
  const attrMatch = tag.match(new RegExp(`${attr}=["']([^"']+)["']`, 'i'))
  return attrMatch ? decodeHtml(attrMatch[1]) : null
}

export function extractCanonical(html) {
  return extractTagAttribute(html, /<link[^>]+rel=["']canonical["'][^>]*>/i, 'href')
    ?? extractTagAttribute(html, /<link[^>]+href=["'][^"']+["'][^>]+rel=["']canonical["'][^>]*>/i, 'href')
}

export function extractMeta(html, name) {
  return extractTagAttribute(html, new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, 'i'), 'content')
    ?? extractTagAttribute(html, new RegExp(`<meta[^>]+content=["'][^"']*["'][^>]+name=["']${name}["'][^>]*>`, 'i'), 'content')
}

export function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return match ? decodeHtml(match[1].replace(/\s+/g, ' ').trim()) : null
}

export function extractJsonLdTypes(html) {
  const types = []
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  for (const script of scripts) {
    try {
      const payload = JSON.parse(script[1])
      const nodes = Array.isArray(payload) ? payload : [payload]
      for (const node of nodes) {
        if (node?.['@type']) types.push(...[].concat(node['@type']))
        if (Array.isArray(node?.['@graph'])) {
          for (const graphNode of node['@graph']) {
            if (graphNode?.['@type']) types.push(...[].concat(graphNode['@type']))
          }
        }
      }
    } catch {
      types.push('INVALID_JSON_LD')
    }
  }
  return [...new Set(types)]
}

export function countInternalLinks(html, origin = CANONICAL_ORIGIN) {
  const links = [...html.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => !href.startsWith('mailto:') && !href.startsWith('tel:'))
    .map((href) => {
      try {
        return new URL(href, origin)
      } catch {
        return null
      }
    })
    .filter((url) => url && url.hostname === CANONICAL_HOST)
    .map((url) => {
      url.hash = ''
      url.search = ''
      return url.toString()
    })
  return new Set(links).size
}

function normalizeComparableUrl(input) {
  const url = new URL(input, CANONICAL_ORIGIN)
  url.hash = ''
  url.search = ''
  const text = url.toString()
  return url.pathname === '/' ? text.replace(/\/$/, '') : text.replace(/\/$/, '')
}

export function classifyGscIndexStatus(inspectionResult) {
  const coverageState = String(
    inspectionResult?.indexStatusResult?.coverageState
      ?? inspectionResult?.coverageState
      ?? '',
  ).toLowerCase()
  const verdict = String(
    inspectionResult?.indexStatusResult?.verdict
      ?? inspectionResult?.verdict
      ?? '',
  ).toLowerCase()

  if (coverageState.includes('discovered') && coverageState.includes('not indexed')) {
    return 'discovered but not indexed'
  }
  if (coverageState.includes('crawled') && coverageState.includes('not indexed')) {
    return 'crawled but not indexed'
  }
  if (coverageState.includes('submitted and indexed') || coverageState.includes('indexed')) {
    return 'indexed'
  }
  if (coverageState.includes('unknown') || coverageState.includes('not known') || verdict === 'neutral') {
    return 'not known to Google'
  }
  if (coverageState) return coverageState
  return 'not inspected'
}

export function buildGscInspectionRequest(url, siteUrl = CANONICAL_ORIGIN) {
  return {
    inspectionUrl: new URL(url, CANONICAL_ORIGIN).toString(),
    siteUrl,
    languageCode: 'en-US',
  }
}

export async function inspectGscUrl({
  url,
  accessToken = process.env.GSC_ACCESS_TOKEN,
  siteUrl = process.env.GSC_SITE_URL || CANONICAL_ORIGIN,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  if (!accessToken) {
    return { skipped: true, reason: 'GSC_ACCESS_TOKEN not configured', classification: 'not inspected' }
  }

  const response = await fetchImpl(SEARCH_CONSOLE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(buildGscInspectionRequest(url, siteUrl)),
    signal: AbortSignal.timeout(timeoutMs),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    return { skipped: false, ok: false, status: response.status, error: payload }
  }
  return {
    skipped: false,
    ok: true,
    status: response.status,
    classification: classifyGscIndexStatus(payload.inspectionResult),
    inspectionResult: payload.inspectionResult,
  }
}

export function buildBingUrlSubmissionPayload(urls, siteUrl = CANONICAL_ORIGIN) {
  return {
    siteUrl,
    urlList: uniqueCanonicalUrls(urls),
  }
}

export function buildBingSitemapSubmissionPayload(sitemapUrl = `${CANONICAL_ORIGIN}/sitemap.xml`, siteUrl = CANONICAL_ORIGIN) {
  return {
    siteUrl,
    feedUrl: sitemapUrl,
  }
}

async function callBing({ endpoint, payload, apiKey, fetchImpl, timeoutMs }) {
  const url = new URL(endpoint)
  url.searchParams.set('apikey', apiKey)
  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  })
  const body = await response.text()
  return { ok: response.ok, status: response.status, body: body.slice(0, 500) }
}

export async function submitBingUrls({
  urls,
  apiKey = process.env.BING_WEBMASTER_API_KEY,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  if (!apiKey) return { skipped: true, reason: 'BING_WEBMASTER_API_KEY not configured' }
  return callBing({
    endpoint: BING_URL_SUBMISSION_ENDPOINT,
    payload: buildBingUrlSubmissionPayload(urls),
    apiKey,
    fetchImpl,
    timeoutMs,
  })
}

export async function submitBingSitemap({
  sitemapUrl = `${CANONICAL_ORIGIN}/sitemap.xml`,
  apiKey = process.env.BING_WEBMASTER_API_KEY,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  if (!apiKey) return { skipped: true, reason: 'BING_WEBMASTER_API_KEY not configured' }
  return callBing({
    endpoint: BING_SITEMAP_SUBMISSION_ENDPOINT,
    payload: buildBingSitemapSubmissionPayload(sitemapUrl),
    apiKey,
    fetchImpl,
    timeoutMs,
  })
}

function parseRobotsGroups(robotsText) {
  const groups = []
  let current = null
  for (const rawLine of robotsText.split(/\r?\n/)) {
    const line = rawLine.split('#')[0].trim()
    if (!line) continue
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (!match) continue
    const key = match[1].toLowerCase()
    const value = match[2].trim()
    if (key === 'user-agent') {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] }
        groups.push(current)
      }
      current.agents.push(value.toLowerCase())
    } else if (current && (key === 'allow' || key === 'disallow')) {
      current.rules.push({ type: key, value })
    }
  }
  return groups
}

export function findBlockedAiCrawlers(robotsText, crawlers = AI_CRAWLERS) {
  const groups = parseRobotsGroups(robotsText)
  return crawlers.filter((crawler) => {
    const crawlerKey = crawler.toLowerCase()
    const applicable = groups.filter((group) => group.agents.includes(crawlerKey) || group.agents.includes('*'))
    return applicable.some((group) => {
      const disallowRoot = group.rules.some((rule) => rule.type === 'disallow' && rule.value === '/')
      const allowRoot = group.rules.some((rule) => rule.type === 'allow' && rule.value === '/')
      return disallowRoot && !allowRoot
    })
  })
}

export async function checkRobotsAiAccess({
  origin = CANONICAL_ORIGIN,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  const response = await fetchImpl(`${origin}/robots.txt`, { signal: AbortSignal.timeout(timeoutMs) })
  const text = response.ok ? await response.text() : ''
  return {
    ok: response.ok,
    status: response.status,
    sitemapReferenced: text.includes(`${origin}/sitemap.xml`) || /sitemap:\s*\S+\/sitemap\.xml/i.test(text),
    blockedAiCrawlers: findBlockedAiCrawlers(text),
  }
}

export async function checkLlmsTxt({
  origin = CANONICAL_ORIGIN,
  priorityPaths = PRIORITY_PATHS,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  const response = await fetchImpl(`${origin}/llms.txt`, { signal: AbortSignal.timeout(timeoutMs) })
  const text = response.ok ? await response.text() : ''
  const missingPriorityUrls = priorityPaths
    .map((path) => new URL(path, origin).toString())
    .filter((url) => !text.includes(url))
  return {
    ok: response.ok,
    status: response.status,
    priorityUrlCount: priorityPaths.length,
    missingPriorityUrls,
  }
}

async function fetchHtml(url, fetchImpl, timeoutMs) {
  const startedAt = Date.now()
  const response = await fetchImpl(url, {
    headers: { 'User-Agent': 'GrowWise-SEO-Ops/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
  })
  const html = await response.text()
  return { response, html, durationMs: Date.now() - startedAt }
}

export async function auditUrl({
  url,
  sitemapUrls,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  const normalizedUrl = new URL(url, CANONICAL_ORIGIN).toString()
  const issues = []
  let response
  let html = ''
  let durationMs = 0

  try {
    const fetched = await fetchHtml(normalizedUrl, fetchImpl, timeoutMs)
    response = fetched.response
    html = fetched.html
    durationMs = fetched.durationMs
  } catch (error) {
    return {
      url: normalizedUrl,
      ok: false,
      issues: [{ severity: 'error', code: 'FETCH_FAILED', message: error.message }],
    }
  }

  const canonical = extractCanonical(html)
  const robots = extractMeta(html, 'robots')
  const title = extractTitle(html)
  const description = extractMeta(html, 'description')
  const schemaTypes = extractJsonLdTypes(html)
  const internalLinkCount = countInternalLinks(html)
  const inSitemap = sitemapUrls ? sitemapUrls.has(normalizedUrl) : null
  const indexable = response.status === 200 && !String(robots || '').toLowerCase().includes('noindex')

  if (response.status !== 200) issues.push({ severity: 'error', code: 'HTTP_NOT_200', message: `HTTP ${response.status}` })
  if (!canonical) issues.push({ severity: 'warning', code: 'CANONICAL_MISSING', message: 'Missing canonical URL' })
  if (canonical && normalizeComparableUrl(canonical) !== normalizeComparableUrl(normalizedUrl)) {
    issues.push({ severity: 'warning', code: 'CANONICAL_MISMATCH', message: `Canonical is ${canonical}` })
  }
  if (inSitemap === false) issues.push({ severity: 'warning', code: 'SITEMAP_MISSING', message: 'URL is not present in sitemap inventory' })
  if (!title) issues.push({ severity: 'error', code: 'TITLE_MISSING', message: 'Missing title tag' })
  if (!description) issues.push({ severity: 'error', code: 'META_DESCRIPTION_MISSING', message: 'Missing meta description' })
  if (!indexable) issues.push({ severity: 'error', code: 'NOT_INDEXABLE', message: `Robots meta: ${robots || 'none'}` })
  if (schemaTypes.length === 0) issues.push({ severity: 'warning', code: 'SCHEMA_MISSING', message: 'No JSON-LD schema detected in server HTML' })
  if (internalLinkCount === 0) issues.push({ severity: 'warning', code: 'INTERNAL_LINKS_MISSING', message: 'No internal links found' })

  return {
    url: normalizedUrl,
    ok: issues.every((issue) => issue.severity !== 'error'),
    status: response.status,
    durationMs,
    indexable,
    canonical,
    inSitemap,
    metadata: {
      titleLength: title?.length ?? 0,
      descriptionLength: description?.length ?? 0,
      robots: robots ?? null,
    },
    schemaTypes,
    internalLinkCount,
    freshness: {
      lastModified: response.headers.get('last-modified'),
      cacheControl: response.headers.get('cache-control'),
    },
    issues,
  }
}

export async function buildSeoOpsReport({
  origin = CANONICAL_ORIGIN,
  priorityPaths = PRIORITY_PATHS,
  fetchImpl = fetch,
  includeGsc = false,
  timeoutMs = 15_000,
} = {}) {
  const runAt = new Date().toISOString()
  const sitemapUrlList = await collectSitemapUrls({ origin, fetchImpl, timeoutMs })
  const sitemapUrls = new Set(sitemapUrlList)
  const urls = priorityPaths.map((path) => new URL(path, origin).toString())
  const pages = []

  for (const url of urls) {
    const page = await auditUrl({ url, sitemapUrls, fetchImpl, timeoutMs })
    if (includeGsc) page.gsc = await inspectGscUrl({ url, fetchImpl, timeoutMs })
    pages.push(page)
  }

  const [robots, llms] = await Promise.all([
    checkRobotsAiAccess({ origin, fetchImpl, timeoutMs }),
    checkLlmsTxt({ origin, priorityPaths, fetchImpl, timeoutMs }),
  ])

  const issueCount = pages.reduce((sum, page) => sum + page.issues.length, 0)
  const errorCount = pages.reduce((sum, page) => sum + page.issues.filter((issue) => issue.severity === 'error').length, 0)

  return {
    runAt,
    origin,
    sitemap: {
      urlCount: sitemapUrlList.length,
      childSitemapsExpected: [`${origin}/sitemap-pages.xml`, `${origin}/sitemap-blogs.xml`],
    },
    robots,
    llms,
    pages,
    bing: {
      urlSubmissionPayload: buildBingUrlSubmissionPayload(urls),
      sitemapSubmissionPayload: buildBingSitemapSubmissionPayload(`${origin}/sitemap.xml`, origin),
    },
    summary: {
      priorityPagesChecked: pages.length,
      issueCount,
      errorCount,
      pagesWithIssues: pages.filter((page) => page.issues.length > 0).length,
      blockedAiCrawlerCount: robots.blockedAiCrawlers.length,
      llmsMissingPriorityUrlCount: llms.missingPriorityUrls.length,
      status: errorCount === 0 && robots.blockedAiCrawlers.length === 0 ? 'HEALTHY' : 'NEEDS_ATTENTION',
    },
  }
}
