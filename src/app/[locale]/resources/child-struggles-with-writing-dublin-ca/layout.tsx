import type { Metadata } from 'next'
import {
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
} from '@/data/resources/additional-summer-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.title,
      description: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.description,
    }
  )
}

export default async function ChildStrugglesWithWritingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
      meta: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META,
      faqs: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS,
      articleSection: 'Academic',
    },
    getCanonicalSiteUrl(),
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}

