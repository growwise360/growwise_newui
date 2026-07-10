'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  KUMON_ALTERNATIVE_DUBLIN_CA_FAQS,
  KUMON_ALTERNATIVE_DUBLIN_CA_META,
  KUMON_ALTERNATIVE_DUBLIN_CA_RELATED,
} from '@/data/resources/kumon-alternative-dublin-ca'
import { publicPath } from '@/lib/publicPath'

export function KumonAlternativeDublinCaPage() {
  const locale = useLocale()
  const mathHref = publicPath('/academic/math', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="kumon-alternative-dublin-ca"
      category={KUMON_ALTERNATIVE_DUBLIN_CA_META.category}
      categoryLabel={KUMON_ALTERNATIVE_DUBLIN_CA_META.categoryLabel}
      h1={KUMON_ALTERNATIVE_DUBLIN_CA_META.h1}
      readTime={KUMON_ALTERNATIVE_DUBLIN_CA_META.readTime}
      updated={KUMON_ALTERNATIVE_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'GrowWise School at 4564 Dublin Blvd is a Kumon alternative for Dublin and Tri-Valley families who want live teacher-led instruction instead of worksheet self-study, and sessions aligned to the DUSD, PUSD, and SRVUSD curriculum instead of a separate internal sequence.',
      }}
      faqs={KUMON_ALTERNATIVE_DUBLIN_CA_FAQS}
      relatedArticles={KUMON_ALTERNATIVE_DUBLIN_CA_RELATED}
      ctaHeading="See where your child actually stands first"
      ctaSubtext="A free GrowWise assessment identifies the specific gap before you commit to any program — ours or anyone else's."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math', label: 'View Math Programs' },
      ]}
    >
      <p>
        Kumon is one of the most recognized names in supplemental education, and its consistency is real: daily
        worksheet practice builds computational fluency and work habits. But many Dublin and Pleasanton parents start
        searching for an alternative for the same two reasons — there is limited live teaching in the model, and the
        Kumon sequence runs independently of what their child&apos;s school is covering.
      </p>

      <h2>Why families look for a Kumon alternative</h2>

      <ul>
        <li>
          <strong>Self-instruction model.</strong> Students work through packets independently and advance on
          accuracy. When a student is stuck on a concept, there is no instructor teaching the concept in the room the
          way a classroom teacher would.
        </li>
        <li>
          <strong>No school alignment.</strong> Kumon runs its own internal sequence. If your child is being tested on
          an Integrated Math unit next week at a DUSD or PUSD school, that unit is not what their Kumon packet covers.
        </li>
        <li>
          <strong>Progress reporting depth.</strong> Kumon progress is measured by worksheet-level completion and
          accuracy, which tells you how far your child is in the Kumon sequence — not which school skills are weak.
        </li>
      </ul>

      <h2>How GrowWise works differently</h2>

      <p>
        GrowWise runs teacher-led, small-group sessions (typically 6–10 students; Grade 1–2 groups are capped at
        6–8) at its Dublin center. Middle and high school sessions run 150 minutes: direct instruction followed by
        teacher-guided practice, so mistakes are caught and corrected before students go home. Sessions follow the{' '}
        <Link href={mathHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          DUSD, PUSD, and SRVUSD math sequence
        </Link>{' '}
        week by week, and every student starts with a diagnostic that identifies the specific gap driving the
        struggle.
      </p>

      <h2>When Kumon is still the better fit</h2>

      <p>
        Honest answer: if your primary goal is daily repetition and computational speed for an early-elementary
        student — and your child works well independently — Kumon&apos;s model does that well at a lower monthly
        price point. If the goal is fixing a specific gap, keeping pace with the school curriculum, or preparing for
        the accelerated middle school pathway, a teacher-led school-aligned program is the stronger match.
      </p>

      <h2>Compare before you decide</h2>

      <p>
        Whichever direction you choose, start with a diagnostic so you know what problem you are solving.{' '}
        <Link href={bookAssessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Book a free GrowWise assessment
        </Link>{' '}
        — you get a clear read on your child&apos;s gaps whether or not you enroll.
      </p>
    </ResourceArticlePage>
  )
}
