'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_META,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_RELATED,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_RELATED,
  MATH_SPRINT_BREAKDOWN_FAQS,
  MATH_SPRINT_BREAKDOWN_META,
  MATH_SPRINT_BREAKDOWN_RELATED,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_RELATED,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_RELATED,
} from '@/data/resources/additional-summer-guides'
import { publicPath } from '@/lib/publicPath'

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale()
  return (
    <Link href={publicPath(href, locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
      {children}
    </Link>
  )
}

export function MathSprintBreakdownPage() {
  return (
    <ResourceArticlePage
      slug="math-summer-program-dublin-ca-math-sprint-breakdown"
      category={MATH_SPRINT_BREAKDOWN_META.category}
      categoryLabel={MATH_SPRINT_BREAKDOWN_META.categoryLabel}
      h1={MATH_SPRINT_BREAKDOWN_META.h1}
      readTime={MATH_SPRINT_BREAKDOWN_META.readTime}
      updated={MATH_SPRINT_BREAKDOWN_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'A GrowWise Math Sprint starts with baseline checks, then moves through core skill building, applied problem solving, and final consolidation so students can see what changed before the next school year starts.',
      }}
      faqs={MATH_SPRINT_BREAKDOWN_FAQS}
      relatedArticles={MATH_SPRINT_BREAKDOWN_RELATED}
      ctaHeading="See Math Sprint Options"
      ctaSubtext="Review current math, reading, and writing summer tracks for Dublin and Tri-Valley families."
      ctas={[
        { href: '/camps/academic-summer-programs-dublin-ca', label: 'Academic Summer Programs' },
        { href: '/self-check', label: 'Use the Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
      ]}
    >
      <p>
        The question every thoughtful parent asks before committing to a summer math program is simple: what will my
        child actually do? Vague promises like "engaging curriculum" and "fun learning" are not enough.
      </p>

      <p>
        GrowWise Math Sprint is structured around a clear learning arc: understand the student's starting point,
        rebuild or extend core skills, apply those skills to unfamiliar problems, and finish with consolidation.
      </p>

      <h2>What happens in Week 1?</h2>
      <p>
        Week 1 is not about rushing into new content. It is about finding out where each student actually stands.
        Grade level is a label, not a diagnosis. One student may be strong in arithmetic but shaky on fractions;
        another may solve equations but freeze on word problems.
      </p>
      <p>
        Students work through short diagnostic exercises, instructor-observed problem solving, and reflection on
        what feels easy or hard. This gives the instructor a clearer picture before the sprint moves into heavier
        skill work.
      </p>

      <h2>What happens in Week 2?</h2>
      <p>
        Week 2 focuses on direct instruction and immediate feedback. For younger students, that may mean place
        value, number sense, multiplication, and fluency. For upper elementary students, it often means fractions,
        decimals, ratios, and proportional thinking. For middle and high school students, it may mean equations,
        graphing, functions, or algebra readiness.
      </p>
      <p>
        The structure is consistent: short mini-lessons, guided examples, individual practice, and instructor
        feedback while the work is happening.
      </p>

      <h2>What happens in Week 3?</h2>
      <p>
        Week 3 asks students to use skills in less predictable situations. Multi-step word problems, peer
        explanation, error analysis, and challenge extensions show whether the skill transfers beyond a worksheet
        pattern.
      </p>
      <p>
        This is often where hidden gaps become visible. A student may know a procedure but struggle to explain why
        it works or when to use it. That is exactly the kind of gap summer is built to address.
      </p>

      <h2>What happens in Week 4?</h2>
      <p>
        The final week mixes prior skills so students do not only remember a concept immediately after learning it.
        Mixed practice, fluency work, and student reflection help students see what changed from the first week to
        the last.
      </p>
      <p>
        Families looking for current tracks and schedules can review the{' '}
        <ArticleLink href="/camps/academic-summer-programs-dublin-ca">
          academic summer programs page
        </ArticleLink>.
      </p>
    </ResourceArticlePage>
  )
}

export function ReadingProgramGrades12DublinCAPage() {
  return (
    <ResourceArticlePage
      slug="reading-program-grades-1-2-dublin-ca"
      category={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.category}
      categoryLabel={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.categoryLabel}
      h1={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.h1}
      readTime={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.readTime}
      updated={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Early reading gaps are easiest to address before the end of Grade 2. Parents should look for guessing, skipped words, choppy reading, weak recall, and frustration, then identify whether the gap is phonics, fluency, comprehension, or confidence.',
      }}
      faqs={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS}
      relatedArticles={READING_PROGRAM_GRADES_1_2_DUBLIN_CA_RELATED}
      ctaHeading="Check Reading Readiness"
      ctaSubtext="A focused assessment can show whether the gap is phonics, fluency, comprehension, or confidence."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/camps/summer-reading-writing-dublin-ca', label: 'Reading & Writing Sprint' },
      ]}
    >
      <p>
        Grades 1 and 2 are a critical window for reading. By the end of Grade 2, students are expected to move from
        sounding out words slowly toward reading with enough fluency that comprehension can take over.
      </p>

      <h2>Why do early reading gaps matter?</h2>
      <p>
        Starting in Grade 3, schoolwork assumes students can read independently. Science passages, social studies
        texts, math word problems, and directions all require reading fluency. A child who is still decoding every
        word may start falling behind in subjects that do not look like reading at first.
      </p>

      <h2>Is it a reading delay or a reading gap?</h2>
      <p>
        A delay means the student is progressing through the normal sequence, just more slowly. A gap means a
        specific skill is missing and blocking progress. Common early reading gaps include phonemic awareness,
        phonics, sight word fluency, oral reading fluency, and basic comprehension.
      </p>
      <p>
        At home, listen for guessing, skipped words, choppy reading, frustration, or weak recall after a short
        passage. Those are signals to investigate, not reasons to panic.
      </p>

      <h2>Why is home reading alone sometimes not enough?</h2>
      <p>
        Reading with your child builds vocabulary, background knowledge, and love of stories. That matters. But a
        child with a specific decoding or fluency gap often needs explicit instruction, immediate correction, and a
        sequence that targets the missing skill.
      </p>

      <h2>What does structured reading support look like?</h2>
      <p>
        A strong session may include phonemic awareness warm-ups, phonics instruction, decodable text practice,
        sight word work, and a short comprehension check. The goal is not just more reading time. The goal is
        reading instruction with feedback.
      </p>
      <p>
        Families can start with a <ArticleLink href="/book-assessment">reading assessment</ArticleLink> or review
        the <ArticleLink href="/camps/summer-reading-writing-dublin-ca">summer reading and writing sprint</ArticleLink>.
      </p>
    </ResourceArticlePage>
  )
}

export function SmallGroupTutoringVsOneOnOnePage() {
  return (
    <ResourceArticlePage
      slug="small-group-tutoring-vs-1-on-1"
      category={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.category}
      categoryLabel={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.categoryLabel}
      h1={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.h1}
      readTime={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.readTime}
      updated={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'Small-group tutoring can work better than 1-on-1 when the goal is transferable skill-building, peer discussion, confidence, and independence. One-on-one tutoring is better for highly individualized needs, severe anxiety, or a narrow short-term goal.',
      }}
      faqs={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS}
      relatedArticles={SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_RELATED}
      ctaHeading="Find the Right Learning Format"
      ctaSubtext="The best format depends on the student, the goal, and whether the skill needs to transfer back to school."
      ctas={[
        { href: '/resources/tutoring-dublin-ca', label: 'Compare Tutoring Options' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
      ]}
    >
      <p>
        One-on-one tutoring sounds like the obvious best option: one adult, one student, full attention. Sometimes
        that is exactly right. But for many students building academic skills, a well-run small group can be a better
        match.
      </p>

      <h2>Why is 1-on-1 not always better?</h2>
      <p>
        One-on-one support can create high social pressure for students who already feel anxious. It can also make
        help arrive too quickly, which sometimes builds dependence instead of independence.
      </p>
      <p>
        In a small group, students hear different explanations, practice explaining their own thinking, and learn
        that confusion is a normal part of learning rather than a private failure.
      </p>

      <h2>When does 1-on-1 tutoring make sense?</h2>
      <ul>
        <li>A diagnosed learning difference requires highly individualized support</li>
        <li>The student has severe anxiety in group settings</li>
        <li>The goal is a specific assignment or test strategy</li>
        <li>The student needs short-term remediation on a narrow skill</li>
      </ul>

      <h2>When does small-group instruction work well?</h2>
      <ul>
        <li>The goal is transferable skill-building, not only homework completion</li>
        <li>The student benefits from peer discussion and accountability</li>
        <li>The instructor can still hear and correct individual reasoning</li>
        <li>The group is small enough that no student becomes invisible</li>
      </ul>

      <p>
        For Dublin families comparing options, the real question is not "group or private?" It is "which format
        helps my child build the skill and use it independently?"
      </p>
    </ResourceArticlePage>
  )
}

export function CaliforniaMathStandardsByGradePage() {
  return (
    <ResourceArticlePage
      slug="california-math-standards-by-grade"
      category={CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.category}
      categoryLabel={CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.categoryLabel}
      h1={CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.h1}
      readTime={CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.readTime}
      updated={CALIFORNIA_MATH_STANDARDS_BY_GRADE_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'California math standards build year by year, so weak place value, fraction, ratio, equation, or graphing skills can hide until later courses. Parents should ask children to explain concepts, not just solve examples.',
      }}
      faqs={CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS}
      relatedArticles={CALIFORNIA_MATH_STANDARDS_BY_GRADE_RELATED}
      ctaHeading="Check for Math Gaps Before Fall"
      ctaSubtext="A baseline assessment can show whether your child is ready for the next grade or next math course."
      ctas={[
        { href: '/self-check', label: 'Use the Self-Check' },
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/camps/academic-summer-programs-dublin-ca', label: 'Summer Math Programs' },
      ]}
    >
      <p>
        California math standards build year by year. A gap in place value, fractions, ratios, or equations rarely
        disappears on its own. It usually hides until a later course asks for that skill at a faster pace.
      </p>

      <h2>What should parents watch in elementary math?</h2>
      <p>
        Early grades build number sense, place value, operations, measurement, and fractions. Red flags include
        finger-counting for basic facts, weak place value, multiplication facts that are still slow by Grade 3, or
        fraction concepts that feel memorized rather than understood.
      </p>

      <h2>What should parents watch in middle school math?</h2>
      <p>
        Middle school introduces ratios, negative numbers, expressions, equations, proportional relationships,
        functions, and more formal graphing. Gaps often show up when students cannot explain why a procedure works
        or cannot translate a word problem into an equation.
      </p>

      <h2>What readiness skills matter for IM1 and IM2?</h2>
      <p>
        Integrated Math courses assume students can handle fraction operations, proportional reasoning, negative
        numbers, graphing, and multi-step problem solving. Students who are shaky on those foundations often feel
        like the new content is the problem, when the real issue is prerequisite fluency.
      </p>

      <h2>What is the best at-home diagnostic question?</h2>
      <p>
        Ask your child to explain a concept, not just solve an example. "Why are 1/2 and 2/4 the same amount?"
        "What does it mean to divide by a fraction?" "What does slope tell us?" Explanations reveal gaps that
        correct answers can hide.
      </p>
    </ResourceArticlePage>
  )
}

export function ChildStrugglesWithWritingDublinCAPage() {
  return (
    <ResourceArticlePage
      slug="child-struggles-with-writing-dublin-ca"
      category={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.category}
      categoryLabel={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.categoryLabel}
      h1={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.h1}
      readTime={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.readTime}
      updated={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'A child who struggles with writing may have a skill gap, a confidence gap, or both. The practical fix is explicit instruction in planning, structure, development, and revision, paired with a repeatable writing process.',
      }}
      faqs={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS}
      relatedArticles={CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_RELATED}
      ctaHeading="Get a Clearer Writing Read"
      ctaSubtext="Find out whether the issue is structure, revision, confidence, or a mix."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/camps/summer-reading-writing-dublin-ca', label: 'Reading & Writing Sprint' },
      ]}
    >
      <p>
        Writing avoidance is easy to misread. A child who freezes at the blank page or produces three sentences in
        forty-five minutes may be struggling with skill, confidence, or both.
      </p>

      <h2>Is it a writing skill gap or a confidence gap?</h2>
      <p>
        A skill gap means the student does not yet have the tools: planning, topic sentences, paragraph development,
        evidence, sentence variety, or revision. A confidence gap means the student may have ideas but feels blocked
        by anxiety, perfectionism, or past frustration.
      </p>
      <p>
        Most struggling writers have some of both. The skill gap creates hard experiences. Those hard experiences
        create avoidance. Avoidance then makes it harder to build the skill.
      </p>

      <h2>What are signs of a writing skill gap?</h2>
      <ul>
        <li>No clear structure or paragraph focus</li>
        <li>Thin development with little evidence or explanation</li>
        <li>Repetitive sentence patterns and vague word choice</li>
        <li>No meaningful revision beyond spelling or punctuation</li>
      </ul>

      <h2>What are signs of a confidence gap?</h2>
      <ul>
        <li>Blank-page freeze before writing starts</li>
        <li>Writing and deleting repeatedly</li>
        <li>Physical stress or tears around writing assignments</li>
        <li>Strong verbal ideas that disappear on the page</li>
      </ul>

      <h2>What actually helps struggling writers?</h2>
      <p>
        Encouragement matters, but confidence in writing usually follows competence. Students need explicit
        instruction in how to start, organize, develop, and revise. Once the process becomes repeatable, the blank
        page becomes less threatening.
      </p>
    </ResourceArticlePage>
  )
}
