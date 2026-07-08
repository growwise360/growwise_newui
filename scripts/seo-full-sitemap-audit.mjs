#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { CANONICAL_ORIGIN, collectSitemapUrls } from './indexnow-lib.mjs'
import {
  auditUrl,
  extractCanonical,
  extractMeta,
  extractTitle,
  extractJsonLdTypes,
} from './seo-ops-lib.mjs'

const DEFAULT_OUT = 'artifacts/seo/full-sitemap-audit.json'
const REDIRECT_SOURCE_PATTERNS = [
  /https:\/\/www\.growwiseschool\.org/i,
  /https:\/\/growwiseschool\.org\/en(?:\/|$)/i,
  /^\/en(?:\/|$)/i,
  /^\/courses\/(?:math|english|high-school-math)(?:\/|[?#]|$)/i,
  /^\/camps\/academic-summer-sprint-dublin-ca(?:\/|[?#]|$)/i,
  /^\/detective(?:\/|[?#]|$)/i,
  /^\/results(?:\/|[?#]|$)/i,
  /^\/math-courses-in-dublin-ca-growwise(?:\/|[?#]|$)/i,
]

function parseArgs(argv) {
  const options = {
    origin: process.env.SEO_AUDIT_BASE_URL || CANONICAL_ORIGIN,
    out: DEFAULT_OUT,
    concurrency: Number(process.env.SEO_AUDIT_CONCURRENCY || 8),
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--base') options.origin = argv[++i]
    else if (arg === '--out') options.out = argv[++i]
    else if (arg === '--concurrency') options.concurrency = Number(argv[++i])
    else throw new Error(`Unknown argument: ${arg}`)
  }

  if (!Number.isInteger(options.concurrency) || options.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer')
  }
  return options
}

async function checkFirstHop(url, timeoutMs = 15_000) {
  const response = await fetch(url, {
    method: 'HEAD',
    redirect: 'manual',
    headers: { 'User-Agent': 'GrowWise-Full-Sitemap-Audit/1.0' },
    signal: AbortSignal.timeout(timeoutMs),
  })
  return {
    status: response.status,
    location: response.headers.get('location'),
  }
}

function getHrefValues(html) {
  return [...html.matchAll(/<a\b[^>]*\shref=["']([^"']+)["']/gi)].map((m) => m[1])
}

function isInternalHref(href, origin) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false
  try {
    const url = new URL(href, origin)
    return url.hostname === new URL(origin).hostname
  } catch {
    return false
  }
}

function findRedirectLikeInternalLinks(html, origin) {
  return [...new Set(
    getHrefValues(html)
      .filter((href) => isInternalHref(href, origin))
      .filter((href) => REDIRECT_SOURCE_PATTERNS.some((pattern) => pattern.test(href))),
  )].sort()
}

async function fetchHtml(url, timeoutMs = 15_000) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': 'GrowWise-Full-Sitemap-Audit/1.0' },
    signal: AbortSignal.timeout(timeoutMs),
  })
  return {
    status: response.status,
    html: await response.text(),
  }
}

function classifyPageIssues({ url, firstHop, page, html, origin }) {
  const issues = [...(page.issues || [])]
  const canonical = extractCanonical(html)
  const robots = extractMeta(html, 'robots')
  const title = extractTitle(html)
  const description = extractMeta(html, 'description')
  const schemaTypes = extractJsonLdTypes(html)
  const redirectLikeInternalLinks = findRedirectLikeInternalLinks(html, origin)

  if (firstHop.status >= 300 && firstHop.status < 400) {
    issues.push({
      severity: 'error',
      code: 'SITEMAP_URL_REDIRECTS',
      message: `Sitemap URL first hop is HTTP ${firstHop.status} to ${firstHop.location || '(no location)'}`,
    })
  }
  if (redirectLikeInternalLinks.length > 0) {
    issues.push({
      severity: 'warning',
      code: 'INTERNAL_REDIRECT_LINKS',
      message: `${redirectLikeInternalLinks.length} internal link(s) look like legacy/redirect sources`,
    })
  }
  if (title && (title.length < 25 || title.length > 70)) {
    issues.push({
      severity: 'warning',
      code: 'TITLE_LENGTH_OUT_OF_RANGE',
      message: `Title length ${title.length}`,
    })
  }
  if (description && (description.length < 120 || description.length > 170)) {
    issues.push({
      severity: 'warning',
      code: 'META_DESCRIPTION_LENGTH_OUT_OF_RANGE',
      message: `Meta description length ${description.length}`,
    })
  }

  return {
    url,
    ok: issues.every((issue) => issue.severity !== 'error'),
    firstHop,
    status: page.status,
    canonical,
    robots: robots ?? null,
    titleLength: title?.length ?? 0,
    descriptionLength: description?.length ?? 0,
    schemaTypes,
    internalLinkCount: page.internalLinkCount,
    redirectLikeInternalLinks,
    issues,
  }
}

async function auditOne(url, sitemapUrls, origin) {
  const [firstHop, fetched, page] = await Promise.all([
    checkFirstHop(url),
    fetchHtml(url),
    auditUrl({ url, sitemapUrls }),
  ])
  return classifyPageIssues({
    url,
    firstHop,
    page,
    html: fetched.html,
    origin,
  })
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next
      next += 1
      results[index] = await mapper(items[index], index)
    }
  })
  await Promise.all(workers)
  return results
}

function summarize(pages) {
  const allIssues = pages.flatMap((page) => page.issues.map((issue) => ({ ...issue, url: page.url })))
  const byCode = {}
  for (const issue of allIssues) {
    byCode[issue.code] = (byCode[issue.code] || 0) + 1
  }
  return {
    pagesChecked: pages.length,
    pagesOk: pages.filter((page) => page.ok).length,
    pagesWithErrors: pages.filter((page) => page.issues.some((issue) => issue.severity === 'error')).length,
    pagesWithWarnings: pages.filter((page) => page.issues.some((issue) => issue.severity === 'warning')).length,
    issueCount: allIssues.length,
    errorCount: allIssues.filter((issue) => issue.severity === 'error').length,
    warningCount: allIssues.filter((issue) => issue.severity === 'warning').length,
    byCode,
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const urls = await collectSitemapUrls({ origin: options.origin })
  const sitemapUrls = new Set(urls)
  const pages = await mapLimit(urls, options.concurrency, (url) => auditOne(url, sitemapUrls, options.origin))
  const report = {
    runAt: new Date().toISOString(),
    origin: options.origin,
    summary: summarize(pages),
    pages,
  }

  mkdirSync(dirname(options.out), { recursive: true })
  writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`)

  console.log(`Full sitemap audit saved: ${options.out}`)
  console.log(JSON.stringify(report.summary, null, 2))
  if (report.summary.errorCount > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
