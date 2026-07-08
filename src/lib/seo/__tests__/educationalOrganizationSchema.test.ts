import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'
import { buildEducationalOrganizationSchema } from '@/lib/seo/educationalOrganizationSchema'

/** TC-09 — JSON-LD shape (automated); Rich Results UI remains manual. */
describe('buildEducationalOrganizationSchema — GWA-192 / TC-09', () => {
  const schema = buildEducationalOrganizationSchema() as Record<string, unknown>

  it('uses EducationalOrganization + LocalBusiness and GrowWise name', () => {
    expect(schema['@type']).toEqual(['EducationalOrganization', 'LocalBusiness'])
    expect(schema.name).toBe('GrowWise')
  })

  it('declares the #organization @id that per-page Course provider references depend on', () => {
    expect(schema['@id']).toBe('https://growwiseschool.org#organization')
  })

  it('excludes self-serving AggregateRating and sitewide OfferCatalog (SEO audit 2026-07-08)', () => {
    expect(schema.aggregateRating).toBeUndefined()
    expect(schema.hasOfferCatalog).toBeUndefined()
    expect(JSON.stringify(schema)).not.toContain('AggregateRating')
    expect(JSON.stringify(schema)).not.toContain('OfferCatalog')
  })

  it('includes knowsAbout and expanded sameAs entity profiles', () => {
    expect(Array.isArray(schema.knowsAbout)).toBe(true)
    expect((schema.knowsAbout as unknown[]).length).toBeGreaterThanOrEqual(5)
    const sameAs = schema.sameAs as string[]
    expect(sameAs.length).toBeGreaterThanOrEqual(6)
    expect(sameAs.some((u) => u.includes('facebook.com'))).toBe(true)
    expect(sameAs.some((u) => u.includes('instagram.com'))).toBe(true)
    expect(sameAs.some((u) => u.includes('linkedin.com'))).toBe(true)
    expect(sameAs.some((u) => u.includes('yelp.com/biz/growwise-dublin'))).toBe(true)
    expect(sameAs.some((u) => u.includes('nextdoor.com/pages/growwise-dublin-ca-1'))).toBe(true)
    expect(sameAs.some((u) => u.includes('crunchbase.com/organization/growwise-339a'))).toBe(true)
  })

  it('uses CONTACT_INFO for telephone (single source of truth)', () => {
    expect(schema.telephone).toBe(CONTACT_INFO.phone)
  })

  it('uses canonical office hours from the shared constants', () => {
    expect(schema.openingHours).toEqual([...OFFICE_HOURS.schema])
  })

  it('includes Dublin street address and geo', () => {
    const addr = schema.address as Record<string, unknown>
    expect(addr.streetAddress).toBe(CONTACT_INFO.street)
    expect(addr.addressLocality).toBe('Dublin')
    const geo = schema.geo as Record<string, unknown>
    expect(typeof geo.latitude).toBe('number')
    expect(typeof geo.longitude).toBe('number')
  })

  it('contains no Course or Offer markup — course schema is page-scoped, not sitewide', () => {
    const serialized = JSON.stringify(schema)
    expect(serialized).not.toContain('"Course"')
    expect(serialized).not.toContain('"Offer"')
  })
})
