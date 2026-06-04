import {
  RESOURCE_FILTERS,
  RESOURCE_GUIDES,
  resourceCategoryTagClass,
} from '@/data/resources-hub'

describe('resources-hub categories', () => {
  it('includes Summer Learning, STEM, and Parent Resources filters', () => {
    const filterIds = RESOURCE_FILTERS.map((filter) => filter.id)
    expect(filterIds).toContain('summer-learning')
    expect(filterIds).toContain('stem')
    expect(filterIds).toContain('parent-resources')
    expect(filterIds).not.toContain('steam')
  })

  it('tags eight summer guides as summer-learning', () => {
    const summerGuides = RESOURCE_GUIDES.filter((guide) => guide.category === 'summer-learning')
    expect(summerGuides).toHaveLength(8)
    expect(summerGuides.every((guide) => guide.categoryLabel === 'SUMMER LEARNING')).toBe(true)
  })

  it('tags parent resources including readiness checklist and self-check', () => {
    const parentResources = RESOURCE_GUIDES.filter((guide) => guide.category === 'parent-resources')
    expect(parentResources).toHaveLength(2)
    expect(parentResources.every((guide) => guide.categoryLabel === 'PARENT RESOURCES')).toBe(true)
    expect(parentResources.map((guide) => guide.id)).toEqual(
      expect.arrayContaining(['math-reading-readiness-checklist', 'self-check']),
    )
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
