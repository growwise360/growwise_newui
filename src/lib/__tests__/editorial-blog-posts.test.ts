import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from '@jest/globals'

import { EDITORIAL_BLOG_POSTS } from '@/data/editorial-blog-posts'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { buildBlogUrls, renderUrlset } from '@/lib/seo/sitemapData'
import { PUBLIC_SITEMAP_PATHS } from '@/lib/seo/public-paths'

const ROOT = process.cwd()

describe('editorial blog collection', () => {
  test('contains seventeen distinct, complete articles', () => {
    expect(EDITORIAL_BLOG_POSTS).toHaveLength(17)
    expect(new Set(EDITORIAL_BLOG_POSTS.map((post) => post.slug)).size).toBe(17)

    for (const post of EDITORIAL_BLOG_POSTS) {
      expect(post.headline.length).toBeGreaterThan(20)
      expect(post.seoTitle.length).toBeLessThanOrEqual(65)
      expect(post.description.length).toBeGreaterThanOrEqual(120)
      expect(post.description.length).toBeLessThanOrEqual(165)
      expect(post.quickAnswer.length).toBeGreaterThan(120)
      expect(post.faqs.length).toBeGreaterThanOrEqual(3)
      expect(post.relatedPosts).toHaveLength(3)
      expect(fs.existsSync(path.join(ROOT, 'public', post.image))).toBe(true)
    }
  })

  test('dynamic route renders metadata, JSON-LD, breadcrumbs, and LLM blocks', () => {
    const source = fs.readFileSync(path.join(ROOT, 'src/app/[locale]/growwise-blogs/[slug]/page.tsx'), 'utf8')
    expect(source).toContain('generatePageMetadata')
    expect(source).toContain('generateArticleSchema')
    expect(source).toContain('generateFAQPageSchema')
    expect(source).toContain('BreadcrumbSchema')
    expect(source).toContain('quickAnswer={editorial.quickAnswer}')
  })

  test('produces valid Article and FAQPage JSON-LD shapes', () => {
    for (const post of EDITORIAL_BLOG_POSTS) {
      const url = `https://growwiseschool.org/growwise-blogs/${post.slug}`
      const article = generateArticleSchema({
        headline: post.headline,
        description: post.description,
        url,
        image: `https://growwiseschool.org${post.image}`,
        datePublished: post.publishedDate,
        dateModified: post.publishedDate,
        author: { type: 'Organization', name: 'GrowWise Education Team' },
      })
      const faq = generateFAQPageSchema(post.faqs)

      expect(article['@context']).toBe('https://schema.org')
      expect(article['@type']).toBe('BlogPosting')
      expect(article.mainEntityOfPage).toEqual({ '@type': 'WebPage', '@id': url })
      expect(article.headline).toBe(post.headline)
      expect(article.datePublished).toBe(post.publishedDate)
      expect(faq['@type']).toBe('FAQPage')
      expect(faq.mainEntity).toHaveLength(post.faqs.length)
      expect(() => JSON.stringify(article)).not.toThrow()
      expect(() => JSON.stringify(faq)).not.toThrow()
    }
  })

  test('renders all ten submitted article URLs in sitemap-blogs XML', () => {
    const submittedSlugs = [
      ...EDITORIAL_BLOG_POSTS.map((post) => post.slug),
      'tutoring-vs-teaching-what-parents-should-pay-for',
      'how-to-tell-if-tutoring-is-working',
      'thinking-gap-your-kids-arent-distracted',
    ]
    const xml = renderUrlset(buildBlogUrls('https://growwiseschool.org'))

    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for (const slug of submittedSlugs) {
      const loc = `<loc>https://growwiseschool.org/growwise-blogs/${slug}</loc>`
      expect(xml.match(new RegExp(loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))).toHaveLength(1)
    }
  })

  test('all related, program, and conversion URLs resolve to registered public paths', () => {
    const registered = new Set<string>(PUBLIC_SITEMAP_PATHS)
    for (const post of EDITORIAL_BLOG_POSTS) {
      expect(registered.has(post.programHref)).toBe(true)
      for (const related of post.relatedPosts) expect(registered.has(related.href)).toBe(true)
    }
    expect(registered.has('/book-assessment')).toBe(true)
    expect(registered.has('/enroll')).toBe(true)
  })

  test('every submitted article has a contextual backlink from another submitted article', () => {
    const explicitLinks: Record<string, string[]> = {
      'tutoring-vs-teaching-what-parents-should-pay-for': ['how-to-tell-if-tutoring-is-working'],
      'how-to-tell-if-tutoring-is-working': ['tutoring-vs-teaching-what-parents-should-pay-for', 'thinking-gap-your-kids-arent-distracted'],
      'thinking-gap-your-kids-arent-distracted': ['should-kids-use-chatgpt-for-homework', 'tutoring-vs-teaching-what-parents-should-pay-for', 'how-to-tell-if-tutoring-is-working'],
    }
    const graph = new Map<string, Set<string>>()
    for (const post of EDITORIAL_BLOG_POSTS) {
      graph.set(post.slug, new Set(post.relatedPosts.filter((link) => link.href.startsWith('/growwise-blogs/')).map((link) => link.href.replace('/growwise-blogs/', ''))))
    }
    for (const [slug, links] of Object.entries(explicitLinks)) graph.set(slug, new Set(links))

    for (const target of graph.keys()) {
      const inbound = [...graph.entries()].filter(([source, links]) => source !== target && links.has(target))
      expect(inbound.length).toBeGreaterThan(0)
    }
  })

  test('all editorial routes are registered for discovery', () => {
    const publicPaths = fs.readFileSync(path.join(ROOT, 'src/lib/seo/public-paths.ts'), 'utf8')
    const lastmod = fs.readFileSync(path.join(ROOT, 'src/lib/seo/sitemap-lastmod.json'), 'utf8')
    const blogIndex = fs.readFileSync(path.join(ROOT, 'src/app/[locale]/growwise-blogs/page.tsx'), 'utf8')
    const sitemap = fs.readFileSync(path.join(ROOT, 'src/lib/seo/sitemapData.ts'), 'utf8')

    for (const post of EDITORIAL_BLOG_POSTS) {
      expect(publicPaths).toContain(`/growwise-blogs/${post.slug}`)
      expect(lastmod).toContain(`/growwise-blogs/${post.slug}`)
    }
    expect(blogIndex).toContain('EDITORIAL_BLOG_POSTS.map')
    expect(sitemap).toContain('EDITORIAL_BLOG_POSTS.map')
  })
})
