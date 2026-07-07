import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const BEST_TUTORING_DUBLIN_CA_PATH = '/resources/best-tutoring-dublin-ca' as const

export const BEST_TUTORING_DUBLIN_CA_META: ResourceArticleMeta = {
  path: BEST_TUTORING_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL RESOURCE',
  h1: 'Best Tutoring in Dublin, CA — How to Compare Your Options',
  readTime: '5 min read',
  updated: 'Updated July 2026',
  title: 'Best Tutoring in Dublin CA | K-12 Options Compared',
  description:
    'Compare Dublin, CA tutoring for SAT prep, middle school, and high school: class size, diagnostics, curriculum fit, and what questions to ask.',
  keywords:
    'best tutoring dublin ca, best places for tutoring dublin, sat prep dublin ca, middle school tutoring dublin, high school tutoring dublin',
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
}

export const BEST_TUTORING_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is the best SAT prep center in Dublin CA?',
    answer:
      'GrowWise offers small-group diagnostic-first SAT prep in Dublin. Kaplan offers larger group classes. The right fit depends on class size preference and how much foundation work is needed before test prep begins.',
  },
  {
    question: 'Is Mathnasium or Kumon better for middle school math in Dublin?',
    answer:
      "Mathnasium uses guided worksheets in a center setting. Kumon uses independent worksheet repetition. Neither begins with a diagnostic. GrowWise's approach starts with identifying the specific skill gap before assigning work.",
  },
  {
    question: 'How much does tutoring cost in Dublin CA?',
    answer:
      'Rates vary by format: 1-on-1 tutoring typically runs $80–$150/hour. Small-group programs range from $75–$120/session. GrowWise small-group SAT and academic programs are priced per level.',
  },
  {
    question: 'How do I choose the right tutoring center for my child?',
    answer:
      'Ask whether they run a diagnostic first, what the class size is, how they communicate progress to parents, and whether their curriculum aligns with your child\'s school.',
  },
] as const

export const BEST_TUTORING_DUBLIN_CA_JSONLD_FAQS: readonly ResourceArticleFaq[] =
  BEST_TUTORING_DUBLIN_CA_FAQS

export const BEST_TUTORING_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/tutoring-dublin-ca',
    title: 'K-12 Tutoring in Dublin, CA: How to Choose the Right Program',
    description: 'An honest comparison of programs serving the Tri-Valley area.',
  },
  {
    href: '/resources/middle-school-math-readiness-checklist',
    title: 'Middle School Math Readiness Checklist',
    description: 'Check which math skills are solid before the school year starts.',
  },
  {
    href: '/resources/when-to-start-sat-prep',
    title: 'When Should My Child Start SAT Prep?',
    description: 'Grade-by-grade breakdown so you plan the right timeline.',
  },
] as const
