export const WHY_GRADES_PATH = '/resources/why-grades-hide-learning-gaps' as const

export const WHY_GRADES_TITLE =
  "Why Your Child's A Grade May Be Hiding a Learning Gap"

export const WHY_GRADES_META_TITLE =
  "Why Your Child's A Grade May Be Hiding a Learning Gap | GrowWise"

export const WHY_GRADES_DESCRIPTION =
  "A grade measures performance on one day — not understanding. Here are three signs your child's grade is hiding a gap, and what to do about it."

export const WHY_GRADES_KEYWORDS =
  "learning gap grades, does good grade mean ready for next grade, child good grades but struggling, grades hide learning gaps, academic gap assessment, diagnostic vs grade"

export const WHY_GRADES_HERO = {
  categoryLabel: 'ACADEMIC',
  h1: WHY_GRADES_TITLE,
  meta: '5 min read · By Anshika, Academic Director, GrowWise School',
} as const

export const WHY_GRADES_FAQS = [
  {
    question: 'Does a good grade mean my child is ready for the next grade?',
    answer:
      'Not necessarily. Grade promotion is based on performance, not mastery. A student can pass Grade 5 math and still have fragile number sense that makes Grade 6 material significantly harder than it should be. Readiness requires that the understanding holds when the context changes — not just that the test was passed.',
  },
  {
    question: 'My child does well on homework but not on tests. What does that mean?',
    answer:
      'Homework is completed with access to notes, examples, and often a parent nearby. Tests remove all of those supports. A consistent gap between homework performance and test performance usually means the skill has not transferred to independent recall — the understanding is dependent on scaffolding that will not be there in the exam.',
  },
  {
    question: 'How do I find out if my child truly understands what they are being graded on?',
    answer:
      'Ask them to teach it to you. Not to show you how they solved it — to explain the concept itself, in their own words, as if you had never seen it. A student who can do this has genuine understanding. A student who can only describe steps has procedural memory. The two feel very similar until you ask this question.',
  },
  {
    question: 'Is a learning gap the same as a learning disability?',
    answer:
      'No. A learning gap is a specific area where understanding did not form completely — usually because a concept was introduced too quickly, practiced without enough variation, or built on a prior concept that was also fragile. Learning gaps are correctable with targeted instruction. They are not indicators of a broader learning disability.',
  },
  {
    question: 'What is the difference between a diagnostic assessment and a placement test?',
    answer:
      'A placement test finds where a student is relative to a grade-level benchmark. A diagnostic assessment finds where understanding breaks down — which specific concept, which type of problem, which step in the process. Placement tells you the level. Diagnostic tells you the gap. GrowWise uses a diagnostic, not a placement test, because the gap is what determines the instruction.',
  },
] as const

export const WHY_GRADES_RELATED = [
  {
    title: 'Why Kids Make Careless Math Mistakes on Tests',
    description: 'Careless mistakes follow specific patterns — and each has a fix. How to identify the real blocker.',
    href: '/resources/careless-math-mistakes',
  },
  {
    title: 'How to Build Homework Independence',
    description: 'The system that builds independence in 6–8 weeks — without the fights.',
    href: '/resources/homework-independence',
  },
  {
    title: 'Math Tutoring Programs — Grades 1–12',
    description: 'Diagnostic-first small-group math programs for every grade level.',
    href: '/academic/math',
  },
  {
    title: '5 Things to Evaluate in Summer Academic Programs',
    description: 'Questions most programs cannot answer — and why that matters.',
    href: '/resources/summer-academic-program-checklist',
  },
] as const

export const WHY_GRADES_CTA = {
  heading: 'Not sure what the grade is actually reporting?',
  subtext:
    "The GrowWise free academic assessment takes 45 minutes and identifies exactly where your child's understanding holds and where it breaks down — mapped against their current school curriculum. No charge. No enrollment commitment.",
  selfCheckLabel: 'Take the Free 10-Minute Self-Check →',
  assessmentLabel: 'Book a Free Assessment →',
} as const
