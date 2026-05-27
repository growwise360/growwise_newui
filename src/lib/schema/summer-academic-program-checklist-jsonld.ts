import {
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_JSONLD_FAQS,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH,
} from '@/data/resources/summer-academic-program-checklist'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildSummerAcademicProgramChecklistPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.h1,
      description: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.datePublished,
      dateModified: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic',
    keywords: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...SUMMER_ACADEMIC_PROGRAM_CHECKLIST_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
