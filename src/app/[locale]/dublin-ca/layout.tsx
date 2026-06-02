import type { Metadata } from 'next'
import { DUBLIN_CA_DESCRIPTION, DUBLIN_CA_PATH } from '@/data/dublin-ca-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildDublinCaPageGraphSchema } from '@/lib/schema/dublin-ca-local-business-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: 'K-12 Tutoring & Coding Classes in Dublin, CA | GrowWise',
      description: DUBLIN_CA_DESCRIPTION,
    }
  )
}

export default async function DublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildDublinCaPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
