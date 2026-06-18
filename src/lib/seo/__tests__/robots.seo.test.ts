import robots from '@/app/robots'

/** TC-07 — robots.txt policy (merged static + programmatic rules). */
describe('robots() — GWA-192 / TC-07', () => {
  it('allows all, keeps crawl exceptions, and does not block locale redirect paths', () => {
    const r = robots()
    expect(r.sitemap).toMatch(/sitemap\.xml$/)

    const rules = r.rules
    if (Array.isArray(rules)) {
      throw new Error('Expected single rules object for this policy')
    }
    expect(rules.userAgent).toBe('*')
    expect(rules.allow).toEqual(['/'])
    expect(rules.disallow).toEqual([
      '/favicon.ico',
      '/student-login',
      '/cart',
    ])
  })

  it('does not disallow retired locale prefixes so Googlebot can follow redirects', () => {
    const serialized = JSON.stringify(robots())
    expect(serialized).not.toContain('/en/')
    expect(serialized).not.toContain('/hi/')
    expect(serialized).not.toContain('/zh/')
    expect(serialized).not.toContain('/es/')
  })

  it('does not disallow marketing program paths', () => {
    const serialized = JSON.stringify(robots())
    expect(serialized).not.toContain('/courses/')
    expect(serialized).not.toContain('/steam/')
    expect(serialized).not.toContain('/api/')
  })
})
