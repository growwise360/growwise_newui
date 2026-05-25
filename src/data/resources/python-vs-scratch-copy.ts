import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const PYTHON_VS_SCRATCH_PATH = '/resources/python-vs-scratch' as const

export const PYTHON_VS_SCRATCH_META: ResourceArticleMeta = {
  path: PYTHON_VS_SCRATCH_PATH,
  category: 'steam',
  categoryLabel: 'STEAM & CODING',
  h1: 'Python vs Scratch: Which Should Your Child Learn First?',
  readTime: '4 min read',
  updated: 'Updated May 2026',
  title: 'Python vs Scratch for Kids: Which Should Your Child Learn First? | GrowWise',
  description:
    "Scratch or Python? The honest, age-by-age answer for parents — including when to switch, what Scratch can't do, and why most kids need both in the right order.",
  keywords:
    'Python vs Scratch for kids, should kids learn Scratch or Python first, Scratch or Python which is better for kids, when to switch from Scratch to Python, best coding language for kids, Scratch for kids ages 6-10, Python for kids ages 10-14, coding for kids beginners, MIT Scratch programming children',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
}

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly. */
export const PYTHON_VS_SCRATCH_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Is Scratch real programming or just a toy?',
    answer:
      'Scratch is real programming. It teaches every foundational concept Python requires — sequencing, loops, conditionals, variables. The visual format makes those concepts accessible to younger children. A student who understands what they are building in Scratch has a genuine coding foundation.',
  },
  {
    question: 'At what age should a child switch from Scratch to Python?',
    answer:
      'Ages 10–12 is the most common transition window. At this age, children have the abstract reasoning and frustration tolerance for text-based syntax. Signs of readiness include creating Scratch projects independently, debugging their own errors, and asking whether Scratch can do more.',
  },
  {
    question: 'Can a child skip Scratch and go straight to Python?',
    answer:
      "Yes — especially for children aged 13 and above who find Scratch too simple and are motivated by Python's real-world applications. For children under 10, starting Python without a visual foundation is generally not recommended.",
  },
  {
    question: 'Is Python still worth learning with AI writing code?',
    answer:
      'Yes — more than ever. Python is the primary language of AI development. Students who understand Python can evaluate, debug, and direct AI output. Students who only prompt AI without understanding what it produces hit a ceiling at the first real error.',
  },
  {
    question: 'What can Scratch not do that Python can?',
    answer:
      'Scratch cannot be used to build web applications, connect to real APIs, train machine learning models, or develop professional software. After 12–18 months of regular use, most students reach the edge of what Scratch can produce. Python has no such ceiling.',
  },
] as const

export const PYTHON_VS_SCRATCH_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/what-is-vibe-coding',
    title: 'What Is Vibe Coding — And Should Your Child Learn It?',
  },
] as const
