import { CONTACT_INFO } from '@/lib/constants'
import { FROM_NEXTDOOR_COPY, FROM_NEXTDOOR_PATH } from '@/data/from-nextdoor-copy'
import { FROM_NEXTDOOR_FAQS } from '@/data/from-nextdoor-faqs'
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'

const LOCAL_BUSINESS_ID_SUFFIX = '#localbusiness'

export function buildFromNextdoorLocalBusinessSchema(baseUrl: string, pageUrl?: string) {
  const resolvedPageUrl = pageUrl ?? `${baseUrl}${FROM_NEXTDOOR_PATH}`

  return {
    '@type': 'EducationalOrganization',
    '@id': `${resolvedPageUrl}${LOCAL_BUSINESS_ID_SUFFIX}`,
    name: 'GrowWise School — Dublin, CA',
    url: resolvedPageUrl,
    description: 'Trusted by Dublin families for Grades 3–12 tutoring and STEAM enrichment.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.street,
      addressLocality: 'Dublin',
      addressRegion: 'CA',
      postalCode: CONTACT_INFO.zipCode,
      addressCountry: 'US',
    },
    telephone: '+19254564606',
  }
}

export function buildFromNextdoorPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(FROM_NEXTDOOR_PATH, locale, baseUrl)
  const localBusinessId = `${pageUrl}${LOCAL_BUSINESS_ID_SUFFIX}`

  const localBusiness = buildFromNextdoorLocalBusinessSchema(baseUrl, pageUrl)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: FROM_NEXTDOOR_COPY.hero.h1,
    description: FROM_NEXTDOOR_COPY.hero.subtext,
    about: { '@id': localBusinessId },
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const faqPage = {
    ...generateFAQPageSchema([...FROM_NEXTDOOR_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'From Nextdoor', url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, webPage, faqPage, breadcrumbList],
  }
}
