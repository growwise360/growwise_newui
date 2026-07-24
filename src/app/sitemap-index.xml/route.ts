import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { getChildSitemaps, latestLastmod, renderSitemapIndex } from '@/lib/seo/sitemapData'

/** Internal sitemap index route. `/sitemap.xml` rewrites here on Vercel. */
export async function GET(): Promise<Response> {
  const baseUrl = getCanonicalSiteUrl()
  const xml = renderSitemapIndex(getChildSitemaps(baseUrl, latestLastmod()))

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const dynamic = 'force-dynamic'
