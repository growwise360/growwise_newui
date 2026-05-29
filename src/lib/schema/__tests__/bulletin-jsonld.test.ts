import { buildBulletinPageGraphSchema } from '@/lib/schema/bulletin-jsonld'

describe('bulletin-jsonld', () => {
  it('builds WebPage graph with breadcrumb', () => {
    const graph = buildBulletinPageGraphSchema('https://growwiseschool.org', 'en')
    expect(graph['@graph']).toHaveLength(2)
    expect(graph['@graph'][0]).toMatchObject({ '@type': 'WebPage' })
    expect(graph['@graph'][1]).toMatchObject({ '@type': 'BreadcrumbList' })
  })
})
