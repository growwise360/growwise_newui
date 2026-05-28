import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const TUTORING_DUBLIN_CA_PATH = '/resources/tutoring-dublin-ca' as const

export const TUTORING_DUBLIN_CA_META: ResourceArticleMeta = {
  path: TUTORING_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL',
  h1: "K-12 Tutoring in Dublin, CA: A Parent's Guide to Choosing the Right Program (2026)",
  readTime: '6 min read',
  updated: 'Updated May 2026',
  title: 'K-12 Tutoring in Dublin, CA: How to Choose the Right Program (2026) | GrowWise',
  description:
    'Looking for tutoring in Dublin, CA for your Grade 1–12 student? This guide helps Tri-Valley parents choose between program types — and the questions to ask before enrolling.',
  keywords:
    'tutoring Dublin CA, tutoring Dublin California, K-12 tutoring Dublin California, math tutoring Dublin CA, tutoring near me Dublin CA, after school tutoring Dublin CA Tri-Valley, tutoring Pleasanton CA, tutoring San Ramon CA, coding classes Dublin CA kids, SAT prep Dublin CA, academic programs Tri-Valley',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
}

export const TUTORING_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What subjects does GrowWise tutor in Dublin, CA?',
    answer:
      'GrowWise offers tutoring in Math (Grades 1–12, including Integrated Math 1/2/3 and SAT prep), English and Writing, and STEAM programs including Python, AI, Game Development, and Robotics. Programs are available in-person at our Dublin, CA location and online nationwide.',
  },
  {
    question: 'How is GrowWise different from Kumon or Mathnasium in Dublin?',
    answer:
      'GrowWise starts with a diagnostic assessment to identify specific skill gaps before building any plan. Sessions are aligned to each student\'s current school curriculum and pacing. We offer both academic tutoring and STEAM/coding programs — which most repetition-model programs don\'t provide.',
  },
  {
    question: 'Do you serve families in Pleasanton and San Ramon?',
    answer:
      'Yes. GrowWise serves families from Dublin, Pleasanton, San Ramon, and Livermore — both in-person at our Dublin location and through live online sessions.',
  },
  {
    question: 'What is the average tutoring cost in Dublin, CA?',
    answer:
      'According to Care.com (February 2026), the average independent tutor in Dublin, CA costs approximately $28 per hour. Structured programs with small groups and curriculum alignment typically range higher. GrowWise program pricing is available during the free assessment consultation.',
  },
  {
    question: 'Do you offer summer tutoring and coding camps in Dublin, CA?',
    answer:
      'Yes. GrowWise offers academic summer sprint programs (Reading, Writing, Math) and STEAM coding camps in Dublin, CA. Programs typically start in June and fill quickly — we recommend inquiring in March/April.',
  },
  {
    question: 'Is online tutoring available for Tri-Valley families?',
    answer:
      'Yes. All GrowWise programs are available as live online sessions. Families in Pleasanton, San Ramon, Livermore, or further out can access the same programs without coming to the Dublin location.',
  },
]

export const TUTORING_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: 'When Should My Child Start SAT Prep?',
    href: '/resources/when-to-start-sat-prep',
    description: 'Grade 8, 9, or 10? The answer depends on one thing most parents miss.',
  },
  {
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
    href: '/resources/careless-math-mistakes',
    description: "It's rarely a knowledge problem. Here's the exact pattern and how to break it.",
  },
]
