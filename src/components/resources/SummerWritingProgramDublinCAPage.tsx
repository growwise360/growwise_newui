'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_FAQS,
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_META,
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_RELATED,
} from '@/data/resources/summer-writing-program-dublin-ca'
import { publicPath } from '@/lib/publicPath'

export function SummerWritingProgramDublinCAPage() {
  const locale = useLocale()
  const writingSprintHref = publicPath('/camps/summer-reading-writing-dublin-ca', locale)
  const selfCheckHref = publicPath('/self-check', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="summer-writing-program-dublin-ca"
      category={SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.category}
      categoryLabel={SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.categoryLabel}
      h1={SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.h1}
      readTime={SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.readTime}
      updated={SUMMER_WRITING_PROGRAM_DUBLIN_CA_META.updated}
      faqs={SUMMER_WRITING_PROGRAM_DUBLIN_CA_FAQS}
      relatedArticles={SUMMER_WRITING_PROGRAM_DUBLIN_CA_RELATED}
      ctaHeading="Enroll in Summer Reading & Writing"
      ctaSubtext="Build structure, evidence, revision, and confidence before school writing demands rise again."
      ctas={[
        { href: writingSprintHref, label: 'See Reading & Writing Sprint' },
        { href: selfCheckHref, label: 'Self-Check' },
        { href: bookAssessmentHref, label: 'Book Assessment' },
      ]}
    >
      <p>
        Writing is the skill that shows up everywhere — in science lab reports, history essays, English exams, math
        explanations, and eventually college applications. It is also the skill many students are assigned more often
        than they are directly taught.
      </p>

      <p>
        Being taught to write is different from being assigned to write. A focused summer writing program can change
        that — if it teaches structure, voice, evidence, and revision instead of only correcting grammar.
      </p>

      <h2>Why Parents Underestimate Writing</h2>

      <p>Reading gaps get flagged early. Math scores are visible. Writing problems are quieter.</p>

      <p>
        A student can technically produce a paragraph and still have no reliable system for organizing ideas. They
        keep sentences short. They summarize instead of analyzing. They restate the question as the answer. A note
        like "needs development" tells the parent very little about what is actually missing.
      </p>

      <p>The real writing gap is usually not grammar. It's structure, specificity, and reasoning on the page.</p>

      <h2>Signs Your Child Needs a Writing Sprint</h2>

      <p>Look for these patterns:</p>

      <ul>
        <li>
          <strong>Blank page freeze</strong> — starting is the hardest part, often because they have no system for
          organizing ideas before drafting
        </li>
        <li>
          <strong>Avoidance and resistance</strong> — writing assignments create stress because the student lacks a
          repeatable process, not because they are lazy
        </li>
        <li>
          <strong>Weak or absent structure</strong> — ideas are present, but paragraphs wander instead of building
          toward a clear point
        </li>
        <li>
          <strong>Good ideas, poor execution</strong> — the student can explain a topic out loud, but the writing on
          the page is thin or disconnected
        </li>
        <li>
          <strong>Weak revision</strong> — treating the first draft as the final draft because they don't know what
          to look for in editing
        </li>
      </ul>

      <p>Any two of these patterns are worth taking seriously before the next school year starts.</p>

      <h2>What a Good Writing Program Actually Teaches</h2>

      <p>
        Grammar correction alone does not produce better writers. Students need a system for planning, drafting,
        revising, and making choices for a reader.
      </p>

      <p>Strong writing programs focus on:</p>

      <p>
        <strong>Structure first.</strong> How does a piece open, develop, and close? What comes before a claim, and
        what must follow it? Students who understand structure can plan before they write.
      </p>

      <p>
        <strong>Evidence handling.</strong> In every content area, students are asked to support claims with specific
        evidence. Most don't know how to cite, integrate, or interpret it. This is the most transferable writing
        skill across subjects.
      </p>

      <p>
        <strong>Revision as thinking.</strong> Students who treat revision as spell-checking miss the point. Real
        revision asks: did I say what I meant? Is the reader following? Is there a better order?
      </p>

      <p>
        <strong>Voice and clarity.</strong> Writing that sounds like the student — precise, clear, and direct — is
        more persuasive and more memorable than inflated academic prose. Students often default to the latter
        because they think it sounds smarter. It doesn't.
      </p>

      <p>
        <strong>Audience awareness.</strong> Students also need to ask who is reading, what that reader needs to
        know, and what cannot be assumed. That shift turns writing from word count into communication.
      </p>

      <h2>What GrowWise Writing Sprints Cover</h2>

      <p>
        GrowWise summer reading and writing sprints are designed for students who need more than red pen corrections
        on a submitted draft.
      </p>

      <p>Sessions work through:</p>

      <ul>
        <li>Pre-writing and planning systems — so students do not face a blank page without a process</li>
        <li>Paragraph construction, transitions, and sentence variety</li>
        <li>Evidence-based response writing aligned to CA ELA Standards</li>
        <li>Revision using structured criteria, not vague feedback</li>
        <li>Voice, clarity, and word choice that make writing sound like a real student with a real point</li>
      </ul>

      <p>
        The goal is not just a stack of completed prompts. It is a writing system students can use after summer,
        when assignments become longer and less forgiving.
      </p>

      <p>
        <Link href={writingSprintHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          See the Summer Reading & Writing Sprint
        </Link>
      </p>

      <p>
        Sessions run at GrowWise's Dublin Blvd location, serving families from Dublin, Pleasanton, San Ramon,
        Livermore, and across the Tri-Valley.
      </p>

      <h2>How to Choose a Summer Writing Program in Dublin, CA</h2>

      <p>Before enrolling your child in any writing program, ask:</p>

      <ul>
        <li>What writing skills will be directly taught? (Not practiced — taught.)</li>
        <li>How does the instructor give feedback? (Generic encouragement is not instruction.)</li>
        <li>Is there a defined curriculum or is it open-ended creative writing?</li>
        <li>How many students per class? (Writing feedback quality drops sharply above 10 students.)</li>
        <li>Will my child leave with a writing system or just a portfolio of drafts?</li>
      </ul>
    </ResourceArticlePage>
  )
}
