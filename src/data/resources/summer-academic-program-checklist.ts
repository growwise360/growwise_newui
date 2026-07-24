import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH = '/resources/summer-academic-program-checklist' as const

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META: ResourceArticleMeta = {
  path: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: '5 Things to Look for in a Summer Academic Program (Before You Pay)',
  readTime: '5 min read',
  updated: 'Updated June 2026',
  title: 'Best Summer Academic Program Dublin CA | 5 Checks',
  description:
    'Before you enroll, check class size, instructor expertise, curriculum, outcomes, and school-year alignment for Dublin CA summer programs.',
  keywords:
    'best summer academic program Dublin CA, summer academic program Dublin CA, summer enrichment Tri-Valley, academic summer camp Dublin, summer reading writing math program Dublin, how to choose summer program Dublin CA',
  datePublished: '2026-06-05',
  dateModified: '2026-06-09',
}

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What class size should I look for in a summer academic program?',
    answer:
      'Look for a true small-group model where the instructor can notice errors, answer individual questions, and adjust pacing. Ask for both the maximum class size and the typical group size.',
  },
  {
    question: 'How do I know if a summer program actually works?',
    answer:
      'Ask what your child should be able to do, make, solve, or explain by the end. If the answer is vague, the program may not be designed around measurable outcomes.',
  },
  {
    question: 'Does curriculum alignment to school standards really matter?',
    answer:
      'Yes, especially in math. Districts using Integrated Math pathways have a specific sequence that differs from traditional math tracks. A program not aware of that difference may cover content your child won\'t use, or miss what they actually need.',
  },
  {
    question: 'What questions should I ask before enrolling in a summer academic program?',
    answer:
      'Ask about class size, instructor subject background, the curriculum sequence, measurable student outcomes, and whether the program connects to California standards or your local school pathway.',
  },
] as const

export const SUMMER_ACADEMIC_PROGRAM_CHECKLIST_JSONLD_FAQS = SUMMER_ACADEMIC_PROGRAM_CHECKLIST_FAQS

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
    title: 'GrowWise Academic Summer Programs',
    href: '/camps/academic-summer-programs-dublin-ca',
    description: 'See how GrowWise answers each evaluation question.',
  },
  {
    href: '/resources/back-to-school-math-assessment-dublin-ca',
    title: 'Back-to-School Math Assessment Guide',
    description: 'Is your child ready for the next grade? Use this guide to check before the school year starts.',
  },
  {
    href: '/camps/summer',
    title: 'Summer Academic Camps in Dublin, CA',
    description: 'Structured summer programs in math, English, coding, and SAT prep for K–12 students in Dublin.',
  },
]
