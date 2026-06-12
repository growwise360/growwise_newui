'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  SUMMER_SLIDE_PREVENTION_FAQS,
  SUMMER_SLIDE_PREVENTION_META,
  SUMMER_SLIDE_PREVENTION_RELATED,
} from '@/data/resources/summer-slide-prevention'
import { publicPath } from '@/lib/publicPath'

export function SummerSlidePreventionPage() {
  const locale = useLocale()
  const selfCheckHref = publicPath('/self-check', locale)
  const contactHref = publicPath('/contact', locale)
  const mathFoundationsHref = publicPath('/camps/summer-math-foundations-dublin-ca', locale)
  const readingHref = publicPath('/academic/english', locale)

  return (
    <ResourceArticlePage
      slug="summer-slide-prevention"
      category={SUMMER_SLIDE_PREVENTION_META.category}
      categoryLabel={SUMMER_SLIDE_PREVENTION_META.categoryLabel}
      h1={SUMMER_SLIDE_PREVENTION_META.h1}
      readTime={SUMMER_SLIDE_PREVENTION_META.readTime}
      updated={SUMMER_SLIDE_PREVENTION_META.updated}
      faqs={SUMMER_SLIDE_PREVENTION_FAQS}
      relatedArticles={SUMMER_SLIDE_PREVENTION_RELATED}
      ctaHeading="What to Do Right Now"
      ctaSubtext="Summer slide is preventable. The key is starting with a clear picture of where your child actually is."
      ctas={[
        { href: selfCheckHref, label: 'Take the Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: contactHref, label: 'Contact Us' },
      ]}
    >
      <p>
        It's called the summer slide — and research has documented it thoroughly. After 10 weeks of summer
        break, the average student loses 2–3 months of academic progress, particularly in math. Some students lose
        more.
      </p>

      <p>
        For students from higher-income families with access to summer programs, tutoring, and structured
        activities, the losses are smaller. For others, summer is an academic step backward — one that takes weeks
        into fall to recover.
      </p>

      <p>The good news: summer slide is preventable. It doesn't require expensive programs or intensive tutoring.</p>

      <p>It requires one thing: consistency.</p>

      <h2>Why Summer Slide Happens</h2>

      <p>
        Skills that aren't used atrophy. This is true in music, sports, and academics. A pianist who stops
        practicing over the summer plays worse when they restart in September. A student who doesn't engage in
        reading or math for 10 weeks reads and calculates less fluently when school resumes.
      </p>

      <p>
        This isn't a knowledge problem — it's a use problem. The skills are still there, but the retrieval speed,
        accuracy, and confidence deteriorate. The first weeks of fall are spent re-warming the mental muscles that
        cooled over the summer.
      </p>

      <p>
        For students who are already behind, summer slide is particularly damaging. A student who entered 4th
        grade with a reading gap loses two months over summer, enters 5th grade three months behind, and now the
        gap has widened.
      </p>

      <h2>The Prevention Strategy That Works</h2>

      <p>
        Most parents understand summer slide in theory but try to prevent it in ways that don't work: assuming
        kids will learn through unstructured play, enrolling in programs without a coherent curriculum, or
        assigning random worksheets hoping something sticks.
      </p>

      <p>
        Prevention that actually works has three components:
      </p>

      <p>
        <strong>1. Identify the specific gaps before summer starts</strong>
      </p>

      <p>
        Summer is not the time for general review. It's the time for targeted practice on the skills where your
        child is weakest. Before summer begins, you need to know exactly what those skills are. A 5th grader who
        is solid in addition but weak in fractions should spend summer on fractions, not a random mix of topics.
      </p>

      <p>
        The <Link href={selfCheckHref}>Self-Check</Link> takes 10 minutes and identifies the specific skill gaps
        for your child in their grade level. This is the starting point.
      </p>

      <p>
        <strong>2. Build consistency, not intensity</strong>
      </p>

      <p>
        Two hours of math once a week on Saturday is less effective than 15–20 minutes of targeted practice three
        days a week. The brain consolidates and retrieves skills through repetition and spacing — shorter, more
        frequent sessions produce better retention than long, infrequent ones.
      </p>

      <p>
        Set a specific time: Tuesday, Wednesday, Friday at 10am. Same time, same activity. This builds the habit
        and removes the negotiation.
      </p>

      <p>
        <strong>3. Focus on the skill, not the medium</strong>
      </p>

      <p>
        Whether your child practices on a tablet, with flashcards, or with an instructor doesn't matter as much
        as this: they're practicing the specific skill they're weak in, with feedback that helps them correct
        mistakes, at a consistent pace.
      </p>

      <p>
        A 20-minute session with a tutor focused on fractions is more effective than an hour on an app that
        spirals through random topics. The medium is less important than the focus.
      </p>

      <h2>What a Summer Maintenance Plan Looks Like</h2>

      <p>
        Here's a concrete example: a 3rd grader who struggled with multi-digit subtraction all year.
      </p>

      <p>
        The plan isn't "do math over summer." The plan is:
      </p>

      <ul>
        <li>Tuesday, Wednesday, Friday at 10am — 15 minutes of targeted subtraction practice</li>
        <li>Focus on the specific error pattern the child tends to make (e.g., borrowing with zeros)</li>
        <li>Increase difficulty only when accuracy is solid (80%+)</li>
        <li>Track it on a simple chart to show consistency and progress</li>
      </ul>

      <p>
        That's not an intensive summer math camp. That's a maintenance plan. Fifteen minutes three times a week
        over 10 weeks is 450 minutes (7.5 hours) of focused practice. For a specific skill gap, that's enough to
        prevent backsliding.
      </p>

      <h2>How to Implement This</h2>

      <p>Start now — before summer begins:</p>

      <ol>
        <li>Identify the skill gaps. Use the Self-Check or speak with your child's teacher.</li>
        <li>
          Choose a format: tutoring, a skill-focused camp, or structured at-home practice with feedback (not just
          worksheets).
        </li>
        <li>Set the schedule: same time, same days, non-negotiable.</li>
        <li>Track progress visibly so your child sees the consistency and improvement.</li>
      </ol>

      <p>
        The key is early planning. Parents who identify gaps in May and start the plan in early June see better
        results than those who realize the problem in mid-July and scramble to find a program.
      </p>

      <h2>Summer Programs That Prevent Slide</h2>

      <p>
        If you prefer structured support over at-home practice, the programs that work share these
        characteristics:
      </p>

      <ul>
        <li>They diagnose skill gaps before the program starts</li>
        <li>They focus on specific skills, not general review</li>
        <li>They meet consistently (at least 3 days per week)</li>
        <li>They adjust difficulty based on the student's performance, not a fixed curriculum everyone follows</li>
        <li>They involve live instruction or feedback, not just self-paced practice</li>
      </ul>

      <p>
        GrowWise <Link href={mathFoundationsHref}>Math Foundations</Link> and{' '}
        <Link href={readingHref}>Reading programs</Link> are built around exactly this framework. Each student gets
        assessed before they start, and the focus is on their specific gaps, not a one-size-fits-all curriculum.
      </p>

      <p>
        The goal isn't a transformational summer. It's a maintenance summer — keeping the skills sharp so your
        child doesn't have to re-learn them in September.
      </p>
    </ResourceArticlePage>
  )
}
