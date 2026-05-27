import {
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_JSONLD_FAQS,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_META,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH,
} from '@/data/resources/khan-academy-summer-doesnt-work'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'

export function buildKhanAcademySummerDoesntWorkPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      headline: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.h1,
      description: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.datePublished,
      dateModified: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Academic',
    keywords: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }

  const faqPage = {
    ...generateFAQPageSchema([...KHAN_ACADEMY_SUMMER_DOESNT_WORK_JSONLD_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbList = {
    ...generateBreadcrumbSchema([
      { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
      { name: 'Parent Guides', url: resourcesUrl },
      { name: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.h1, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage, breadcrumbList],
  }
}
