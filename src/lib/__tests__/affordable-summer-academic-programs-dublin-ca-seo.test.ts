import fs from 'node:fs'
import path from 'node:path'
import {
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META,
} from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import { getMetadataConfig } from '@/lib/seo/metadataConfig'

const UI_ROOT = path.join(__dirname, '..', '..')

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8')
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

describe('affordable-summer-academic-programs-dublin-ca SEO/AEO', () => {
  it('has metadata within length limits', () => {
    const config = getMetadataConfig('/resources/affordable-summer-academic-programs-dublin-ca')
    expect(config).not.toBeNull()
    expect(config!.title.length).toBeLessThanOrEqual(60)
    expect(config!.description.length).toBeLessThanOrEqual(150)
  })

  it('has six FAQs with answers between 40 and 70 words', () => {
    expect(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS).toHaveLength(6)
    for (const faq of AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS) {
      const count = wordCount(faq.answer)
      expect(count).toBeGreaterThanOrEqual(40)
      expect(count).toBeLessThanOrEqual(70)
    }
  })

  it('page component includes required internal links', () => {
    const source = readSource('components/resources/AffordableSummerAcademicProgramsDublinCaPage.tsx')
    expect(source).toContain('/camps/academic-summer-programs-dublin-ca')
    expect(source).toContain('/resources/summer-academic-program-checklist')
    expect(source).toContain('/resources/summer-slide-dublin-ca')
    expect(source).toContain('/resources/tutoring-dublin-ca')
    expect(source).toContain('/book-assessment')
  })

  it('layout injects three JSON-LD scripts', () => {
    const source = readSource(
      'app/[locale]/resources/affordable-summer-academic-programs-dublin-ca/layout.tsx',
    )
    expect(source).toContain('jsonLd.article')
    expect(source).toContain('jsonLd.faq')
    expect(source).toContain('jsonLd.breadcrumb')
    expect(source.match(/application\/ld\+json/g)?.length).toBe(3)
  })

  it('uses Article type in JSON-LD builder', () => {
    const source = readSource('lib/schema/affordable-summer-academic-programs-dublin-ca-jsonld.ts')
    expect(source).toContain("'@type': 'Article'")
    expect(source).not.toContain('BlogPosting')
  })

  it('meta h1 matches article title frontmatter', () => {
    expect(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.h1).toContain('Affordable Summer Academic Programs')
    expect(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.datePublished).toBe('2026-06-08')
  })
})
