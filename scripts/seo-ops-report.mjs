#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CANONICAL_ORIGIN } from './indexnow-lib.mjs'
import {
  PRIORITY_PATHS,
  buildSeoOpsReport,
  submitBingSitemap,
  submitBingUrls,
} from './seo-ops-lib.mjs'

const DEFAULT_REPORT_FILE = fileURLToPath(new URL('../artifacts/seo/seo-ops-report.json', import.meta.url))

function usage() {
  console.log(`Usage:
  node scripts/seo-ops-report.mjs [--base <origin>] [--out <path>] [--include-gsc] [--submit-bing]
  node scripts/seo-ops-report.mjs --path /book-assessment --path /resources/tutoring-dublin-ca

Options:
  --base <origin>       Site origin to audit. Defaults to https://growwiseschool.org.
  --path <path-or-url>  Priority path or URL to audit. May be repeated.
  --out <path>          JSON report output. Defaults to artifacts/seo/seo-ops-report.json.
  --include-gsc         Inspect priority URLs with GSC if GSC_ACCESS_TOKEN is configured.
  --submit-bing         Submit sitemap + audited URLs to Bing if BING_WEBMASTER_API_KEY is configured.
`)
}

function parseArgs(argv) {
  const options = {
    origin: process.env.SEO_OPS_BASE_URL || CANONICAL_ORIGIN,
    out: DEFAULT_REPORT_FILE,
    includeGsc: false,
    submitBing: false,
    paths: [],
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--base') options.origin = argv[++index]
    else if (arg === '--out') options.out = argv[++index]
    else if (arg === '--path') options.paths.push(argv[++index])
    else if (arg === '--include-gsc') options.includeGsc = true
    else if (arg === '--submit-bing') options.submitBing = true
    else if (arg === '--help' || arg === '-h') {
      usage()
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (options.paths.some((path) => !path)) throw new Error('Missing value for --path')
  return options
}

function normalizePriorityPath(input, origin) {
  const url = new URL(input, origin)
  return `${url.pathname}${url.search}`
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const priorityPaths = options.paths.length > 0
    ? options.paths.map((path) => normalizePriorityPath(path, options.origin))
    : PRIORITY_PATHS

  const report = await buildSeoOpsReport({
    origin: options.origin,
    priorityPaths,
    includeGsc: options.includeGsc,
  })

  if (options.submitBing) {
    const urls = report.pages.map((page) => page.url)
    report.bing.urlSubmissionResult = await submitBingUrls({ urls })
    report.bing.sitemapSubmissionResult = await submitBingSitemap({
      sitemapUrl: `${options.origin}/sitemap.xml`,
    })
  }

  mkdirSync(dirname(options.out), { recursive: true })
  writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`)

  console.log(`SEO ops report saved: ${options.out}`)
  console.log(`Status: ${report.summary.status}`)
  console.log(`Priority pages checked: ${report.summary.priorityPagesChecked}`)
  console.log(`Issues: ${report.summary.issueCount} (${report.summary.errorCount} error)`)
  console.log(`AI crawlers blocked: ${report.summary.blockedAiCrawlerCount}`)
  console.log(`llms.txt missing priority URLs: ${report.summary.llmsMissingPriorityUrlCount}`)

  if (report.summary.errorCount > 0 || report.summary.blockedAiCrawlerCount > 0) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
