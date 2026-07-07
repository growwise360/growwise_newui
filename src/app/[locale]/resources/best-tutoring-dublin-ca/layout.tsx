import type { Metadata } from 'next'
import { BEST_TUTORING_DUBLIN_CA_META, BEST_TUTORING_DUBLIN_CA_PATH } from '@/data/resources/best-tutoring-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildBestTutoringDublinCaPageGraphSchema } from '@/lib/schema/best-tutoring-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(BEST_TUTORING_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: BEST_TUTORING_DUBLIN_CA_META.title,
      description: BEST_TUTORING_DUBLIN_CA_META.description,
    }
  )
}

export default async function BestTutoringDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildBestTutoringDublinCaPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
