import { LEGACY_PATH_REDIRECTS } from '../legacy-path-redirects'

describe('LEGACY_PATH_REDIRECTS', () => {
  it('includes math-courses Dublin legacy slug', () => {
    const entry = LEGACY_PATH_REDIRECTS.find(
      (r) => r.from === '/math-courses-in-dublin-ca-growwise',
    )
    expect(entry?.to).toBe('/courses/math')
  })
})
