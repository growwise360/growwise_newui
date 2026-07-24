import { readFileSync } from 'fs'
import { join } from 'path'

import { buildEducationalOrganizationSchema } from '@/lib/seo/educationalOrganizationSchema'

const APP_LOCALE = join(process.cwd(), 'src', 'app', '[locale]')

/** Section layouts must not duplicate bare Course nodes — Course schema is page-scoped. */
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

  it('site-wide org schema carries no OfferCatalog — Course/Offer markup is page-scoped (SEO audit 2026-07-08)', () => {
    const schema = buildEducationalOrganizationSchema() as Record<string, unknown>
    expect(schema.hasOfferCatalog).toBeUndefined()
    expect(JSON.stringify(schema)).not.toContain('OfferCatalog')
  })
})
