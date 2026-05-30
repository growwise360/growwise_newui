import {
  WHY_GROWWISE_DESCRIPTION,
  WHY_GROWWISE_FAQS,
  WHY_GROWWISE_PATH,
  WHY_GROWWISE_TITLE,
} from '@/data/resources/why-growwise-copy'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildWhyGrowWisePageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(WHY_GROWWISE_PATH, locale, baseUrl)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: WHY_GROWWISE_TITLE,
    description: WHY_GROWWISE_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const faqPage = {
    ...generateFAQPageSchema([...WHY_GROWWISE_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: WHY_GROWWISE_TITLE, url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, faqPage, breadcrumbList],
  }
}
