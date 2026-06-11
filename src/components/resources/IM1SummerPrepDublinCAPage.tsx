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
  const im1GetReadyHref = publicPath('/camps/summer-im1-get-ready-dublin-ca', locale)
  const academicSummerHref = publicPath('/camps/academic-summer-programs-dublin-ca', locale)

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
      ctaSubtext="Not sure if your child is ready? Use the Self-Check or book a free assessment before the school-year pace starts."
      ctas={[
        { href: im1GetReadyHref, label: 'IM1 Get Ready Program' },
        { href: selfCheckHref, label: 'Use the Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
      ]}
    >
      <p>
        IM1 starts in September. The students who struggle are often not the ones who "cannot do math" — they are
        the ones who arrive without the fraction, ratio, graphing, and algebra habits the course assumes they already
        have.
      </p>

      <p>
        This guide breaks down what Integrated Math 1 asks of students, which gaps show up most often, and how
        Dublin and Tri-Valley families can use summer to close the right gaps before day one.
      </p>

      <h2>What IM1 Actually Covers</h2>

      <p>
        Integrated Math 1 is not Pre-Algebra with a different name. It blends algebra, geometry, statistics, and
        mathematical reasoning into one course, and the first units move quickly.
      </p>

      <p>Students encounter:</p>

      <ul>
        <li>Linear equations and functions, including graphing and interpretation</li>
        <li>Systems of equations</li>
        <li>Introductory geometry: transformations, congruence, similarity</li>
        <li>Statistical reasoning with real datasets</li>
        <li>Algebraic structure and formal mathematical argument</li>
      </ul>

      <p>
        The course assumes pre-algebra fluency. It does not stop for long reteaching cycles on fractions, ratios,
        negative numbers, or basic equation structure.
      </p>

      <h2>The Skills Students Need Before Day One</h2>

      <p>To enter IM1 without immediately falling behind, a student needs:</p>

      <ul>
        <li>
          <strong>Rational number fluency</strong> — fractions, decimals, percents, and operations with negatives,
          done accurately without relying on a calculator.
        </li>
        <li>
          <strong>Proportional reasoning</strong> — ratios, rates, unit conversion, and the ability to set up and
          solve proportions in context.
        </li>
        <li>
          <strong>Introductory algebra</strong> — evaluating and simplifying expressions, solving one- and
          two-step equations, combining like terms, and understanding variables as quantities.
        </li>
        <li>
          <strong>Graphing basics</strong> — plotting points, reading coordinate planes, and understanding slope as a
          rate of change.
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
        In IM1 prep, the same gap patterns appear repeatedly:
      </p>

      <ul>
        <li>Fraction and ratio weakness inside word problems or equations with fractional coefficients</li>
        <li>Negative number operations that work in isolation but fall apart inside larger problems</li>
        <li>Algebraic language confusion — knowing steps without understanding equality or inverse operations</li>
        <li>Graphing linear relationships only when a table is provided</li>
        <li>Multi-step problems abandoned midway because the work is not organized</li>
      </ul>

      <p>
        These gaps are fixable. They need direct, focused instruction — not more worksheets on material the student
        already found confusing.
      </p>

      <h2>Why Summer Is the Right Time</h2>

      <p>Summer is low stakes. September is not.</p>

      <p>
        A student who closes a fraction or ratio gap in July closes it before it costs points on an IM1 unit test,
        before it compounds with new material, and before they start believing that high school math is simply not
        for them.
      </p>

      <p>
        The same gap fixed in October — after weeks of struggle — takes longer and costs more confidence to repair.
      </p>

      <p>Summer is the cheapest time, academically, to close a gap.</p>

      <h2>GrowWise IM1 Get Ready Program</h2>

      <p>
        GrowWise IM1 Get Ready is built around the skills above — not general math review, but targeted preparation
        for what Integrated Math 1 assumes on day one.
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
        Sessions target identified gaps rather than forcing every student through the same worksheet path. Students
        who are strong on fractions can spend more time on algebraic translation. Students who are solid on equations
        can get more proportional reasoning and graphing.
      </p>

      <p>
        <Link href={im1GetReadyHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Reserve an IM1 Get Ready spot
        </Link>
      </p>

      <p>
        Families comparing summer math options can also review the{' '}
        <Link href={academicSummerHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          academic summer program hub
        </Link>{' '}
        to see related math, reading, and writing sprints.
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
