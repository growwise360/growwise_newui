import {
  WHY_GRADES_DESCRIPTION,
  WHY_GRADES_FAQS,
  WHY_GRADES_KEYWORDS,
  WHY_GRADES_PATH,
  WHY_GRADES_TITLE,
} from '@/data/resources/why-grades-hide-learning-gaps-copy'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildWhyGradesHideLearningGapsPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(WHY_GRADES_PATH, locale, baseUrl)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: WHY_GRADES_TITLE,
    description: WHY_GRADES_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const article = {
    ...generateArticleSchema({
      headline: WHY_GRADES_TITLE,
      description: WHY_GRADES_DESCRIPTION,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic support',
    keywords: WHY_GRADES_KEYWORDS,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...WHY_GRADES_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Parent Guides', url: absoluteSiteUrl('/resources', locale, baseUrl) },
    { name: WHY_GRADES_TITLE, url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, article, faqPage, breadcrumbList],
  }
}
