import type { Metadata } from 'next'
import {
  WHY_GROWWISE_DESCRIPTION,
  WHY_GROWWISE_META_TITLE,
  WHY_GROWWISE_PATH,
} from '@/data/resources/why-growwise-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildWhyGrowWisePageGraphSchema } from '@/lib/schema/why-growwise-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(WHY_GROWWISE_PATH, locale)
  return (
    metadata ?? {
      title: WHY_GROWWISE_META_TITLE,
      description: WHY_GROWWISE_DESCRIPTION,
    }
  )
}

export default async function WhyGrowWiseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildWhyGrowWisePageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
