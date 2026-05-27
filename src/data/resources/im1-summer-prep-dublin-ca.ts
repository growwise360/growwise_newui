import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const IM1_SUMMER_PREP_DUBLIN_CA_PATH = '/resources/im1-summer-prep-dublin-ca' as const

export const IM1_SUMMER_PREP_DUBLIN_CA_META: ResourceArticleMeta = {
  path: IM1_SUMMER_PREP_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL',
  h1: 'Is Your Child Ready for IM1? An Honest Summer Prep Guide for Dublin & Tri-Valley Families',
  readTime: '6 min read',
  updated: 'Updated May 2026',
  title: 'IM1 Summer Prep Guide | Dublin & Tri-Valley | GrowWise',
  description:
    'IM1 starts in September. Here are the skills students need before day one — and the gaps most Dublin and Pleasanton kids arrive with. Prep starts July 20.',
  keywords:
    'IM1 math prep, integrated math 1, IM1 summer prep Dublin CA, IM1 readiness Tri-Valley, IM1 summer program, math prep Dublin California, Pleasanton math prep, DUSD IM1 prep, PUSD IM1, summer math program Dublin',
  datePublished: '2026-06-04',
  dateModified: '2026-06-04',
}

export const IM1_SUMMER_PREP_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is IM1 math?',
    answer:
      'Integrated Math 1 is the first course in California\'s Integrated Math pathway. It combines algebra, geometry, and statistics in a single course rather than treating them separately. Most DUSD students take it in 7th grade accelerated or 8th grade standard track.',
  },
  {
    question: 'Is IM1 harder than regular 7th grade math?',
    answer:
      'Yes. The content is more advanced, the pacing is faster, and the reasoning demands are higher. Students in the accelerated track are expected to handle abstract concepts earlier.',
  },
  {
    question: 'What skills does my child need before starting IM1?',
    answer:
      'Fraction and decimal fluency, proportional reasoning, basic algebraic thinking, coordinate plane literacy, and the ability to approach multi-step problems systematically.',
  },
  {
    question: 'When should my child start IM1 prep?',
    answer:
      'Ideally 4–6 weeks before school starts — enough time to close gaps without being so early that skills fade again before September.',
  },
  {
    question: 'Does the GrowWise IM1 program align to DUSD curriculum?',
    answer:
      'Yes. The program is built around the IM1 scope and sequence as implemented in Dublin Unified and Pleasanton Unified school districts.',
  },
] as const

export const IM1_SUMMER_PREP_DUBLIN_CA_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is IM1 math?',
    answer:
      'Integrated Math 1 is the first course in California\'s Integrated Math pathway. It combines algebra, geometry, and statistics in a single course rather than treating them separately. Most DUSD students take it in 7th grade accelerated or 8th grade standard track.',
  },
  {
    question: 'Is IM1 harder than regular 7th grade math?',
    answer:
      'Yes. The content is more advanced, the pacing is faster, and the reasoning demands are higher. Students in the accelerated track are expected to handle abstract concepts earlier.',
  },
  {
    question: 'What skills does my child need before starting IM1?',
    answer:
      'Fraction and decimal fluency, proportional reasoning, basic algebraic thinking, coordinate plane literacy, and the ability to approach multi-step problems systematically.',
  },
  {
    question: 'When should my child start IM1 prep?',
    answer:
      'Ideally 4–6 weeks before school starts — enough time to close gaps without being so early that skills fade again before September.',
  },
  {
    question: 'Does the GrowWise IM1 program align to DUSD curriculum?',
    answer:
      'Yes. The program is built around the IM1 scope and sequence as implemented in Dublin Unified and Pleasanton Unified school districts.',
  },
] as const

export const IM1_SUMMER_PREP_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'Self-Check: Is Your Child Ready for IM1?',
    href: '/self-check',
    description: '10-minute assessment to identify specific skill gaps.',
  },
  {
    title: 'How to Prevent Summer Slide',
    href: '/resources/summer-slide-prevention',
    description: 'Maintain skills over the summer break.',
  },
]
