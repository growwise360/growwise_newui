#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const BASE_URL = process.env.AEO_AUDIT_BASE_URL || 'http://127.0.0.1:3001'
const APP_ROUTE_ROOT = path.join(process.cwd(), 'src/app/[locale]')
const EXCLUDED_ARTICLE_ROUTE_FILES = new Set([
  // Canonical interactive tool lives at /readinesschecklist; this resource path is redirected.
  'resources/readiness-checklist/page.tsx',
])

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'before',
  'best',
  'ca',
  'can',
  'child',
  'dublin',
  'for',
  'from',
  'go',
  'guide',
  'how',
  'in',
  'is',
  'learn',
  'of',
  'on',
  'or',
  'parent',
  'parents',
  'right',
  'school',
  'should',
  'smart',
  'simple',
  'the',
  'this',
  'to',
  'tri',
  'valley',
  'what',
  'when',
  'which',
  'why',
  'with',
  'your',
])

const ACADEMIC_SYNONYMS = {
  assessment: ['diagnostic', 'screening', 'checklist', 'self-check'],
  coding: ['programming', 'code', 'python', 'java', 'scratch', 'ai'],
  english: ['reading', 'writing', 'comprehension', 'fluency'],
  focus: ['attention', 'concentration'],
  gap: ['gaps', 'learning gap', 'mistake pattern'],
  math: ['algebra', 'geometry', 'im1', 'im2', 'precalculus', 'sat'],
  reading: ['fluency', 'comprehension', 'literacy', 'english'],
  summer: ['camp', 'slide', 'program'],
  tutoring: ['academic support', 'small group', '1-on-1'],
  writing: ['english', 'essay', 'composition'],
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function articleRoutes() {
  return walk(APP_ROUTE_ROOT)
    .filter((file) => file.endsWith('/page.tsx'))
    .filter((file) => file.includes('/growwise-blogs/') || file.includes('/resources/'))
    .filter((file) => !file.endsWith('/growwise-blogs/page.tsx'))
    .filter((file) => !file.endsWith('/resources/page.tsx'))
    .filter((file) => !EXCLUDED_ARTICLE_ROUTE_FILES.has(path.relative(APP_ROUTE_ROOT, file)))
    .map((file) => {
      const rel = path.relative(APP_ROUTE_ROOT, file).replace(/\/page\.tsx$/, '')
      return {
        file: path.relative(process.cwd(), file),
        url: `/${rel}`,
      }
    })
    .sort((a, b) => a.url.localeCompare(b.url))
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
}

function stripHtml(html) {
  return decodeEntities(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function htmlSegment(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))
  return match?.[1] || ''
}

function attrValue(tag, attr) {
  return tag.match(new RegExp(`${attr}=["']([^"']*)["']`, 'i'))?.[1] || ''
}

function extractTitle(pageHTML) {
  const h1 = [...pageHTML.matchAll(/<h1[\s\S]*?<\/h1>/gi)].map((m) => stripHtml(m[0]))
  const title = stripHtml(pageHTML.match(/<title>(.*?)<\/title>/i)?.[1] || '')
  return h1[0] || title
}

function keywordFromPage(pageHTML, url) {
  const slugTokens = url
    .split('/')
    .at(-1)
    .replace(/\d+/g, ' ')
    .split('-')
    .map((token) => token.toLowerCase())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))

  if (slugTokens.length >= 2) return slugTokens.slice(0, 4).join(' ')

  const titleTokens = extractTitle(pageHTML)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))

  return titleTokens.slice(0, 4).join(' ') || 'academic support'
}

function expandedKeywordTerms(targetKeyword) {
  const tokens = targetKeyword
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2)

  const terms = new Set([targetKeyword.toLowerCase(), ...tokens])
  tokens.forEach((token) => {
    ;(ACADEMIC_SYNONYMS[token] || []).forEach((synonym) => terms.add(synonym))
  })

  return [...terms]
}

function checkAnswerBlock(pageHTML) {
  const body = htmlSegment(pageHTML, 'body') || pageHTML
  const mainScope = htmlSegment(body, 'main')
  const contentScope =
    /<h1[\s\S]*?<\/h1>/i.test(mainScope) || /\bllm-answer-block\b/i.test(mainScope)
      ? mainScope
      :
    body
      .replace(/<header[\s\S]*?<\/header>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
  const h1Match = contentScope.match(/<h1[\s\S]*?<\/h1>/i)
  const articleStartScope = h1Match?.index === undefined ? contentScope : contentScope.slice(h1Match.index)
  const answerMatch = articleStartScope.match(/<div[^>]*class=["'][^"']*\bllm-answer-block\b[^"']*["'][\s\S]*?>/i)
  if (!answerMatch) return 'FAIL'

  const wordsBefore = stripHtml(articleStartScope.slice(0, answerMatch.index)).split(/\s+/).filter(Boolean)
  return wordsBefore.length <= 150 ? 'PASS' : 'FAIL'
}

function checkSemanticFigure(pageHTML, targetKeyword) {
  const figures = [...pageHTML.matchAll(/<figure[\s\S]*?<\/figure>/gi)].map((match) => match[0])
  if (figures.length === 0) return 'FAIL'

  const terms = expandedKeywordTerms(targetKeyword)
  const genericPatterns = [
    /\b(stock|generic|placeholder|hero image|blog image)\b/i,
    /\bunsplash|pexels|pixabay\b/i,
    /\bIMG[_-]?\d+/i,
    /\bphoto-\d+/i,
  ]

  const hasSemanticFigure = figures.some((figure) => {
    const caption = stripHtml(figure.match(/<figcaption[\s\S]*?<\/figcaption>/i)?.[0] || '')
    const imageTags = [...figure.matchAll(/<img[\s\S]*?>/gi)].map((match) => match[0])
    const imageText = imageTags
      .map((tag) => [attrValue(tag, 'alt'), attrValue(tag, 'src'), attrValue(tag, 'class')].join(' '))
      .join(' ')
    const searchable = `${caption} ${imageText}`.toLowerCase()
    const isGeneric = genericPatterns.some((pattern) => pattern.test(searchable))
    const hasKeywordContext = terms.some((term) => searchable.includes(term))

    return hasKeywordContext && !isGeneric
  })

  return hasSemanticFigure ? 'PASS' : 'FAIL'
}

function checkFaqSchema(pageHTML) {
  // Next App Router may render page-level JSON-LD outside the literal <head> in final HTML.
  // Validate every rendered JSON-LD block so the audit checks actual structured data, not placement quirks.
  const jsonLdBlocks = [
    ...pageHTML.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ]

  const hasFaq = jsonLdBlocks.some((block) => {
    try {
      const parsed = JSON.parse(block[1])
      const candidates = Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : [parsed]
      return candidates.some((item) => item?.['@type'] === 'FAQPage')
    } catch {
      return false
    }
  })

  return hasFaq ? 'PASS' : 'FAIL'
}

function checkHTagStructure(pageHTML) {
  const h1Count = [...pageHTML.matchAll(/<h1[\s\S]*?<\/h1>/gi)].length
  const h2s = [...pageHTML.matchAll(/<h2[\s\S]*?<\/h2>/gi)].map((match) => stripHtml(match[0]))
  return h1Count === 1 && h2s.length >= 2 && h2s.some((text) => text.includes('?')) ? 'PASS' : 'FAIL'
}

function checkMetaDescription(pageHTML) {
  const description =
    pageHTML.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ||
    pageHTML.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)?.[1] ||
    ''

  const length = decodeEntities(description).trim().length
  return length >= 140 && length <= 160 ? 'PASS' : 'FAIL'
}

function checkInternalLinks(pageHTML) {
  const hrefs = [...pageHTML.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1])
  const programPattern =
    /^\/(?:academic|courses|camps|future-skills|steam|coding)(?:\/|$)|^https:\/\/growwiseschool\.org\/(?:academic|courses|camps|future-skills|steam|coding)(?:\/|$)/
  const allowed = hrefs.filter((href) => {
    return (
      href === '/self-check' ||
      href.startsWith('/self-check/') ||
      href === '/contact' ||
      href.startsWith('/contact/') ||
      href === 'https://growwiseschool.org/self-check' ||
      href === 'https://growwiseschool.org/contact' ||
      programPattern.test(href)
    )
  })

  return new Set(allowed).size >= 2 ? 'PASS' : 'FAIL'
}

export function aeoContextValidator(pageHTML, targetKeyword) {
  const answerBlock = checkAnswerBlock(pageHTML)
  const semanticFigure = checkSemanticFigure(pageHTML, targetKeyword)
  const faqSchema = checkFaqSchema(pageHTML)
  const hTagStructure = checkHTagStructure(pageHTML)
  const metaDescription = checkMetaDescription(pageHTML)
  const internalLinks = checkInternalLinks(pageHTML)
  const checks = [answerBlock, semanticFigure, faqSchema, hTagStructure, metaDescription, internalLinks]

  return {
    keyword: targetKeyword,
    answerBlock,
    semanticFigure,
    faqSchema,
    hTagStructure,
    metaDescription,
    internalLinks,
    overallStatus: checks.every((check) => check === 'PASS') ? 'PASS' : 'FAIL',
  }
}

async function main() {
  const rows = []

  for (const route of articleRoutes()) {
    const response = await fetch(`${BASE_URL}${route.url}`)
    const pageHTML = await response.text()
    const keyword = keywordFromPage(pageHTML, route.url)
    const report = aeoContextValidator(pageHTML, keyword)

    rows.push({
      file: route.file,
      url: route.url,
      title: extractTitle(pageHTML),
      statusCode: response.status,
      ...report,
    })
  }

  console.log(JSON.stringify(rows, null, 2))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
