import {
  RSM_ALTERNATIVE_DUBLIN_CA_FAQS,
  RSM_ALTERNATIVE_DUBLIN_CA_META,
  RSM_ALTERNATIVE_DUBLIN_CA_PATH,
} from '@/data/resources/rsm-alternative-dublin-ca'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildRsmAlternativeDublinCaPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(RSM_ALTERNATIVE_DUBLIN_CA_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: RSM_ALTERNATIVE_DUBLIN_CA_META.h1,
      description: RSM_ALTERNATIVE_DUBLIN_CA_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: RSM_ALTERNATIVE_DUBLIN_CA_META.datePublished,
      dateModified: RSM_ALTERNATIVE_DUBLIN_CA_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local Resource',
    keywords: RSM_ALTERNATIVE_DUBLIN_CA_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Anshika Verma',
      jobTitle: 'Founder, GrowWise School',
      url: 'https://growwiseschool.org/about',
    },
  }

  const faqPage = {
    ...generateFAQPageSchema([...RSM_ALTERNATIVE_DUBLIN_CA_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: 'RSM Alternative in Dublin CA', url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
