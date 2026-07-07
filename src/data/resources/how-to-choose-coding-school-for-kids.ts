import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH =
  '/resources/how-to-choose-coding-school-for-kids' as const

export const HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META: ResourceArticleMeta = {
  path: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH,
  category: 'stem',
  categoryLabel: 'CODING & STEAM',
  h1: 'How to Choose a Coding School for Your Child',
  readTime: '5 min read',
  updated: 'Updated July 2026',
  title: 'How to Choose a Coding School for Your Child',
  description:
    'Five criteria for choosing the right coding program: age fit, text-based coding, certification pathways, project output, and what to ask before enrolling.',
  keywords:
    'how to choose coding school for kids, coding classes for kids dublin ca, best coding school students, coding program children, python certification students',
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
}

export const HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What age should kids start coding?',
    answer:
      'Most children can start with Scratch-style block coding around age 7–8. Python is typically introduced around age 10–11 when abstract thinking is more developed. GrowWise starts Python from age 10.',
  },
  {
    question: 'Should my child learn Scratch or Python first?',
    answer:
      'Scratch teaches logical flow without syntax. Python introduces real programming concepts. Both are valid starting points, but students who only learn Scratch are not equipped for advanced coding or certification programs.',
  },
  {
    question: 'What is Certiport Python certification for students?',
    answer:
      'Certiport offers the Python Institute PCEP certification, recognized by employers and colleges. GrowWise prepares students for this certification through structured Python coursework.',
  },
  {
    question: 'How long does it take for a child to learn Python?',
    answer:
      'Most students build foundational Python skills in 3–6 months of structured weekly instruction. Certification readiness typically requires 6–12 months depending on starting age and frequency.',
  },
] as const

export const HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_JSONLD_FAQS: readonly ResourceArticleFaq[] =
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_FAQS

export const HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/python-vs-scratch',
    title: 'Python vs. Scratch: Which Should My Child Learn First?',
    description: 'A practical comparison for parents choosing between block coding and text-based programming.',
  },
  {
    href: '/resources/what-is-vibe-coding',
    title: 'What Is Vibe Coding? A Parent Guide',
    description: 'Understand the AI-assisted coding trend and what it means for student learning.',
  },
  {
    href: '/resources/tutoring-dublin-ca',
    title: 'K-12 Tutoring in Dublin, CA',
    description: 'Compare academic programs including coding and STEAM in the Tri-Valley.',
  },
] as const
