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
  const summerProgramsHref = publicPath('/camps/academic-summer-programs-dublin-ca', locale)
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
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Before paying for a summer academic program, ask about class size, instructor background, curriculum sequence, measurable outcomes, and whether the program aligns with the school-year skills your child needs next.',
      }}
      faqs={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS}
      relatedArticles={SUMMER_ACADEMIC_PROGRAM_CHECKLIST_RELATED}
      ctaHeading="See GrowWise Summer Programs"
      ctaSubtext="Compare class size, curriculum, outcomes, and school-year alignment before you enroll."
      ctas={[
        { href: summerProgramsHref, label: 'GrowWise Summer Programs' },
        { href: selfCheckHref, label: 'Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: contactHref, label: 'Contact Us' },
      ]}
    >
      <p>
        Dublin, Pleasanton, and San Ramon families have no shortage of summer options: camp-style, tutoring-style,
        enrichment-style, and everything in between. Many use the same words — fun, educational, engaging,
        experienced.
      </p>

      <p>
        The words are easy to say. The details are harder to fake. These five questions help separate programs that
        produce real learning from programs that mostly provide supervised seat time.
      </p>

      <h2>1. Class Size: How many students per instructor?</h2>

      <p>Class size is one of the clearest signals of whether your child will get real instruction or just a seat.</p>

      <p>
        In a true small group, an instructor can notice when a student is stuck, ask a follow-up question, and catch
        a misconception before it becomes a habit. In a large group, the instructor is often managing pacing and
        behavior for the room.
      </p>

      <p>
        <strong>Ask:</strong> "What is the maximum number of students per instructor in any session, and what is the
        typical group size?"
      </p>

      <p>
        If the answer is vague, assume large. If a program won't say, walk away.
      </p>

      <p>
        <strong>Why it matters:</strong> In a small group, a skilled instructor can track individual mistake patterns,
        redirect a student who is lost, and adjust pacing in real time. In a group of 20 or more, instruction becomes
        broadcast — it reaches whoever was already close to understanding.
      </p>

      <h2>2. Instructor Background: Is the instructor subject-trained?</h2>

      <p>The person leading the session matters more than the curriculum binder.</p>

      <p>There is a significant difference between:</p>

      <ul>
        <li>A generalist who can supervise activities</li>
        <li>An instructor who was strong in the subject as a student</li>
        <li>A subject-trained instructor who can explain a concept several ways and spot deeper gaps</li>
      </ul>

      <p>
        <strong>Ask:</strong> "What is your instructor's background in this subject?" and "How are instructors trained or supervised?"
      </p>

      <p>
        "Great with kids" is valuable, but it is not the same as subject expertise.
      </p>

      <h2>3. Curriculum Structure: Is the scope defined or improvised?</h2>

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
        Real customization requires a diagnostic system, not just a good intention.
      </p>

      <p>If the answer is "we follow the textbook," ask which one and verify it aligns to where your child actually is.</p>

      <h2>4. Measurable Outcomes: What does my child leave with?</h2>

      <p>This is the most important question — and the one most programs answer worst.</p>

      <p>"Better skills" is not an answer. "More confidence" is not an answer.</p>

      <p>
        Push for specifics: Which concepts will have been covered? Will there be a progress report? How will you
        know if the program worked?
      </p>

      <p>
        Strong programs can tell you at the start what students will be able to do, make, solve, or explain at the
        end, because they have designed backward from that outcome. Programs that cannot answer this question have
        not thought carefully enough about results.
      </p>

      <h2>5. CA Standards Alignment: Does this connect to the school year?</h2>

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

      <h2>How does GrowWise answer these questions?</h2>

      <p>
        <strong>Class size:</strong> Small groups, capped by program design
        <br />
        <strong>Instructors:</strong> Subject-trained instructors with structured onboarding and session review
        <br />
        <strong>Curriculum:</strong> Defined scope and sequence, built around district curriculum where applicable
        <br />
        <strong>Outcomes:</strong> Clear skill milestones, projects, writing pieces, or next-step recommendations by
        program
        <br />
        <strong>Alignment:</strong> Academic programs built to connect with California standards and local school
        expectations
      </p>

      <p>
        <Link href={summerProgramsHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          See GrowWise summer programs
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
