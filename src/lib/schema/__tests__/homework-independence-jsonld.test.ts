import {
  HOMEWORK_INDEPENDENCE_FAQS,
  HOMEWORK_INDEPENDENCE_META,
  HOMEWORK_INDEPENDENCE_PATH,
} from '@/data/resources/homework-independence-copy'
import { buildHomeworkIndependencePageGraphSchema } from '@/lib/schema/homework-independence-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('homework-independence-jsonld', () => {
  const graph = buildHomeworkIndependencePageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses article headline and page path', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(HOMEWORK_INDEPENDENCE_META.h1)
    expect(String(article.url)).toContain(HOMEWORK_INDEPENDENCE_PATH)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(HOMEWORK_INDEPENDENCE_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain('My child has an IEP — does this system still apply?')
  })
})
