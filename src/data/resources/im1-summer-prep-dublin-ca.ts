import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const IM1_SUMMER_PREP_DUBLIN_CA_PATH = '/resources/im1-summer-prep-dublin-ca' as const

export const IM1_SUMMER_PREP_DUBLIN_CA_META: ResourceArticleMeta = {
  path: IM1_SUMMER_PREP_DUBLIN_CA_PATH,
  category: 'summer-learning',
  categoryLabel: 'SUMMER LEARNING',
  h1: 'Is Your Child Ready for IM1? An Honest Summer Prep Guide for Dublin & Tri-Valley Families',
  readTime: '6 min read',
  updated: 'Updated June 2026',
  title: 'IM1 Summer Prep Dublin CA | Readiness Guide | GrowWise',
  description:
    'Integrated Math 1 starts fast. Learn the pre-algebra, ratio, graphing, and equation skills Dublin students need before day one.',
  keywords:
    'IM1 summer prep Dublin CA, integrated math 1 prep Tri-Valley, IM1 readiness checklist, DUSD math prep, PUSD IM1 prep, summer math program Dublin, pre-algebra prep, math camp Dublin CA',
  datePublished: '2026-06-04',
  dateModified: '2026-06-09',
}

export const IM1_SUMMER_PREP_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is IM1 math?',
    answer:
      'Integrated Math 1 is the first course in California\'s Integrated Math pathway. It combines algebra, geometry, statistics, and mathematical reasoning in a single course rather than treating them as separate subjects.',
  },
  {
    question: 'What skills does my child need before starting IM1?',
    answer:
      'Students should be fluent with fractions, ratios, proportions, negative numbers, basic equations, graphing points, and multi-step problem solving before the first unit begins.',
  },
  {
    question: 'How do I know if my child needs IM1 summer prep?',
    answer:
      'Ask them to solve a fraction division problem, explain what x means in a two-step equation, and graph a line from two points. Hesitation, guessing, or calculator dependence usually means the foundation needs work.',
  },
  {
    question: 'When should my child start IM1 prep?',
    answer:
      'Ideally four to six weeks before school starts. That gives enough time to close priority gaps without waiting until those gaps are already affecting grades.',
  },
  {
    question: 'Does the GrowWise IM1 program align to DUSD curriculum?',
    answer:
      'GrowWise IM1 prep is built around the skills local Integrated Math pathways expect: rational number fluency, proportional reasoning, algebraic translation, graphing, and organized multi-step work.',
  },
] as const

export const IM1_SUMMER_PREP_DUBLIN_CA_JSONLD_FAQS = IM1_SUMMER_PREP_DUBLIN_CA_FAQS

export const IM1_SUMMER_PREP_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'IM1 Get Ready Program',
    href: '/camps/summer-im1-get-ready-dublin-ca',
    description: 'Focused summer prep for the skills Integrated Math 1 assumes on day one.',
  },
  {
    title: 'Self-Check: Is Your Child Ready for IM1?',
    href: '/self-check',
    description: 'Quick assessment to identify specific skill gaps.',
  },
]
