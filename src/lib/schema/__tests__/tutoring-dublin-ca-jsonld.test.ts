import { CONTACT_INFO } from '@/lib/constants'
import {
  TUTORING_DUBLIN_CA_FAQS,
  TUTORING_DUBLIN_CA_PATH,
} from '@/data/resources/tutoring-dublin-ca'
import { buildTutoringDublinCaArticleGraphSchema } from '@/lib/schema/tutoring-dublin-ca-jsonld'

const BASE_URL = 'https://www.growwiseschool.org'

describe('tutoring-dublin-ca-jsonld', () => {
  const graph = buildTutoringDublinCaArticleGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits LocalBusiness + FAQPage @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(2)
    expect(nodes.map((n) => n['@type'])).toEqual(['LocalBusiness', 'FAQPage'])
  })

  it('reuses Dublin LocalBusiness address and contact fields', () => {
    const localBusiness = nodes[0]
    const addr = localBusiness.address as Record<string, unknown>

    expect(localBusiness['@type']).toBe('LocalBusiness')
    expect(localBusiness.telephone).toBe('+19254564606')
    expect(localBusiness.email).toBe(CONTACT_INFO.email)
    expect(localBusiness.priceRange).toBe('$$')
    expect(addr.streetAddress).toBe(CONTACT_INFO.street)
    expect(addr.addressLocality).toBe('Dublin')
    expect(localBusiness.areaServed).toEqual([
      'Dublin CA',
      'Pleasanton CA',
      'San Ramon CA',
      'Livermore CA',
      'Tri-Valley CA',
    ])
    expect(String(localBusiness['@id'])).toContain(TUTORING_DUBLIN_CA_PATH)
  })

  it('includes all six FAQs in FAQPage schema', () => {
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>

    expect(mainEntity).toHaveLength(TUTORING_DUBLIN_CA_FAQS.length)
    expect(mainEntity.map((q) => q.name)).toEqual(TUTORING_DUBLIN_CA_FAQS.map((faq) => faq.question))
  })
})
