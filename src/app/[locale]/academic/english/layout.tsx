import { Metadata } from 'next'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import FAQSchema from '@/components/schema/FAQSchema'
import { ENGLISH_COURSE_MERGED_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/academic/english', locale)
  return metadata || { title: 'English Courses | GrowWise', description: 'Comprehensive English courses' }
}

export default async function EnglishCoursesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const courseSchema = generateCourseSchema({
    name: "English Tutoring Programs for Grades 1-8 | GrowWise Dublin CA",
    description:
      "Structured English programs for grades 1-8 in Dublin, CA and live online. Reading comprehension, writing, grammar, vocabulary, and essay writing in small groups.",
    provider: "GrowWise",
    courseCode: "ELA-1-8",
    educationalLevel: "Grades 1-8",
    teaches: [
      "Reading Comprehension",
      "Vocabulary Development",
      "Grammar & Mechanics",
      "Essay Writing",
      "Creative Writing",
      "English Language Arts",
      "Literary Analysis",
      "Writing Skills"
    ],
    coursePrerequisites: "Free assessment recommended to determine the right grade band and entry point",
    url: absoluteSiteUrl('/academic/english', locale, baseUrl),
    image: `${baseUrl}/assets/growwise-logo.png`,
    offers: {
      price: "289",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
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
            name: 'English Courses',
            url: absoluteSiteUrl('/academic/english', locale, baseUrl),
          },
        ]}
      />
      <FAQSchema faqs={ENGLISH_COURSE_MERGED_FAQ_JSONLD} />
      {children}
    </>
  )
}
