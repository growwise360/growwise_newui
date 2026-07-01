import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

afterEach(() => {
  if (ORIGINAL_SITE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL
  }
})

describe('getCanonicalSiteUrl', () => {
  it('normalizes www production URLs to the non-www canonical origin', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.growwiseschool.org'

    expect(getCanonicalSiteUrl()).toBe('https://growwiseschool.org')
  })

  it('keeps the production non-www origin without a trailing slash', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://growwiseschool.org/'

    expect(getCanonicalSiteUrl()).toBe('https://growwiseschool.org')
  })
})
