import robots from '@/app/robots'

/** TC-07 — robots.txt policy (merged static + programmatic rules). */
describe('robots() — GWA-192 / TC-07', () => {
  it('explicitly allows AI search bots while keeping crawl exceptions', () => {
    const r = robots()
    expect(r.sitemap).toMatch(/sitemap\.xml$/)

    const rules = r.rules
    if (!Array.isArray(rules)) {
      throw new Error('Expected explicit AI and wildcard rules')
    }
    expect(rules).toHaveLength(2)
    expect(rules[0].userAgent).toEqual([
      'OAI-SearchBot',
      'ChatGPT-User',
      'PerplexityBot',
      'Perplexity-User',
      'Bingbot',
    ])
    expect(rules[0].allow).toEqual(['/'])
    expect(rules[0].disallow).toEqual([
      '/favicon.ico',
      '/student-login',
      '/cart',
    ])
    expect(rules[1]).toEqual({
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/favicon.ico',
        '/student-login',
        '/cart',
      ],
    })
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

  it('keeps GPTBot allowed through the wildcard policy', () => {
    const serialized = JSON.stringify(robots())
    expect(serialized).not.toContain('GPTBot')
  })
})
