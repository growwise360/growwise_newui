import { LEGACY_PATH_REDIRECTS } from '../legacy-path-redirects'
import { getCanonicalPathAlias } from '../canonical-path-aliases'

describe('LEGACY_PATH_REDIRECTS', () => {
  it('includes math-courses Dublin legacy slug', () => {
    const entry = LEGACY_PATH_REDIRECTS.find(
      (r) => r.from === '/math-courses-in-dublin-ca-growwise',
    )
    expect(entry?.to).toBe('/academic/math')
  })

  it('redirects legacy courses math hub to academic math', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/courses/math')
    expect(entry?.to).toBe('/academic/math')
  })

  it('redirects legacy courses high-school-math to academic math high school', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/courses/high-school-math')
    expect(entry?.to).toBe('/academic/math/high-school')
  })

  it('redirects legacy courses english to academic english', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/courses/english')
    expect(entry?.to).toBe('/academic/english')
  })

  it('redirects math-tutoring-dublin-ca to dublin-ca', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/math-tutoring-dublin-ca')
    expect(entry?.to).toBe('/dublin-ca')
  })

  it('canonicalizes legacy paths before generic slash or locale redirects', () => {
    expect(getCanonicalPathAlias('/math-courses-in-dublin-ca-growwise/')).toBe('/academic/math')
    expect(getCanonicalPathAlias('/en/courses/math')).toBe('/academic/math')
    expect(getCanonicalPathAlias('/en/growwise-blogs')).toBe('/growwise-blogs')
    expect(getCanonicalPathAlias('/en')).toBe('/')
  })
})
