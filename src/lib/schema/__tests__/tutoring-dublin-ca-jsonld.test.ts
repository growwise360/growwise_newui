import { CONTACT_INFO } from '@/lib/constants'
import {
  TUTORING_DUBLIN_CA_FAQS,
  TUTORING_DUBLIN_CA_META,
  TUTORING_DUBLIN_CA_PATH,
} from '@/data/resources/tutoring-dublin-ca'
import { buildTutoringDublinCaArticleGraphSchema } from '@/lib/schema/tutoring-dublin-ca-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('tutoring-dublin-ca-jsonld', () => {
  const graph = buildTutoringDublinCaArticleGraphSchema(BASE_URL, 'en') as Record<string, unknown>
  const nodes = graph['@graph'] as Array<Record<string, unknown>>

  it('emits LocalBusiness, BlogPosting, and FAQPage @graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(nodes).toHaveLength(3)
    expect(nodes.map((n) => n['@type'])).toEqual(['LocalBusiness', 'BlogPosting', 'FAQPage'])
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

  it('includes article schema connected to the local business', () => {
    const article = nodes.find((n) => n['@type'] === 'BlogPosting') as Record<string, unknown>
    const about = article.about as Record<string, unknown>

    expect(article.headline).toBe(TUTORING_DUBLIN_CA_META.h1)
    expect(article.datePublished).toBe(TUTORING_DUBLIN_CA_META.datePublished)
    expect(article.isAccessibleForFree).toBe(true)
    expect(about['@id']).toBe(`${BASE_URL}${TUTORING_DUBLIN_CA_PATH}#localbusiness`)
  })
})
