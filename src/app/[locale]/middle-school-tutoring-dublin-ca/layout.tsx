import type { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { MIDDLE_SCHOOL_TUTORING_DUBLIN_CA_FAQS } from '@/lib/schema/middle-school-tutoring-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const PAGE_PATH = '/middle-school-tutoring-dublin-ca'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return (
    generateMetadataFromPath(PAGE_PATH, locale) ?? {
      title: 'Middle School Tutoring Dublin CA | Math & English | GrowWise',
      description:
        'Small-group math and English tutoring for Grades 6-8 in Dublin, CA. DUSD-aligned, gap-finding diagnostics, and parent progress reports. Book a free assessment.',
    }
  )
}

export default async function MiddleSchoolTutoringDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(PAGE_PATH, locale, baseUrl)

  const courseSchema = generateCourseSchema({
    name: 'Middle School Tutoring in Dublin, CA — Math & English for Grades 6–8',
    description:
      'Small-group math and English tutoring for Grades 6–8 in Dublin, CA. Aligned to DUSD and PUSD curriculum. Diagnostic-first programs with monthly parent progress reports.',
    provider: 'GrowWise',
    educationalLevel: 'Grades 6–8',
    teaches: [
      'Course 1 and Course 2 math',
      'Pre-Algebra and ratios',
      'Integrated Math 1 (IM1)',
      'Integrated Math 2 (IM2)',
      'Reading comprehension',
      'Writing structure and essay skills',
      'Grammar, vocabulary, and sentence structure',
    ],
    coursePrerequisites: 'Elementary school foundations (Grades 1–5)',
    url: pageUrl,
    image: `${baseUrl}/assets/growwise-logo.png`,
    offers: {
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
    },
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Middle School Tutoring Dublin CA', url: pageUrl },
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
      <FAQSchema faqs={MIDDLE_SCHOOL_TUTORING_DUBLIN_CA_FAQS} />
      {children}
    </>
  )
}
