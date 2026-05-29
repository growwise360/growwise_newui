import {
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_JSONLD_FAQS,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH,
} from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'

export function buildAffordableSummerArticleJsonLd(baseUrl: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.h1,
    description: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.description,
    author: {
      '@type': 'Organization',
      name: 'GrowWise',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GrowWise',
      url: baseUrl,
    },
    datePublished: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.datePublished,
    dateModified: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  }
}

export function buildAffordableSummerFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_JSONLD_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildAffordableSummerBreadcrumbJsonLd(
  baseUrl: string,
  resourcesUrl: string,
  pageUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: resourcesUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.h1,
        item: pageUrl,
      },
    ],
  }
}

export function buildAffordableSummerAcademicProgramsDublinCaJsonLd(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH, locale, baseUrl)
  const resourcesUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  return {
    article: buildAffordableSummerArticleJsonLd(baseUrl, pageUrl),
    faq: buildAffordableSummerFaqJsonLd(),
    breadcrumb: buildAffordableSummerBreadcrumbJsonLd(baseUrl, resourcesUrl, pageUrl),
  }
}
