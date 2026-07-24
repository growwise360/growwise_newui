#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const baseUrl = (process.env.AUDIT_BASE_URL || 'http://localhost:3002').replace(/\/$/, '')
const outputPath = process.env.AUDIT_OUTPUT ||
  'docs/audits/evidence/link-integrity-2026-07-23.json'
const concurrency = Number(process.env.AUDIT_CONCURRENCY || 8)
const canonicalHost = 'growwiseschool.org'
const sitemapPaths = ['/sitemap-pages.xml', '/sitemap-blogs.xml']

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1]
      .replaceAll('&amp;', '&')
      .replaceAll('&apos;', "'")
      .replaceAll('&quot;', '"')
      .replaceAll('&gt;', '>')
      .replaceAll('&lt;', '<')
      .trim(),
  )
}

function extractHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\shref=["']([^"']+)["']/gi)].map((match) => match[1].trim())
}

function toAuditUrl(input, sourceUrl = baseUrl) {
  if (!input || input.startsWith('#') || /^(?:mailto|tel|javascript):/i.test(input)) return null

  let parsed
  try {
    parsed = new URL(input, sourceUrl)
  } catch {
    return null
  }

  const base = new URL(baseUrl)
  const isLocalHost = parsed.hostname === base.hostname
  const isCanonicalHost = parsed.hostname === canonicalHost || parsed.hostname === `www.${canonicalHost}`
  if (!isLocalHost && !isCanonicalHost) return null

  parsed.protocol = base.protocol
  parsed.hostname = base.hostname
  parsed.port = base.port
  parsed.hash = ''
  return parsed.toString()
}

async function fetchPage(url, redirect = 'follow') {
  const response = await fetch(url, {
    redirect,
    headers: { 'User-Agent': 'GrowWise-Hormozi-Integrity-Audit/1.0' },
    signal: AbortSignal.timeout(30_000),
  })
  return {
    status: response.status,
    location: response.headers.get('location'),
    contentType: response.headers.get('content-type') || '',
    html: redirect === 'follow' ? await response.text() : '',
    finalUrl: response.url,
  }
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      try {
        results[index] = await mapper(items[index], index)
      } catch (error) {
        results[index] = {
          url: items[index],
          status: 0,
          error: error instanceof Error ? error.message : String(error),
        }
      }
    }
  })
  await Promise.all(workers)
  return results
}

async function main() {
  const sitemapDocuments = await Promise.all(
    sitemapPaths.map(async (sitemapPath) => {
      const url = `${baseUrl}${sitemapPath}`
      const response = await fetchPage(url)
      if (response.status >= 400) throw new Error(`${url} returned HTTP ${response.status}`)
      return { url, status: response.status, xml: response.html }
    }),
  )

  const sitemapUrls = [...new Set(
    sitemapDocuments
      .flatMap((document) => extractLocs(document.xml))
      .map((url) => toAuditUrl(url))
      .filter(Boolean),
  )].sort()

  const pages = await mapLimit(sitemapUrls, concurrency, async (url) => {
    const response = await fetchPage(url)
    return {
      url,
      status: response.status,
      finalUrl: response.finalUrl,
      contentType: response.contentType,
      hrefs: response.contentType.includes('text/html') ? extractHrefs(response.html) : [],
    }
  })

  const discoveredTargets = new Map()
  for (const page of pages) {
    for (const href of page.hrefs || []) {
      const target = toAuditUrl(href, page.url)
      if (!target) continue
      const sources = discoveredTargets.get(target) || new Set()
      sources.add(page.url)
      discoveredTargets.set(target, sources)
    }
  }

  const targets = await mapLimit([...discoveredTargets.keys()].sort(), concurrency, async (url) => {
    const firstHop = await fetchPage(url, 'manual')
    let finalStatus = firstHop.status
    let finalUrl = url
    if (firstHop.status >= 300 && firstHop.status < 400) {
      const followed = await fetchPage(url, 'follow')
      finalStatus = followed.status
      finalUrl = followed.finalUrl
    }
    return {
      url,
      firstStatus: firstHop.status,
      location: firstHop.location,
      finalStatus,
      finalUrl,
      sources: [...(discoveredTargets.get(url) || [])].sort(),
    }
  })

  const sitemapFailures = pages.filter((page) => page.status === 0 || page.status >= 400)
  const brokenTargets = targets.filter((target) =>
    target.firstStatus === 0 ||
    target.firstStatus >= 400 ||
    target.finalStatus === 0 ||
    target.finalStatus >= 400,
  )
  const redirectedTargets = targets.filter((target) => target.firstStatus >= 300 && target.firstStatus < 400)

  const report = {
    runAt: new Date().toISOString(),
    baseUrl,
    scope: {
      sitemapPages: 'All canonical URLs in sitemap-pages.xml and sitemap-blogs.xml',
      internalLinks: 'All unique internal HTTP links discovered in rendered server HTML',
      hormoziExclusion: '/resources/student-articles and descendants remain excluded from conversion scoring',
    },
    summary: {
      sitemapDocuments: sitemapDocuments.length,
      sitemapPagesChecked: pages.length,
      sitemap4xx: pages.filter((page) => page.status >= 400 && page.status < 500).length,
      sitemap5xx: pages.filter((page) => page.status >= 500).length,
      uniqueInternalTargetsChecked: targets.length,
      brokenInternalTargets: brokenTargets.length,
      redirectedInternalTargets: redirectedTargets.length,
    },
    sitemapFailures,
    brokenTargets,
    redirectedTargets,
    pages: pages.map(({ hrefs, ...page }) => ({ ...page, internalHrefCount: hrefs?.length || 0 })),
    targets,
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify(report.summary, null, 2))
  console.log(`Wrote ${outputPath}`)

  if (sitemapFailures.length || brokenTargets.length) process.exitCode = 1
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
