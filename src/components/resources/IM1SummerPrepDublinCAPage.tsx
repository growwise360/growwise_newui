'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  IM1_SUMMER_PREP_DUBLIN_CA_FAQS,
  IM1_SUMMER_PREP_DUBLIN_CA_META,
  IM1_SUMMER_PREP_DUBLIN_CA_RELATED,
} from '@/data/resources/im1-summer-prep-dublin-ca'
import { publicPath } from '@/lib/publicPath'

export function IM1SummerPrepDublinCAPage() {
  const locale = useLocale()
  const selfCheckHref = publicPath('/self-check', locale)
  const im1GetReadyHref = publicPath('/camps/summer-algebra-dublin-ca', locale)

  return (
    <ResourceArticlePage
      slug="im1-summer-prep-dublin-ca"
      category={IM1_SUMMER_PREP_DUBLIN_CA_META.category}
      categoryLabel={IM1_SUMMER_PREP_DUBLIN_CA_META.categoryLabel}
      h1={IM1_SUMMER_PREP_DUBLIN_CA_META.h1}
      readTime={IM1_SUMMER_PREP_DUBLIN_CA_META.readTime}
      updated={IM1_SUMMER_PREP_DUBLIN_CA_META.updated}
      faqs={IM1_SUMMER_PREP_DUBLIN_CA_FAQS}
      relatedArticles={IM1_SUMMER_PREP_DUBLIN_CA_RELATED}
      ctaHeading="Reserve an IM1 Get Ready Spot"
      ctaSubtext="Not sure if your child is ready? Use the Self-Check — it takes 10 minutes and shows you exactly where the gaps are."
      ctas={[
        { href: im1GetReadyHref, label: 'IM1 Get Ready Program' },
        { href: selfCheckHref, label: 'Use the Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
      ]}
    >
      <p>
        IM1 starts in September. The students who struggle are almost never the ones who couldn't do the math —
        they're the ones who arrived without the foundational reasoning the course assumes they already have.
      </p>

      <p>
        This guide breaks down exactly what IM1 covers, what students need before day one, and what the most common
        gaps look like.
      </p>

      <h2>What IM1 Actually Covers</h2>

      <p>
        Integrated Math 1 is not Pre-Algebra with a different name. It's a restructured course that weaves algebra,
        geometry, statistics, and mathematical reasoning together from the first unit.
      </p>

      <p>Students encounter:</p>

      <ul>
        <li>Linear equations and functions, including graphing and interpretation</li>
        <li>Systems of equations</li>
        <li>Introductory geometry: transformations, congruence, similarity</li>
        <li>Statistical reasoning with real datasets</li>
        <li>Algebraic structure and formal mathematical argument</li>
      </ul>

      <p>The pace is faster than most 6th graders expect. The first unit doesn't wait for students to get comfortable.</p>

      <h2>The Skills Students Need Before Day One</h2>

      <p>To enter IM1 without immediately falling behind, a student needs:</p>

      <ul>
        <li>
          <strong>Rational number fluency</strong> — fractions, decimals, percents, and operations with negatives,
          done accurately and without a calculator crutch.
        </li>
        <li>
          <strong>Proportional reasoning</strong> — ratios, rates, unit conversion, and the ability to set up and
          solve proportions in context.
        </li>
        <li>
          <strong>Pre-algebraic thinking</strong> — evaluating and simplifying expressions, solving one- and
          two-step equations, understanding variables as quantities.
        </li>
        <li>
          <strong>Coordinate plane literacy</strong> — plotting points, understanding slope as a rate, reading graphs.
        </li>
        <li>
          <strong>Logical structure</strong> — following a multi-step problem, keeping track of what's known, working
          backward from a result.
        </li>
      </ul>

      <p>
        These aren't advanced skills. They're the foundation IM1 builds on. When they're shaky, the course feels
        impossible even for mathematically capable students.
      </p>

      <h2>The Gaps Most Students Arrive With</h2>

      <p>
        After working with students entering IM1 across DUSD and PUSD, the same gaps appear repeatedly:
      </p>

      <ul>
        <li>Operations with negatives — reliable in isolation, fall apart inside larger problems</li>
        <li>Fraction-to-decimal-to-percent conversion under pressure</li>
        <li>Setting up equations from word problems (translation gap, not computation gap)</li>
        <li>Graphing linear relationships without a table as a crutch</li>
        <li>Multi-step problems abandoned midway — not from inability, from disorganized approach</li>
      </ul>

      <p>
        None of these are insurmountable. All of them are fixable in a focused summer window.
      </p>

      <h2>Why Summer Is the Right Time</h2>

      <p>August is low stakes. September is not.</p>

      <p>
        A student who closes a fraction gap in August closes it before it costs them points on a unit test, before
        it compounds with new material, and before they develop the narrative that IM1 is just hard for them.
      </p>

      <p>
        The same gap fixed in October — after three weeks of struggle — takes longer and costs more confidence to
        repair.
      </p>

      <p>Summer is the cheapest time, academically, to close a gap.</p>

      <h2>GrowWise IM1 Get Ready Program</h2>

      <p>
        The IM1 Get Ready program is built specifically around the skills above — not general math review, but
        targeted preparation for what IM1 assumes on day one.
      </p>

      <p>
        <strong>Format:</strong> Small group | Mon/Wed/Fri · 5:00–6:30 PM
        <br />
        <strong>Starts:</strong> July 20
        <br />
        <strong>Aligned to:</strong> DUSD and PUSD IM1 curriculum sequence
        <br />
        <strong>Price:</strong> From $249
      </p>

      <p>
        Sessions target identified gaps, not a fixed curriculum everyone follows regardless of what they already
        know. Students who come in strong on fractions spend more time on algebraic translation. Students who are
        solid on equations get more proportional reasoning and graphing.
      </p>

      <p>
        <Link href={im1GetReadyHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Reserve an IM1 Get Ready spot
        </Link>
      </p>

      <p>
        Not sure if your child is ready? Use the{' '}
        <Link href={selfCheckHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Self-Check
        </Link>{' '}
        — it takes 10 minutes and shows you exactly where the gaps are.
      </p>
    </ResourceArticlePage>
  )
}
