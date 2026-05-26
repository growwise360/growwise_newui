import {
  READING_FLUENCY_VS_COMPREHENSION_FAQS,
  READING_FLUENCY_VS_COMPREHENSION_META,
  READING_FLUENCY_VS_COMPREHENSION_PATH,
} from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { buildReadingFluencyVsComprehensionPageGraphSchema } from '@/lib/schema/reading-fluency-vs-comprehension-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('reading-fluency-vs-comprehension-jsonld', () => {
  const graph = buildReadingFluencyVsComprehensionPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses article headline and page path', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(READING_FLUENCY_VS_COMPREHENSION_META.h1)
    expect(String(article.url)).toContain(READING_FLUENCY_VS_COMPREHENSION_PATH)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(READING_FLUENCY_VS_COMPREHENSION_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain(
      'What is the difference between reading fluency and reading comprehension?',
    )
  })
})
