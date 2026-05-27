import type { Metadata } from 'next'
import { FROM_NEXTDOOR_DESCRIPTION, FROM_NEXTDOOR_PATH } from '@/data/from-nextdoor-copy'
import FounderSchema from '@/components/seo/FounderSchema'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildFromNextdoorPageGraphSchema } from '@/lib/schema/from-nextdoor-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(FROM_NEXTDOOR_PATH, locale)
  return (
    metadata ?? {
      title: 'GrowWise in Dublin, CA — Trusted by Neighbors',
      description: FROM_NEXTDOOR_DESCRIPTION,
    }
  )
}

export default async function FromNextdoorLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildFromNextdoorPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      <FounderSchema />
      {children}
    </>
  )
}
