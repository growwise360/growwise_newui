import {
  HOW_TO_CHOOSE_SUMMER_CAMP_FAQS,
  HOW_TO_CHOOSE_SUMMER_CAMP_META,
  HOW_TO_CHOOSE_SUMMER_CAMP_PATH,
} from '@/data/resources/how-to-choose-summer-camp'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildHowToChooseSummerCampArticleGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(HOW_TO_CHOOSE_SUMMER_CAMP_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: HOW_TO_CHOOSE_SUMMER_CAMP_META.h1,
      description: HOW_TO_CHOOSE_SUMMER_CAMP_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: HOW_TO_CHOOSE_SUMMER_CAMP_META.datePublished,
      dateModified: HOW_TO_CHOOSE_SUMMER_CAMP_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Summer Learning',
    keywords: HOW_TO_CHOOSE_SUMMER_CAMP_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...HOW_TO_CHOOSE_SUMMER_CAMP_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: HOW_TO_CHOOSE_SUMMER_CAMP_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
