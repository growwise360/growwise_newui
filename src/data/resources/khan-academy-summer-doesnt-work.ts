import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH = '/resources/khan-academy-summer-doesnt-work' as const

export const KHAN_ACADEMY_SUMMER_DOESNT_WORK_META: ResourceArticleMeta = {
  path: KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: 'Why "We\'ll Do Khan Academy This Summer" Almost Never Works (And What Does)',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: 'Why Khan Academy Summer Plans Fail | GrowWise',
  description:
    "Self-paced online learning has a completion problem. Here's why most at-home summer plans fail by July — and what research says works.",
  keywords:
    'Khan Academy summer, self-paced learning completion, summer learning at home, math tutoring summer, online learning fail, summer learning plan, at-home learning, summer academic programs, structured summer learning, completion rates online learning',
  datePublished: '2026-06-03',
  dateModified: '2026-06-03',
}

export const KHAN_ACADEMY_SUMMER_DOESNT_WORK_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Why do most kids stop using Khan Academy over summer?',
    answer:
      'Without external structure, deadlines, and accountability, self-paced tools are easy to deprioritize. Most students need a schedule and a live person to sustain consistent effort over 10+ weeks.',
  },
  {
    question: 'Is Khan Academy a waste of time?',
    answer:
      'Not in the right context. It\'s a strong supplementary tool when paired with live instruction or used to review a specific concept. As a standalone summer plan, it rarely delivers the outcomes parents expect.',
  },
  {
    question: 'What makes a summer academic program effective?',
    answer:
      'Structured schedule, live instruction, small groups, sequenced curriculum, and some form of progress accountability. The more of those elements a program has, the better the outcomes tend to be.',
  },
  {
    question: 'How much does it help to have other kids in the class?',
    answer:
      'Peer learning consistently improves engagement and retention. Students in small group settings tend to stay more focused, ask better questions, and retain material longer than solo learners.',
  },
] as const

export const KHAN_ACADEMY_SUMMER_DOESNT_WORK_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Why do most kids stop using Khan Academy over summer?',
    answer:
      'Without external structure, deadlines, and accountability, self-paced tools are easy to deprioritize. Most students need a schedule and a live person to sustain consistent effort over 10+ weeks.',
  },
  {
    question: 'Is Khan Academy a waste of time?',
    answer:
      'Not in the right context. It\'s a strong supplementary tool when paired with live instruction or used to review a specific concept. As a standalone summer plan, it rarely delivers the outcomes parents expect.',
  },
  {
    question: 'What makes a summer academic program effective?',
    answer:
      'Structured schedule, live instruction, small groups, sequenced curriculum, and some form of progress accountability. The more of those elements a program has, the better the outcomes tend to be.',
  },
  {
    question: 'How much does it help to have other kids in the class?',
    answer:
      'Peer learning consistently improves engagement and retention. Students in small group settings tend to stay more focused, ask better questions, and retain material longer than solo learners.',
  },
] as const

export const KHAN_ACADEMY_SUMMER_DOESNT_WORK_RELATED: readonly ResourceArticleRelated[] = [
  {
    title: '5 Things to Look for in a Summer Academic Program',
    href: '/resources/summer-academic-program-checklist',
    description: 'What separates effective programs from ones that look good on paper.',
  },
  {
    title: 'How to Prevent Summer Slide',
    href: '/resources/summer-slide-prevention',
    description: 'What actually works to maintain skills over summer.',
  },
]
