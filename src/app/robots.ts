import { MetadataRoute } from 'next'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

/** Crawl policy — merged from former public/robots.txt + app route defaults. */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/en/',
        '/hi/',
        '/zh/',
        '/es/',
        '/*?*',
        '/favicon.ico',
        '/student-login',
        '/cart',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
