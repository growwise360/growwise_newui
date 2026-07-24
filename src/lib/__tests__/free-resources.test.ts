import {
  FREE_RESOURCES,
  matchResourceForCapture,
  normalizeLeadEmail,
  getResourceBySlug,
} from '@/data/free-resources'

describe('free resources data', () => {
  it('loads at least one resource from JSON', () => {
    expect(FREE_RESOURCES.length).toBeGreaterThanOrEqual(1)
  })

  it('normalizes email with trim and lower case', () => {
    expect(normalizeLeadEmail('  Test@EXAMPLE.com \n')).toBe('test@example.com')
  })

  it('getResourceBySlug returns resource when id matches', () => {
    const first = FREE_RESOURCES[0]
    expect(first).toBeDefined()
    expect(getResourceBySlug(first!.id)?.id).toBe(first!.id)
    expect(getResourceBySlug('nonexistent-slug-xyz')).toBeUndefined()
  })

  it('matchResourceForCapture accepts a known id', () => {
    const r = FREE_RESOURCES[0]
    expect(r).toBeDefined()
    const m = matchResourceForCapture(r!.id)
    expect(m?.id).toBe(r!.id)
  })

  it('contains only same-origin download paths and no placeholders', () => {
    for (const resource of FREE_RESOURCES) {
      expect(resource.downloadUrl).toMatch(/^\/(?:assets|downloads)\//)
      expect(resource.downloadUrl).not.toContain('placeholder')
    }
  })

  it('matchResourceForCapture rejects unknown id', () => {
    expect(matchResourceForCapture('unknown-id')).toBeUndefined()
  })
})
