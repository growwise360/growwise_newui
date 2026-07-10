import type { Metadata } from 'next'
import {
  RSM_ALTERNATIVE_DUBLIN_CA_META,
  RSM_ALTERNATIVE_DUBLIN_CA_PATH,
} from '@/data/resources/rsm-alternative-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildRsmAlternativeDublinCaPageGraphSchema } from '@/lib/schema/rsm-alternative-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(RSM_ALTERNATIVE_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: RSM_ALTERNATIVE_DUBLIN_CA_META.title,
      description: RSM_ALTERNATIVE_DUBLIN_CA_META.description,
    }
  )
}

export default async function RsmAlternativeDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildRsmAlternativeDublinCaPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
