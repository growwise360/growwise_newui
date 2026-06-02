import {
  IM1_SUMMER_PREP_DUBLIN_CA_JSONLD_FAQS,
  IM1_SUMMER_PREP_DUBLIN_CA_META,
  IM1_SUMMER_PREP_DUBLIN_CA_PATH,
} from '@/data/resources/im1-summer-prep-dublin-ca'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildIM1SummerPrepDublinCAPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(IM1_SUMMER_PREP_DUBLIN_CA_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: IM1_SUMMER_PREP_DUBLIN_CA_META.h1,
      description: IM1_SUMMER_PREP_DUBLIN_CA_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: IM1_SUMMER_PREP_DUBLIN_CA_META.datePublished,
      dateModified: IM1_SUMMER_PREP_DUBLIN_CA_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local',
    keywords: IM1_SUMMER_PREP_DUBLIN_CA_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...IM1_SUMMER_PREP_DUBLIN_CA_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: IM1_SUMMER_PREP_DUBLIN_CA_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
