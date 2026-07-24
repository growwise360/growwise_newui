import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  batchUrls,
  collectSitemapUrls,
  extractLocs,
  normalizeCanonicalUrl,
  parseNameStatus,
  submitIndexNowBatch,
  uniqueCanonicalUrls,
  urlsFromChangedFiles,
} from './indexnow-lib.mjs'

test('extractLocs decodes XML entities', () => {
  assert.deepEqual(extractLocs('<loc>https://growwiseschool.org/a?x=1&amp;y=2</loc>'), [
    'https://growwiseschool.org/a?x=1&y=2',
  ])
})

test('canonical URL validation rejects non-production hosts', () => {
  assert.equal(normalizeCanonicalUrl('/about'), 'https://growwiseschool.org/about')
  assert.equal(
    normalizeCanonicalUrl('/about?utm_source=test#section'),
    'https://growwiseschool.org/about',
  )
  assert.throws(() => normalizeCanonicalUrl('https://www.growwiseschool.org/about'))
  assert.throws(() => normalizeCanonicalUrl('http://localhost:3000/about'))
  assert.throws(() => normalizeCanonicalUrl('https://preview.vercel.app/about'))
})

test('URLs are deduplicated and batched', () => {
  const urls = uniqueCanonicalUrls(['/about', '/about', '/contact'])
  assert.deepEqual(urls, [
    'https://growwiseschool.org/about',
    'https://growwiseschool.org/contact',
  ])
  assert.deepEqual(batchUrls(urls, 1), [[urls[0]], [urls[1]]])
  assert.throws(() => batchUrls(urls, 10_001))
})

test('collectSitemapUrls follows child sitemaps', async () => {
  const responses = new Map([
    ['https://growwiseschool.org/sitemap.xml', '<sitemapindex><loc>https://growwiseschool.org/sitemap-pages.xml</loc></sitemapindex>'],
    ['https://growwiseschool.org/sitemap-pages.xml', '<urlset><loc>https://growwiseschool.org/</loc><loc>https://growwiseschool.org/about</loc></urlset>'],
  ])
  const fetchImpl = async (url) => new Response(responses.get(url), { status: responses.has(url) ? 200 : 404 })
  assert.deepEqual(await collectSitemapUrls({ fetchImpl }), [
    'https://growwiseschool.org/',
    'https://growwiseschool.org/about',
  ])
})

test('collectSitemapUrls falls back to known child sitemaps', async () => {
  const responses = new Map([
    ['https://growwiseschool.org/sitemap-pages.xml', '<urlset><loc>https://growwiseschool.org/about</loc></urlset>'],
    ['https://growwiseschool.org/sitemap-blogs.xml', '<urlset><loc>https://growwiseschool.org/resources</loc></urlset>'],
  ])
  const fetchImpl = async (url) => new Response(responses.get(url), { status: responses.has(url) ? 200 : 404 })
  assert.deepEqual(await collectSitemapUrls({ fetchImpl }), [
    'https://growwiseschool.org/about',
    'https://growwiseschool.org/resources',
  ])
})

test('changed route files map to URLs and shared files trigger full sitemap', () => {
  assert.deepEqual(
    urlsFromChangedFiles([
      { status: 'M', path: 'src/app/[locale]/about/page.tsx' },
    ]),
    { requiresAll: false, urls: ['https://growwiseschool.org/about'] },
  )
  assert.equal(
    urlsFromChangedFiles([
      { status: 'M', path: 'src/components/Header.tsx' },
    ]).requiresAll,
    true,
  )
})

test('name-status parser retains deleted and renamed destinations', () => {
  assert.deepEqual(parseNameStatus('D\tsrc/app/old/page.tsx\nR100\told\tnew'), [
    { status: 'D', path: 'src/app/old/page.tsx' },
    { status: 'D', path: 'old' },
    { status: 'A', path: 'new' },
  ])
})

test('public key filename and content match', () => {
  const key = '9bdcae9db63f4f39996f3ad38cc52d32'
  const keyFile = fileURLToPath(new URL(`../public/${key}.txt`, import.meta.url))
  assert.equal(readFileSync(keyFile, 'utf8').trim(), key)
})

test('submitter retries a rate limit and accepts 202', async () => {
  const statuses = [429, 202]
  const calls = []
  const fetchImpl = async (_url, options) => {
    calls.push(JSON.parse(options.body))
    return new Response('', { status: statuses.shift() })
  }
  const result = await submitIndexNowBatch({
    urls: ['/about'],
    key: 'a'.repeat(32),
    fetchImpl,
    sleep: async () => {},
  })
  assert.deepEqual(result, {
    status: 202,
    accepted: true,
    endpoint: 'https://api.indexnow.org/indexnow',
    urlCount: 1,
  })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].host, 'growwiseschool.org')
})

test('submitter retries transient network errors', async () => {
  let attempts = 0
  const fetchImpl = async () => {
    attempts += 1
    if (attempts === 1) throw new Error('temporary network failure')
    return new Response('', { status: 200 })
  }
  const result = await submitIndexNowBatch({
    urls: ['/contact'],
    key: 'a'.repeat(32),
    fetchImpl,
    sleep: async () => {},
  })
  assert.deepEqual(result, {
    status: 200,
    accepted: true,
    endpoint: 'https://api.indexnow.org/indexnow',
    urlCount: 1,
  })
  assert.equal(attempts, 2)
})
