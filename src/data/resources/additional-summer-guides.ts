import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const MATH_SPRINT_BREAKDOWN_PATH =
  '/resources/math-summer-program-dublin-ca-math-sprint-breakdown' as const
export const READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH = '/resources/reading-program-grades-1-2-dublin-ca' as const
export const SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH = '/resources/small-group-tutoring-vs-1-on-1' as const
export const CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH = '/resources/california-math-standards-by-grade' as const
export const CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH = '/resources/child-struggles-with-writing-dublin-ca' as const

export const MATH_SPRINT_BREAKDOWN_META: ResourceArticleMeta = {
  path: MATH_SPRINT_BREAKDOWN_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: 'What Happens in a GrowWise Math Sprint: A Week-by-Week Breakdown',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'Math Summer Program Dublin CA | Week-by-Week Guide',
  description:
    'See what students do in GrowWise Math Sprint: baseline assessment, core skill building, problem solving, and confidence-building review.',
  keywords:
    'math summer program Dublin CA, Math Sprint Dublin CA, summer math program Tri-Valley, math sprint grades 1-10, math enrichment Dublin',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
}

export const MATH_SPRINT_BREAKDOWN_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What grades does GrowWise Math Sprint serve?',
    answer:
      'GrowWise academic summer math programs serve students across elementary, middle, and early high school grade bands, with placement based on current skills and program fit.',
  },
  {
    question: 'Is Math Sprint the same as tutoring?',
    answer:
      'No. Tutoring is often reactive support for current assignments. Math Sprint is proactive summer instruction built around baseline skill checks, structured practice, and school-year readiness.',
  },
  {
    question: 'What happens in the first week?',
    answer:
      'The first week focuses on baseline work: short diagnostic tasks, instructor observation, and student reflection so the group can target the right skills.',
  },
  {
    question: 'Where can I see current Math Sprint options?',
    answer:
      'Current academic summer tracks, schedules, and enrollment details are listed on the GrowWise academic summer programs page.',
  },
] as const

export const MATH_SPRINT_BREAKDOWN_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'GrowWise Academic Summer Programs',
    href: '/camps/academic-summer-programs-dublin-ca',
    description: 'Current math, reading, and writing summer tracks.',
  },
  {
    title: 'CA Math Standards by Grade',
    href: CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
    description: 'What students are expected to know at each grade level.',
  },
  {
    title: 'Self-Check Diagnostic Tool',
    href: '/self-check',
    description: 'Quick starting point to identify learning gaps.',
  },
]

export const READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META: ResourceArticleMeta = {
  path: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: 'How to Close Reading Gaps Before Second Grade',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'Reading Program Grades 1-2 Dublin CA | Parent Guide',
  description:
    'Early reading gaps get harder after Grade 2. Learn what phonics, fluency, and comprehension support should look like.',
  keywords:
    'reading program grades 1-2 Dublin CA, early reading support summer Dublin, summer reading program Tri-Valley, grade 1 reading help Dublin, grade 2 reading help Dublin',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
}

export const READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How do I know if my Grade 1 or 2 child needs reading help?',
    answer:
      'Listen while they read grade-level text. Frequent guessing, skipped words, choppy reading, frustration, or weak recall after reading are signals that structured support may help.',
  },
  {
    question: 'Why is Grade 2 such an important reading milestone?',
    answer:
      'By the end of Grade 2, students are expected to move toward reading fluency so Grade 3 can shift from learning to read toward reading to learn.',
  },
  {
    question: 'Is reading at home enough?',
    answer:
      'Home reading is valuable, but a child with a specific gap may also need explicit phonics, fluency, and comprehension instruction with immediate feedback.',
  },
  {
    question: 'Where should Dublin families start?',
    answer:
      'A reading assessment or summer reading/writing program can clarify whether the issue is phonics, fluency, comprehension, confidence, or a mix.',
  },
] as const

export const READING_PROGRAM_GRADES_1_2_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Reading Fluency vs. Comprehension',
    href: '/resources/reading-fluency-vs-comprehension',
    description: 'How to tell which reading skill is actually breaking down.',
  },
  {
    title: 'Summer Reading & Writing Sprint',
    href: '/camps/summer-reading-writing-dublin-ca',
    description: 'Structured summer support for reading and writing skills.',
  },
  {
    title: 'Book a Free Assessment',
    href: '/book-assessment',
    description: 'Get a clearer picture before choosing a program.',
  },
]

export const SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META: ResourceArticleMeta = {
  path: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
  category: 'parent-resources',
  categoryLabel: 'PARENT RESOURCES',
  h1: 'Small Group vs. 1-on-1 Tutoring: Which Works Better for Most Kids?',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'Small Group vs 1-on-1 Tutoring | Dublin CA Guide',
  description:
    'Private tutoring is not always the best fit. Learn when small-group instruction helps students build independence and confidence.',
  keywords:
    'small group tutoring vs 1-on-1, summer tutoring Dublin CA, small group learning Tri-Valley, tutoring alternatives Dublin CA, best tutoring format kids',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
}

export const SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Is small-group tutoring better than private tutoring?',
    answer:
      'It depends on the student and goal. Small groups often work well for transferable skill-building, confidence, and peer explanation. One-on-one can be better for highly individualized needs.',
  },
  {
    question: 'When is one-on-one tutoring the right choice?',
    answer:
      'One-on-one can be appropriate for a diagnosed learning difference, severe anxiety in groups, a specific assignment, or highly targeted test strategy work.',
  },
  {
    question: 'What makes a small group actually small?',
    answer:
      'A meaningful small group is one where the instructor can hear student reasoning, catch errors in real time, and give individual feedback during the session.',
  },
  {
    question: 'How is GrowWise different from homework tutoring?',
    answer:
      'GrowWise programs are structured around skill-building, curriculum sequence, and student independence rather than only getting through this week\'s homework.',
  },
] as const

export const SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Best Tutoring Options in Dublin, CA',
    href: '/resources/tutoring-dublin-ca',
    description: 'Compare tutoring formats and local options.',
  },
  {
    title: '5 Things to Look for in a Summer Academic Program',
    href: '/resources/summer-academic-program-checklist',
    description: 'Questions to ask before paying for any program.',
  },
]

export const CALIFORNIA_MATH_STANDARDS_BY_GRADE_META: ResourceArticleMeta = {
  path: CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: "The Parent's Guide to California Math Standards by Grade",
  readTime: '7 min read',
  updated: 'Updated June 2026',
  title: 'California Math Standards by Grade | Parent Guide',
  description:
    'A parent-friendly grade-by-grade math standards snapshot for Grades 1-10, with red flags that can reveal hidden gaps.',
  keywords:
    'California math standards by grade, CA math standards Tri-Valley, DUSD math standards, PUSD math expectations, math gap assessment Dublin CA',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
}

export const CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Where can I find the official California Math Standards?',
    answer:
      'The official standards are published by the California Department of Education. This guide is a parent-friendly summary, not a replacement for the official standards.',
  },
  {
    question: 'How can I tell if my child is behind grade-level standards?',
    answer:
      'Ask your child to explain a key concept from the grade they just completed. Gaps often show up in explanations even when a calculation looks correct.',
  },
  {
    question: 'Why do math gaps compound over time?',
    answer:
      'Math standards build on earlier concepts. A weak fraction, ratio, or equation foundation can make later algebra and Integrated Math courses feel much harder.',
  },
  {
    question: 'What if my child is ahead?',
    answer:
      'Students who are ahead still need the right next challenge. Enrichment should build reasoning and readiness for the next course, not simply repeat mastered work.',
  },
] as const

export const CALIFORNIA_MATH_STANDARDS_BY_GRADE_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'IM1 Summer Prep Guide',
    href: '/resources/im1-summer-prep-dublin-ca',
    description: 'The readiness skills students need before Integrated Math 1.',
  },
  {
    title: 'Math Sprint Week-by-Week Breakdown',
    href: MATH_SPRINT_BREAKDOWN_PATH,
    description: 'How a structured summer math sprint works.',
  },
  {
    title: 'Self-Check Diagnostic Tool',
    href: '/self-check',
    description: 'Start with a quick view of likely math or English gaps.',
  },
]

export const CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META: ResourceArticleMeta = {
  path: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: 'Does Your Child Have a Writing Problem — or a Confidence Problem?',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'Child Struggles With Writing | Dublin CA Parent Guide',
  description:
    'Blank-page freeze, short answers, and writing avoidance can signal skill gaps, confidence gaps, or both. Learn what helps.',
  keywords:
    'child struggles with writing, writing help Dublin CA, child avoids writing, blank page freeze writing, writing confidence kids, summer writing program Dublin CA',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
}

export const CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How do I know if my child has a writing skill gap?',
    answer:
      'Look for weak structure, thin development, repetitive sentences, missing evidence, vague vocabulary, or an inability to revise beyond spelling fixes.',
  },
  {
    question: 'How do I know if it is a confidence problem?',
    answer:
      'Confidence gaps often show up as blank-page freeze, excessive erasing, tears, avoidance, or a student who can explain ideas verbally but cannot get them onto the page.',
  },
  {
    question: 'Can a child have both problems?',
    answer:
      'Yes. Many students develop confidence issues after repeated skill struggles. Effective writing support needs to build process, skill, and safety together.',
  },
  {
    question: 'What helps writing avoidance?',
    answer:
      'Explicit instruction in planning, structure, sentence craft, and revision helps students know what to do next. Confidence follows when the process becomes repeatable.',
  },
] as const

export const CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Summer Writing Programs in Dublin, CA',
    href: '/resources/summer-writing-program-dublin-ca',
    description: 'How to choose a writing program that teaches real process.',
  },
  {
    title: 'Summer Reading & Writing Sprint',
    href: '/camps/summer-reading-writing-dublin-ca',
    description: 'Current GrowWise reading and writing summer options.',
  },
  {
    title: 'Book a Free Writing Assessment',
    href: '/book-assessment',
    description: 'Get a clearer read on skill gaps and confidence gaps.',
  },
]

