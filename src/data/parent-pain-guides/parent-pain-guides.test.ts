import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { PARENT_PAIN_GUIDES, PARENT_PAIN_GUIDE_SLUGS } from '.'
import { PUBLIC_SITEMAP_PATHS } from '@/lib/seo/public-paths'
import { buildBlogUrls } from '@/lib/seo/sitemapData'

const ROOT = process.cwd()

describe('parent pain guide cluster', () => {
  it('defines all 15 guides in editorial priority order', () => {
    expect(PARENT_PAIN_GUIDES).toHaveLength(15)
    expect(PARENT_PAIN_GUIDES.map((guide) => guide.slug)).toEqual([...PARENT_PAIN_GUIDE_SLUGS])
    expect(new Set(PARENT_PAIN_GUIDE_SLUGS).size).toBe(15)
  })

  it('keeps the full published copy free of em dashes and canned AI phrasing', () => {
    const copy = JSON.stringify(PARENT_PAIN_GUIDES).toLowerCase()
    expect(copy).not.toContain('—')
    expect(copy).not.toContain("in today's fast-paced world")
    expect(copy).not.toContain('game-changer')
    expect(copy).not.toContain('delve into')
  })

  it.each(PARENT_PAIN_GUIDES)('$slug has complete SEO, AEO, and editorial fields', (guide) => {
    expect(guide.seoTitle.length).toBeLessThanOrEqual(60)
    expect(guide.description.length).toBeLessThanOrEqual(155)
    const answerWords = guide.answer.trim().split(/\s+/).length
    expect(answerWords).toBeGreaterThanOrEqual(40)
    expect(answerWords).toBeLessThanOrEqual(70)
    expect(guide.sections.length).toBeGreaterThanOrEqual(3)
    expect(guide.sections.some((section) => (section.checklist?.length ?? 0) >= 4)).toBe(true)
    expect(guide.faqs.length).toBeGreaterThanOrEqual(4)
    expect(guide.sources.length).toBeGreaterThanOrEqual(2)
    expect(guide.related.length).toBeGreaterThanOrEqual(3)
    expect(guide.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(guide.headline).not.toContain('—')
    expect(guide.description).not.toContain('—')
  })

  it('includes every guide exactly once in the blog sitemap', () => {
    const urls = buildBlogUrls('https://growwiseschool.org')
    for (const slug of PARENT_PAIN_GUIDE_SLUGS) {
      const expected = `https://growwiseschool.org/growwise-blogs/${slug}`
      expect(urls.filter(({ loc }) => loc === expected)).toHaveLength(1)
    }
  })

  it('allows every guide through the production public-path guard', () => {
    for (const slug of PARENT_PAIN_GUIDE_SLUGS) {
      expect(PUBLIC_SITEMAP_PATHS).toContain(`/growwise-blogs/${slug}`)
    }
  })

  it('includes every guide in the blog index source', () => {
    const indexSource = readFileSync(path.join(ROOT, 'src/app/[locale]/growwise-blogs/page.tsx'), 'utf8')
    expect(indexSource).toContain('PARENT_PAIN_GUIDES.map')
  })

  it('has a project image for every guide', () => {
    for (const guide of PARENT_PAIN_GUIDES) {
      expect(existsSync(path.join(ROOT, 'public', guide.image))).toBe(true)
    }
  })

  it('uses one visible H1 and emits Article and FAQ schema from visible guide data', () => {
    const pageSource = readFileSync(path.join(ROOT, 'src/components/blogs/ParentPainGuidePage.tsx'), 'utf8')
    expect(pageSource.match(/<h1\b/g)).toHaveLength(1)
    expect(pageSource).toContain('generateArticleSchema')
    expect(pageSource).toContain('generateFAQPageSchema([...guide.faqs])')
    expect(pageSource).toContain("'@type': 'BlogPosting'")
  })
})
