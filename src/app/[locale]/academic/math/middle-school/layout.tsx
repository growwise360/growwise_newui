import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { MIDDLE_SCHOOL_MATH_VISIBLE_FAQS } from '@/lib/schema/middle-school-math-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getMathHubSchemaOfferPrice } from '@/lib/math-pricing-display'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return (
    generateMetadataFromPath('/academic/math/middle-school', locale) ?? {
      title: 'Middle School Math Tutoring — IM1, IM2 | GrowWise',
      description:
        'Grades 6–8 math: Course 1 through IM2. Standard and accelerated tracks. Live online small groups. Free assessment.',
    }
  )
}

export default async function MiddleSchoolMathLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()

  const courseSchema = generateCourseSchema({
    name: 'Middle School Math Program — Grades 6–8',
    description:
      'Structured math programs for Grades 6–8. School district placement prep for Course 1/2, Course 1, Course 3, and Integrated Math 1–2. Live online small groups. Diagnostic-first course matching.',
    provider: 'GrowWise',
    educationalLevel: 'Grades 6–8',
    teaches: [
      'Ratios and proportional reasoning',
      'Pre-Algebra',
      'Integrated Math 1',
      'Integrated Math 2',
      'Linear equations and systems',
      'Quadratic functions',
      'Middle school geometry and statistics',
    ],
    coursePrerequisites: 'Grades 6–8 middle school level',
    url: absoluteSiteUrl('/academic/math/middle-school', locale, baseUrl),
    image: `${baseUrl}/assets/growwise-logo.png`,
    offers: {
      price: getMathHubSchemaOfferPrice('middle-school'),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
    },
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Math Programs', url: absoluteSiteUrl('/academic/math', locale, baseUrl) },
    { name: 'Middle School Math', url: absoluteSiteUrl('/academic/math/middle-school', locale, baseUrl) },
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
      <FAQSchema faqs={MIDDLE_SCHOOL_MATH_VISIBLE_FAQS} />
      {children}
    </>
  )
}
