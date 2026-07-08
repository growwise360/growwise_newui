import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const RSM_ALTERNATIVE_DUBLIN_CA_PATH = '/resources/rsm-alternative-dublin-ca' as const

export const RSM_ALTERNATIVE_DUBLIN_CA_META: ResourceArticleMeta = {
  path: RSM_ALTERNATIVE_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL RESOURCE',
  h1: 'RSM Alternative in Dublin, CA — School-Aligned Depth Without Overload',
  readTime: '6 min read',
  updated: 'Updated July 2026',
  title: 'RSM Alternative in Dublin CA | School-Aligned Math',
  description:
    'Weighing RSM in Dublin or Pleasanton? Compare its accelerated separate curriculum with GrowWise\'s school-aligned, depth-plus-retention approach.',
  keywords:
    'rsm alternative dublin ca, russian school of math alternative, rsm vs growwise, integrated math tutor dublin ca, im1 tutor pleasanton',
  datePublished: '2026-07-08',
  dateModified: '2026-07-08',
}

export const RSM_ALTERNATIVE_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How is GrowWise different from RSM in Dublin and Pleasanton?',
    answer:
      'RSM runs an accelerated curriculum that can be one to three years ahead of your child\'s school grade level, with regular homework across the week. For competition-track students aiming at AMC8 or MATHCOUNTS, that model can be valuable. For many Tri-Valley students, it means working on a separate timeline from what their school tests next week. GrowWise aligns to the exact unit your child\'s school is teaching — IM1, IM2, Course 1, Course 2, Pre-Calculus — adds depth to those current concepts in session, and runs a short refresher of previously learned topics every session so knowledge is retained between units.',
  },
  {
    question: 'Is there an RSM alternative in Dublin CA that is school-aligned and less overwhelming?',
    answer:
      'Yes. GrowWise School on Dublin Blvd teaches the content your child\'s school is covering this week and builds depth through in-session practice rather than heavy take-home packets — practice is covered with the teacher before students leave. Classes meet once a week for 150 minutes in small groups, typically 6–10 students. Book a free assessment at growwiseschool.org/book-assessment.',
  },
  {
    question: 'How much does GrowWise cost compared to RSM?',
    answer:
      'GrowWise monthly tuition is $289 for middle school math, $295 for advanced middle school math, and from $369 for high school. Publicly listed RSM rates typically fall in the $350–$500+ per month range depending on grade and location — verify current pricing with the specific branch. If your goal is school performance in the DUSD, PUSD, or SRVUSD sequence, the alignment difference usually matters more than the price difference.',
  },
] as const

export const RSM_ALTERNATIVE_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/math-tutoring-options-dublin-ca',
    title: 'Kumon vs Mathnasium vs Private Tutor in Dublin, CA',
    description: 'A side-by-side look at the three most common tutoring formats in the Tri-Valley.',
  },
  {
    href: '/resources/im1-summer-prep-dublin-ca',
    title: 'IM1 Summer Prep in Dublin, CA',
    description: 'How to get ready for the accelerated Integrated Math pathway.',
  },
  {
    href: '/resources/mathnasium-alternative-dublin-pleasanton',
    title: 'Mathnasium Alternative in Dublin & Pleasanton',
    description: 'How school-aligned instruction compares to the Mathnasium Method.',
  },
] as const
