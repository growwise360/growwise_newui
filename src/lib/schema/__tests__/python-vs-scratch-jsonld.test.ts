import {
  PYTHON_VS_SCRATCH_FAQS,
  PYTHON_VS_SCRATCH_META,
  PYTHON_VS_SCRATCH_PATH,
} from '@/data/resources/python-vs-scratch-copy'
import { buildPythonVsScratchPageGraphSchema } from '@/lib/schema/python-vs-scratch-jsonld'

const BASE_URL = 'https://www.growwiseschool.org'

describe('python-vs-scratch-jsonld', () => {
  const graph = buildPythonVsScratchPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses article headline and page path', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(PYTHON_VS_SCRATCH_META.h1)
    expect(String(article.url)).toContain(PYTHON_VS_SCRATCH_PATH)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(PYTHON_VS_SCRATCH_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain('What can Scratch not do that Python can?')
  })

  it('matches FAQ accordion answers to JSON-LD acceptedAnswer text', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<{
      name: string
      acceptedAnswer: { text: string }
    }>

    PYTHON_VS_SCRATCH_FAQS.forEach((faq) => {
      const node = mainEntity.find((item) => item.name === faq.question)
      expect(node?.acceptedAnswer.text).toBe(faq.answer)
    })
  })
})
