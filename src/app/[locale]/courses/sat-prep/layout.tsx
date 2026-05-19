import { Metadata } from 'next'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import FAQSchema from '@/components/schema/FAQSchema'
import { SAT_PREP_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/courses/sat-prep', locale)
  return metadata || { title: 'SAT Prep | GrowWise', description: 'Comprehensive SAT prep course' }
}

export default async function SATPrepLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const courseSchema = generateCourseSchema({
    name: "SAT Prep Course — Dublin, CA",
    description:
      "Comprehensive SAT test preparation in Dublin, CA. Includes practice tests, proven strategies, personalized instruction, and math and reading/writing sections.",
    provider: "GrowWise",
    courseCode: "SAT-PREP",
    educationalLevel: "High School",
    teaches: [
      "SAT Math",
      "SAT Reading",
      "SAT Writing and Language",
      "SAT Test Strategies",
      "SAT Practice Tests",
      "Time Management",
      "Test-Taking Techniques"
    ],
    coursePrerequisites: "High school student preparing for SAT exam",
    url: absoluteSiteUrl('/courses/sat-prep', locale, baseUrl),
    image: `${baseUrl}/og-image.jpg`,
    offers: {
      availability: "https://schema.org/InStock",
      url: absoluteSiteUrl('/enroll-academic', locale, baseUrl),
    }
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
          {
            name: 'Academic Programs',
            url: absoluteSiteUrl('/academic', locale, baseUrl),
          },
          {
            name: 'SAT Prep',
            url: absoluteSiteUrl('/courses/sat-prep', locale, baseUrl),
          },
        ]}
      />
      <FAQSchema faqs={SAT_PREP_FAQ_JSONLD} />
      {children}
    </>
  )
}

