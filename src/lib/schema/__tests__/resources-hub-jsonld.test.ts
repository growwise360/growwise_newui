import { buildResourcesHubCollectionSchema } from '@/lib/schema/resources-hub-jsonld'

const BASE_URL = 'https://growwiseschool.org'

describe('resources-hub-jsonld', () => {
  it('emits CollectionPage schema with EducationalOrganization publisher', () => {
    const schema = buildResourcesHubCollectionSchema('en') as Record<string, unknown>

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('CollectionPage')
    expect(schema.name).toBe('Parent Guides & Resources')
    expect(String(schema.url)).toContain('/resources')
    expect(schema.publisher).toMatchObject({
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: BASE_URL,
    })
  })
})
