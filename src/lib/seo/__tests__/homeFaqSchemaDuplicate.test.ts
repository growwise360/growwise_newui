import { HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy'
import { countSchemaType, countSchemaTypeInScripts } from '../countJsonLdTypes'
import { HOME_GRAPH_JSON_LD } from '../homeGraphJsonLd'
import { generateFAQPageSchema } from '../structuredData'

/** Pre-fix homepage layout emitted standalone FAQPage + @graph FAQPage. */
function buildLegacyHomeLayoutSchemas() {
  const standaloneFaq = generateFAQPageSchema(HOME_VISIBLE_FAQS)
  return [standaloneFaq, HOME_GRAPH_JSON_LD]
}

/** Current homepage layout: WebPage script + HOME_GRAPH_JSON_LD (@graph includes FAQPage). */
function buildCurrentHomeLayoutSchemas() {
  const webPageSchema = { '@type': 'WebPage' }
  return [webPageSchema, HOME_GRAPH_JSON_LD]
}

describe('homepage FAQPage JSON-LD', () => {
  it('legacy layout emitted two FAQPage nodes (GSC duplicate field)', () => {
    const schemas = buildLegacyHomeLayoutSchemas()
    expect(countSchemaTypeInScripts(schemas, 'FAQPage')).toBe(2)
  })

  it('current layout emits exactly one FAQPage', () => {
    const schemas = buildCurrentHomeLayoutSchemas()
    expect(countSchemaTypeInScripts(schemas, 'FAQPage')).toBe(1)
  })

  it('HOME_GRAPH_JSON_LD FAQ matches visible homepage copy', () => {
    const faqNode = HOME_GRAPH_JSON_LD['@graph'][1]
    expect(faqNode.mainEntity).toHaveLength(HOME_VISIBLE_FAQS.length)
    HOME_VISIBLE_FAQS.forEach((faq, i) => {
      expect(faqNode.mainEntity[i].name).toBe(faq.question)
      expect(faqNode.mainEntity[i].acceptedAnswer.text).toBe(faq.answer)
    })
  })
})
