import robots from '@/app/robots'

/** TC-07 — robots.txt policy (merged static + programmatic rules). */
describe('robots() — GWA-192 / TC-07', () => {
  it('allows all, keeps crawl exceptions, and disallows legacy/auth/cart paths', () => {
    const r = robots()
    expect(r.sitemap).toMatch(/sitemap\.xml$/)

    const rules = r.rules
    if (Array.isArray(rules)) {
      throw new Error('Expected single rules object for this policy')
    }
    expect(rules.userAgent).toBe('*')
    expect(rules.allow).toEqual([
      '/',
      '/_next/image?*',
      '/growwise-blogs?page=*',
    ])
    expect(rules.disallow).toEqual([
      '/en/',
      '/hi/',
      '/zh/',
      '/es/',
      '/*?*',
      '/favicon.ico',
      '/student-login',
      '/cart',
    ])
  })

  it('does not disallow marketing program paths', () => {
    const serialized = JSON.stringify(robots())
    expect(serialized).not.toContain('/courses/')
    expect(serialized).not.toContain('/steam/')
    expect(serialized).not.toContain('/api/')
  })
})
