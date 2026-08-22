import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { ELEMENTARY_ENGLISH_VISIBLE_FAQS } from '@/lib/schema/elementary-english-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return (
    generateMetadataFromPath('/academic/english/elementary', locale) ?? {
      title: 'Elementary English Tutoring Online — Grades 1–5 | GrowWise',
      description:
        'Structured English program for Grades 1–5. Reading fluency, vocabulary, grammar, and writing. Live online small groups. Diagnostic-first. 3-month programs. Dublin, CA.',
    }
  )
}

export default async function ElementaryEnglishLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const courseSchema = generateCourseSchema({
    name: 'Elementary English — Grades 1–5',
    description:
      'Structured 3-month English Language Arts program for Grades 1–5. Reading fluency, vocabulary, grammar, and writing. Live online small groups. Diagnostic-first. California Common Core ELA aligned.',
    provider: 'GrowWise',
    educationalLevel: 'Grades 1–5',
    teaches: ['Reading fluency', 'Vocabulary', 'Grammar', 'Writing'],
    coursePrerequisites: 'Grades 1–5 elementary school level',
    url: absoluteSiteUrl('/academic/english/elementary', locale, baseUrl),
    image: `${baseUrl}/assets/growwise-logo.png`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'English programs', url: absoluteSiteUrl('/academic/english', locale, baseUrl) },
    { name: 'Elementary English', url: absoluteSiteUrl('/academic/english/elementary', locale, baseUrl) },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQSchema faqs={ELEMENTARY_ENGLISH_VISIBLE_FAQS} />
      {children}
    </>
  )
}
