import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_SLIDE_DUBLIN_CA_PATH = '/resources/summer-slide-dublin-ca' as const

export const SUMMER_SLIDE_DUBLIN_CA_META: ResourceArticleMeta = {
  path: SUMMER_SLIDE_DUBLIN_CA_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: 'The Summer Slide Is Real: What Dublin Parents Need to Know Before June Ends',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: 'Summer Slide Dublin CA: What Parents Need to Know | GrowWise',
  description:
    'Dublin and Tri-Valley students lose months of progress every summer. Learn what the summer slide looks like — and how structured programs prevent it.',
  keywords:
    'summer slide Dublin CA, academic summer programs Dublin CA, summer learning loss Tri-Valley, summer slide prevention, summer tutoring Dublin CA, academic summer camp Dublin CA, summer programs Dublin, summer learning loss Dublin CA',
  datePublished: '2026-06-01',
  dateModified: '2026-06-01',
}

export const SUMMER_SLIDE_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is the summer slide?',
    answer:
      'The summer slide refers to the measurable loss of academic skills — especially in reading and math — that students experience during summer break when learning is not actively maintained.',
  },
  {
    question: 'How much learning do kids lose over summer?',
    answer:
      'Research suggests students can lose two to three months of reading progress and similar ground in math computation skills over a 10–12 week summer.',
  },
  {
    question: 'Is the summer slide worse for some students than others?',
    answer:
      'Yes. Students in accelerated tracks, students with existing gaps, and younger students in critical reading development windows tend to experience greater regression if learning stops entirely.',
  },
  {
    question: 'Does going to a summer academic program really help?',
    answer:
      'Structured programs with defined curriculum, live instruction, and regular frequency have consistently shown better outcomes than self-paced or sporadic alternatives.',
  },
  {
    question: 'Where is GrowWise located?',
    answer:
      'GrowWise School is at 4564 Dublin Blvd, Dublin, CA. Programs serve families from Dublin, Pleasanton, San Ramon, Livermore, and across the Tri-Valley.',
  },
]

export const SUMMER_SLIDE_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'How to Prevent Summer Slide: What Actually Works',
    href: '/resources/summer-slide-prevention',
    description: 'Evidence-based strategies to prevent summer learning loss.',
  },
  {
    title: 'K-12 Tutoring in Dublin, CA: How to Choose the Right Program',
    href: '/resources/tutoring-dublin-ca',
    description: 'An honest comparison of programs serving the Tri-Valley area.',
  },
  {
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
    href: '/resources/careless-math-mistakes',
    description: "It's rarely a knowledge problem. Here's the exact pattern and how to break it.",
  },
]
