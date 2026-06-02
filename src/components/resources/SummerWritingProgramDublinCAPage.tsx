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
  const writingSprintHref = publicPath('/camps/summer-writing-dublin-ca', locale)
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
      ctaHeading="Enroll in Writing Sprint"
      ctaSubtext="Sessions run at GrowWise's Dublin Blvd location, serving families from Dublin, Pleasanton, San Ramon, Livermore, and across the Tri-Valley."
      ctas={[
        { href: writingSprintHref, label: 'Enroll in Writing Sprint' },
        { href: selfCheckHref, label: 'Self-Check' },
        { href: bookAssessmentHref, label: 'Book Assessment' },
      ]}
    >
      <p>
        Writing is the skill that shows up everywhere — in math explanations, science lab reports, history essays,
        English exams, and every standardized test your child will face from Grade 3 through college applications.
        And it's the one skill most students never receive direct instruction in.
      </p>

      <p>
        Being taught to write is different from being assigned to write. Most kids get the second without the first.
        A focused summer writing program changes that — if it's the right kind.
      </p>

      <h2>Why Parents Underestimate Writing</h2>

      <p>Reading gets flagged early. Math scores are visible. Writing problems are quieter.</p>

      <p>
        A student who avoids writing avoids being judged on it. They keep sentences short. They summarize instead
        of analyzing. They restate the question as the answer. Teachers often mark it as "needs development" —
        which tells the parent very little about what's actually wrong.
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
          <strong>Short, safe answers</strong> — three sentences when eight are needed, because more writing means
          more exposure to being wrong
        </li>
        <li>
          <strong>Restating the question</strong> — describing what the prompt asked instead of responding to it
        </li>
        <li>
          <strong>No evidence use</strong> — writing opinions without grounding them in the text or data they're
          given
        </li>
        <li>
          <strong>Weak revision</strong> — treating the first draft as the final draft because they don't know what
          to look for in editing
        </li>
      </ul>

      <p>These are learnable. They're also teachable in a focused multi-week sprint.</p>

      <h2>What a Good Writing Program Actually Teaches</h2>

      <p>
        Grammar instruction alone doesn't produce better writers. Students who can name a dependent clause often
        can't write a coherent paragraph.
      </p>

      <p>Strong writing programs focus on:</p>

      <p>
        <strong>Structure first.</strong> How does an argument move? What comes before a claim, and what must
        follow it? Students who understand structure can plan before they write — which is what separates organized
        writing from stream-of-consciousness.
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

      <h2>What GrowWise Writing Sprints Cover</h2>

      <p>
        GrowWise Writing Sprints are designed for students in Grades 2–8 who need more than red pen corrections on a
        submitted draft.
      </p>

      <p>Sessions work through:</p>

      <ul>
        <li>Prewriting and planning systems — so students don't face a blank page</li>
        <li>Paragraph construction and transition logic</li>
        <li>Evidence-based response writing aligned to CA ELA Standards</li>
        <li>Revision using structured criteria, not vague feedback</li>
        <li>Short daily writing practice with instructor response</li>
      </ul>

      <p>
        The program is not a creative writing camp. It's a structured academic writing intervention designed to
        produce students who can write clearly and specifically under the conditions school requires.
      </p>

      <p>
        <Link href={writingSprintHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Enroll in Writing Sprint
        </Link>
      </p>

      <p>
        Sessions run at GrowWise's Dublin Blvd location, serving families from Dublin, Pleasanton, San Ramon,
        Livermore, and across the Tri-Valley.
      </p>

      <h2>What to Look for When Choosing a Writing Program</h2>

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
