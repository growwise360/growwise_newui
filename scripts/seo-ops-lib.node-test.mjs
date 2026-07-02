import assert from 'node:assert/strict'
import test from 'node:test'
import { buildIndexNowPayload } from './indexnow-lib.mjs'
import {
  auditUrl,
  buildBingSitemapSubmissionPayload,
  buildBingUrlSubmissionPayload,
  buildGscInspectionRequest,
  buildSeoOpsReport,
  checkLlmsTxt,
  checkRobotsAiAccess,
  classifyGscIndexStatus,
  extractJsonLdTypes,
  findBlockedAiCrawlers,
} from './seo-ops-lib.mjs'

const ORIGIN = 'https://growwiseschool.org'

function html({
  title = 'GrowWise Test Page',
  description = 'A test page for GrowWise SEO automation checks.',
  canonical = `${ORIGIN}/book-assessment`,
  robots = 'index,follow',
  schema = { '@context': 'https://schema.org', '@type': 'WebPage' },
  links = '<a href="/academic">Academic</a>',
} = {}) {
  return `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="${robots}">
    <link rel="canonical" href="${canonical}">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body><h1>${title}</h1>${links}</body>
</html>`
}

test('IndexNow payload uses canonical host, key location, and URL list', () => {
  const payload = buildIndexNowPayload({
    key: 'abc123',
    urls: ['/book-assessment', 'https://growwiseschool.org/book-assessment?utm=test'],
  })
  assert.deepEqual(payload, {
    host: 'growwiseschool.org',
    key: 'abc123',
    keyLocation: 'https://growwiseschool.org/abc123.txt',
    urlList: ['https://growwiseschool.org/book-assessment'],
  })
})

test('GSC classification maps common coverage states to operational buckets', () => {
  assert.equal(
    classifyGscIndexStatus({ indexStatusResult: { coverageState: 'Submitted and indexed' } }),
    'indexed',
  )
  assert.equal(
    classifyGscIndexStatus({ indexStatusResult: { coverageState: 'Discovered - currently not indexed' } }),
    'discovered but not indexed',
  )
  assert.equal(
    classifyGscIndexStatus({ indexStatusResult: { coverageState: 'Crawled - currently not indexed' } }),
    'crawled but not indexed',
  )
  assert.equal(
    classifyGscIndexStatus({ indexStatusResult: { coverageState: 'URL is unknown to Google' } }),
    'not known to Google',
  )
})

test('GSC inspection request is diagnostics-only URL inspection payload', () => {
  assert.deepEqual(buildGscInspectionRequest('/book-assessment'), {
    inspectionUrl: 'https://growwiseschool.org/book-assessment',
    siteUrl: 'https://growwiseschool.org',
    languageCode: 'en-US',
  })
})

test('Bing payload builders keep URL and sitemap submission separate', () => {
  assert.deepEqual(buildBingUrlSubmissionPayload(['/about', '/about']), {
    siteUrl: 'https://growwiseschool.org',
    urlList: ['https://growwiseschool.org/about'],
  })
  assert.deepEqual(buildBingSitemapSubmissionPayload(), {
    siteUrl: 'https://growwiseschool.org',
    feedUrl: 'https://growwiseschool.org/sitemap.xml',
  })
})

test('robots helper flags AI crawlers only when root access is blocked', () => {
  assert.deepEqual(
    findBlockedAiCrawlers(`
User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Disallow: /
`),
    ['ClaudeBot'],
  )
})

test('robots and llms checks validate sitemap reference and priority URLs', async () => {
  const fetchImpl = async (url) => {
    if (String(url).endsWith('/robots.txt')) {
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml`, { status: 200 })
    }
    if (String(url).endsWith('/llms.txt')) {
      return new Response(`[Book](${ORIGIN}/book-assessment)`, { status: 200 })
    }
    return new Response('', { status: 404 })
  }

  assert.deepEqual(await checkRobotsAiAccess({ fetchImpl }), {
    ok: true,
    status: 200,
    sitemapReferenced: true,
    blockedAiCrawlers: [],
  })
  assert.deepEqual(await checkLlmsTxt({ priorityPaths: ['/book-assessment', '/academic'], fetchImpl }), {
    ok: true,
    status: 200,
    priorityUrlCount: 2,
    missingPriorityUrls: ['https://growwiseschool.org/academic'],
  })
})

test('JSON-LD extractor reads @graph schema types', () => {
  assert.deepEqual(
    extractJsonLdTypes(html({
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebPage' },
          { '@type': ['FAQPage', 'Article'] },
        ],
      },
    })),
    ['WebPage', 'FAQPage', 'Article'],
  )
})

test('page audit checks status, canonical, indexability, sitemap, metadata, schema, and links', async () => {
  const fetchImpl = async () => new Response(html(), {
    status: 200,
    headers: { 'cache-control': 'public, max-age=60' },
  })
  const result = await auditUrl({
    url: '/book-assessment',
    sitemapUrls: new Set(['https://growwiseschool.org/book-assessment']),
    fetchImpl,
  })

  assert.equal(result.ok, true)
  assert.equal(result.status, 200)
  assert.equal(result.indexable, true)
  assert.equal(result.inSitemap, true)
  assert.deepEqual(result.schemaTypes, ['WebPage'])
  assert.equal(result.internalLinkCount, 1)
  assert.deepEqual(result.issues, [])
})

test('page audit reports missing sitemap and noindex as issues', async () => {
  const fetchImpl = async () => new Response(html({
    robots: 'noindex,nofollow',
    schema: null,
    links: '',
  }).replace('<script type="application/ld+json">null</script>', ''), { status: 200 })

  const result = await auditUrl({
    url: '/book-assessment',
    sitemapUrls: new Set(),
    fetchImpl,
  })

  assert.equal(result.ok, false)
  assert.equal(result.indexable, false)
  assert.deepEqual(
    result.issues.map((issue) => issue.code),
    ['SITEMAP_MISSING', 'NOT_INDEXABLE', 'SCHEMA_MISSING', 'INTERNAL_LINKS_MISSING'],
  )
})

test('full SEO ops report combines sitemap, page, robots, llms, and Bing payloads', async () => {
  const responses = new Map([
    [`${ORIGIN}/sitemap.xml`, `<sitemapindex><loc>${ORIGIN}/sitemap-pages.xml</loc></sitemapindex>`],
    [`${ORIGIN}/sitemap-pages.xml`, `<urlset><loc>${ORIGIN}/book-assessment</loc></urlset>`],
    [`${ORIGIN}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml`],
    [`${ORIGIN}/llms.txt`, `[Book](${ORIGIN}/book-assessment)`],
    [`${ORIGIN}/book-assessment`, html()],
  ])
  const fetchImpl = async (url) => new Response(responses.get(String(url)) ?? '', {
    status: responses.has(String(url)) ? 200 : 404,
  })

  const report = await buildSeoOpsReport({
    priorityPaths: ['/book-assessment'],
    fetchImpl,
  })

  assert.equal(report.summary.status, 'HEALTHY')
  assert.equal(report.sitemap.urlCount, 1)
  assert.equal(report.pages.length, 1)
  assert.deepEqual(report.bing.urlSubmissionPayload.urlList, [`${ORIGIN}/book-assessment`])
})
