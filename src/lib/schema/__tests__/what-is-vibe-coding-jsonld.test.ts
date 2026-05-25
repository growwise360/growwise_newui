import {
  WHAT_IS_VIBE_CODING_FAQS,
  WHAT_IS_VIBE_CODING_META,
  WHAT_IS_VIBE_CODING_PATH,
} from '@/data/resources/what-is-vibe-coding-copy'
import { buildWhatIsVibeCodingPageGraphSchema } from '@/lib/schema/what-is-vibe-coding-jsonld'

const BASE_URL = 'https://www.growwiseschool.org'

describe('what-is-vibe-coding-jsonld', () => {
  const graph = buildWhatIsVibeCodingPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
  })

  it('uses article headline and page path', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    expect(article.headline).toBe(WHAT_IS_VIBE_CODING_META.h1)
    expect(String(article.url)).toContain(WHAT_IS_VIBE_CODING_PATH)
  })

  it('includes all 5 FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity).toHaveLength(WHAT_IS_VIBE_CODING_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toContain(
      'What is the difference between vibe coding and AI-assisted coding?',
    )
  })
})
