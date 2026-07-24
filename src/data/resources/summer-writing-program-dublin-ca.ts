import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH = '/resources/summer-writing-program-dublin-ca' as const

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_META: ResourceArticleMeta = {
  path: SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: 'Summer Writing Programs in Dublin, CA: What to Expect and How to Choose',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'Summer Writing Program Dublin CA | Parent Guide | GrowWise',
  description:
    'Compare Dublin CA writing camps by structure, feedback, revision, and outcomes so your child builds a writing system before school starts.',
  keywords:
    'summer writing program Dublin CA, writing camp Tri-Valley, summer writing classes Dublin, writing instruction grades 1-8, academic writing camp, writing sprint, essay writing program, summer writing camp Pleasanton, San Ramon writing program',
  datePublished: '2026-06-06',
  dateModified: '2026-06-09',
}

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is a summer writing program?',
    answer:
      'A strong summer writing program teaches students how to plan, structure, draft, revise, and write for a reader. It should do more than assign prompts or correct grammar after the fact.',
  },
  {
    question: 'What ages are summer writing programs for?',
    answer:
      'GrowWise summer reading and writing programs serve elementary and middle school students, with instruction adjusted by grade level and skill profile.',
  },
  {
    question: 'How do I know if my child needs a writing program?',
    answer:
      'Look for blank page freeze, avoidance, weak paragraph structure, good verbal ideas that become thin writing, or first drafts submitted as finals without meaningful revision.',
  },
  {
    question: 'What is the difference between a creative writing camp and an academic writing program?',
    answer:
      'Creative writing camps often emphasize storytelling and expression. Academic writing programs emphasize structure, evidence, revision, clarity, and the writing skills students need for essays, exams, and reports.',
  },
  {
    question: 'Where is GrowWise located?',
    answer:
      '4564 Dublin Blvd, Dublin, CA. Programs serve families from Dublin, Pleasanton, San Ramon, and Livermore.',
  },
] as const

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_JSONLD_FAQS = SUMMER_WRITING_PROGRAM_DUBLIN_CA_FAQS

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Summer Reading & Writing Sprint',
    href: '/camps/summer-reading-writing-dublin-ca',
    description: 'See the current reading and writing summer program options.',
  },
  {
    title: 'Self-Check: Is Your Child Ready?',
    href: '/self-check',
    description: '10-minute assessment for writing readiness.',
  },
  {
    title: 'Book a Free Writing Assessment',
    href: '/book-assessment',
    description: 'Get a detailed writing profile from a GrowWise instructor.',
  },
]
