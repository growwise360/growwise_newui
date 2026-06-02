'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  WHEN_TO_START_SAT_PREP_FAQS,
  WHEN_TO_START_SAT_PREP_META,
  WHEN_TO_START_SAT_PREP_RELATED,
} from '@/data/resources/when-to-start-sat-prep'
import { publicPath } from '@/lib/publicPath'

export function WhenToStartSatPrepPage() {
  const locale = useLocale()
  const satPrepHref = publicPath('/courses/sat-prep', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const mathCoursesHref = publicPath('/academic/math', locale)
  const mathFoundationsHref = publicPath('/camps/summer-math-foundations-dublin-ca', locale)
  const algebraGetReadyHref = publicPath('/camps/summer-algebra-dublin-ca', locale)
  const highSchoolMathHref = publicPath('/academic/math/high-school', locale)

  return (
    <ResourceArticlePage
      slug="when-to-start-sat-prep"
      category={WHEN_TO_START_SAT_PREP_META.category}
      categoryLabel={WHEN_TO_START_SAT_PREP_META.categoryLabel}
      h1={WHEN_TO_START_SAT_PREP_META.h1}
      readTime={WHEN_TO_START_SAT_PREP_META.readTime}
      updated={WHEN_TO_START_SAT_PREP_META.updated}
      faqs={WHEN_TO_START_SAT_PREP_FAQS}
      relatedArticles={WHEN_TO_START_SAT_PREP_RELATED}
      ctaHeading="What to Do Right Now"
      ctaSubtext="The most useful thing you can do today — regardless of your child's grade — is establish a baseline."
      ctas={[
        { href: '/courses/sat-prep', label: 'Book a Free SAT Assessment' },
        { href: '/book-assessment', label: 'Book a Free Academic Assessment' },
      ]}
    >
      <p>
        &quot;When should we start SAT prep?&quot; is one of the most common questions parents ask — and most get
        an answer that&apos;s either too early or too late.
      </p>

      <p>
        Start in Grade 9 and your child will burn out before they&apos;re academically ready. Wait until Grade 11
        and you&apos;re compressing the timeline when everything else is also competing for attention.
      </p>

      <p>
        Here&apos;s the honest, grade-by-grade breakdown — and the one question most programs don&apos;t ask first.
      </p>

      <h2>The Question Most Programs Skip</h2>

      <p>
        Before asking <em>when</em> to start SAT prep, the more important question is:{' '}
        <strong>does your child have the foundational skills the SAT actually tests?</strong>
      </p>

      <p>The digital SAT (fully implemented since 2024) tests:</p>

      <ul>
        <li>Algebra and linear equations</li>
        <li>Functions and data analysis</li>
        <li>Reading comprehension with evidence</li>
        <li>Grammar and effective language use</li>
      </ul>

      <p>
        If your child has gaps in Algebra 1 or Algebra 2, starting SAT prep before closing those gaps means
        drilling test strategy on top of a shaky foundation. The result: modest score improvement at best,
        frustration at worst.
      </p>

      <p>
        At GrowWise, we call this the <em>gap-first</em> principle: identify the foundational blocker before
        beginning test prep. Fixing a{' '}
        <Link href={mathCoursesHref}>foundation gap in math</Link> is almost always faster than adding test
        strategy on top of an unfixed gap.
      </p>

      <h2>Grade-by-Grade Breakdown</h2>

      <h3>Grade 8: Foundation, Not Prep</h3>

      <p>
        Grade 8 is too early for formal SAT preparation in most cases. Students are still building the Algebra 1
        foundation the SAT will later test.
      </p>

      <p>
        What Grade 8 <em>is</em> good for: identifying and closing math gaps before high school. A student who
        enters Grade 9 with solid arithmetic, pre-algebra, and early algebraic reasoning will be significantly
        better positioned for SAT prep in Grade 10. Our{' '}
        <Link href={mathFoundationsHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Summer Math Foundations
        </Link>{' '}
        and{' '}
        <Link href={algebraGetReadyHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Algebra 1 Get Ready
        </Link>{' '}
        programs are built for exactly this window.
      </p>

      <p>
        <strong>What to do now:</strong> Run a diagnostic to find any foundation gaps. Close them before high
        school starts. Do not start drilling SAT practice tests.
      </p>

      <h3>Grade 9: Low-Stakes Exposure</h3>

      <p>
        Grade 9 students are adjusting to high school coursework. Most experts agree that focused SAT prep in
        freshman year is premature — students lack urgency and haven&apos;t covered enough of the tested content
        yet.
      </p>

      <p>However, Grade 9 is an ideal time for:</p>

      <ul>
        <li>Taking one full-length practice SAT to see where your child currently stands</li>
        <li>Identifying which math topics still need strengthening</li>
        <li>Building reading habits (the SAT&apos;s reading section heavily rewards students who read broadly)</li>
      </ul>

      <p>
        Many schools offer the PSAT 8/9 in Grade 9, which gives a low-stakes baseline and useful diagnostic data.
      </p>

      <p>
        <strong>What to do now:</strong> Take a baseline test. Identify gaps. Focus on coursework. Don&apos;t
        start formal prep yet.
      </p>

      <h3>Grade 10: The Sweet Spot</h3>

      <p>
        The consensus among SAT tutors and prep specialists is that Grade 10 — specifically the fall/winter of
        sophomore year — is the optimal time to begin focused preparation.
      </p>

      <p>
        College Board offers the PSAT 10 in Grade 10, which gives students a realistic preview of SAT content
        and timing. PSAT scores in Grade 10 are also the strongest predictor of SAT score trajectory.
      </p>

      <p>
        By Grade 10, most students have completed or are completing Algebra 2 — which covers the majority of SAT
        math content. This means prep can focus on test strategy, time management, and targeted practice rather
        than re-teaching content. If coursework gaps remain,{' '}
        <Link href={highSchoolMathHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          high school math tutoring
        </Link>{' '}
        closes them before SAT strategy work begins.
      </p>

      <p>
        A 10th grader who starts focused prep in October has 12–18 months before their first real SAT attempt in
        spring of Grade 11. That timeline, used well, is enough to reach most target score ranges.
      </p>

      <p>
        <strong>What to do now:</strong> Start focused prep. Identify test date (spring of Grade 11 is the most
        common first attempt). Build a structured plan with a{' '}
        <Link href={satPrepHref}>SAT prep program</Link> that checks foundations first.
      </p>

      <h3>Grade 11: Focused and Urgent</h3>

      <p>
        Grade 11 is the most common entry point — and it&apos;s still workable, but the timeline is compressed.
      </p>

      <p>
        Most students targeting Early Action or Early Decision college applications need competitive SAT scores by
        fall of Grade 12. That means the spring of Grade 11 is the primary testing window.
      </p>

      <p>The best approach in Grade 11:</p>

      <ol>
        <li>Take a full diagnostic test immediately to establish baseline</li>
        <li>Identify the top 3–5 skill gaps</li>
        <li>Close those gaps before focusing on test strategy</li>
        <li>Take the SAT in March or May of Grade 11</li>
        <li>Use the summer between Grade 11 and 12 for retake prep if needed</li>
      </ol>

      <p>
        College Board data indicates that students who test twice — spring of Grade 11 and fall of Grade 12 —
        typically see the most improvement, as the gap allows for focused targeted practice.
      </p>

      <p>
        <strong>What to do now:</strong> Start immediately. Don&apos;t wait for the perfect moment.{' '}
        <Link href={satPrepHref}>Book a diagnostic</Link> this week.
      </p>

      <h3>Grade 12: Retake Window Only</h3>

      <p>
        If your child hasn&apos;t started by Grade 12, the options narrow significantly — especially for Early
        Action applicants. August and September test dates exist, but they leave minimal time for score-driven
        college list decisions.
      </p>

      <p>
        Grade 12 is still viable for Regular Decision applicants, with December being the practical cutoff for
        most schools.
      </p>

      <h2>The Three-Level Approach</h2>

      <p>Most students need one of three starting points, not a single generic SAT course:</p>

      <p>
        <strong>Level 1: Fix the Gap (3 months)</strong>
        <br />
        For students whose diagnostic shows foundation gaps in Algebra, geometry, or reading comprehension. No SAT
        strategy yet — only gap-closing. This is the step most programs skip.
      </p>

      <p>
        <strong>Level 2: SAT Preparation (3 months)</strong>
        <br />
        For students with solid foundations who need test-specific strategy: pacing, question elimination,
        section timing, and targeted content review.
      </p>

      <p>
        <strong>Level 3: Timed Practice and Accuracy (1–3 months)</strong>
        <br />
        For students close to their target score who need realistic test simulation and accuracy drilling under
        time pressure.
      </p>

      <p>
        GrowWise <Link href={satPrepHref}>SAT prep programs</Link> follow this three-level framework, starting
        with a diagnostic to identify which level applies before any prep begins.
      </p>

      <h2>What to Do Right Now</h2>

      <p>
        The most useful thing you can do today — regardless of your child&apos;s grade — is establish a baseline.
      </p>

      <p>A baseline test tells you:</p>

      <ul>
        <li>Where your child currently scores</li>
        <li>Which content areas are weak</li>
        <li>Whether a foundation gap needs to be addressed first</li>
        <li>How much time is realistically needed to reach the target</li>
      </ul>

      <p>
        <Link href={satPrepHref}>Book a free SAT assessment</Link> or{' '}
        <Link href={bookAssessmentHref}>book a free academic assessment</Link> to get a clear starting point before
        you commit to any program.
      </p>
    </ResourceArticlePage>
  )
}
