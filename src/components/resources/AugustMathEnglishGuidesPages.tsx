'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_FAQS,
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META,
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_RELATED,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_FAQS,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_RELATED,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_FAQS,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_RELATED,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_FAQS,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_RELATED,
} from '@/data/resources/august-math-english-guides'
import { publicPath } from '@/lib/publicPath'

export function BackToSchoolMathAssessmentDublinCAPage() {
  const locale = useLocale()
  const assessmentHref = publicPath('/book-assessment', locale)
  const mathHref = publicPath('/academic/math', locale)

  return (
    <ResourceArticlePage
      slug="back-to-school-math-assessment-dublin-ca"
      category={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.category}
      categoryLabel={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.categoryLabel}
      h1={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.h1}
      readTime={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.readTime}
      updated={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Before August, parents should check whether their child can explain and apply the math skills that the next course assumes. The best assessment looks at reasoning, word problems, and mistake patterns, not just a final score.',
      }}
      faqs={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_FAQS}
      relatedArticles={BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_RELATED}
      ctaHeading="Want a clearer math starting point before August?"
      ctaSubtext="GrowWise can check the exact skills your child needs for the next grade or math course."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math', label: 'View Math Programs' },
      ]}
    >
      <p>
        August is when math gaps become visible. A student can finish the previous year with decent grades, then suddenly
        struggle when the new teacher assumes fluency with fractions, ratios, equations, multi-step word problems, or
        geometry vocabulary.
      </p>

      <p>
        That is why late June and July are useful months for a back-to-school math assessment. There is still enough time
        to fix the highest-impact gaps before homework, quizzes, and confidence pressure return.
      </p>

      <h2>What a useful math assessment should check</h2>
      <p>A parent-friendly readiness check should answer four questions:</p>
      <ul>
        <li>Can your child calculate accurately without relying on fragile tricks?</li>
        <li>Can they explain why a method works?</li>
        <li>Can they transfer the skill into a word problem?</li>
        <li>Do mistakes come from concept gaps, rushed habits, or weak problem setup?</li>
      </ul>

      <p>
        A score by itself does not tell you enough. A student who gets 70% because of one missing fraction concept needs
        a different plan than a student who gets 70% because they rush, skip units, and misread questions.
      </p>

      <h2>Skills to check before the first month of school</h2>
      <p>
        For elementary students, look closely at place value, multiplication facts, fractions, and multi-step word
        problems. For middle school, check ratios, rates, integers, equations, graphing, and proportional reasoning. For
        high school, check algebra fluency, function notation, geometry foundations, and readiness for Integrated Math
        courses.
      </p>

      <p>
        If your child is entering Algebra, Geometry, IM1, Algebra 2, or IM3, do not wait until the first test to discover
        a gap. These classes move quickly because they assume earlier skills are automatic.
      </p>

      <h2>How to use the results</h2>
      <p>
        The goal is not to label a student as behind. The goal is to decide what support should happen first. Some
        students need targeted review. Some need structured tutoring. Some need a faster enrichment path because they are
        ready for harder work but bored by repetition.
      </p>

      <p>
        GrowWise math programs start with a diagnostic-first approach, then connect students to the right grade band and
        skill sequence. If parents are searching for a{' '}
        <Link href={mathHref}>math tutor near Dublin, Pleasanton, San Ramon, or the Tri-Valley</Link>, this is the
        step that prevents guessing.
      </p>

      <h2>When to get help</h2>
      <p>Consider a math readiness check if your child:</p>
      <ul>
        <li>gets the concept during class but loses points on tests,</li>
        <li>avoids word problems,</li>
        <li>needs a parent beside them for homework,</li>
        <li>is moving into Algebra, Geometry, IM1, Algebra 2, or IM3, or</li>
        <li>has a history of careless math mistakes that do not go away with reminders.</li>
      </ul>

      <p>
        The cleanest next step is a short diagnostic.{' '}
        <Link href={assessmentHref}>Book a free GrowWise assessment</Link> and use the results to choose a focused August
        plan.
      </p>
    </ResourceArticlePage>
  )
}

export function EnglishTutorVsReadingTutorVsWritingClassPage() {
  const locale = useLocale()
  const englishHref = publicPath('/academic/english', locale)
  const assessmentHref = publicPath('/book-assessment', locale)

  return (
    <ResourceArticlePage
      slug="english-tutor-vs-reading-tutor-vs-writing-class"
      category={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.category}
      categoryLabel={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.categoryLabel}
      h1={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.h1}
      readTime={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.readTime}
      updated={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Choose a reading tutor for decoding, fluency, vocabulary, or comprehension gaps. Choose a writing class for planning, sentence quality, paragraph structure, and revision. Choose English tutoring when a student needs connected support across reading, grammar, and writing.',
      }}
      faqs={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_FAQS}
      relatedArticles={ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_RELATED}
      ctaHeading="Not sure which English gap is blocking progress?"
      ctaSubtext="A short diagnostic can separate fluency, comprehension, grammar, writing structure, and confidence issues."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/english', label: 'View English Programs' },
      ]}
    >
      <p>
        Parents often search for an English tutor, reading tutor, writing tutor, or writing class as if those are the
        same thing. They are related, but they solve different problems.
      </p>

      <p>
        Before the August school-year rush, the most useful question is not "Which class is available?" It is "Which
        skill is actually breaking down?"
      </p>

      <h2>Choose reading support when text is the blocker</h2>
      <p>
        Reading tutoring is the right starting point when a child guesses words, reads slowly, skips lines, cannot retell
        what they read, or gives vague answers after a passage. The gap might be fluency, comprehension, vocabulary, or a
        mix of all three.
      </p>

      <p>
        A child can also read smoothly and still miss the meaning. In that case, more reading logs are rarely enough.
        They need explicit comprehension work: main idea, inference, evidence, and summarizing.
      </p>

      <h2>Choose writing support when ideas do not become clear paragraphs</h2>
      <p>
        Writing classes help when the student freezes on a blank page, writes very short answers, avoids revision, or
        cannot organize ideas into paragraphs. Good writing support teaches planning, sentence control, transitions,
        evidence, revision, and confidence with prompts.
      </p>

      <p>
        If the struggle is one urgent assignment, private writing help can make sense. If the pattern repeats across the
        year, a structured class often builds stronger habits.
      </p>

      <h2>Choose English tutoring when multiple skills are connected</h2>
      <p>
        Many students need connected English support because reading and writing affect each other. Weak comprehension
        makes essays shallow. Weak vocabulary limits sentence quality. Weak grammar makes strong ideas look messy.
      </p>

      <p>
        GrowWise English programs combine reading comprehension, vocabulary, grammar, and writing so students are not
        bounced between disconnected fixes. Parents looking for an{' '}
        <Link href={englishHref}>English tutor near Dublin, Pleasanton, San Ramon, or the Tri-Valley</Link> should start
        by naming the specific gap.
      </p>

      <h2>A simple parent decision tree</h2>
      <ul>
        <li>If your child reads slowly or inaccurately, start with reading fluency.</li>
        <li>If your child reads the words but cannot explain the passage, start with comprehension.</li>
        <li>If your child understands ideas but cannot write them clearly, start with writing structure.</li>
        <li>If all three show up, choose a broader English program with diagnostic placement.</li>
      </ul>

      <p>
        The best next step is to avoid guessing.{' '}
        <Link href={assessmentHref}>Book a free GrowWise assessment</Link> and identify the exact English, reading, or
        writing skill to target before August.
      </p>
    </ResourceArticlePage>
  )
}

export function KumonVsMathnasiumVsPrivateTutorDublinCAPage() {
  const locale = useLocale()
  const assessmentHref = publicPath('/book-assessment', locale)
  const tutoringHref = publicPath('/resources/tutoring-dublin-ca', locale)

  return (
    <ResourceArticlePage
      slug="math-tutoring-options-dublin-ca"
      category={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.category}
      categoryLabel={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.categoryLabel}
      h1={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.h1}
      readTime={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.readTime}
      updated={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Dublin parents comparing Kumon, Mathnasium, private tutors, Russian Math, Tutoring Club, or GrowWise should compare diagnosis, feedback, curriculum fit, instructor attention, and the exact skill outcome, not only price or brand recognition.',
      }}
      faqs={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_FAQS}
      relatedArticles={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_RELATED}
      ctaHeading="Comparing math tutoring options before August?"
      ctaSubtext="Start with a diagnostic so the comparison is based on your child's actual gaps, not guesswork."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/resources/tutoring-dublin-ca', label: 'Compare Local Tutoring' },
      ]}
    >
      <p>
        When parents search for Kumon Dublin CA, Mathnasium, Russian Math, Tutoring Club, or a private math tutor, they
        are usually trying to answer a deeper question: which option will actually help my child before school pressure
        returns?
      </p>

      <p>
        The right answer depends on the gap. A student who needs fact fluency, a student who needs Algebra readiness, and
        a student who panics during word problems should not all receive the same plan.
      </p>

      <h2>Compare the model, not just the name</h2>
      <p>Parents should compare local math options across five practical questions:</p>
      <ul>
        <li>Does the program diagnose the exact gap before instruction starts?</li>
        <li>Does the instructor see how the student thinks, or only whether the answer is right?</li>
        <li>Does the work match the next school course?</li>
        <li>Will parents receive clear feedback on progress?</li>
        <li>Does the format build independence or create dependency?</li>
      </ul>

      <h2>Kumon vs. Mathnasium vs. Private Tutor vs. GrowWise — Side-by-Side</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Program</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Model</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Class Size</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Diagnostic</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Curriculum Fit</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">Kumon</td>
              <td className="border border-gray-300 px-3 py-2">Worksheet repetition</td>
              <td className="border border-gray-300 px-3 py-2">Individual (no class)</td>
              <td className="border border-gray-300 px-3 py-2">None</td>
              <td className="border border-gray-300 px-3 py-2">Fixed sequence</td>
              <td className="border border-gray-300 px-3 py-2">Building speed and accuracy through drill</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">Mathnasium</td>
              <td className="border border-gray-300 px-3 py-2">Guided worksheets</td>
              <td className="border border-gray-300 px-3 py-2">Small group, pre-set</td>
              <td className="border border-gray-300 px-3 py-2">Placement test</td>
              <td className="border border-gray-300 px-3 py-2">Fixed curriculum</td>
              <td className="border border-gray-300 px-3 py-2">Structured catch-up</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">Private Tutor</td>
              <td className="border border-gray-300 px-3 py-2">1-on-1 sessions</td>
              <td className="border border-gray-300 px-3 py-2">1 student</td>
              <td className="border border-gray-300 px-3 py-2">Varies by tutor</td>
              <td className="border border-gray-300 px-3 py-2">Varies by tutor</td>
              <td className="border border-gray-300 px-3 py-2">Flexible scheduling, personal attention</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">GrowWise</td>
              <td className="border border-gray-300 px-3 py-2">Diagnostic-first instruction</td>
              <td className="border border-gray-300 px-3 py-2">Small group (4–8)</td>
              <td className="border border-gray-300 px-3 py-2">Structured diagnostic</td>
              <td className="border border-gray-300 px-3 py-2">Aligned to school curriculum</td>
              <td className="border border-gray-300 px-3 py-2">Closing specific gaps with accountability</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When worksheet repetition can help</h2>
      <p>
        Repetition can be useful when the main gap is automaticity: math facts, basic computation, or procedural fluency.
        It is less complete when the real issue is reasoning, word-problem setup, explanation, or readiness for a faster
        middle or high school course.
      </p>

      <h2>When a math center can help</h2>
      <p>
        A math-focused center can be a strong fit when a student needs consistent practice and a structured place to work.
        Parents should still ask how placement happens, how errors are reviewed, and how the program adapts when the
        student is moving into Algebra, Geometry, IM1, Algebra 2, or IM3.
      </p>

      <h2>When a private tutor can help</h2>
      <p>
        A private tutor can be useful for urgent homework, a specific test, or a narrow course problem. The risk is that
        sessions can become reactive if there is no diagnostic plan and no sequence for rebuilding missing foundations.
      </p>

      <h2>Where GrowWise fits</h2>
      <p>
        GrowWise is designed for families who want diagnostic-first math support, school-aligned skill building, and a
        clearer plan before August. The goal is not to claim every child needs the same format. The goal is to identify
        the gap first, then choose the format that fits.
      </p>

      <p>
        If you are comparing several local options, start with a diagnostic and bring the results into your decision. You
        can also review the broader <Link href={tutoringHref}>Dublin tutoring options guide</Link> or{' '}
        <Link href={assessmentHref}>book a free GrowWise assessment</Link>.
      </p>
    </ResourceArticlePage>
  )
}

export function MiddleSchoolMathReadinessChecklistPage() {
  const locale = useLocale()
  const assessmentHref = publicPath('/book-assessment', locale)
  const middleSchoolHref = publicPath('/academic/math/middle-school', locale)

  return (
    <ResourceArticlePage
      slug="middle-school-math-readiness-checklist"
      category={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.category}
      categoryLabel={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.categoryLabel}
      h1={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.h1}
      readTime={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.readTime}
      updated={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'A middle school student is ready for August math when fractions, ratios, integers, equations, graphing, and multi-step word problems are steady enough to use without constant reminders. If one of those skills is shaky, Course 1, Course 2, Course 3, or IM1 can feel harder than expected.',
      }}
      faqs={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_FAQS}
      relatedArticles={MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_RELATED}
      ctaHeading="Want to know which middle school math skill is weakest?"
      ctaSubtext="GrowWise can identify the prerequisite gap before the first unit test arrives."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math/middle-school', label: 'View Middle School Math' },
      ]}
    >
      <p>
        Middle school math is a transition point. Students are no longer only practicing operations; they are expected to
        reason with ratios, variables, graphs, and multi-step problems. That is why small elementary gaps can suddenly
        look like a bigger middle school problem.
      </p>

      <p>
        Use this checklist in June or July so your child has time to repair gaps before August pacing begins.
      </p>

      <h2>Grade 6 readiness checklist</h2>
      <ul>
        <li>Multiplication and division facts are accurate enough that they do not slow every problem down.</li>
        <li>Fractions and decimals make sense as numbers, not just procedures.</li>
        <li>The student can solve two-step word problems and explain the setup.</li>
        <li>Place value, rounding, area, perimeter, and basic data reading are steady.</li>
      </ul>

      <h2>Grade 7 readiness checklist</h2>
      <ul>
        <li>Ratios, rates, percentages, and proportions feel connected.</li>
        <li>Integer operations are accurate, including negatives in multi-step problems.</li>
        <li>The student can translate words into equations.</li>
        <li>Graphs, tables, and equations can be connected to the same relationship.</li>
      </ul>

      <h2>Grade 8 and IM1 readiness checklist</h2>
      <ul>
        <li>Linear equations and inequalities are familiar, not brand new.</li>
        <li>Slope, graphing, and coordinate plane work are understandable.</li>
        <li>Systems, functions, exponents, and algebraic expressions do not create panic.</li>
        <li>The student can show work clearly enough for a teacher to follow the reasoning.</li>
      </ul>

      <h2>What to do if your child misses several items</h2>
      <p>
        Do not try to review everything at once. Start with the prerequisite that appears in the most future topics:
        fractions, ratios, equations, or graphing. A targeted plan is faster than a thick workbook.
      </p>

      <p>
        GrowWise middle school math programs focus on Course 1, Course 2, Course 3, IM1, and IM2 readiness for Dublin,
        Pleasanton, San Ramon, and Tri-Valley families. See the{' '}
        <Link href={middleSchoolHref}>middle school math program</Link> or{' '}
        <Link href={assessmentHref}>book a free assessment</Link> to identify the right starting point.
      </p>
    </ResourceArticlePage>
  )
}
