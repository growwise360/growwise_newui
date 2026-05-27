import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH = '/resources/summer-writing-program-dublin-ca' as const

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_META: ResourceArticleMeta = {
  path: SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL',
  h1: 'Summer Writing Programs in Dublin, CA: What to Expect and How to Choose',
  readTime: '6 min read',
  updated: 'Updated May 2026',
  title: 'Summer Writing Programs Dublin CA | Tri-Valley | GrowWise',
  description:
    'Most kids never receive direct writing instruction. What good writing programs teach — and what to look for in Tri-Valley summer options.',
  keywords:
    'summer writing program Dublin CA, writing camp Tri-Valley, summer writing classes Dublin, writing instruction grades 2-8, academic writing camp, writing sprint, essay writing program, summer writing camp Pleasanton, San Ramon writing program',
  datePublished: '2026-06-06',
  dateModified: '2026-06-06',
}

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is a summer writing program?',
    answer:
      'A structured program that teaches students how to write — not just assigns writing. Good programs cover planning, structure, evidence use, and revision in a sequential curriculum.',
  },
  {
    question: 'What ages are summer writing programs for?',
    answer:
      'Most structured writing programs target Grades 2–8. GrowWise Writing Sprints serve students in that range, with instruction adjusted by grade level and skill profile.',
  },
  {
    question: 'How do I know if my child needs a writing program?',
    answer:
      'Look for signs like avoiding written work, very short answers, restating questions instead of answering them, or submitting first drafts as finals without attempting revision.',
  },
  {
    question: 'What is the difference between a creative writing camp and an academic writing program?',
    answer:
      'Creative writing camps focus on storytelling, personal expression, and genre exploration. Academic writing programs focus on argument structure, evidence use, and clarity — the skills students need on essays, exams, and reports.',
  },
  {
    question: 'Where is GrowWise located?',
    answer:
      '4564 Dublin Blvd, Dublin, CA. Programs serve families from Dublin, Pleasanton, San Ramon, and Livermore.',
  },
] as const

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is a summer writing program?',
    answer:
      'A structured program that teaches students how to write — not just assigns writing. Good programs cover planning, structure, evidence use, and revision in a sequential curriculum.',
  },
  {
    question: 'What ages are summer writing programs for?',
    answer:
      'Most structured writing programs target Grades 2–8. GrowWise Writing Sprints serve students in that range, with instruction adjusted by grade level and skill profile.',
  },
  {
    question: 'How do I know if my child needs a writing program?',
    answer:
      'Look for signs like avoiding written work, very short answers, restating questions instead of answering them, or submitting first drafts as finals without attempting revision.',
  },
  {
    question: 'What is the difference between a creative writing camp and an academic writing program?',
    answer:
      'Creative writing camps focus on storytelling, personal expression, and genre exploration. Academic writing programs focus on argument structure, evidence use, and clarity — the skills students need on essays, exams, and reports.',
  },
  {
    question: 'Where is GrowWise located?',
    answer:
      '4564 Dublin Blvd, Dublin, CA. Programs serve families from Dublin, Pleasanton, San Ramon, and Livermore.',
  },
] as const

export const SUMMER_WRITING_PROGRAM_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
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
