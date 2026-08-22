import { RESOURCES_PATH } from '@/data/resources-hub'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export function buildResourcesHubCollectionSchema(locale: string) {
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(RESOURCES_PATH, locale, baseUrl)

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Parent Guides & Resources',
    description:
      'Free guides for parents on Grades 3–12 academic struggles, coding for kids, and SAT prep',
    url: pageUrl,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: baseUrl,
    },
  }
}
