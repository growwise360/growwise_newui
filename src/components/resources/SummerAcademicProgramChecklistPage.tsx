'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_RELATED,
} from '@/data/resources/summer-academic-program-checklist'
import { publicPath } from '@/lib/publicPath'

export function SummerAcademicProgramChecklistPage() {
  const locale = useLocale()
  const summerProgramsHref = publicPath('/camps', locale)
  const selfCheckHref = publicPath('/self-check', locale)
  const contactHref = publicPath('/contact', locale)

  return (
    <ResourceArticlePage
      slug="summer-academic-program-checklist"
      category={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.category}
      categoryLabel={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.categoryLabel}
      h1={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.h1}
      readTime={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.readTime}
      updated={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.updated}
      faqs={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS}
      relatedArticles={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_RELATED}
      ctaHeading="See GrowWise Summer Programs"
      ctaSubtext="See how GrowWise answers each evaluation question."
      ctas={[
        { href: summerProgramsHref, label: 'GrowWise Summer Programs' },
        { href: selfCheckHref, label: 'Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: contactHref, label: 'Contact Us' },
      ]}
    >
      <p>
        Many summer programs look similar from the outside. Small class size. Experienced instructors. Curriculum
        aligned to school standards. Results guaranteed.
      </p>

      <p>
        Most of those claims are hard to verify before you enroll. These five questions make them easy to test.
      </p>

      <h2>1. What Is the Maximum Class Size — and What Is It Usually?</h2>

      <p>The number that matters is not the advertised maximum. It's the average real enrollment per session.</p>

      <p>
        A class capped at 12 that typically runs at 6–8 students is a fundamentally different learning environment
        from one capped at 12 that consistently runs at 11–12.
      </p>

      <p>
        <strong>Ask:</strong> "What's your average class size over the last two summers?"
      </p>

      <p>
        If the answer is vague, assume large. If a program won't say, walk away.
      </p>

      <p>
        <strong>Why it matters:</strong> In a group of 6–10 students, a skilled instructor can track individual
        mistake patterns, redirect a student who's lost, and adjust pacing in real time. In a group of 20+,
        instruction becomes broadcast — it reaches whoever was already close to understanding.
      </p>

      <h2>2. What Is Your Instructor's Subject Background?</h2>

      <p>A summer program's quality is almost entirely determined by the people in the room.</p>

      <p>There is a significant difference between:</p>

      <ul>
        <li>A college student who was good at math in high school</li>
        <li>A credentialed teacher who knows how to teach a subject</li>
        <li>A subject-matter specialist who understands the curriculum sequence deeply enough to know which gaps matter and which can wait</li>
      </ul>

      <p>
        <strong>Ask:</strong> "What is your instructor's background in this subject?" and "How are instructors trained or supervised?"
      </p>

      <p>
        Programs that can't answer clearly are usually staffed by generalists — people who can supervise homework,
        not identify mistake patterns.
      </p>

      <h2>3. What Is the Curriculum Sequence?</h2>

      <p>"We cover math" is not a curriculum.</p>

      <p>
        A structured program should have a defined scope and sequence: the concepts covered, in what order, over
        what timeframe. It should also be able to explain why that order makes sense — why certain skills come
        before others.
      </p>

      <p>
        <strong>Ask:</strong> "What is the week-by-week curriculum for this program?"
      </p>

      <p>
        If the answer is "we assess each student and customize," ask what the customization looks like in practice.
        Real customization requires a diagnostic system, not just an intent.
      </p>

      <p>If the answer is "we follow the textbook," ask which one and verify it aligns to where your child actually is.</p>

      <h2>4. What Does My Child Leave With?</h2>

      <p>This is the most important question — and the one most programs answer worst.</p>

      <p>"Better skills" is not an answer. "More confidence" is not an answer.</p>

      <p>
        Push for specifics: Which concepts will have been covered? Will there be a progress report? How will you
        know if the program worked?
      </p>

      <p>
        Strong programs can tell you at the start what students will be able to do at the end, because they've
        designed backward from that outcome. Programs that can't answer this question haven't thought carefully
        about results.
      </p>

      <h2>5. Is the Curriculum Aligned to CA Standards — and Specifically to Your Child's School?</h2>

      <p>
        Aligned to "CA Standards" is a low bar. Most programs can claim it and mean very little.
      </p>

      <p>
        What matters more: is the content aligned to the specific curriculum sequence your child's school uses? For
        math, this is particularly important in districts using Integrated Math pathways — the scope and sequence
        is different from traditional Algebra → Geometry → Algebra 2, and a program that doesn't know this will
        teach the wrong things in the wrong order.
      </p>

      <p>
        <strong>Ask:</strong> "Is your program aligned to [district name]'s math curriculum specifically?"
      </p>

      <h2>How GrowWise Answers These Questions</h2>

      <p>
        <strong>Class size:</strong> Small groups, typically 6–10 students per session
        <br />
        <strong>Instructors:</strong> Subject-trained instructors with structured onboarding and session review
        <br />
        <strong>Curriculum:</strong> Defined scope and sequence, built around district curriculum where applicable
        <br />
        <strong>Outcomes:</strong> End-of-program summary of skills covered, patterns identified, and next steps
        <br />
        <strong>Alignment:</strong> Programs built specifically around Integrated Math curriculum sequences for DUSD
        and PUSD
      </p>

      <p>
        <Link href={summerProgramsHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          See GrowWise summer programs
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
