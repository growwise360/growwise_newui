import type { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { READINESS_CHECKLIST_PATH } from '@/data/resources/readiness-checklist'
import { READINESS_CHECKLIST_FAQS } from '@/data/resources/readiness-checklist-faq'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const path = READINESS_CHECKLIST_PATH
  const meta = generateMetadataFromPath(path, locale)
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(path, locale, baseUrl)

  return (
    meta ?? {
      title: 'Free Math & Reading Readiness Checklist for Parents | GrowWise School Dublin CA',
      description:
        'Free interactive checklist for Dublin and Tri-Valley parents. Identify math gaps, reading comprehension issues, and writing weaknesses in grades 1–8. No signup required.',
      keywords: [
        'math readiness checklist',
        'reading comprehension assessment',
        'academic gap finder',
        'learning gaps checklist',
        'Dublin math tutor',
        'Tri-Valley education',
        'parent resources',
      ],
      openGraph: {
        title: 'Free Math & Reading Readiness Checklist',
        description: "Identify your child's academic gaps before they compound. Free resource for Dublin & Tri-Valley families, grades 1–8.",
        url: pageUrl,
        siteName: 'GrowWise School',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: pageUrl,
      },
    }
  )
}

export default async function ReadinessChecklistLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const path = READINESS_CHECKLIST_PATH
  const pageUrl = absoluteSiteUrl(path, locale, baseUrl)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: READINESS_CHECKLIST_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
