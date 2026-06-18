export const CANONICAL_ORIGIN = 'https://growwiseschool.org'
export const CANONICAL_HOST = 'growwiseschool.org'
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
export const INDEXNOW_BATCH_SIZE = 10_000

const XML_ENTITIES = {
  '&amp;': '&',
  '&apos;': "'",
  '&quot;': '"',
  '&gt;': '>',
  '&lt;': '<',
}

function decodeXml(value) {
  return value.replace(/&(amp|apos|quot|gt|lt);/g, (entity) => XML_ENTITIES[entity] ?? entity)
}

export function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => decodeXml(match[1].trim()))
}

export function normalizeCanonicalUrl(input, origin = CANONICAL_ORIGIN) {
  const url = new URL(input, origin)
  if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== CANONICAL_HOST) {
    throw new Error(`IndexNow only accepts canonical ${CANONICAL_ORIGIN} URLs: ${input}`)
  }

  url.hash = ''
  url.search = ''
  url.hostname = CANONICAL_HOST
  return url.toString()
}

export function uniqueCanonicalUrls(inputs) {
  return [...new Set(inputs.map((input) => normalizeCanonicalUrl(input)))]
}

export function batchUrls(urls, batchSize = INDEXNOW_BATCH_SIZE) {
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > INDEXNOW_BATCH_SIZE) {
    throw new Error(`Batch size must be between 1 and ${INDEXNOW_BATCH_SIZE}`)
  }

  const batches = []
  for (let index = 0; index < urls.length; index += batchSize) {
    batches.push(urls.slice(index, index + batchSize))
  }
  return batches
}

async function fetchText(url, fetchImpl, timeoutMs) {
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
  }
  return response.text()
}

export async function collectSitemapUrls({
  origin = CANONICAL_ORIGIN,
  fetchImpl = fetch,
  timeoutMs = 15_000,
} = {}) {
  const sitemapIndexUrl = `${origin}/sitemap.xml`
  let indexXml
  try {
    indexXml = await fetchText(sitemapIndexUrl, fetchImpl, timeoutMs)
  } catch {
    // Production has historically served the child sitemaps even when the
    // sitemap-index route was temporarily unavailable. Keep IndexNow useful
    // while deployment verification still treats a missing index as an error.
    const childUrls = [
      `${origin}/sitemap-pages.xml`,
      `${origin}/sitemap-blogs.xml`,
    ]
    const childXml = await Promise.all(
      childUrls.map((url) => fetchText(url, fetchImpl, timeoutMs)),
    )
    return uniqueCanonicalUrls(childXml.flatMap(extractLocs))
  }
  const indexLocs = extractLocs(indexXml)

  if (/<urlset[\s>]/i.test(indexXml)) {
    return uniqueCanonicalUrls(indexLocs)
  }

  const sitemapUrls = indexLocs.map((url) => normalizeCanonicalUrl(url))
  const childXml = await Promise.all(
    sitemapUrls.map((url) => fetchText(url, fetchImpl, timeoutMs)),
  )
  return uniqueCanonicalUrls(childXml.flatMap(extractLocs))
}

function routeFromPageFile(file) {
  const match = file.match(/^src\/app\/(?:\[locale\]\/)?(.+\/)?page\.(?:js|jsx|ts|tsx)$/)
  if (!match) return null

  const segments = (match[1] ?? '')
    .split('/')
    .filter(Boolean)
    .filter((segment) => !segment.startsWith('('))

  if (segments.some((segment) => segment.includes('['))) return 'ALL'
  return `/${segments.join('/')}` || '/'
}

export function urlsFromChangedFiles(changes) {
  const urls = []
  let requiresAll = false

  for (const change of changes) {
    const file = change.path.replace(/^growwise_newui\//, '')

    const route = routeFromPageFile(file)
    if (route === 'ALL') requiresAll = true
    else if (route) urls.push(route)

    if (
      /^src\/(components|data|lib|i18n|store|hooks)\//.test(file) ||
      /^src\/app\/(?:layout|robots|sitemap)/.test(file) ||
      file === 'next.config.ts'
    ) {
      requiresAll = true
    }
  }

  return { requiresAll, urls: uniqueCanonicalUrls(urls) }
}

export function parseNameStatus(output) {
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const [status, ...paths] = line.split('\t')
      if (status.startsWith('R') && paths.length === 2) {
        return [
          { status: 'D', path: paths[0] },
          { status: 'A', path: paths[1] },
        ]
      }
      return { status, path: paths.at(-1) }
    })
    .filter((change) => change.path)
}

export async function submitIndexNowBatch({
  urls,
  key,
  fetchImpl = fetch,
  endpoint = INDEXNOW_ENDPOINT,
  timeoutMs = 15_000,
  retries = 2,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
}) {
  const body = {
    host: CANONICAL_HOST,
    key,
    keyLocation: `${CANONICAL_ORIGIN}/${key}.txt`,
    urlList: uniqueCanonicalUrls(urls),
  }

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    let response
    try {
      response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      })
    } catch (error) {
      if (attempt < retries) {
        await sleep(500 * (2 ** attempt))
        continue
      }
      throw error
    }

    if (response.status === 200 || response.status === 202) {
      return { status: response.status, accepted: true }
    }

    const retryable = response.status === 429 || response.status >= 500
    if (retryable && attempt < retries) {
      await sleep(500 * (2 ** attempt))
      continue
    }

    const detail = (await response.text()).slice(0, 300)
    throw new Error(`IndexNow rejected the batch: HTTP ${response.status}${detail ? ` — ${detail}` : ''}`)
  }

  throw new Error('IndexNow submission exhausted retries')
}
