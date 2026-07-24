import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const KUMON_ALTERNATIVE_DUBLIN_CA_PATH = '/resources/kumon-alternative-dublin-ca' as const

export const KUMON_ALTERNATIVE_DUBLIN_CA_META: ResourceArticleMeta = {
  path: KUMON_ALTERNATIVE_DUBLIN_CA_PATH,
  category: 'local',
  categoryLabel: 'LOCAL RESOURCE',
  h1: 'Kumon Alternative in Dublin, CA — What to Look For',
  readTime: '6 min read',
  updated: 'Updated July 2026',
  title: 'Kumon Alternative in Dublin CA | GrowWise Compared',
  description:
    'Looking for a Kumon alternative in Dublin, CA? Compare teaching model, school-curriculum alignment, class size, and pricing before you choose.',
  keywords:
    'kumon alternative dublin ca, alternative to kumon, kumon vs growwise, math tutoring dublin ca, kumon alternative tri-valley',
  datePublished: '2026-07-08',
  dateModified: '2026-07-08',
}

export const KUMON_ALTERNATIVE_DUBLIN_CA_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'How is GrowWise different from Kumon in Dublin CA?',
    answer:
      'Kumon uses a worksheet-based, self-instruction model: students work through packets independently and advance on accuracy rates, and Kumon follows its own internal sequence rather than your child\'s school curriculum. GrowWise works differently — a qualified instructor teaches every concept in the room, sessions follow the DUSD, PUSD, and SRVUSD sequence, and each session ends with teacher-guided practice so mistakes are caught before students go home. Middle and high school classes are small groups, typically 6–10 students.',
  },
  {
    question: 'Is there a Kumon alternative in Dublin CA that aligns with school curriculum?',
    answer:
      'Yes. GrowWise School at 4564 Dublin Blvd, Dublin CA is a Kumon alternative built around the two most common concerns with worksheet programs: limited live teaching and no school alignment. At GrowWise, an instructor teaches every concept — no self-graded packet work — and sessions follow the DUSD, PUSD, and SRVUSD math sequence. Start with a free assessment at growwiseschool.org/book-assessment.',
  },
  {
    question: 'How much does GrowWise cost compared to Kumon?',
    answer:
      'GrowWise monthly tuition is $289 for Grades 3–5 and middle school math, $295 for advanced middle school math, and from $369 for high school; Grade 1–2 starts at $169/month for one subject. Publicly listed Kumon rates in California typically range from about $140 to $250 per subject per month — verify current rates directly with your local center. Middle and high school GrowWise sessions run 150 minutes weekly and are teacher-led throughout, which is the main difference the tuition covers.',
  },
] as const

export const KUMON_ALTERNATIVE_DUBLIN_CA_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/math-tutoring-options-dublin-ca',
    title: 'Kumon vs Mathnasium vs Private Tutor in Dublin, CA',
    description: 'A side-by-side look at the three most common tutoring formats in the Tri-Valley.',
  },
  {
    href: '/resources/mathnasium-alternative-dublin-pleasanton',
    title: 'Mathnasium Alternative in Dublin & Pleasanton',
    description: 'How school-aligned instruction compares to the Mathnasium Method.',
  },
  {
    href: '/resources/rsm-alternative-dublin-ca',
    title: 'RSM Alternative in Dublin, CA',
    description: 'School-aligned depth vs an accelerated separate curriculum.',
  },
] as const
