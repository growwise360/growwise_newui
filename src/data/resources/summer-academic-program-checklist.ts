import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH = '/resources/summer-academic-program-checklist' as const

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META: ResourceArticleMeta = {
  path: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: '5 Things to Look for in a Summer Academic Program (Before You Pay)',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: '5 Things to Evaluate in Summer Academic Programs | GrowWise',
  description:
    'Not all summer academic programs produce results. Five things to evaluate before you enroll — and questions most programs cannot answer.',
  keywords:
    'summer academic program, summer school, summer tutoring program, summer math camp, summer reading program, best summer academic program, summer learning programs, program evaluation, class size summer camp, summer curriculum',
  datePublished: '2026-06-05',
  dateModified: '2026-06-05',
}

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What class size should I look for in a summer academic program?',
    answer:
      'Six to ten students per instructor is a meaningful small group. Anything above fifteen starts to limit the instructor\'s ability to track individual students and adjust in real time.',
  },
  {
    question: 'How do I know if a summer program actually works?',
    answer:
      'Ask what your child should be able to do at the end of the program. If the program can\'t give you a specific answer, it hasn\'t been designed around outcomes.',
  },
  {
    question: 'Does curriculum alignment to school standards really matter?',
    answer:
      'Yes, especially in math. Districts using Integrated Math pathways have a specific sequence that differs from traditional math tracks. A program not aware of that difference may cover content your child won\'t use, or miss what they actually need.',
  },
  {
    question: 'What questions should I ask before enrolling in a summer academic program?',
    answer:
      'Maximum and average class size, instructor subject background, week-by-week curriculum, measurable outcomes, and district-specific alignment.',
  },
] as const

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What class size should I look for in a summer academic program?',
    answer:
      'Six to ten students per instructor is a meaningful small group. Anything above fifteen starts to limit the instructor\'s ability to track individual students and adjust in real time.',
  },
  {
    question: 'How do I know if a summer program actually works?',
    answer:
      'Ask what your child should be able to do at the end of the program. If the program can\'t give you a specific answer, it hasn\'t been designed around outcomes.',
  },
  {
    question: 'Does curriculum alignment to school standards really matter?',
    answer:
      'Yes, especially in math. Districts using Integrated Math pathways have a specific sequence that differs from traditional math tracks. A program not aware of that difference may cover content your child won\'t use, or miss what they actually need.',
  },
  {
    question: 'What questions should I ask before enrolling in a summer academic program?',
    answer:
      'Maximum and average class size, instructor subject background, week-by-week curriculum, measurable outcomes, and district-specific alignment.',
  },
] as const

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Affordable Summer Academic Programs in Dublin, CA',
    href: '/resources/affordable-summer-academic-programs-dublin-ca',
    description: 'Compare value, class size, and outcomes before you enroll.',
  },
  {
    title: 'Why "We\'ll Do Khan Academy This Summer" Almost Never Works',
    href: '/resources/khan-academy-summer-doesnt-work',
    description: 'Self-paced learning has a completion problem.',
  },
  {
    title: 'GrowWise Summer Programs',
    href: '/camps',
    description: 'See how GrowWise answers each evaluation question.',
  },
]
