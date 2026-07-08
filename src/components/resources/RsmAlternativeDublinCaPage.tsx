'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  RSM_ALTERNATIVE_DUBLIN_CA_FAQS,
  RSM_ALTERNATIVE_DUBLIN_CA_META,
  RSM_ALTERNATIVE_DUBLIN_CA_RELATED,
} from '@/data/resources/rsm-alternative-dublin-ca'
import { publicPath } from '@/lib/publicPath'

export function RsmAlternativeDublinCaPage() {
  const locale = useLocale()
  const mathHref = publicPath('/academic/math', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="rsm-alternative-dublin-ca"
      category={RSM_ALTERNATIVE_DUBLIN_CA_META.category}
      categoryLabel={RSM_ALTERNATIVE_DUBLIN_CA_META.categoryLabel}
      h1={RSM_ALTERNATIVE_DUBLIN_CA_META.h1}
      readTime={RSM_ALTERNATIVE_DUBLIN_CA_META.readTime}
      updated={RSM_ALTERNATIVE_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'GrowWise School on Dublin Blvd is an RSM alternative for Tri-Valley families who want depth without a separate accelerated timeline: sessions teach the exact IM1, IM2, Course 1/2, or Pre-Calculus unit your child\'s school is on this week, with practice covered in session rather than sent home as heavy packets.',
      }}
      faqs={RSM_ALTERNATIVE_DUBLIN_CA_FAQS}
      relatedArticles={RSM_ALTERNATIVE_DUBLIN_CA_RELATED}
      ctaHeading="Depth or acceleration — know which your child needs"
      ctaSubtext="A free GrowWise assessment shows whether the gap is depth in current material or readiness for acceleration."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math', label: 'View Math Programs' },
      ]}
    >
      <p>
        The Russian School of Mathematics has a strong reputation for rigor, and for genuinely competition-track
        students it delivers. The most common reasons Dublin and Pleasanton families look for an alternative are the
        workload and the timeline: RSM&apos;s accelerated curriculum can run one to three years ahead of your
        child&apos;s school grade, with homework assigned across the week on top of the school load.
      </p>

      <h2>Why families look for an RSM alternative</h2>

      <ul>
        <li>
          <strong>Separate timeline from school.</strong> A student can be doing well in RSM material while still
          struggling on what their school tests next week, because the two curricula don&apos;t line up.
        </li>
        <li>
          <strong>Homework volume.</strong> RSM homework plus school homework is a heavy combined load, and for many
          students it crowds out the consolidation time that makes learning stick.
        </li>
        <li>
          <strong>Depth vs written reasoning.</strong> School assessments in DUSD and PUSD increasingly require
          written justification — showing and explaining reasoning on current-unit material, not just fast
          computation.
        </li>
      </ul>

      <h2>How GrowWise works differently</h2>

      <p>
        GrowWise teaches the content your child&apos;s school is covering this week across the{' '}
        <Link href={mathHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          middle and high school math programs
        </Link>{' '}
        — and adds depth to those current concepts in session. Classes meet once a week for 150 minutes in small
        groups (typically 6–10 students), practice is completed with the teacher before students leave, and each
        session opens with a short refresher on previously learned topics so knowledge is retained between units.
      </p>

      <h2>When RSM is still the better fit</h2>

      <p>
        If your child is targeting AMC8, MATHCOUNTS, or olympiad-track competition math and thrives on a heavy
        independent workload, RSM&apos;s accelerated model is built for exactly that. GrowWise also runs a Math
        Olympiad summer track, but for year-round competition depth RSM is a legitimate choice. For school
        performance in the Tri-Valley Integrated Math sequence, school alignment usually wins.
      </p>

      <h2>Start with the diagnostic, not the brand</h2>

      <p>
        <Link href={bookAssessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Book a free GrowWise assessment
        </Link>{' '}
        to find out whether your child needs depth in current material, foundational repair, or true acceleration —
        then pick the program that matches.
      </p>
    </ResourceArticlePage>
  )
}
