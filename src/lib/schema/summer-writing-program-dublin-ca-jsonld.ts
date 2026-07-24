import {
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_JSONLD_FAQS,
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_META,
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH,
} from '@/data/resources/summer-writing-program-dublin-ca'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildSummerWritingProgramDublinCAPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.h1,
      description: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.datePublished,
      dateModified: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local',
    keywords: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...SUMMER_WRITING_PROGRAM_DUBLIN_CA_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
