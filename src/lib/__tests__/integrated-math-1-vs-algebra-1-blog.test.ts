import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BLOG_SLUG = 'integrated-math-1-vs-algebra-1-difference'
const pageSource = fs.readFileSync(
  path.join(ROOT, `src/app/[locale]/growwise-blogs/${BLOG_SLUG}/page.tsx`),
  'utf8',
)
const indexSource = fs.readFileSync(
  path.join(ROOT, 'src/app/[locale]/growwise-blogs/page.tsx'),
  'utf8',
)
const sitemapSource = fs.readFileSync(path.join(ROOT, 'src/lib/seo/sitemapData.ts'), 'utf8')

describe('Integrated Math 1 vs. Algebra 1 parent guide', () => {
  it('uses the requested search metadata and canonical slug', () => {
    expect(pageSource).toContain(
      `Integrated Math 1 vs. Algebra 1: What's the Difference? (Parent Guide)`,
    )
    expect(pageSource).toContain(
      `Confused why your child's math class is called Integrated Math 1 instead of Algebra 1? Here's what's actually different, what's the same, and what to watch for.`,
    )
    expect(pageSource).toContain(`const BLOG_SLUG = '${BLOG_SLUG}'`)
  })

  it('renders exactly five FAQs from the same source used for FAQ schema', () => {
    const faqSection = pageSource.match(
      /export const INTEGRATED_MATH_1_FAQS = \[([\s\S]*?)\] as const/,
    )?.[1]

    expect(faqSection).toBeDefined()
    expect(faqSection?.match(/question:/g)).toHaveLength(5)
    expect(pageSource).toContain('INTEGRATED_MATH_1_FAQS.map')
    expect(pageSource).toContain('generateFAQPageSchema([...INTEGRATED_MATH_1_FAQS])')
  })

  it('uses canonical internal destinations and one conversion CTA', () => {
    expect(pageSource).toContain("publicPath('/academic/math', locale)")
    expect(pageSource).toContain("publicPath('/academic/math/high-school', locale)")
    expect(pageSource.match(/publicPath\('\/book-assessment', locale\)/g)).toHaveLength(1)
    expect(pageSource).not.toContain("publicPath('/courses/math'")
    expect(pageSource).not.toContain("publicPath('/courses/high-school-math'")
  })

  it('is listed in both the blog index and blog sitemap source', () => {
    const path = `/growwise-blogs/${BLOG_SLUG}`
    expect(indexSource).toContain(`href: '${path}'`)
    expect(sitemapSource).toContain(`'${path}'`)
  })

  it('avoids unsupported superiority and outcome claims', () => {
    expect(pageSource).not.toMatch(/guarantee|best math pathway|better pathway|college advantage/i)
  })
})
