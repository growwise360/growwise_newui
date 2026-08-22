import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { ML_AI_CODING_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/steam/ml-ai-coding', locale)
  return metadata || { title: 'ML/AI Coding | GrowWise', description: 'Machine Learning & AI course' }
}

export default async function MLAICodingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const courseSchema = generateCourseSchema({
    name: "ML/AI Coding Classes for Kids — Dublin, CA",
    description:
      "Hands-on Machine Learning and AI coding classes for Grades 3–12 in Dublin, CA. Python programming, AI agents, and ML fundamentals taught in small groups.",
    provider: "GrowWise",
    courseCode: "ML-AI-K12",
    educationalLevel: "Grades 3–12",
    teaches: [
      "Machine Learning",
      "Artificial Intelligence",
      "Python Programming",
      "Data Science",
      "AI Project Development",
      "Neural Networks",
      "Deep Learning Basics"
    ],
    coursePrerequisites: "Basic programming knowledge recommended but not required",
    url: absoluteSiteUrl('/steam/ml-ai-coding', locale, baseUrl),
    image: `${baseUrl}/og-image.jpg`,
    offers: {
      availability: "https://schema.org/InStock",
      url: absoluteSiteUrl('/workshop-calendar', locale, baseUrl),
    }
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Programs', url: absoluteSiteUrl('/programs', locale, baseUrl) },
    { name: 'STEAM', url: absoluteSiteUrl('/steam', locale, baseUrl) },
    { name: 'ML/AI Coding', url: absoluteSiteUrl('/steam/ml-ai-coding', locale, baseUrl) },
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
      <FAQSchema faqs={ML_AI_CODING_FAQ_JSONLD} />
      {children}
    </>
  )
}

