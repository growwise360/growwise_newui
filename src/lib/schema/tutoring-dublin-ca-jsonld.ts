import { CONTACT_INFO } from '@/lib/constants'
import {
  TUTORING_DUBLIN_CA_FAQS,
  TUTORING_DUBLIN_CA_META,
  TUTORING_DUBLIN_CA_PATH,
} from '@/data/resources/tutoring-dublin-ca'
import { buildDublinCaLocalBusinessSchema } from '@/lib/schema/dublin-ca-local-business-jsonld'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'

const LOCAL_BUSINESS_ID_SUFFIX = '#localbusiness'

export function buildTutoringDublinCaArticleGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(TUTORING_DUBLIN_CA_PATH, locale, baseUrl)
  const localBusinessId = `${pageUrl}${LOCAL_BUSINESS_ID_SUFFIX}`

  const localBusiness = {
    ...buildDublinCaLocalBusinessSchema(baseUrl, pageUrl),
    '@id': localBusinessId,
    email: CONTACT_INFO.email,
    description:
      'K-12 academic tutoring and STEAM programs in Dublin, CA. Math, English, coding, AI, and SAT prep. In-person and live online.',
    priceRange: '$$',
    areaServed: ['Dublin CA', 'Pleasanton CA', 'San Ramon CA', 'Livermore CA', 'Tri-Valley CA'],
  }

  const faqPage = {
    ...generateFAQPageSchema([...TUTORING_DUBLIN_CA_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const article = {
    ...generateArticleSchema({
      headline: TUTORING_DUBLIN_CA_META.h1,
      description: TUTORING_DUBLIN_CA_META.description,
      url: pageUrl,
      author: { name: 'GrowWise School', type: 'Organization' },
      datePublished: TUTORING_DUBLIN_CA_META.datePublished,
      dateModified: TUTORING_DUBLIN_CA_META.dateModified,
    }),
    '@id': `${pageUrl}#article`,
    articleSection: 'Local tutoring',
    keywords: TUTORING_DUBLIN_CA_META.keywords,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    about: { '@id': localBusinessId },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, article, faqPage],
  }
}
