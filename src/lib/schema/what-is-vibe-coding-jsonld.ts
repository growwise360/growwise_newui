import {
  WHAT_IS_VIBE_CODING_FAQS,
  WHAT_IS_VIBE_CODING_META,
  WHAT_IS_VIBE_CODING_PATH,
} from '@/data/resources/what-is-vibe-coding-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildWhatIsVibeCodingPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(WHAT_IS_VIBE_CODING_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: WHAT_IS_VIBE_CODING_META.h1,
      description: WHAT_IS_VIBE_CODING_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: WHAT_IS_VIBE_CODING_META.datePublished,
      dateModified: WHAT_IS_VIBE_CODING_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'STEAM & Coding',
    keywords: WHAT_IS_VIBE_CODING_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...WHAT_IS_VIBE_CODING_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: WHAT_IS_VIBE_CODING_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
