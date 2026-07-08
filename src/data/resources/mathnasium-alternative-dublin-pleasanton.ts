import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH =
  '/resources/mathnasium-alternative-dublin-pleasanton' as const

export const MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_META: ResourceArticleMeta = {
  path: MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_PATH,
  category: 'local',
  categoryLabel: 'LOCAL RESOURCE',
  h1: 'Mathnasium Alternative in Dublin & Pleasanton — What to Compare',
  readTime: '6 min read',
  updated: 'Updated July 2026',
  title: 'Mathnasium Alternative Dublin & Pleasanton | GrowWise',
  description:
    'Comparing Mathnasium in Dublin or Pleasanton? See how school-curriculum alignment, progress reporting, and teacher-led sessions differ at GrowWise.',
  keywords:
    'mathnasium alternative dublin, mathnasium alternative pleasanton, mathnasium vs growwise, math enrichment pleasanton ca, math tutoring dublin ca',
  datePublished: '2026-07-08',
  dateModified: '2026-07-08',
}

export const MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How is GrowWise different from Mathnasium in Dublin and Pleasanton?',
    answer:
      'Mathnasium uses its own proprietary curriculum — the Mathnasium Method — which runs on its own sequence rather than your child\'s school syllabus, and its progress reports are organized around topic status within that sequence. GrowWise aligns every session to the DUSD, PUSD, and SRVUSD unit your child\'s class is covering, and progress reports break down specific skills and mistake patterns rather than status labels. Every GrowWise session is teacher-led and ends with a guided practice block.',
  },
  {
    question: 'Is there a Mathnasium alternative in Pleasanton or Dublin that follows school curriculum?',
    answer:
      'Yes. GrowWise School in Dublin is designed around school alignment: if your child\'s class is on a specific Integrated Math or Course 1/Course 2 unit this week, that is what the session covers. Middle and high school classes are small groups, typically 6–10 students. Monthly tuition is $289 for elementary (Grades 3–5) and middle school math and $295 for advanced middle school math. Book a free assessment at growwiseschool.org/book-assessment or call (925) 456-4606.',
  },
  {
    question: 'How much does GrowWise cost compared to Mathnasium?',
    answer:
      'GrowWise is $289/month for Grades 3–5 and middle school math and $295/month for advanced middle school math. Publicly listed rates for Mathnasium centers typically range from about $250 to $400 per month depending on location and plan — verify current rates with the specific center. The practical difference is what the tuition buys: GrowWise sessions follow your child\'s school curriculum with a teacher leading the full session.',
  },
] as const

export const MATHNASIUM_ALTERNATIVE_DUBLIN_PLEASANTON_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/math-tutoring-options-dublin-ca',
    title: 'Kumon vs Mathnasium vs Private Tutor in Dublin, CA',
    description: 'A side-by-side look at the three most common tutoring formats in the Tri-Valley.',
  },
  {
    href: '/resources/kumon-alternative-dublin-ca',
    title: 'Kumon Alternative in Dublin, CA',
    description: 'Teacher-led instruction vs worksheet self-study.',
  },
  {
    href: '/resources/rsm-alternative-dublin-ca',
    title: 'RSM Alternative in Dublin, CA',
    description: 'School-aligned depth vs an accelerated separate curriculum.',
  },
] as const
