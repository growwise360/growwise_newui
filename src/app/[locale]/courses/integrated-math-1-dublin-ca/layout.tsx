import type { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import {
  INTEGRATED_MATH_1_DUBLIN_CA_DESCRIPTION,
  INTEGRATED_MATH_1_DUBLIN_CA_PATH,
} from '@/data/integrated-math-1-dublin-ca-copy'
import { INTEGRATED_MATH_1_DUBLIN_CA_FAQS } from '@/data/integrated-math-1-dublin-ca-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema, generateCourseSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(INTEGRATED_MATH_1_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: 'Integrated Math 1 Tutoring Dublin CA | GrowWise',
      description: INTEGRATED_MATH_1_DUBLIN_CA_DESCRIPTION,
    }
  )
}

export default async function IntegratedMath1DublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(INTEGRATED_MATH_1_DUBLIN_CA_PATH, locale, baseUrl)

  const courseSchema = generateCourseSchema({
    name: 'Integrated Math 1 Tutoring in Dublin, CA',
    description: INTEGRATED_MATH_1_DUBLIN_CA_DESCRIPTION,
    provider: 'GrowWise',
    educationalLevel: 'High School',
    teaches: [
      'Integrated Math 1',
      'Algebra foundations',
      'Linear functions and graphing',
      'Systems of equations',
      'Exponential models',
      'Coordinate geometry',
      'Word problems and mathematical reasoning',
    ],
    coursePrerequisites: 'Middle school math or pre-algebra foundation',
    url: pageUrl,
    image: `${baseUrl}/assets/growwise-logo.png`,
    offers: {
      price: '35',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteSiteUrl('/enroll', locale, baseUrl),
    },
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Programs', url: absoluteSiteUrl('/programs', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Integrated Math 1', url: pageUrl },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQSchema faqs={[...INTEGRATED_MATH_1_DUBLIN_CA_FAQS]} />
      {children}
    </>
  )
}
