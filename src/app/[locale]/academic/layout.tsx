import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/academic', locale)

  if (!metadata) {
    return {
      title: 'Academic Programs | GrowWise',
      description: 'Grades 3–12 Math and English programs',
    }
  }

  return metadata
}

export default function AcademicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getCanonicalSiteUrl()

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Academic Tutoring — Math, English & SAT Prep | GrowWise Dublin CA",
    "description": "Grades 3–12 academic tutoring in Dublin, CA: Math (grade-level, accelerated, integrated), English Language Arts, and SAT prep. Aligned with DUSD & PUSD standards.",
    "url": `${baseUrl}/academic`,
    "serviceType": "Educational Tutoring",
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
      {children}
    </>
  )
}

