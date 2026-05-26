import {
  SUMMER_SLIDE_DUBLIN_CA_FAQS,
  SUMMER_SLIDE_DUBLIN_CA_META,
  SUMMER_SLIDE_DUBLIN_CA_PATH,
} from '@/data/resources/summer-slide-dublin-ca'
import { buildSummerSlideDublinCaArticleGraphSchema } from '@/lib/schema/summer-slide-dublin-ca-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('summer-slide-dublin-ca-jsonld', () => {
  const graph = buildSummerSlideDublinCaArticleGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses article headline and page path', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(SUMMER_SLIDE_DUBLIN_CA_META.h1)
    expect(String(article.url)).toContain(SUMMER_SLIDE_DUBLIN_CA_PATH)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(SUMMER_SLIDE_DUBLIN_CA_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain('What is the summer slide?')
  })
})
