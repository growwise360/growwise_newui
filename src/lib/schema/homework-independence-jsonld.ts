import {
  HOMEWORK_INDEPENDENCE_FAQS,
  HOMEWORK_INDEPENDENCE_META,
  HOMEWORK_INDEPENDENCE_PATH,
} from '@/data/resources/homework-independence-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildHomeworkIndependencePageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(HOMEWORK_INDEPENDENCE_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: HOMEWORK_INDEPENDENCE_META.h1,
      description: HOMEWORK_INDEPENDENCE_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: HOMEWORK_INDEPENDENCE_META.datePublished,
      dateModified: HOMEWORK_INDEPENDENCE_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic',
    keywords: HOMEWORK_INDEPENDENCE_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...HOMEWORK_INDEPENDENCE_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: HOMEWORK_INDEPENDENCE_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
