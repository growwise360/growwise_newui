import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { ELEMENTARY_MATH_VISIBLE_FAQS } from '@/lib/schema/elementary-math-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return (
    generateMetadataFromPath('/academic/math/elementary', locale) ?? {
      title: 'Elementary Math Tutoring Grades 1–5 | GrowWise',
      description: 'Structured math programs for Grades 1–5. Diagnostic-first. Live online small groups.',
    }
  )
}

export default async function ElementaryMathLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()

  const courseSchema = generateCourseSchema({
    name: 'Elementary Math Foundation — Grades 1–5',
    description:
      'Structured 3-month math programs for Grades 1–5. Covers number sense, place value, fractions, decimal operations, and multi-step word problem reasoning. Live online small groups of 6–10 students. Diagnostic-first.',
    provider: 'GrowWise',
    educationalLevel: 'Grades 1–5',
    teaches: [
      'Number sense and place value',
      'Addition and subtraction with understanding',
      'Multiplication and division fluency',
      'Fractions as numbers on a number line',
      'Equivalent fractions',
      'Multi-step word problems',
      'Decimal operations',
      'Order of operations',
    ],
    coursePrerequisites: 'Grades 1–5 elementary school level',
    url: absoluteSiteUrl('/academic/math/elementary', locale, baseUrl),
    image: `${baseUrl}/assets/growwise-logo.png`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Math Programs', url: absoluteSiteUrl('/academic/math', locale, baseUrl) },
    { name: 'Elementary Math', url: absoluteSiteUrl('/academic/math/elementary', locale, baseUrl) },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQSchema faqs={ELEMENTARY_MATH_VISIBLE_FAQS} />
      {children}
    </>
  )
}
