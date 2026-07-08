'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  BEST_TUTORING_DUBLIN_CA_FAQS,
  BEST_TUTORING_DUBLIN_CA_META,
  BEST_TUTORING_DUBLIN_CA_RELATED,
} from '@/data/resources/best-tutoring-dublin-ca'
import { publicPath } from '@/lib/publicPath'

export function BestTutoringDublinCaPage() {
  const locale = useLocale()
  const satPrepHref = publicPath('/courses/sat-prep', locale)
  const assessmentHref = publicPath('/book-assessment', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="best-tutoring-dublin-ca"
      category={BEST_TUTORING_DUBLIN_CA_META.category}
      categoryLabel={BEST_TUTORING_DUBLIN_CA_META.categoryLabel}
      h1={BEST_TUTORING_DUBLIN_CA_META.h1}
      readTime={BEST_TUTORING_DUBLIN_CA_META.readTime}
      updated={BEST_TUTORING_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'The best tutoring center in Dublin, CA starts with a diagnostic — not a placement guess — aligns to your child\'s actual school pathway (including the Integrated Math sequence used across DUSD, PUSD, and Tri-Valley districts), and tracks knowledge retention through regular assessments rather than just session attendance. Programs that skip the diagnostic step often address the wrong gap.',
      }}
      faqs={BEST_TUTORING_DUBLIN_CA_FAQS}
      relatedArticles={BEST_TUTORING_DUBLIN_CA_RELATED}
      ctaHeading="Not sure where your child's gap starts?"
      ctaSubtext="A GrowWise diagnostic gives you a clear starting point before you choose any program."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/courses/sat-prep', label: 'View SAT Prep' },
      ]}
    >
      <p>
        Dublin, CA has a wide range of tutoring options — from large national chains to small local programs. The
        challenge for parents is that most programs look similar on the surface: small classes, experienced
        instructors, personalized attention. The real differences show up in how they start, how they measure
        progress, and whether the work connects to your child&apos;s actual school curriculum.
      </p>

      <h2>What makes a tutoring center effective in Dublin, CA</h2>

      <p>
        The most important factor in any tutoring program is not brand recognition or location — it&apos;s whether
        the program begins with a diagnostic. A diagnostic identifies the exact skill gap before any instruction
        starts. Without it, programs assign generic work that may not address the real problem.
      </p>

      <p>Five things to evaluate before enrolling:</p>

      <ul>
        <li>Does the program run a structured diagnostic before placing your child?</li>
        <li>What is the actual class size during instruction (not the advertised maximum)?</li>
        <li>Does the curriculum align to your child&apos;s school pathway (e.g., Integrated Math in DUSD, PUSD, or your Tri-Valley district)?</li>
        <li>How are parent progress updates communicated, and how often?</li>
        <li>What does the program teach toward — test readiness, grade-level mastery, or both?</li>
      </ul>

      <h2>Best SAT prep options in Dublin, CA</h2>

      <p>
        For SAT prep specifically, the differences between programs are significant. GrowWise offers{' '}
        <Link href={satPrepHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          small-group diagnostic-first SAT prep
        </Link>{' '}
        that starts by identifying whether your child has foundation gaps (Algebra, reading comprehension) before
        layering on test strategy. Kaplan and similar providers offer larger-class group courses that follow a fixed
        curriculum regardless of individual gaps. Self-study via Khan Academy is free but requires significant
        student motivation and self-direction to be effective.
      </p>

      <p>
        For a student with solid foundations who needs test strategy and pacing, a structured group program works
        well. For a student with Algebra or reading gaps, a diagnostic-first approach that closes those gaps first
        will produce better score outcomes than starting with SAT strategy.
      </p>

      <h2>Best middle school math tutoring options in Dublin, CA</h2>

      <p>
        Middle school math across Tri-Valley districts (DUSD, PUSD, San Ramon Valley USD) follows an Integrated Math pathway — Course 1, Course 2,
        Course 3, then IM1/IM2. Not all tutoring programs are familiar with this sequence. Programs that use
        traditional Algebra/Geometry tracks may assign content your child won&apos;t see until a different year,
        or miss the specific prerequisites for the Integrated Math course they are currently in.
      </p>

      <p>
        Diagnostic-first programs identify which prerequisite is weak and address it directly. Worksheet-drill
        programs (Kumon, some Mathnasium locations) provide repetition but often without the curriculum alignment
        that matters for Dublin students.
      </p>

      <h2>Best high school tutoring options in Dublin, CA</h2>

      <p>
        High school tutoring needs vary widely: some students need ongoing support for Algebra 2 or Pre-Calculus,
        others need SAT prep, and others need help with AP courses. The best fit depends on the specific course and
        what type of gap is present.
      </p>

      <p>
        For students in Grades 9–12, GrowWise offers both{' '}
        <Link href={satPrepHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          SAT prep
        </Link>{' '}
        and high school math support in small groups. Private tutors are appropriate for students who need highly
        flexible scheduling or help with a very specific single-course problem.
      </p>

      <h2>5 questions to ask any Dublin tutoring center before enrolling</h2>

      <ol>
        <li>
          <strong>Do you run a diagnostic before the first session?</strong> A real diagnostic identifies the exact
          gap, not just a general placement.
        </li>
        <li>
          <strong>What is your class size during instruction?</strong> Ask for the actual group size, not the
          maximum.
        </li>
        <li>
          <strong>Does your curriculum align to the Tri-Valley Integrated Math pathway?</strong> This matters for
          middle and early high school students.
        </li>
        <li>
          <strong>How do you communicate progress to parents?</strong> Ask for specifics: written reports,
          in-person check-ins, or portal access.
        </li>
        <li>
          <strong>What is the outcome benchmark?</strong> Can the program describe what your child should be able
          to do after 8 weeks of instruction?
        </li>
      </ol>

      <p>
        To get a clear baseline before choosing any program,{' '}
        <Link href={bookAssessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          book a free GrowWise assessment
        </Link>
        . The diagnostic identifies the exact skill gap so any program comparison is based on your child&apos;s
        actual needs — not guesswork.
      </p>

      <p>
        Ready to see SAT prep options?{' '}
        <Link href={assessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Book an assessment →
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
