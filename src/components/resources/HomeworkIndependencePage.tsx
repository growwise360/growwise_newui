'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  HOMEWORK_INDEPENDENCE_FAQS,
  HOMEWORK_INDEPENDENCE_META,
  HOMEWORK_INDEPENDENCE_RELATED,
  HOMEWORK_INDEPENDENCE_WEEK_PHASES,
} from '@/data/resources/homework-independence-copy'
import { publicPath } from '@/lib/publicPath'

export function HomeworkIndependencePage() {
  const locale = useLocale()
  const selfCheckHref = publicPath('/self-check', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const mathCoursesHref = publicPath('/courses/math', locale)

  return (
    <ResourceArticlePage
      slug="homework-independence"
      category={HOMEWORK_INDEPENDENCE_META.category}
      categoryLabel={HOMEWORK_INDEPENDENCE_META.categoryLabel}
      h1={HOMEWORK_INDEPENDENCE_META.h1}
      readTime={HOMEWORK_INDEPENDENCE_META.readTime}
      updated={HOMEWORK_INDEPENDENCE_META.updated}
      faqs={HOMEWORK_INDEPENDENCE_FAQS}
      relatedArticles={HOMEWORK_INDEPENDENCE_RELATED}
      ctaHeading="Is it a routine problem or a skill gap?"
      ctaSubtext="Start with the GrowWise free diagnostic if you're unsure. It identifies whether the struggle is academic, habitual, or a combination of both."
      ctas={[
        { href: '/self-check', label: 'Take the Free Diagnostic →' },
        { href: '/book-assessment', label: 'Book a Free Assessment →' },
      ]}
    >
      <p>It starts with good intentions.</p>

      <p>
        You sit down to help — just this once. One question turns into the whole assignment. An hour passes.
        You&apos;ve done half the thinking. The homework is done, but tomorrow night it starts again.
      </p>

      <p>
        If this describes your evenings, you&apos;re not alone — and it&apos;s not your child&apos;s fault, and
        it&apos;s not yours either.
      </p>

      <p>What&apos;s happening is a systems problem. And like most systems problems, it has a specific fix.</p>

      <h2>Why Hovering Makes It Worse</h2>

      <p>
        Research published in November 2025 in the journal <em>Behavioral Sciences</em> found that parental
        autonomy support — not parental control — drives children to develop the self-regulation skills that lead to
        better homework completion. Children who received high levels of autonomy support used significantly more
        self-regulation strategies during homework.
      </p>

      <p>
        In other words: the more you sit, the less they learn to manage.
      </p>

      <p>
        A 30-year review of homework research cited by <em>Scholastic</em> reached a similar conclusion: in most
        cases, heavy parental involvement in homework does not raise test scores or grades — and sometimes backfires.
        When parents are overly present, children don&apos;t develop the internal drive to start, persist, and complete
        work independently.
      </p>

      <p>
        This doesn&apos;t mean abandoning your child. It means shifting your role from <em>doer</em> to{' '}
        <em>system builder</em>.
      </p>

      <h2>The Real Problem Behind the Homework Battle</h2>

      <p>
        Most parents assume the issue is motivation — the child doesn&apos;t want to do homework. But motivation is
        almost never the root cause.
      </p>

      <p>The three real blockers are:</p>

      <p>
        <strong>1. No clear trigger</strong>
        <br />
        The child has no reliable cue that signals &quot;homework time.&quot; Without a consistent trigger, starting
        feels optional. The decision to start is made fresh every night — which is the hardest moment to win against a
        screen or a snack.
      </p>

      <p>
        <strong>2. No structured workspace</strong>
        <br />
        A workspace without defined boundaries sends a mixed signal. The same table used for meals, devices, and play is
        neurologically ambiguous. The brain doesn&apos;t know which mode to enter.
      </p>

      <p>
        <strong>3. No task-initiation skill</strong>
        <br />
        Many students have never been explicitly taught how to start. They open the bag, look at the assignments, feel
        overwhelmed by the total volume, and freeze. This is not laziness — it&apos;s a missing skill.
      </p>

      <p>Once these three are in place, the resistance drops significantly — without nagging.</p>

      <h2>The 6–8 Week System That Builds Real Independence</h2>

      {HOMEWORK_INDEPENDENCE_WEEK_PHASES.map((phase) => (
        <div key={phase.weeks}>
          <h3>
            {phase.weeks}: {phase.title}
          </h3>
          {phase.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {phase.bullets ? (
            <ol>
              {phase.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ol>
          ) : null}
        </div>
      ))}

      <h2>When the System Doesn&apos;t Work</h2>

      <p>
        If your child has been homework-dependent for more than one academic year, the habit is established — and a home
        system alone may not be enough to break it.
      </p>

      <p>
        This is where structured external support changes the outcome. A consistent external environment, with a
        specific routine and a person who is not the parent, removes the power dynamic that makes homework a battleground
        at home.
      </p>

      <p>
        Most students who move their homework habit to a structured external environment — whether in-person or online —
        show measurable independence improvement within 4–6 sessions.
      </p>

      <p>
        The goal is not to transfer dependence from parent to tutor. The goal is to build the habit in a context where
        it can be practiced without the emotional weight of the parent-child dynamic.
      </p>

      <h2>What Not to Do</h2>

      <p>
        <strong>Don&apos;t bribe for homework completion.</strong>
        <br />
        Rewards for completing homework remove intrinsic motivation over time. Research consistently shows that external
        rewards reduce long-term engagement with the rewarded behavior.
      </p>

      <p>
        <strong>Don&apos;t do the work yourself to end the conflict.</strong>
        <br />
        Every time a parent resolves a homework battle by taking over, the child learns that resistance works. The cycle
        gets longer.
      </p>

      <p>
        <strong>Don&apos;t use homework as a punishment.</strong>
        <br />
        &quot;If you don&apos;t do your homework, no screen time&quot; frames homework as punishment-adjacent. The
        association sticks.
      </p>

      <p>
        <strong>Don&apos;t skip the diagnostic.</strong>
        <br />
        If your child&apos;s homework resistance is also showing up in test scores, the issue may be more than a routine
        problem. A{' '}
        <Link href={mathCoursesHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          skill gap
        </Link>{' '}
        or a specific subject struggle can make any amount of homework feel impossible — no routine will fix an
        underlying academic gap.
      </p>

      <h2>Is It a Routine Problem or a Skill Gap?</h2>

      <p>One question separates the two:</p>

      <p>
        <em>Does your child resist all homework equally, or only specific subjects?</em>
      </p>

      <p>
        If it&apos;s all homework: likely a routine and independence issue — the system above will help.
      </p>

      <p>
        If it&apos;s specific subjects (especially math or reading): likely a skill gap that makes the work genuinely
        difficult. No routine fixes content that the student doesn&apos;t understand.
      </p>

      <p>
        Start with the GrowWise{' '}
        <Link href={selfCheckHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          free diagnostic
        </Link>{' '}
        if you&apos;re unsure. It identifies whether the struggle is academic, habitual, or a combination of both. You
        can also{' '}
        <Link
          href={bookAssessmentHref}
          className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
        >
          book a free assessment
        </Link>{' '}
        for a skill snapshot and clear plan.
      </p>
    </ResourceArticlePage>
  )
}
