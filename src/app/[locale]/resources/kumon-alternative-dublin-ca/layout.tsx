import type { Metadata } from 'next'
import {
  KUMON_ALTERNATIVE_DUBLIN_CA_META,
  KUMON_ALTERNATIVE_DUBLIN_CA_PATH,
} from '@/data/resources/kumon-alternative-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildKumonAlternativeDublinCaPageGraphSchema } from '@/lib/schema/kumon-alternative-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(KUMON_ALTERNATIVE_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: KUMON_ALTERNATIVE_DUBLIN_CA_META.title,
      description: KUMON_ALTERNATIVE_DUBLIN_CA_META.description,
    }
  )
}

export default async function KumonAlternativeDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildKumonAlternativeDublinCaPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
