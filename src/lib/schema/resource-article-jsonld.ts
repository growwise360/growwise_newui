import type { ResourceArticleFaq, ResourceArticleMeta } from '@/data/resources/types'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

type ResourceArticleJsonLdInput = {
  path: string
  meta: ResourceArticleMeta
  faqs: readonly ResourceArticleFaq[]
  articleSection: string
}

export function buildResourceArticleGraphSchema(
  { path, meta, faqs, articleSection }: ResourceArticleJsonLdInput,
  baseUrl: string,
  locale: string,
) {
  const pageUrl = absoluteSiteUrl(path, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: meta.h1,
      description: meta.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: meta.datePublished,
      dateModified: meta.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection,
    keywords: meta.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...faqs]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: meta.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}

