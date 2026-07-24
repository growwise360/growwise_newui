import {
  hashRatingVisitor,
  isStudentArticleSlug,
  summarizeRatings,
} from './studentArticleRatings'

describe('student article ratings', () => {
  const originalServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  afterEach(() => {
    if (originalServiceKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceKey
    delete process.env.ARTICLE_RATING_SALT
  })

  it('accepts only published student article slugs', () => {
    expect(isStudentArticleSlug('books-beyond-personality')).toBe(true)
    expect(isStudentArticleSlug('how-recycling-helps-the-environment')).toBe(true)
    expect(isStudentArticleSlug('unknown-article')).toBe(false)
  })

  it('calculates the aggregate and current browser rating', () => {
    expect(
      summarizeRatings(
        [
          { rating: 5, visitor_hash: 'one' },
          { rating: 4, visitor_hash: 'two' },
          { rating: 3, visitor_hash: 'three' },
        ],
        'two',
      ),
    ).toEqual({ average: 4, count: 3, userRating: 4 })
  })

  it('ignores invalid stored values and returns an empty summary', () => {
    expect(summarizeRatings([{ rating: 8, visitor_hash: 'one' }])).toEqual({
      average: null,
      count: 0,
      userRating: null,
    })
  })

  it('hashes the anonymous browser identifier without storing it directly', () => {
    process.env.ARTICLE_RATING_SALT = 'test-only-salt'
    const hash = hashRatingVisitor('browser-id')
    expect(hash).toMatch(/^[a-f0-9]{64}$/)
    expect(hash).not.toContain('browser-id')
  })
})
