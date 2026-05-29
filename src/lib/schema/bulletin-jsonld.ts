import { BULLETIN_COPY, BULLETIN_DESCRIPTION, BULLETIN_PATH } from '@/data/bulletin-copy'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'

export function buildBulletinPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(BULLETIN_PATH, locale, baseUrl)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: BULLETIN_COPY.hero.h1,
    description: BULLETIN_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'GrowWise Bulletin', url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumbList],
  }
}
