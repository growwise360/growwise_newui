import {
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_FAQS,
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META,
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH,
} from '@/data/resources/mathnasium-alternative-dublin-pleasanton'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildMathnasiumAlternativeDublinPleasantonPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.h1,
      description: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.datePublished,
      dateModified: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local Resource',
    keywords: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.keywords,
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
    ...generateFAQPageSchema([...MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: 'Mathnasium Alternative in Dublin & Pleasanton', url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
