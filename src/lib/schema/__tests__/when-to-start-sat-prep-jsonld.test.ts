import { WHEN_TO_START_SAT_PREP_JSONLD_FAQS } from '@/data/resources/when-to-start-sat-prep'
import {
  buildWhenToStartSatPrepPageGraphSchema,
} from '@/lib/schema/when-to-start-sat-prep-jsonld'

const BASE_URL = 'https://www.growwiseschool.org'

describe('when-to-start-sat-prep-jsonld', () => {
  describe('buildWhenToStartSatPrepPageGraphSchema', () => {
    const graph = buildWhenToStartSatPrepPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
    const nodes = graph['@graph'] as Array<Record<string, unknown>>

    it('emits Article, FAQPage, and BreadcrumbList in @graph', () => {
      expect(graph['@context']).toBe('https://schema.org')
      expect(nodes).toHaveLength(3)
      expect(nodes.map((n) => n['@type'])).toEqual(['BlogPosting', 'FAQPage', 'BreadcrumbList'])
    })

    it('includes all 5 JSON-LD FAQs from the user brief', () => {
      const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
      const mainEntity = faqNode.mainEntity as Array<{
        name: string
        acceptedAnswer: { text: string }
      }>

      expect(mainEntity).toHaveLength(5)
      expect(mainEntity.map((q) => q.name)).toContain('Is Grade 8 too early to start SAT prep?')
      expect(mainEntity.map((q) => q.name)).toContain('What is the difference between the PSAT and the SAT?')

      WHEN_TO_START_SAT_PREP_JSONLD_FAQS.forEach((faq) => {
        const node = mainEntity.find((item) => item.name === faq.question)
        expect(node?.acceptedAnswer.text).toBe(faq.answer)
      })
    })
  })
})
