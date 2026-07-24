import {
  BEST_TUTORING_DUBLIN_CA_JSONLD_FAQS,
  BEST_TUTORING_DUBLIN_CA_META,
  BEST_TUTORING_DUBLIN_CA_PATH,
} from '@/data/resources/best-tutoring-dublin-ca'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildBestTutoringDublinCaPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(BEST_TUTORING_DUBLIN_CA_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: BEST_TUTORING_DUBLIN_CA_META.h1,
      description: BEST_TUTORING_DUBLIN_CA_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: BEST_TUTORING_DUBLIN_CA_META.datePublished,
      dateModified: BEST_TUTORING_DUBLIN_CA_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local Resource',
    keywords: BEST_TUTORING_DUBLIN_CA_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    wordCount: 1000,
    author: {
      '@type': 'Person',
      name: 'Anshika Verma',
      jobTitle: 'Founder, GrowWise School',
      url: 'https://growwiseschool.org/about',
    },
  }

  const faqPage = {
    ...generateFAQPageSchema([...BEST_TUTORING_DUBLIN_CA_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: 'Best Tutoring in Dublin CA', url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
