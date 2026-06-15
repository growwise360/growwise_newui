import {
  CARELESS_MATH_MISTAKES_DESCRIPTION,
  CARELESS_MATH_MISTAKES_FAQS,
  CARELESS_MATH_MISTAKES_KEYWORDS,
  CARELESS_MATH_MISTAKES_PATH,
  CARELESS_MATH_MISTAKES_TITLE,
} from '@/data/resources/careless-math-mistakes-copy'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildCarelessMathMistakesPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(CARELESS_MATH_MISTAKES_PATH, locale, baseUrl)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: CARELESS_MATH_MISTAKES_TITLE,
    description: CARELESS_MATH_MISTAKES_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const article = {
    ...generateArticleSchema({
      headline: CARELESS_MATH_MISTAKES_TITLE,
      description: CARELESS_MATH_MISTAKES_DESCRIPTION,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic support',
    keywords: CARELESS_MATH_MISTAKES_KEYWORDS,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...CARELESS_MATH_MISTAKES_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Parent Guides', url: absoluteSiteUrl('/resources', locale, baseUrl) },
    { name: CARELESS_MATH_MISTAKES_TITLE, url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, article, faqPage, breadcrumbList],
  }
}
