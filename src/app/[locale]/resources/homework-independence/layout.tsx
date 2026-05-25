import type { Metadata } from 'next'
import { HOMEWORK_INDEPENDENCE_META, HOMEWORK_INDEPENDENCE_PATH } from '@/data/resources/homework-independence-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildHomeworkIndependencePageGraphSchema } from '@/lib/schema/homework-independence-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(HOMEWORK_INDEPENDENCE_PATH, locale)
  return (
    metadata ?? {
      title: HOMEWORK_INDEPENDENCE_META.title,
      description: HOMEWORK_INDEPENDENCE_META.description,
    }
  )
}

export default async function HomeworkIndependenceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildHomeworkIndependencePageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
