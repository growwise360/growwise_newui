import { describe, expect, it } from '@jest/globals'
import { ONLINE_SCIENCE_COURSES } from '@/data/online-science-courses'
import { PUBLIC_SITEMAP_PATHS } from '@/lib/seo/public-paths'
import { buildPagesUrls } from '@/lib/seo/sitemapData'

const onlinePaths = [
  '/online-tutoring',
  '/pricing',
  ...ONLINE_SCIENCE_COURSES.map(({ slug }) => `/academic/science/${slug}`),
]

describe('online launch paths admitted by the public-route guard', () => {
  it.each(onlinePaths)('%s is reachable and has one pages-sitemap entry', (path) => {
    expect(PUBLIC_SITEMAP_PATHS).toContain(path)
    const urls = buildPagesUrls('https://growwiseschool.org', '2026-11-06')
    expect(urls.filter(({ loc }) => loc === `https://growwiseschool.org${path}`)).toHaveLength(1)
  })
})
