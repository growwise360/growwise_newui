import { ELEMENTARY_ENGLISH_VISIBLE_FAQS } from '@/lib/schema/elementary-english-faqs'
import fs from 'node:fs'
import path from 'node:path'

const UI_ROOT = path.join(__dirname, '..', '..')

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8')
}

describe('elementary-english-faqs', () => {
  it('exposes seven visible FAQ entries for AEO', () => {
    expect(ELEMENTARY_ENGLISH_VISIBLE_FAQS).toHaveLength(7)
    for (const faq of ELEMENTARY_ENGLISH_VISIBLE_FAQS) {
      expect(faq.question.length).toBeGreaterThan(10)
      expect(faq.answer.length).toBeGreaterThan(40)
    }
  })

  it('keeps FAQ content visible without emitting Google FAQPage JSON-LD', () => {
    const pageSource = readSource('components/ElementaryEnglishPage.tsx')
    const layoutSource = readSource('app/[locale]/academic/english/elementary/layout.tsx')
    const parentLayoutSource = readSource('app/[locale]/academic/english/layout.tsx')
    const englishHubRouteSource = readSource('app/[locale]/academic/english/page.tsx')

    expect(pageSource).toContain('VisibleCourseFAQ')
    expect(pageSource).toContain('ELEMENTARY_ENGLISH_VISIBLE_FAQS')
    expect(layoutSource).not.toContain('FAQSchema')
    expect(layoutSource).not.toContain('ELEMENTARY_ENGLISH_VISIBLE_FAQS')
    expect(parentLayoutSource).not.toContain('FAQSchema')
    expect(parentLayoutSource).not.toContain('ENGLISH_COURSE_MERGED_FAQ_JSONLD')
    expect(englishHubRouteSource).not.toContain('FAQSchema')
    expect(englishHubRouteSource).not.toContain('ENGLISH_COURSE_MERGED_FAQ_JSONLD')
  })
})
