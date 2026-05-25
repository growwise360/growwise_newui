import type { Metadata } from 'next'
import { TUTORING_DUBLIN_CA_META, TUTORING_DUBLIN_CA_PATH } from '@/data/resources/tutoring-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildTutoringDublinCaArticleGraphSchema } from '@/lib/schema/tutoring-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(TUTORING_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: TUTORING_DUBLIN_CA_META.title,
      description: TUTORING_DUBLIN_CA_META.description,
    }
  )
}

export default async function TutoringDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildTutoringDublinCaArticleGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
