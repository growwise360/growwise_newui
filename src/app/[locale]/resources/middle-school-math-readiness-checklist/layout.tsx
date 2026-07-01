import type { Metadata } from 'next'
import {
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_FAQS,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_PATH,
} from '@/data/resources/august-math-english-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_PATH, locale)
  return (
    metadata ?? {
      title: MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.title,
      description: MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.description,
    }
  )
}

export default async function MiddleSchoolMathReadinessChecklistLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_PATH,
      meta: MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META,
      faqs: MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_FAQS,
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
