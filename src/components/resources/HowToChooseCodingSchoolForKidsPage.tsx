'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_FAQS,
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META,
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_RELATED,
} from '@/data/resources/how-to-choose-coding-school-for-kids'
import { publicPath } from '@/lib/publicPath'

export function HowToChooseCodingSchoolForKidsPage() {
  const locale = useLocale()
  const futureSkillsHref = publicPath('/future-skills', locale)
  const assessmentHref = publicPath('/assessment-booking', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="how-to-choose-coding-school-for-kids"
      category={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.category}
      categoryLabel={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.categoryLabel}
      h1={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.h1}
      readTime={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.readTime}
      updated={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: "Choose a coding program that matches your child's age, teaches text-based coding (not just block coding), has a clear progression path, and produces real projects. A good coding school shows you what the student built, not just what they practiced.",
      }}
      faqs={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_FAQS}
      relatedArticles={HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_RELATED}
      ctaHeading="Want to see what a coding curriculum looks like?"
      ctaSubtext="GrowWise offers structured coding programs from Scratch through Python and AI — with a clear progression path and real project output."
      ctas={[
        { href: '/future-skills', label: 'View Coding Programs' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
      ]}
    >
      <p>
        Not all coding programs are equal — and the differences matter more as your child gets older. A program
        that works at age 8 (block coding, visual logic) may not be preparing a 12-year-old for the skills that
        matter in high school and beyond.
      </p>

      <p>
        Here are five criteria to use when evaluating any coding school for your child.
      </p>

      <h2>Criterion 1 — Age fit and starting language</h2>

      <p>
        For children under 10, Scratch (or Scratch Jr.) is the standard starting point. Scratch uses visual,
        drag-and-drop blocks to teach sequencing, loops, and conditionals without requiring syntax knowledge.
        It&apos;s well-designed for early logical thinking.
      </p>

      <p>
        For children 10 and older, the right starting language is Python. Python is readable, widely used, and
        directly applicable to data science, AI, and software development. Programs that keep older students on
        Scratch-style block coding past age 10 are not preparing them for the next level.
      </p>

      <p>
        GrowWise starts Python instruction from age 10, with Scratch available for younger learners who want an
        introduction to programming logic.
      </p>

      <h2>Criterion 2 — Text-based coding vs. block coding</h2>

      <p>
        Block coding (Scratch, Blockly, similar tools) is excellent for ages 7–10. But a student who is still
        exclusively using block coding at age 12 or 13 has not developed the skills needed for real programming
        environments.
      </p>

      <p>
        Text-based coding introduces syntax, debugging, data types, functions, and the discipline of writing
        exact instructions. These skills are directly transferable to Python, JavaScript, Java, and other
        professional languages. Ask any coding school: &quot;At what point do students transition from block
        coding to text-based code?&quot; A good program has a clear answer.
      </p>

      <h2>Criterion 3 — Real project output</h2>

      <p>
        A strong coding program produces something the student can show: a game they built, a data analysis
        script, a web app, a Python project. If a program cannot show you examples of what students have
        created — not what exercises they completed — that is a signal that the curriculum is practice-heavy
        and project-light.
      </p>

      <p>
        Project-based learning is more motivating and produces deeper understanding. Students who have built
        something real are significantly better prepared for coding interviews, college applications, and
        portfolio-building in high school.
      </p>

      <h2>Criterion 4 — Certification pathway</h2>

      <p>
        For students 10 and older who want a credential, Certiport offers the PCEP (Python Certified Entry
        Professional) certification through the Python Institute. This is a recognized certification that
        demonstrates foundational Python competency — it can appear on a high school resume and in college
        applications.
      </p>

      <p>
        Not all coding programs prepare students toward certifications. GrowWise structures its Python
        curriculum with certification readiness in mind, so students who complete the program have a clear
        pathway to a recognized credential.
      </p>

      <h2>Criterion 5 — What the next level looks like</h2>

      <p>
        Before enrolling, ask: &quot;What happens after this course?&quot; A well-designed coding program has a
        progression: Scratch → Python basics → Python intermediate → AI/ML fundamentals → advanced projects.
        If a program only offers one course level with no clear next step, students will plateau.
      </p>

      <p>
        GrowWise offers a full progression through{' '}
        <Link href={futureSkillsHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Scratch, Python, and AI/ML coding programs
        </Link>
        , with each level building on the previous one. Students who complete the sequence are ready for
        certification and advanced coursework.
      </p>

      <p>
        To see which level is the right starting point for your child,{' '}
        <Link href={bookAssessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          book a free assessment
        </Link>
        . We&apos;ll identify the appropriate entry point and explain the progression from there.
      </p>

      <p>
        Ready to enroll?{' '}
        <Link href={assessmentHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Book an assessment →
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
