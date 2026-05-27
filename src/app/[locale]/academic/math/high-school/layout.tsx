import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { HS_MATH_VISIBLE_FAQS } from '@/lib/schema/high-school-math-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { getMathHubSchemaOfferPrice } from '@/lib/math-pricing-display'
import { MATH_COURSE_PATHS } from '@/lib/math-course-paths'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/academic/math/high-school', locale)
  return metadata || { title: 'High School Math | GrowWise', description: 'High school math courses' }
}

export default async function HighSchoolMathLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const courseSchema = generateCourseSchema({
    name: "High School Math Courses - Algebra, Geometry, Pre-Calculus",
    description:
      "High school math in Dublin, CA: algebra through calculus. DUSD aligned, small groups. Book a free assessment.",
    provider: "GrowWise",
    educationalLevel: "High School",
    teaches: [
      "Algebra 1",
      "Algebra 2",
      "Geometry",
      "Pre-Calculus",
      "AP Precalculus",
      "Integrated Math 1",
      "Integrated Math 2",
      "Trigonometry",
      "Advanced Mathematics"
    ],
    coursePrerequisites: "High school level math foundation",
    url: absoluteSiteUrl(MATH_COURSE_PATHS.highSchool, locale, baseUrl),
    image: `${baseUrl}/assets/growwise-logo.png`,
    offers: {
      price: getMathHubSchemaOfferPrice('high-school'),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
    }
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Math Programs', url: absoluteSiteUrl(MATH_COURSE_PATHS.hub, locale, baseUrl) },
    { name: 'High School Math', url: absoluteSiteUrl(MATH_COURSE_PATHS.highSchool, locale, baseUrl) },
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
      <FAQSchema faqs={HS_MATH_VISIBLE_FAQS} />
      {children}
    </>
  )
}

