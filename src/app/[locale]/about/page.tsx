import About from '@/components/sections/About'
import FounderSchema from '@/components/seo/FounderSchema'
import { FOUNDER_COPY } from '@/data/founder-copy'
import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { ABOUT_FAQS } from '@/data/about-faqs'
import { generateBreadcrumbSchema, generateFAQPageSchema, TRI_VALLEY_AREA_SERVED } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/about', locale)
  return metadata || { title: 'About | GrowWise', description: 'Learn about GrowWise' }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'About', url: absoluteSiteUrl('/about', locale, baseUrl) },
  ])

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About GrowWise — K-12 Learning Lab in Dublin, CA",
    "description": "Learn about GrowWise, a K-12 learning lab in Dublin, CA. Founder Anshika Verma built GrowWise to teach kids how to learn — through Math, English, coding, and STEAM programs.",
    "url": absoluteSiteUrl('/about', locale, baseUrl),
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "GrowWise",
      "url": baseUrl,
      "foundingDate": "2024",
      "description": "A K-12 learning lab in Dublin, CA helping students build confidence through personalized education and STEAM programs.",
      "areaServed": [...TRI_VALLEY_AREA_SERVED],
      "founder": {
        "@type": "Person",
        "name": FOUNDER_COPY.name,
        "jobTitle": "Founder & Director",
        "description": FOUNDER_COPY.schemaDescription,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema(ABOUT_FAQS)) }}
      />
      <FounderSchema />
      <About />
    </>
  )
}


