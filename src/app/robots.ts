import { MetadataRoute } from 'next'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const CRAWL_EXCEPTIONS = [
  '/favicon.ico',
  '/student-login',
  '/cart',
]

const AI_SEARCH_USER_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Bingbot',
]

/** Crawl policy — merged from former public/robots.txt + app route defaults. */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalSiteUrl()

  return {
    rules: [
      {
        // Explicit search/citation access for common answer-engine crawlers.
        userAgent: AI_SEARCH_USER_AGENTS,
        allow: ['/'],
        disallow: CRAWL_EXCEPTIONS,
      },
      {
        userAgent: '*',
        allow: ['/'],
        // Do not disallow /en/, /hi/, /zh/, /es/ — middleware 301s those to
        // prefix-free English URLs so crawlers can process the redirects.
        disallow: CRAWL_EXCEPTIONS,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
