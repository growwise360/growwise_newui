'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  COMPREHENSION_GAP_SIGNS,
  FLUENCY_GAP_SIGNS,
  READING_FLUENCY_VS_COMPREHENSION_FAQS,
  READING_FLUENCY_VS_COMPREHENSION_META,
  READING_FLUENCY_VS_COMPREHENSION_RELATED,
} from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { publicPath } from '@/lib/publicPath'

export function ReadingFluencyVsComprehensionPage() {
  const locale = useLocale()
  const selfCheckHref = publicPath('/self-check', locale)
  const readingSprintHref = publicPath('/camps/summer-reading-writing-dublin-ca', locale)

  return (
    <ResourceArticlePage
      slug="reading-fluency-vs-comprehension"
      category={READING_FLUENCY_VS_COMPREHENSION_META.category}
      categoryLabel={READING_FLUENCY_VS_COMPREHENSION_META.categoryLabel}
      h1={READING_FLUENCY_VS_COMPREHENSION_META.h1}
      readTime={READING_FLUENCY_VS_COMPREHENSION_META.readTime}
      updated={READING_FLUENCY_VS_COMPREHENSION_META.updated}
      faqs={READING_FLUENCY_VS_COMPREHENSION_FAQS}
      relatedArticles={READING_FLUENCY_VS_COMPREHENSION_RELATED}
      ctaHeading="Not sure which gap your child has?"
      ctaSubtext="Try the at-home test below, or start with GrowWise's free diagnostic to identify whether the struggle is fluency, comprehension, or both."
      ctas={[
        { href: '/self-check', label: 'Take the Free Self-Check →' },
        { href: '/camps/summer-reading-writing-dublin-ca', label: 'Enroll in Reading Sprint →' },
      ]}
    >
      <p>
        Your child can read every word on the page — and still not understand what they just read. Or they understand
        the story but stumble over every third sentence. These aren&apos;t the same problem. And treating them the same
        way wastes time.
      </p>

      <p>
        Understanding the difference between reading fluency and reading comprehension is one of the most useful things
        a parent can know about how their child learns.
      </p>

      <h2>What Fluency Actually Means</h2>

      <p>
        Reading fluency is the ability to read accurately, at an appropriate pace, and with expression. It&apos;s what
        happens before meaning — the mechanics of decoding and processing text smoothly enough that cognitive load stays
        low.
      </p>

      <p>
        A fluent reader doesn&apos;t have to sound out most words. They recognize them automatically. That automaticity
        frees up mental resources for the actual work of reading: understanding.
      </p>

      <p>Signs of a fluency gap:</p>

      <ul>
        {FLUENCY_GAP_SIGNS.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>

      <h2>What Comprehension Actually Means</h2>

      <p>
        Reading comprehension is meaning-making — the ability to understand, interpret, retain, and use what&apos;s been
        read. A child can have strong decoding skills and still struggle here.
      </p>

      <p>
        Comprehension involves: connecting ideas across a text, understanding implied meaning, tracking characters or
        arguments across paragraphs, and extracting the main point from supporting details.
      </p>

      <p>Signs of a comprehension gap:</p>

      <ul>
        {COMPREHENSION_GAP_SIGNS.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>

      <h2>Why Treating the Wrong One Wastes Time</h2>

      <p>
        A comprehension program won&apos;t help a child whose real issue is fluency — because they&apos;re spending too
        much mental energy on decoding to process meaning. More passages, more questions, more reading logs will exhaust
        them without closing the gap.
      </p>

      <p>
        A fluency-focused program won&apos;t help a child who reads smoothly but doesn&apos;t engage with ideas — because
        they don&apos;t need more speed practice, they need to learn how to think about what they&apos;re reading.
      </p>

      <p>The right intervention starts with figuring out which gap is primary.</p>

      <h2>How to Tell Which Gap Your Child Has</h2>

      <p>Ask your child to:</p>

      <ol>
        <li>Read a grade-level passage aloud. Count errors, pacing, and hesitations.</li>
        <li>
          Set a timer and have them read silently for 2 minutes. Ask three questions — one literal, one inferential, one
          summarizing.
        </li>
      </ol>

      <p>
        If the aloud reading is rough but the comprehension questions go well when the pressure is off:{' '}
        <strong>fluency gap</strong>.
      </p>

      <p>
        If the aloud reading is smooth but the questions fall apart: <strong>comprehension gap</strong>.
      </p>

      <p>
        If both are difficult: <strong>layered gap</strong> — start with fluency.
      </p>

      <p>
        For a structured diagnostic alongside this at-home test, try GrowWise&apos;s{' '}
        <Link href={selfCheckHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          free Self-Check
        </Link>{' '}
        — it flags the exact mistake pattern, not just a general score.
      </p>

      <h2>How GrowWise Reading Sprints Address Both</h2>

      <p>
        GrowWise Reading Sprints open with a diagnostic — not a placement test, but a pattern-finder. Instructors
        identify whether a student&apos;s reading difficulty is fluency-based, comprehension-based, or both, then build
        sessions accordingly.
      </p>

      <p>
        Fluency tracks focus on high-frequency vocabulary, timed reading practice, and prosody development. Comprehension
        tracks focus on text structure, evidence-based answering, and inference training.
      </p>

      <p>Students aren&apos;t grouped by grade. They&apos;re grouped by skill profile.</p>

      <p>
        <Link href={readingSprintHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Enroll in Reading Sprint →
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
