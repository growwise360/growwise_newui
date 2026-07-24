import {
  READING_FLUENCY_VS_COMPREHENSION_FAQS,
  READING_FLUENCY_VS_COMPREHENSION_META,
  READING_FLUENCY_VS_COMPREHENSION_PATH,
} from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildReadingFluencyVsComprehensionPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(READING_FLUENCY_VS_COMPREHENSION_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: READING_FLUENCY_VS_COMPREHENSION_META.h1,
      description: READING_FLUENCY_VS_COMPREHENSION_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: READING_FLUENCY_VS_COMPREHENSION_META.datePublished,
      dateModified: '2026-07-06',
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic',
    keywords: READING_FLUENCY_VS_COMPREHENSION_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    wordCount: 1200,
    author: {
      '@type': 'Person',
      name: 'Anshika Verma',
      jobTitle: 'Founder, GrowWise School',
      url: 'https://growwiseschool.org/about',
    },
  }

  const faqPage = {
    ...generateFAQPageSchema([...READING_FLUENCY_VS_COMPREHENSION_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: READING_FLUENCY_VS_COMPREHENSION_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
