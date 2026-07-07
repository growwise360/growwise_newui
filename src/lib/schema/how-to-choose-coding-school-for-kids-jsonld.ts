import {
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_JSONLD_FAQS,
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META,
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH,
} from '@/data/resources/how-to-choose-coding-school-for-kids'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildHowToChooseCodingSchoolForKidsPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.h1,
      description: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.description,
      url: pageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.datePublished,
      dateModified: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Coding & STEAM',
    keywords: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.keywords,
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
    ...generateFAQPageSchema([...HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: 'How to Choose a Coding School for Your Child', url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
