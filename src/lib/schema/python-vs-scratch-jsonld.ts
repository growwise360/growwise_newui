import {
  PYTHON_VS_SCRATCH_FAQS,
  PYTHON_VS_SCRATCH_META,
  PYTHON_VS_SCRATCH_PATH,
} from '@/data/resources/python-vs-scratch-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildPythonVsScratchPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(PYTHON_VS_SCRATCH_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: PYTHON_VS_SCRATCH_META.h1,
      description: PYTHON_VS_SCRATCH_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: PYTHON_VS_SCRATCH_META.datePublished,
      dateModified: PYTHON_VS_SCRATCH_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'STEAM & Coding',
    keywords: PYTHON_VS_SCRATCH_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...PYTHON_VS_SCRATCH_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: PYTHON_VS_SCRATCH_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
