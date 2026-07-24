#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { appendFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CANONICAL_ORIGIN,
  batchUrls,
  collectSitemapUrls,
  parseNameStatus,
  submitIndexNowBatch,
  uniqueCanonicalUrls,
  urlsFromChangedFiles,
} from './indexnow-lib.mjs'

const KEY = '9bdcae9db63f4f39996f3ad38cc52d32'
const KEY_FILE = fileURLToPath(new URL(`../public/${KEY}.txt`, import.meta.url))
const DEFAULT_LOG_FILE = fileURLToPath(new URL('../artifacts/seo/indexnow-submissions.jsonl', import.meta.url))

function usage() {
  console.log(`Usage:
  node scripts/indexnow-submit.mjs --all [--dry-run]
  node scripts/indexnow-submit.mjs --url /path [--url https://growwiseschool.org/other] [--dry-run]
  node scripts/indexnow-submit.mjs --changed-since <git-ref> [--dry-run]

Options:
  --all                  Read all canonical URLs from production sitemaps.
  --url <url-or-path>    Submit one changed or deleted URL; may be repeated.
  --changed-since <ref>  Derive affected URLs from git changes. Shared changes
                         safely fall back to the full sitemap.
  --log <path>           JSONL submission log path. Defaults to artifacts/seo.
  --dry-run              Print validated URLs without contacting IndexNow.
`)
}

function parseArgs(argv) {
  const options = { all: false, dryRun: false, urls: [], changedSince: null, logPath: DEFAULT_LOG_FILE }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--all') options.all = true
    else if (arg === '--dry-run') options.dryRun = true
    else if (arg === '--url') options.urls.push(argv[++index])
    else if (arg === '--changed-since') options.changedSince = argv[++index]
    else if (arg === '--log') options.logPath = argv[++index]
    else if (arg === '--help' || arg === '-h') {
      usage()
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
  if (options.urls.some((url) => !url) || (argv.includes('--changed-since') && !options.changedSince)) {
    throw new Error('Missing value for --url or --changed-since')
  }
  return options
}

function assertKeyFile() {
  const content = readFileSync(KEY_FILE, 'utf8').trim()
  if (content !== KEY) {
    throw new Error('IndexNow public key filename and content must match')
  }
}

function changedFilesSince(ref) {
  if (/^0+$/.test(ref)) {
    return [{ status: 'M', path: 'src/components/initial-deploy' }]
  }
  const output = execFileSync(
    'git',
    ['diff', '--name-status', `${ref}..HEAD`],
    { cwd: fileURLToPath(new URL('..', import.meta.url)), encoding: 'utf8' },
  )
  return parseNameStatus(output)
}

async function verifyLiveKey(fetchImpl = fetch) {
  const response = await fetchImpl(`${CANONICAL_ORIGIN}/${KEY}.txt`, {
    signal: AbortSignal.timeout(15_000),
  })
  const content = response.ok ? (await response.text()).trim() : ''
  if (!response.ok || content !== KEY) {
    throw new Error(`Live IndexNow key verification failed: HTTP ${response.status}`)
  }
}

async function resolveUrls(options) {
  let useAll = options.all
  const explicit = [...options.urls]

  if (options.changedSince) {
    const derived = urlsFromChangedFiles(changedFilesSince(options.changedSince))
    useAll ||= derived.requiresAll
    explicit.push(...derived.urls)
  }

  const sitemapUrls = useAll ? await collectSitemapUrls() : []
  return uniqueCanonicalUrls([...sitemapUrls, ...explicit])
}

function logSubmission(logPath, entry) {
  mkdirSync(dirname(logPath), { recursive: true })
  appendFileSync(logPath, `${JSON.stringify({ submittedAt: new Date().toISOString(), ...entry })}\n`)
}

async function main() {
  assertKeyFile()
  const options = parseArgs(process.argv.slice(2))
  if (!options.all && !options.changedSince && options.urls.length === 0) {
    usage()
    throw new Error('Choose --all, --changed-since, or at least one --url')
  }

  const urls = await resolveUrls(options)
  if (urls.length === 0) {
    console.log('No canonical frontend URLs changed; nothing to submit.')
    return
  }

  console.log(`Validated ${urls.length} canonical URL${urls.length === 1 ? '' : 's'}.`)
  if (options.dryRun) {
    urls.forEach((url) => console.log(url))
    console.log('Dry run complete; IndexNow was not contacted.')
    return
  }

  await verifyLiveKey()
  const batches = batchUrls(urls)
  for (let index = 0; index < batches.length; index += 1) {
    const result = await submitIndexNowBatch({ urls: batches[index], key: KEY })
    logSubmission(options.logPath, {
      tool: 'indexnow-submit',
      batch: index + 1,
      batches: batches.length,
      status: result.status,
      accepted: result.accepted,
      endpoint: result.endpoint,
      urlCount: result.urlCount,
      urls: batches[index],
    })
    console.log(`Batch ${index + 1}/${batches.length} accepted (HTTP ${result.status}).`)
  }
  console.log(`Submission log updated: ${options.logPath}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
