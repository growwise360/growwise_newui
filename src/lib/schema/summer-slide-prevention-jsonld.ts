import {
  SUMMER_SLIDE_PREVENTION_JSONLD_FAQS,
  SUMMER_SLIDE_PREVENTION_META,
  SUMMER_SLIDE_PREVENTION_PATH,
} from '@/data/resources/summer-slide-prevention'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildSummerSlidePreventionPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(SUMMER_SLIDE_PREVENTION_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: SUMMER_SLIDE_PREVENTION_META.h1,
      description: SUMMER_SLIDE_PREVENTION_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: SUMMER_SLIDE_PREVENTION_META.datePublished,
      dateModified: SUMMER_SLIDE_PREVENTION_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic',
    keywords: SUMMER_SLIDE_PREVENTION_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...SUMMER_SLIDE_PREVENTION_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: SUMMER_SLIDE_PREVENTION_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
