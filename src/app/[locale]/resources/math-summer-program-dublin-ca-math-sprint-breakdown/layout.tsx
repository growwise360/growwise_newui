import type { Metadata } from 'next'
import {
  MATH_SPRINT_BREAKDOWN_FAQS,
  MATH_SPRINT_BREAKDOWN_META,
  MATH_SPRINT_BREAKDOWN_PATH,
} from '@/data/resources/additional-summer-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(MATH_SPRINT_BREAKDOWN_PATH, locale)
  return metadata ?? { title: MATH_SPRINT_BREAKDOWN_META.title, description: MATH_SPRINT_BREAKDOWN_META.description }
}

export default async function MathSprintBreakdownLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: MATH_SPRINT_BREAKDOWN_PATH,
      meta: MATH_SPRINT_BREAKDOWN_META,
      faqs: MATH_SPRINT_BREAKDOWN_FAQS,
      articleSection: 'Summer Learning',
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

