import {
  WHEN_TO_START_SAT_PREP_JSONLD_FAQS,
  WHEN_TO_START_SAT_PREP_META,
  WHEN_TO_START_SAT_PREP_PATH,
} from '@/data/resources/when-to-start-sat-prep'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildWhenToStartSatPrepPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(WHEN_TO_START_SAT_PREP_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: WHEN_TO_START_SAT_PREP_META.h1,
      description: WHEN_TO_START_SAT_PREP_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: WHEN_TO_START_SAT_PREP_META.datePublished,
      dateModified: '2026-07-06',
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'SAT Prep',
    keywords: WHEN_TO_START_SAT_PREP_META.keywords,
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
    ...generateFAQPageSchema([...WHEN_TO_START_SAT_PREP_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: WHEN_TO_START_SAT_PREP_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
