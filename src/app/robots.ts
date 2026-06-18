import { MetadataRoute } from 'next'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

/** Crawl policy — merged from former public/robots.txt + app route defaults. */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      // Do not disallow /en/, /hi/, /zh/, /es/ — middleware 301s those to prefix-free
      // English URLs; Googlebot must fetch them to process redirects (.cursor/SEO.md §5).
      disallow: [
        '/favicon.ico',
        '/student-login',
        '/cart',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
