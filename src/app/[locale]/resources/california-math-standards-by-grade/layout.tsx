import type { Metadata } from 'next'
import {
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_META,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
} from '@/data/resources/additional-summer-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH, locale)
  return (
    metadata ?? {
      title: CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.title,
      description: CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.description,
    }
  )
}

export default async function CaliforniaMathStandardsByGradeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
      meta: CALIFORNIA_MATH_STANDARDS_BY_GRADE_META,
      faqs: CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS,
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

