import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from '@jest/globals'

import { SEO_MANAGER_BLOG_POSTS } from '@/data/seo-manager-blog-posts'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

const ROOT = process.cwd()

describe('SEO Manager blog batch', () => {
  test('loads all ten source-backed articles with complete metadata', () => {
    expect(SEO_MANAGER_BLOG_POSTS).toHaveLength(10)
    expect(new Set(SEO_MANAGER_BLOG_POSTS.map((post) => post.slug)).size).toBe(10)

    for (const post of SEO_MANAGER_BLOG_POSTS) {
      expect(post.seoTitle.length).toBeLessThanOrEqual(65)
      expect(post.description.length).toBeGreaterThanOrEqual(120)
      expect(post.description.length).toBeLessThanOrEqual(165)
      expect(post.quickAnswer.length).toBeGreaterThan(120)
      expect(post.faqs).toHaveLength(5)
      expect(post.relatedPosts).toHaveLength(3)
      expect(post.articleSection).toBeTruthy()
      expect(post.keywords?.length).toBeGreaterThanOrEqual(3)
      expect(post.sources?.length).toBeGreaterThanOrEqual(1)
      expect(post.modifiedDate).toBe(post.publishedDate)
      expect(fs.existsSync(path.join(ROOT, 'public', post.image))).toBe(true)
    }
  })

  test('uses the visible FAQ data for generated FAQPage JSON-LD', () => {
    for (const post of SEO_MANAGER_BLOG_POSTS) {
      const faq = generateFAQPageSchema(post.faqs)
      expect(faq.mainEntity).toEqual(post.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })))
    }
  })

  test('includes article-level fields needed for answer-engine extraction', () => {
    for (const post of SEO_MANAGER_BLOG_POSTS) {
      const article = generateArticleSchema({
        headline: post.headline,
        description: post.description,
        url: `https://growwiseschool.org/growwise-blogs/${post.slug}`,
        image: `https://growwiseschool.org${post.image}`,
        author: { type: 'Organization', name: 'GrowWise Education Team' },
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate,
        articleSection: post.articleSection,
        keywords: post.keywords,
      })

      expect(article['@type']).toBe('BlogPosting')
      expect(article.inLanguage).toBe('en-US')
      expect(article.isAccessibleForFree).toBe(true)
      expect(article.articleSection).toBe(post.articleSection)
      expect(article.keywords).toEqual(post.keywords)
    }
  })

  test('each source contains a visible Why GrowWise section', () => {
    const sourceDir = path.join(ROOT, 'content', 'seo-manager')
    for (const file of fs.readdirSync(sourceDir).filter((name) => name.endsWith('.md'))) {
      expect(fs.readFileSync(path.join(sourceDir, file), 'utf8')).toContain('## Why GrowWise?')
    }
  })
})
