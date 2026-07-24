import type { Metadata } from 'next'
import { IM1_SUMMER_PREP_DUBLIN_CA_META, IM1_SUMMER_PREP_DUBLIN_CA_PATH } from '@/data/resources/im1-summer-prep-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildIM1SummerPrepDublinCAPageGraphSchema } from '@/lib/schema/im1-summer-prep-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(IM1_SUMMER_PREP_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: IM1_SUMMER_PREP_DUBLIN_CA_META.title,
      description: IM1_SUMMER_PREP_DUBLIN_CA_META.description,
    }
  )
}

export default async function IM1SummerPrepDublinCALayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildIM1SummerPrepDublinCAPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
