import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_SLIDE_PREVENTION_PATH = '/resources/summer-slide-prevention' as const

export const SUMMER_SLIDE_PREVENTION_META: ResourceArticleMeta = {
  path: SUMMER_SLIDE_PREVENTION_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: 'How to Prevent Summer Slide: What Actually Works (And What Parents Waste Money On)',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: 'How to Prevent Summer Slide in Math & Reading | GrowWise',
  description:
    "Summer learning loss is real. Here's what actually prevents it — and why most summer plans fail by July.",
  keywords:
    'summer slide, prevent summer learning loss, summer academic skills, summer math review, summer reading practice, kids learning over summer break, summer academic program, how to prevent summer slide, summer tutoring, summer learning activities',
  datePublished: '2026-06-02',
  dateModified: '2026-06-02',
}

export const SUMMER_SLIDE_PREVENTION_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How much do kids really lose over summer?',
    answer:
      'Research varies by subject and grade level, but on average students lose 2–3 months of academic progress over a 10-week summer break. Math losses are typically larger than reading losses. Students from lower-income backgrounds tend to experience larger losses.',
  },
  {
    question: 'What is the best way to prevent summer slide?',
    answer:
      'Regular, structured practice in the skill areas where your child is weakest — not random review. The key is frequency (3–4 times per week) and consistency (same time, same activity), not intensity (long sessions are less effective than short regular ones).',
  },
  {
    question: 'How much time per day prevents summer slide?',
    answer:
      '15–20 minutes of focused, targeted practice 3–4 days per week is typically sufficient to maintain skills. This beats 2 hours once a week. Consistency matters more than duration.',
  },
  {
    question: 'Is summer school the only way to prevent summer slide?',
    answer:
      "No. Summer school works, but so do targeted tutoring, skill-focused camps, and structured at-home practice — if they are consistent and targeted to the child's specific gaps. Generic review does not prevent slide.",
  },
  {
    question: 'What type of summer activity is most effective?',
    answer:
      'Activities that directly target demonstrated skill gaps, with regular feedback and difficulty adjustment, are most effective. This includes tutoring, skill-focused camps, or guided practice. Open-ended creative activities, while valuable, do not prevent slide in academic skills.',
  },
] as const

export const SUMMER_SLIDE_PREVENTION_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How much do kids really lose over summer?',
    answer:
      'Research varies by subject and grade level, but on average students lose 2–3 months of academic progress over a 10-week summer break. Math losses are typically larger than reading losses. Students from lower-income backgrounds tend to experience larger losses.',
  },
  {
    question: 'What is the best way to prevent summer slide?',
    answer:
      'Regular, structured practice in the skill areas where your child is weakest — not random review. The key is frequency (3–4 times per week) and consistency (same time, same activity), not intensity (long sessions are less effective than short regular ones).',
  },
  {
    question: 'How much time per day prevents summer slide?',
    answer:
      '15–20 minutes of focused, targeted practice 3–4 days per week is typically sufficient to maintain skills. This beats 2 hours once a week. Consistency matters more than duration.',
  },
  {
    question: 'Is summer school the only way to prevent summer slide?',
    answer:
      "No. Summer school works, but so do targeted tutoring, skill-focused camps, and structured at-home practice — if they are consistent and targeted to the child's specific gaps. Generic review does not prevent slide.",
  },
  {
    question: 'What type of summer activity is most effective?',
    answer:
      'Activities that directly target demonstrated skill gaps, with regular feedback and difficulty adjustment, are most effective. This includes tutoring, skill-focused camps, or guided practice. Open-ended creative activities, while valuable, do not prevent slide in academic skills.',
  },
] as const

export const SUMMER_SLIDE_PREVENTION_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Why "We\'ll Do Khan Academy This Summer" Almost Never Works',
    href: '/resources/khan-academy-summer-doesnt-work',
    description: 'Self-paced learning has a completion problem. Here\'s why.',
  },
  {
    title: '5 Things to Look for in a Summer Academic Program',
    href: '/resources/summer-academic-program-checklist',
    description: 'What separates effective programs from ones that look good on paper.',
  },
  {
    title: 'Summer Reading & Math Programs',
    href: '/camps',
    description: 'GrowWise academic programs designed to prevent summer slide.',
  },
  {
    title: 'The Summer Slide Is Real: What Dublin Parents Need to Know',
    href: '/resources/summer-slide-dublin-ca',
    description: 'Local context for Tri-Valley families on summer learning loss.',
  },
]
