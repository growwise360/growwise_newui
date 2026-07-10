import type { Metadata } from 'next'
import {
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META,
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH,
} from '@/data/resources/mathnasium-alternative-dublin-pleasanton'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildMathnasiumAlternativeDublinPleasantonPageGraphSchema } from '@/lib/schema/mathnasium-alternative-dublin-pleasanton-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH, locale)
  return (
    metadata ?? {
      title: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.title,
      description: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.description,
    }
  )
}

export default async function MathnasiumAlternativeDublinPleasantonLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildMathnasiumAlternativeDublinPleasantonPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
