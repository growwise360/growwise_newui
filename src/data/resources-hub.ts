export const RESOURCES_PATH = '/resources' as const

export type ResourceCategory = 'academic' | 'steam' | 'sat-prep' | 'local'

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
  { id: 'academic', label: 'Academic' },
  { id: 'steam', label: 'STEAM & Coding' },
  { id: 'sat-prep', label: 'SAT Prep' },
  { id: 'local', label: 'Local' },
]

export const RESOURCE_GUIDES: readonly ResourceGuide[] = [
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
    category: 'steam',
    categoryLabel: 'STEAM & CODING',
    title: 'What is Vibe Coding — And Should Your Child Learn It?',
    description: "The 2026 coding trend explained for parents who didn't grow up coding.",
    readTime: '5 min read',
    href: '/resources/what-is-vibe-coding',
  },
  {
    id: 'python-vs-scratch',
    category: 'steam',
    categoryLabel: 'STEAM & CODING',
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
    id: 'summer-slide-dublin-ca',
    category: 'local',
    categoryLabel: 'LOCAL',
    title: 'The Summer Slide Is Real: What Dublin Parents Need to Know',
    description: 'How students lose months of academic progress every summer — and what structured programs do differently.',
    readTime: '5 min read',
    href: '/resources/summer-slide-dublin-ca',
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
