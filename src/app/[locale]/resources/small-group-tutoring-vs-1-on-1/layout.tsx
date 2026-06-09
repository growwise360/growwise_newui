import type { Metadata } from 'next'
import {
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
} from '@/data/resources/additional-summer-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH, locale)
  return (
    metadata ?? {
      title: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.title,
      description: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.description,
    }
  )
}

export default async function SmallGroupTutoringVsOneOnOneLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
      meta: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META,
      faqs: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS,
      articleSection: 'Parent Resources',
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

