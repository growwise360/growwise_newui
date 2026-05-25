import {
  CARELESS_MATH_MISTAKES_DESCRIPTION,
  CARELESS_MATH_MISTAKES_FAQS,
  CARELESS_MATH_MISTAKES_PATH,
  CARELESS_MATH_MISTAKES_TITLE,
} from '@/data/resources/careless-math-mistakes-copy'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildCarelessMathMistakesFaqSchema() {
  return generateFAQPageSchema([...CARELESS_MATH_MISTAKES_FAQS])
}

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
    '@graph': [webPage, faqPage, breadcrumbList],
  }
}
