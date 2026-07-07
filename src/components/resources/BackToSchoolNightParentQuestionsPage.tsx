'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_FAQS,
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META,
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_RELATED,
} from '@/data/resources/back-to-school-night-parent-questions'
import { publicPath } from '@/lib/publicPath'

export function BackToSchoolNightParentQuestionsPage() {
  const locale = useLocale()
  const assessmentHref = publicPath('/book-assessment', locale)
  const selfCheckHref = publicPath('/self-check', locale)

  return (
    <ResourceArticlePage
      slug="back-to-school-night-parent-questions"
      category={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.category}
      categoryLabel={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.categoryLabel}
      h1={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.h1}
      readTime={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.readTime}
      updated={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'The most useful back-to-school night questions reveal whether your child is meeting grade-level benchmarks, how the teacher identifies skill gaps early, and what the escalation path looks like if something needs attention.',
      }}
      faqs={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_FAQS}
      relatedArticles={BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_RELATED}
      ctaHeading="If a concern came up at back-to-school night"
      ctaSubtext="A GrowWise diagnostic shows exactly where the gap starts — before it compounds into a larger problem."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Diagnostic' },
        { href: '/self-check', label: 'Take the Free Self-Check' },
      ]}
    >
      <p>
        Back-to-school night is one of the few moments in the year when you can ask a teacher a direct question
        and get a direct answer — before any report cards, before any test scores, and before the academic year
        is already in motion.
      </p>

      <p>
        Most parents ask general questions: &quot;What should my child know going in?&quot; or &quot;What&apos;s
        the homework load like?&quot; These are fine. But the questions that produce the most useful answers are
        the ones that reveal whether your child is on track at the benchmark level — and what happens if
        they&apos;re not.
      </p>

      <h2>Questions about where your child stands academically</h2>

      <p>These questions get at grade-level benchmarks — not effort, not classroom behavior, not grades:</p>

      <ul>
        <li>
          &quot;What does it mean to be &apos;on track&apos; at the end of this grade level in math and
          reading?&quot;
        </li>
        <li>
          &quot;What are the key skills students need to master — not just complete — before they move to the
          next grade?&quot;
        </li>
        <li>
          &quot;Is there a benchmark or screener score I can ask about mid-year to see how my child is
          tracking?&quot;
        </li>
      </ul>

      <p>
        The distinction between mastery and completion matters. A student who completes all the worksheets and
        earns a B may not have mastered the underlying concept. Teachers who think in terms of mastery will give
        you a more useful answer than teachers who describe completion or effort.
      </p>

      <h2>Questions about how the teacher identifies and communicates gaps</h2>

      <p>
        The most important question is not &quot;Is my child doing well?&quot; It is:
        &quot;How would you know if they had a gap — and how would you tell me?&quot;
      </p>

      <ul>
        <li>
          &quot;What screening or assessment tools do you use early in the year to identify students who are
          behind?&quot;
        </li>
        <li>
          &quot;If you notice a student is missing a foundational skill, what is your process for
          communicating that to parents?&quot;
        </li>
        <li>
          &quot;Do you wait for report cards, or is there an earlier trigger?&quot;
        </li>
      </ul>

      <p>
        Teachers who have a clear answer to these questions have a proactive system. Teachers who give vague
        answers (&quot;I keep a close eye on everyone&quot;) may not have a formal process — which means you
        should be more proactive in asking for data.
      </p>

      <h2>Questions to ask if your child struggled last year</h2>

      <p>
        If your child had a difficult year academically in the previous grade, back-to-school night is the right
        time to establish what carries over:
      </p>

      <ul>
        <li>
          &quot;Do you have any information from last year&apos;s teacher about where my child left off?&quot;
        </li>
        <li>
          &quot;If there was a documented concern last year, how does that affect how you&apos;ll approach
          instruction for my child this year?&quot;
        </li>
        <li>
          &quot;Is there any support built into the classroom for students who enter with a gap in a
          prerequisite skill?&quot;
        </li>
      </ul>

      <p>
        This is not about blame — it&apos;s about making sure the new teacher has context. A teacher who knows
        about a prior-year gap from the start of the year can monitor more proactively. A teacher who finds out
        in November has already lost two months.
      </p>

      <h2>What to do after back-to-school night if concerns came up</h2>

      <p>
        If the teacher flagged something — or if the conversation left you more concerned than before — the
        right next step is a diagnostic assessment, not a general tutoring enrollment.
      </p>

      <p>
        A diagnostic identifies the exact skill gap: not &quot;struggles with math&quot; but &quot;missing the
        fraction-to-decimal bridge from Grade 4 that is now blocking Grade 5 ratio work.&quot; That precision
        determines what type of support will actually close the gap.
      </p>

      <p>
        A 20-minute GrowWise diagnostic shows the exact skill gap, not just a general concern. It identifies the
        specific prerequisite that is missing and provides a starting point for structured gap-closing support —
        aligned to your child&apos;s school curriculum.
      </p>

      <p>
        If your child&apos;s teacher flagged a concern, a{' '}
        <Link href={assessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          GrowWise diagnostic
        </Link>{' '}
        shows exactly where the gap starts — before it compounds into a larger problem. You can also use the{' '}
        <Link href={selfCheckHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          free at-home self-check
        </Link>{' '}
        to get an initial read before booking.
      </p>
    </ResourceArticlePage>
  )
}
