import type { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { READINESS_CHECKLIST_PATH } from '@/data/resources/readiness-checklist'

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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this checklist a diagnosis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. It is a pattern-finding tool. Only a qualified educator can assess the depth of an academic gap. This checklist helps you decide whether a more structured academic review is worth pursuing.',
        },
      },
      {
        '@type': 'Question',
        name: "My child's grades are fine. Should I still use this?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Grades in elementary and middle school often mask gaps — teachers provide scaffolding, tests are re-taken, and partial credit softens low scores. The checklist looks at patterns, not report cards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does GrowWise do with the gaps identified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This checklist groups repeated signs by learning area so families, schools, aftercare programs, and support providers can discuss the pattern more clearly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How were the score thresholds chosen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The thresholds are inspired by MTSS/RtI pattern-based screening logic: one concern by itself does not define readiness, but repeated signs across learning areas may indicate a pattern worth discussing. This checklist is parent-facing and non-diagnostic.',
        },
      },
      {
        '@type': 'Question',
        name: 'What grades does GrowWise serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GrowWise serves grades 1–12 across Dublin, Pleasanton, San Ramon, Livermore, and the broader Tri-Valley area.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I take the next step?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the patterns you identify to decide whether to monitor, share observations with a teacher, or pursue a structured academic review.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
