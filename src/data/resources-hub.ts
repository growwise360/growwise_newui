export const RESOURCES_PATH = '/resources' as const

export type ResourceCategory = 'academic' | 'stem' | 'sat-prep' | 'local' | 'summer-learning' | 'parent-resources'

export type ResourceFilterId = 'all' | ResourceCategory

export type ResourceGuide = {
  id: string
  category: ResourceCategory
  categoryLabel: string
  title: string
  description: string
  readTime: string
  href: string
}

export const RESOURCE_FILTERS: ReadonlyArray<{ id: ResourceFilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'parent-resources', label: 'Parent Resources' },
  { id: 'academic', label: 'Academic' },
  { id: 'summer-learning', label: 'Summer Learning' },
  { id: 'stem', label: 'STEM' },
  { id: 'sat-prep', label: 'SAT Prep' },
  { id: 'local', label: 'Local' },
]

export function resourceCategoryTagClass(category: ResourceCategory): string {
  if (category === 'parent-resources') {
    return 'bg-[#F97316]/10 text-[#1E3A5F] ring-1 ring-[#F97316]/20'
  }
  if (category === 'stem') {
    return 'bg-[#F16112]/10 text-[#C45A1A] ring-1 ring-[#F16112]/20'
  }
  if (category === 'summer-learning') {
    return 'bg-amber-50 text-amber-900 ring-1 ring-amber-200/80'
  }
  if (category === 'local') {
    return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
  }
  if (category === 'sat-prep') {
    return 'bg-violet-50 text-violet-900 ring-1 ring-violet-200/80'
  }
  return 'bg-[#1F396D]/10 text-[#1F396D] ring-1 ring-[#1F396D]/15'
}

export const RESOURCE_GUIDES: readonly ResourceGuide[] = [
  {
    id: 'math-reading-readiness-checklist',
    category: 'parent-resources',
    categoryLabel: 'PARENT RESOURCES',
    title: 'Free Math & Reading Readiness Checklist',
    description:
      'Quick interactive tool to identify academic gaps in grades 1–8. No signup required. Takes 3 minutes.',
    readTime: 'Interactive',
    href: '/readinesschecklist',
  },
  {
    id: 'self-check',
    category: 'parent-resources',
    categoryLabel: 'PARENT RESOURCES',
    title: 'Free Self-Check Diagnostic Tool',
    description:
      'Interactive assessment to help your child discover their learning style and identify knowledge gaps quickly.',
    readTime: 'Interactive',
    href: '/self-check',
  },
  {
    id: 'back-to-school-math-assessment-dublin-ca',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'Back-to-School Math Assessment Guide for Dublin, CA Families',
    description:
      'Before August, check the math skills your child needs for the next grade, from fractions and ratios to Algebra, Geometry, and IM1.',
    readTime: '6 min read',
    href: '/resources/back-to-school-math-assessment-dublin-ca',
  },
  {
    id: 'english-tutor-vs-reading-tutor-vs-writing-class',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'English Tutor, Reading Tutor, or Writing Class: Which Does Your Child Need?',
    description:
      'Compare English tutoring, reading tutoring, and writing classes so you can choose the right support before the school-year rush.',
    readTime: '6 min read',
    href: '/resources/english-tutor-vs-reading-tutor-vs-writing-class',
  },
  {
    id: 'math-tutoring-options-dublin-ca',
    category: 'local',
    categoryLabel: 'LOCAL',
    title: 'Kumon vs. Mathnasium vs. Private Tutor: How Dublin Parents Should Compare Math Options',
    description:
      'A practical comparison framework for Dublin families choosing back-to-school math support.',
    readTime: '7 min read',
    href: '/resources/math-tutoring-options-dublin-ca',
  },
  {
    id: 'middle-school-math-readiness-checklist',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'Middle School Math Readiness Checklist for Grades 6-8',
    description:
      'A practical August checklist for fractions, ratios, equations, graphing, word problems, and IM1 readiness.',
    readTime: '6 min read',
    href: '/resources/middle-school-math-readiness-checklist',
  },
  {
    id: 'reading-fluency-vs-comprehension',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'Reading Fluency vs. Reading Comprehension: Why Your Child Might Struggle With One and Not the Other',
    description:
      'Your child can decode every word but still not understand what they read. Learn how to tell fluency gaps from comprehension gaps.',
    readTime: '6 min read',
    href: '/resources/reading-fluency-vs-comprehension',
  },
  {
    id: 'why-grades-hide-learning-gaps',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: "Why Your Child's A Grade May Be Hiding a Learning Gap",
    description:
      "A grade measures performance on one day — not understanding. Three signs your child's grade is hiding a gap, and what to do about it.",
    readTime: '5 min read',
    href: '/resources/why-grades-hide-learning-gaps',
  },
  {
    id: 'careless-math-mistakes',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
    description:
      "It's rarely a knowledge problem. Here's the exact pattern and how to break it.",
    readTime: '6 min read',
    href: '/resources/careless-math-mistakes',
  },
  {
    id: 'homework-independence',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'How to Stop Sitting Next to Your Child Every Homework Night',
    description: 'The system that builds independence in 6–8 weeks — without the fights.',
    readTime: '5 min read',
    href: '/resources/homework-independence',
  },
  {
    id: 'when-to-start-sat-prep',
    category: 'sat-prep',
    categoryLabel: 'SAT PREP',
    title: 'When Should My Child Start SAT Prep?',
    description: 'Grade 8, 9, or 10? The answer depends on one thing most parents miss.',
    readTime: '4 min read',
    href: '/resources/when-to-start-sat-prep',
  },
  {
    id: 'what-is-vibe-coding',
    category: 'stem',
    categoryLabel: 'STEM',
    title: 'What is Vibe Coding — And Should Your Child Learn It?',
    description: "The 2026 coding trend explained for parents who didn't grow up coding.",
    readTime: '5 min read',
    href: '/resources/what-is-vibe-coding',
  },
  {
    id: 'python-vs-scratch',
    category: 'stem',
    categoryLabel: 'STEM',
    title: 'Python vs Scratch: Which Should My Child Learn First?',
    description: 'Age-by-age breakdown. What each teaches and when to switch.',
    readTime: '4 min read',
    href: '/resources/python-vs-scratch',
  },
  {
    id: 'tutoring-dublin-ca',
    category: 'local',
    categoryLabel: 'LOCAL',
    title: 'Best Tutoring Options in Dublin, CA for Grades 1–12 (2026)',
    description: 'An honest comparison of programs serving the Tri-Valley area.',
    readTime: '6 min read',
    href: '/resources/tutoring-dublin-ca',
  },
  {
    id: 'how-to-choose-summer-camp',
    category: 'parent-resources',
    categoryLabel: 'PARENT RESOURCES',
    title: 'How to Choose the Right Summer Camp for Your Child',
    description: "Interactive parent guide to choose between academic sprint, STEAM coding, and enrichment based on your child's goal.",
    readTime: 'Interactive',
    href: '/resources/how-to-choose-summer-camp',
  },
  {
    id: 'summer-slide-dublin-ca',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'The Summer Slide Is Real: What Dublin Parents Need to Know',
    description: 'How students lose months of academic progress every summer — and what structured programs do differently.',
    readTime: '5 min read',
    href: '/resources/summer-slide-dublin-ca',
  },
  {
    id: 'summer-slide-prevention',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'How to Prevent Summer Slide: What Actually Works (And What Parents Waste Money On)',
    description: "Summer learning loss is real. Here's what actually prevents it — and why most summer plans fail by July.",
    readTime: '5 min read',
    href: '/resources/summer-slide-prevention',
  },
  {
    id: 'khan-academy-summer-doesnt-work',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: "Why \"We'll Do Khan Academy This Summer\" Almost Never Works (And What Does)",
    description:
      "Self-paced online learning has a completion problem. Here's why most at-home summer learning plans fail by July — and what the research says actually works.",
    readTime: '5 min read',
    href: '/resources/khan-academy-summer-doesnt-work',
  },
  {
    id: 'im1-summer-prep-dublin-ca',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'Is Your Child Ready for IM1? An Honest Summer Prep Guide for Dublin & Tri-Valley Families',
    description:
      'IM1 starts in September. Here are the skills students need before day one — and the gaps most Dublin and Pleasanton kids arrive with. Prep starts July 20.',
    readTime: '6 min read',
    href: '/resources/im1-summer-prep-dublin-ca',
  },
  {
    id: 'summer-academic-program-checklist',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: '5 Things to Look for in a Summer Academic Program (Before You Pay)',
    description:
      "Not all summer academic programs produce results. Here are five concrete things to evaluate before you enroll — and the questions most programs can't answer.",
    readTime: '5 min read',
    href: '/resources/summer-academic-program-checklist',
  },
  {
    id: 'affordable-summer-academic-programs-dublin-ca',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'Affordable Summer Academic Programs in Dublin, CA: What\'s Available and What to Expect',
    description:
      'Compare summer academic programs in Dublin, CA and learn how to evaluate true value based on class size, outcomes, structure, and skill-building.',
    readTime: '6 min read',
    href: '/resources/affordable-summer-academic-programs-dublin-ca',
  },
  {
    id: 'math-summer-program-dublin-ca-math-sprint-breakdown',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'What Happens in a GrowWise Math Sprint: A Week-by-Week Breakdown',
    description:
      'What students actually do each week: baseline checks, core skills, problem solving, and confidence-building review.',
    readTime: '6 min read',
    href: '/resources/math-summer-program-dublin-ca-math-sprint-breakdown',
  },
  {
    id: 'reading-program-grades-1-2-dublin-ca',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'How to Close Reading Gaps Before Second Grade',
    description:
      'Early reading gaps get harder after Grade 2. Learn what structured phonics, fluency, and comprehension support looks like.',
    readTime: '6 min read',
    href: '/resources/reading-program-grades-1-2-dublin-ca',
  },
  {
    id: 'small-group-tutoring-vs-1-on-1',
    category: 'parent-resources',
    categoryLabel: 'PARENT RESOURCES',
    title: 'Small Group vs. 1-on-1 Tutoring: Which Works Better?',
    description:
      'Private tutoring is not always the right fit. Learn when small-group instruction builds better independence and confidence.',
    readTime: '6 min read',
    href: '/resources/small-group-tutoring-vs-1-on-1',
  },
  {
    id: 'california-math-standards-by-grade',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: "The Parent's Guide to California Math Standards by Grade",
    description:
      'A parent-friendly standards snapshot for Grades 1-10, with red flags that can reveal hidden math gaps.',
    readTime: '7 min read',
    href: '/resources/california-math-standards-by-grade',
  },
  {
    id: 'summer-writing-program-dublin-ca',
    category: 'summer-learning',
    categoryLabel: 'SUMMER LEARNING',
    title: 'Summer Writing Programs in Dublin, CA: What to Expect and How to Choose',
    description:
      "Most kids never receive direct writing instruction. Here's what good writing programs actually teach — and what to look for in Tri-Valley summer options.",
    readTime: '6 min read',
    href: '/resources/summer-writing-program-dublin-ca',
  },
  {
    id: 'child-struggles-with-writing-dublin-ca',
    category: 'academic',
    categoryLabel: 'ACADEMIC',
    title: 'Why Your Child Struggles With Writing: Skill Gap or Confidence Gap?',
    description:
      'Blank-page freeze, short answers, and writing avoidance can signal skill gaps, confidence gaps, or both.',
    readTime: '6 min read',
    href: '/resources/child-struggles-with-writing-dublin-ca',
  },
]

export const RESOURCES_HERO = {
  preLabel: 'FREE PARENT GUIDES',
  h1: 'Answers to the questions every parent is asking',
  subtext:
    'Research-backed guides on academic struggles, coding for kids, and how to help without the nightly battles.',
} as const

export const RESOURCES_CTA = {
  heading: 'Not sure where to start?',
  subtext: "Book a free assessment — we'll tell you exactly what your child needs.",
  button: 'Book Free Assessment →',
} as const
