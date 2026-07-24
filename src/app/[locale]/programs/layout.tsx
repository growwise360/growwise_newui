import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { PROGRAMS_FAQS } from '@/data/programs-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/programs', locale)
  return metadata || { title: 'Programs | GrowWise', description: 'Explore our programs' }
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getCanonicalSiteUrl()

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Grades 1-12 Academic & STEAM Programs | GrowWise Dublin CA",
    "description": "All GrowWise programs for Grades 1-12 students in Dublin, CA: Math tutoring, English tutoring, SAT prep, Future Skills certification pathways, ML/AI coding, game development, and summer camps.",
    "url": `${baseUrl}/programs`,
    "serviceType": "Grades 1-12 Educational Programs",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "GrowWise",
      "url": baseUrl,
    },
    "areaServed": ["Dublin, CA", "Pleasanton, CA", "San Ramon, CA", "Tri-Valley, CA"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema faqs={PROGRAMS_FAQS} />
      {children}
    </>
  )
}

