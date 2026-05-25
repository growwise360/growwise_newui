import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const WHAT_IS_VIBE_CODING_PATH = '/resources/what-is-vibe-coding' as const

export const WHAT_IS_VIBE_CODING_META: ResourceArticleMeta = {
  path: WHAT_IS_VIBE_CODING_PATH,
  category: 'steam',
  categoryLabel: 'STEAM & CODING',
  h1: 'What Is Vibe Coding — And Should Your Child Learn It?',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: "What Is Vibe Coding? A Parent's Guide (2026) | GrowWise",
  description:
    "Vibe coding is the fastest-growing way kids learn to build real apps in 2026. Here's what it actually is, why it matters, and the one risk most parents miss.",
  keywords:
    'what is vibe coding, vibe coding for kids, vibe coding explained for parents, should kids learn vibe coding, vibe coding 2026, AI coding for kids, coding for kids 2026, AI-assisted coding children',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
}

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly. */
export const WHAT_IS_VIBE_CODING_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What exactly is vibe coding?',
    answer:
      "Vibe coding is building software using AI tools through natural language — describing what you want to build, and using AI to generate and refine the code. The student directs, tests, modifies, and debugs the output. It's the dominant working method in professional software development in 2026.",
  },
  {
    question: 'Is vibe coding suitable for kids?',
    answer:
      'For ages 10 and above, yes — with the right program. The key is that vibe coding is paired with foundational instruction so students understand what the AI is producing, not just how to prompt it.',
  },
  {
    question: 'Will vibe coding make traditional coding skills obsolete?',
    answer:
      "No. Students who vibe code without foundational understanding hit a ceiling quickly — they can't debug AI errors or build beyond what AI templates produce. Foundational coding knowledge makes vibe coding significantly more powerful.",
  },
  {
    question: 'What age should my child start vibe coding?',
    answer:
      'Most coding educators recommend age 10 and above for meaningful vibe coding. Younger children are better served by block-based visual tools like Scratch, which build the same foundational logic in a more structured environment.',
  },
  {
    question: 'What is the difference between vibe coding and AI-assisted coding?',
    answer:
      "They're largely the same concept. Vibe coding is the more informal term that describes the feel of the process — intuitive, conversational, creative. AI-assisted coding is the more technical description. Both refer to using AI tools to generate and refine code based on natural language direction.",
  },
] as const

export const WHAT_IS_VIBE_CODING_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/python-vs-scratch',
    title: 'Python vs Scratch: Which Should My Child Learn First?',
  },
] as const
