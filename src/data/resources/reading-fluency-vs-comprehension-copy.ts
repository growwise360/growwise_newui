import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const READING_FLUENCY_VS_COMPREHENSION_PATH = '/resources/reading-fluency-vs-comprehension' as const

export const READING_FLUENCY_VS_COMPREHENSION_META: ResourceArticleMeta = {
  path: READING_FLUENCY_VS_COMPREHENSION_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: 'Reading Fluency vs. Reading Comprehension: Why Your Child Might Struggle With One and Not the Other',
  readTime: '8 min read',
  updated: 'Updated June 2026',
  title: 'Fluency vs Comprehension: Which Reading Gap?',
  description:
    'Your child can read the words but miss the meaning. Compare fluency and comprehension gaps, warning signs, and what support should target.',
  keywords:
    'reading fluency vs comprehension, reading fluency comprehension difference, child reads but doesn\'t understand, reading program, reading comprehension gap, reading fluency gap, child struggles with reading comprehension',
  datePublished: '2026-06-02',
  dateModified: '2026-06-02',
}

export const FLUENCY_GAP_SIGNS: readonly string[] = [
  'Reads slowly and haltingly, even familiar text',
  'Loses their place frequently',
  'Sounds out words they should recognize by sight',
  'Reading aloud sounds choppy or monotone',
  'Avoids reading because it feels effortful',
]

export const COMPREHENSION_GAP_SIGNS: readonly string[] = [
  'Can retell what happened but not why it mattered',
  'Struggles with inference questions ("What do you think the character felt?")',
  "Can't identify the main idea",
  'Reads a passage and immediately forgets what it said',
  'Does fine on literal questions, falls apart on analytical ones',
]

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly. */
export const READING_FLUENCY_VS_COMPREHENSION_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What is the difference between reading fluency and reading comprehension?',
    answer:
      'Fluency is the mechanical ability to read accurately and at pace. Comprehension is the ability to understand and interpret what was read. A child can have strength in one and a gap in the other.',
  },
  {
    question: 'Can a child have good fluency but poor comprehension?',
    answer:
      "Yes. Students who learned strong decoding skills often read smoothly but don't process meaning deeply. This is common in students who read a lot but still struggle with analysis questions.",
  },
  {
    question: 'Can a child have poor fluency but good comprehension?',
    answer:
      "Yes, though it's less common. Some students understand language well but struggle with the mechanics of text. They often do better with audiobooks or read-alouds.",
  },
  {
    question: 'What grade level does reading fluency become less of the concern?',
    answer:
      'Generally by Grade 3–4, fluency should be largely automatic for most students. If a student past Grade 4 is still struggling with decoding, it warrants targeted intervention.',
  },
  {
    question: 'How does GrowWise determine which reading gap to address?',
    answer:
      "GrowWise uses a structured diagnostic at program start to identify whether a student's gap is fluency-based, comprehension-based, or a combination. Instruction is then targeted accordingly.",
  },
] as const

export const READING_FLUENCY_VS_COMPREHENSION_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/homework-independence',
    title: 'How to Stop Sitting Next to Your Child Every Homework Night',
    description: 'Build the routines that help reading and homework practice stick at home.',
  },
  {
    href: '/academic/english',
    title: 'English & Reading Programs for Grades 3–12',
    description: 'Structured reading, writing, and comprehension support after a diagnostic assessment.',
  },
  {
    href: '/camps/summer-reading-writing-dublin-ca',
    title: 'Summer Reading & Writing Programs in Dublin',
    description: 'A seasonal option for students who need focused reading and writing support.',
  },
] as const
