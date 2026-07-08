'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_FAQS,
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META,
  MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_RELATED,
} from '@/data/resources/mathnasium-alternative-dublin-pleasanton'
import { publicPath } from '@/lib/publicPath'

export function MathnasiumAlternativeDublinPleasantonPage() {
  const locale = useLocale()
  const mathHref = publicPath('/academic/math', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="mathnasium-alternative-dublin-pleasanton"
      category={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.category}
      categoryLabel={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.categoryLabel}
      h1={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.h1}
      readTime={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.readTime}
      updated={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'GrowWise School in Dublin is a Mathnasium alternative for families who want sessions aligned to the DUSD, PUSD, and SRVUSD curriculum — the exact unit your child\'s class is on this week — with skill-specific progress reporting instead of topic status labels.',
      }}
      faqs={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_FAQS}
      relatedArticles={MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_RELATED}
      ctaHeading="Find the real gap before choosing a program"
      ctaSubtext="A free GrowWise assessment shows you exactly which skills need work — useful no matter which center you pick."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math', label: 'View Math Programs' },
      ]}
    >
      <p>
        Mathnasium of Dublin and Pleasanton is a well-run option with trained instructors and a structured method.
        The most common reason Tri-Valley parents look for an alternative is a structural one: the Mathnasium Method
        is a proprietary curriculum that runs on its own sequence, separate from what your child&apos;s school is
        teaching and testing.
      </p>

      <h2>Why families look for a Mathnasium alternative</h2>

      <ul>
        <li>
          <strong>Separate curriculum sequence.</strong> If your child is struggling with the unit their teacher
          assigned this week, a program following its own method may not address it directly — instructors work
          through the Mathnasium sequence, not your school&apos;s.
        </li>
        <li>
          <strong>Status-label reporting.</strong> Progress reports organized as &quot;on track / in progress /
          completed&quot; tell you where your child is in the program&apos;s sequence, not which specific school
          skills or mistake patterns need work.
        </li>
        <li>
          <strong>Middle school pacing.</strong> Integrated Math (IM1, IM2, Course 1–2) in DUSD and PUSD moves fast;
          support that lags the school calendar loses much of its value.
        </li>
      </ul>

      <h2>How GrowWise works differently</h2>

      <p>
        GrowWise aligns every session to the unit your child&apos;s school is covering that week across the{' '}
        <Link href={mathHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Grades 1–12 math programs
        </Link>
        . Sessions are teacher-led in small groups (typically 6–10 students), and middle and high school sessions run
        150 minutes each, ending with a guided practice block. Progress reports break down specific skills and recurring mistake patterns, with an objective
        assessment every three months.
      </p>

      <h2>When Mathnasium is still the better fit</h2>

      <p>
        If you want flexible drop-in scheduling several days a week, Mathnasium&apos;s center model is genuinely more
        flexible than a fixed weekly session. And for students who mainly need general numeracy practice rather than
        help with their current school unit, the method-based approach works fine. If school performance in the
        DUSD/PUSD sequence is the goal, alignment matters more.
      </p>

      <h2>Compare with real data</h2>

      <p>
        <Link href={bookAssessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Book a free GrowWise assessment
        </Link>{' '}
        to see exactly which skills are behind the struggle — then judge any program, including ours, on whether it
        addresses those specific gaps.
      </p>
    </ResourceArticlePage>
  )
}
