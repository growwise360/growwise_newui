import type { Metadata } from 'next'
import {
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_FAQS,
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META,
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_PATH,
} from '@/data/resources/august-math-english-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.title,
      description: BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.description,
    }
  )
}

export default async function BackToSchoolMathAssessmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_PATH,
      meta: BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META,
      faqs: BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_FAQS,
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
