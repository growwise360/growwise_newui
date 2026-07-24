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
  const mathHref = publicPath('/academic/math', locale)

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
        text: 'The right math tutoring program starts with a diagnostic assessment, aligns to your child\'s school pathway (DUSD/PUSD Integrated Math), and tracks knowledge retention — not just session attendance.',
      }}
      faqs={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_FAQS}
      relatedArticles={KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_RELATED}
      ctaHeading="Want a clear starting point before choosing a math program?"
      ctaSubtext="A free GrowWise diagnostic maps your child's exact skill gaps so any program decision is based on data, not guesswork."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/academic/math', label: 'View Math Programs' },
      ]}
    >
      <p>
        Dublin and Tri-Valley parents have more math tutoring options than ever. The challenge is not finding a program —
        it is knowing which questions to ask before enrolling.
      </p>

      <p>
        The five criteria below apply to any math support program. Use them to evaluate what a program actually does
        before the first session starts.
      </p>

      <h2>Does the program start with a diagnostic — not a placement guess?</h2>
      <p>
        The first question to ask any math program is how placement happens. A single grade-level test can over- or
        under-place a student because it tells you what score they earned, not which specific concepts they understand or
        where the gaps are.
      </p>

      <p>
        A strong diagnostic identifies the exact skills a student has, which ones have gaps, and which are solid enough
        to build on. This replaces guessing with a clear skill map before instruction begins.
      </p>

      <p>
        GrowWise starts every student with a structured diagnostic assessment. The results determine where instruction
        begins and which skills to prioritize, rather than placing every new student at the same starting point.
      </p>

      <h2>Does the curriculum align to your child's school pathway?</h2>
      <p>
        Dublin Unified (DUSD) and Pleasanton Unified (PUSD) both follow the California Integrated Math pathway — IM1,
        IM2, and IM3 — rather than the traditional Algebra-Geometry-Algebra 2 sequence. Many tutoring programs use a
        fixed national curriculum that does not reflect this.
      </p>

      <p>
        Parents should ask whether the program knows which standards their child's next course covers. A program that
        teaches the right content in the wrong sequence, or covers topics the school has already passed, adds hours
        without closing the gaps that matter.
      </p>

      <p>
        GrowWise aligns instruction to the specific course path students are enrolled in — including elementary grade
        bands, Course 1, Course 2, Course 3, IM1, IM2, and IM3 — so session time maps directly to what is coming next
        in school.
      </p>

      <h2>What is the class size and instruction model?</h2>
      <p>
        Class size determines how much attention each student receives and how quickly an instructor can catch a
        misconception before it becomes a habit.
      </p>

      <p>
        Large groups limit individualized feedback. Fully self-paced independent work limits explanation and discussion.
        A small-group model — typically four to eight students — allows an instructor to observe how each student thinks
        through a problem, not just whether the final answer is correct.
      </p>

      <p>
        GrowWise uses a small-group model of 4–8 students per session. This keeps sessions efficient while giving
        instructors enough visibility to ask probing questions and catch errors before they compound.
      </p>

      <h2>Does the program track knowledge retention — not just session attendance?</h2>
      <p>
        Session attendance and skill mastery are not the same thing. A student can attend weekly sessions and still have
        a concept reappear as a gap three weeks later if it was not truly consolidated.
      </p>

      <p>
        The most common version of this problem happens over school breaks. A student appears to have a skill in
        December, then loses it by January. Without periodic reassessment, the gap is invisible until a test reveals it.
      </p>

      <p>
        Ask whether the program reassesses earlier material at regular intervals. GrowWise schedules quarterly knowledge
        retention assessments to confirm that skills learned in previous sessions are still solid — and to catch any
        re-emerging gaps before they affect the next unit.
      </p>

      <h2>How often will you receive progress reports?</h2>
      <p>
        Many programs summarize progress only at the end of a semester. That timeline is too slow when a student is
        preparing for IM1, entering Algebra, or getting ready for a spring standardized test.
      </p>

      <p>
        Look for programs that provide regular, skill-specific updates — not just attendance records or generic grades.
        Progress reports should describe which concepts improved, which are still developing, and what the next focus
        will be.
      </p>

      <p>
        GrowWise parents receive regular milestone-based progress reports tied to specific skill outcomes, so families
        always know exactly where their child stands rather than waiting for a report card.
      </p>

      <h2>A criteria-based evaluation guide</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Criterion</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">What strong programs do</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">GrowWise approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">Diagnostic placement</td>
              <td className="border border-gray-300 px-3 py-2">Assess specific skill gaps before placing the student</td>
              <td className="border border-gray-300 px-3 py-2">Structured diagnostic before first session</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">Curriculum alignment</td>
              <td className="border border-gray-300 px-3 py-2">Match the school&apos;s actual course sequence</td>
              <td className="border border-gray-300 px-3 py-2">Aligned to DUSD/PUSD IM pathway by grade band</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">Class size</td>
              <td className="border border-gray-300 px-3 py-2">Small enough to monitor each student&apos;s reasoning</td>
              <td className="border border-gray-300 px-3 py-2">4–8 students per session</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">Retention tracking</td>
              <td className="border border-gray-300 px-3 py-2">Reassess earlier material at regular intervals</td>
              <td className="border border-gray-300 px-3 py-2">Quarterly knowledge retention assessments</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">Progress reporting</td>
              <td className="border border-gray-300 px-3 py-2">Skill-specific updates, not just attendance or grades</td>
              <td className="border border-gray-300 px-3 py-2">Regular milestone-based reports</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        If you are looking for math support in Dublin, Pleasanton, San Ramon, or the broader Tri-Valley, the most useful
        starting point is a diagnostic — not enrollment. A clear skill map lets you evaluate any program against your
        child&apos;s actual needs.
      </p>

      <p>
        Explore{' '}
        <Link href={mathHref}>GrowWise math programs for Grades 1–12</Link> or{' '}
        <Link href={assessmentHref}>book a free assessment</Link> to get a precise picture before the school year
        begins.
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
