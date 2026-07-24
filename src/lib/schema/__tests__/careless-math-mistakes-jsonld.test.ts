import {
  CARELESS_MATH_MISTAKES_FAQS,
  CARELESS_MATH_MISTAKES_PATH,
  CARELESS_MATH_MISTAKES_TITLE,
} from '@/data/resources/careless-math-mistakes-copy'
import { buildCarelessMathMistakesPageGraphSchema } from '@/lib/schema/careless-math-mistakes-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('careless-math-mistakes-jsonld', () => {
  const graph = buildCarelessMathMistakesPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits WebPage, BlogPosting, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(4)
    expect(nodes.map((n) => n['@type'])).toEqual(['WebPage', 'BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses page title and path', () => {
    const webPage = nodes.find((n) => n['@type'] === 'WebPage') as Record<string, unknown>
    expect(webPage.name).toBe(CARELESS_MATH_MISTAKES_TITLE)
    expect(String(webPage.url)).toContain(CARELESS_MATH_MISTAKES_PATH)
  })

  it('includes article schema for AI citation context', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(CARELESS_MATH_MISTAKES_TITLE)
    expect(article['@id']).toBe(`${BASE_URL}${CARELESS_MATH_MISTAKES_PATH}#article`)
    expect(article.isAccessibleForFree).toBe(true)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(CARELESS_MATH_MISTAKES_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain(
      'Is careless mistakes in math the same as ADHD or attention issues?',
    )
  })
})
