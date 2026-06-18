import { CONTACT_INFO } from '@/lib/constants'
import {
  buildDublinCaLocalBusinessSchema,
  buildDublinCaPageGraphSchema,
} from '@/lib/schema/dublin-ca-local-business-jsonld'
import { DUBLIN_CA_FAQS } from '@/data/dublin-ca-faqs'

const BASE_URL = 'https://growwiseschool.org'

describe('dublin-ca-local-business-jsonld', () => {
  describe('buildDublinCaLocalBusinessSchema', () => {
    const schema = buildDublinCaLocalBusinessSchema(BASE_URL) as Record<string, unknown>

    it('uses page-specific LocalBusiness name and contact fields', () => {
      expect(schema['@type']).toBe('LocalBusiness')
      expect(schema.name).toBe('GrowWise School — Dublin, CA')
      expect(schema.telephone).toBe('+19254564606')
      expect(schema.openingHours).toEqual(['Mo-Fr 09:00-19:00', 'Sa 10:00-16:00'])
    })

    it('includes Dublin address from CONTACT_INFO', () => {
      const addr = schema.address as Record<string, unknown>
      expect(addr.streetAddress).toBe(CONTACT_INFO.street)
      expect(addr.addressLocality).toBe('Dublin')
      expect(addr.postalCode).toBe(CONTACT_INFO.zipCode)
    })

    it('includes geo, areaServed, and hasMap', () => {
      expect(schema.geo).toMatchObject({ latitude: 37.7022, longitude: -121.9358 })
      expect(schema.areaServed).toEqual(['Dublin CA', 'Pleasanton CA', 'San Ramon CA', 'Tri-Valley CA'])
      expect(String(schema.hasMap)).toContain('maps.google.com')
    })
  })

  describe('buildDublinCaPageGraphSchema', () => {
    const graph = buildDublinCaPageGraphSchema(BASE_URL, 'en') as Record<string, unknown>
    const nodes = graph['@graph'] as Array<Record<string, unknown>>

    it('references the site-wide organization without duplicating LocalBusiness', () => {
      expect(graph['@context']).toBe('https://schema.org')
      expect(nodes).toHaveLength(3)
      expect(nodes.map((n) => n['@type'])).toEqual(['WebPage', 'FAQPage', 'BreadcrumbList'])
      expect(nodes[0].about).toEqual({ '@id': `${BASE_URL}#organization` })
    })

    it('includes all Dublin FAQs in FAQPage schema', () => {
      const faqNode = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
      const mainEntity = faqNode.mainEntity as Array<Record<string, unknown>>
      expect(mainEntity).toHaveLength(DUBLIN_CA_FAQS.length)
    })
  })
})
