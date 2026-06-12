import { readFileSync } from 'fs'
import { join } from 'path'

import { buildEducationalOrganizationSchema } from '@/lib/seo/educationalOrganizationSchema'

const APP_LOCALE = join(process.cwd(), 'src', 'app', '[locale]')

/** Section layouts must not duplicate bare Course nodes — org schema covers sitewide catalog. */
const LAYOUTS_WITHOUT_OFFER_CATALOG = [
  'academic/layout.tsx',
  'programs/layout.tsx',
  'steam/layout.tsx',
] as const

describe('layout offer catalog — Rich Results regression', () => {
  it.each(LAYOUTS_WITHOUT_OFFER_CATALOG)(
    '%s does not emit hasOfferCatalog (avoids incomplete Course duplicates)',
    (relativePath) => {
      const source = readFileSync(join(APP_LOCALE, relativePath), 'utf8')
      expect(source).not.toContain('hasOfferCatalog')
    },
  )

  it('site-wide org catalog courses include description, provider, and url', () => {
    const schema = buildEducationalOrganizationSchema() as Record<string, unknown>
    const catalog = schema.hasOfferCatalog as Record<string, unknown>
    const items = catalog.itemListElement as Array<Record<string, unknown>>

    expect(items.length).toBeGreaterThanOrEqual(5)

    for (const offer of items) {
      const course = offer.itemOffered as Record<string, unknown>
      expect(course['@type']).toBe('Course')
      expect(typeof course.description).toBe('string')
      expect((course.description as string).length).toBeGreaterThan(10)
      expect(course.provider).toMatchObject({
        '@type': 'Organization',
        name: 'GrowWise School',
      })
      expect(typeof course.url).toBe('string')
      expect(course.url).toMatch(/^https:\/\//)
    }
  })
})
