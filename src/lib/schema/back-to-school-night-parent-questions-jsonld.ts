import {
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_JSONLD_FAQS,
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META,
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH,
} from '@/data/resources/back-to-school-night-parent-questions'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildBackToSchoolNightParentQuestionsPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.h1,
      description: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.datePublished,
      dateModified: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Parent Guide',
    keywords: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    wordCount: 900,
    author: {
      '@type': 'Person',
      name: 'Anshika Verma',
      jobTitle: 'Founder, GrowWise School',
      url: 'https://growwiseschool.org/about',
    },
  }

  const faqPage = {
    ...generateFAQPageSchema([...BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: 'Questions to Ask at Back-to-School Night', url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
