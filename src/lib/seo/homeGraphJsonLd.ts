import { HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy'
import { generateFAQPageSchema } from '@/lib/seo/structuredData'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const CANONICAL_BASE = getCanonicalSiteUrl()

const { ['@context']: _faqContext, ...faqPageNode } = generateFAQPageSchema(HOME_VISIBLE_FAQS)

export const HOME_GRAPH_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [faqPageNode],
} as const
