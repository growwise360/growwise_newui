import {
  RESOURCE_FILTERS,
  RESOURCE_GUIDES,
  resourceCategoryTagClass,
} from '@/data/resources-hub'

describe('resources-hub categories', () => {
  it('includes Summer Learning and STEM filters', () => {
    const filterIds = RESOURCE_FILTERS.map((filter) => filter.id)
    expect(filterIds).toContain('summer-learning')
    expect(filterIds).toContain('stem')
    expect(filterIds).not.toContain('steam')
  })

  it('tags six summer guides as summer-learning', () => {
    const summerGuides = RESOURCE_GUIDES.filter((guide) => guide.category === 'summer-learning')
    expect(summerGuides).toHaveLength(7)
    expect(summerGuides.every((guide) => guide.categoryLabel === 'SUMMER LEARNING')).toBe(true)
  })

  it('tags coding guides as STEM', () => {
    const stemGuides = RESOURCE_GUIDES.filter((guide) => guide.category === 'stem')
    expect(stemGuides).toHaveLength(2)
    expect(stemGuides.map((guide) => guide.id)).toEqual(
      expect.arrayContaining(['what-is-vibe-coding', 'python-vs-scratch']),
    )
  })

  it('styles summer-learning and stem category tags', () => {
    expect(resourceCategoryTagClass('summer-learning')).toContain('amber')
    expect(resourceCategoryTagClass('stem')).toContain('F16112')
  })
})
