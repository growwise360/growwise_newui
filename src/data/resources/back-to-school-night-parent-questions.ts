import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH =
  '/resources/back-to-school-night-parent-questions' as const

export const BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META: ResourceArticleMeta = {
  path: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH,
  category: 'parent-resources',
  categoryLabel: 'PARENT GUIDE',
  h1: 'Questions to Ask at Back-to-School Night to Find Out Where Your Child Stands',
  readTime: '4 min read',
  updated: 'Updated July 2026',
  title: 'Questions to Ask at Back-to-School Night | Parent Guide',
  description:
    'Ask these questions at back-to-school night to find out if your child is on track, how the teacher identifies gaps, and what to do if concerns come up.',
  keywords:
    'back to school night questions, questions to ask teacher at open house, back to school night tips for parents, how to find out if child is behind in school',
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
}

export const BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'What academic questions should I ask at back-to-school night?',
    answer:
      'Ask how the teacher measures grade-level mastery (not just grades), what the first signs of a gap look like in this subject, and how they communicate concerns before report cards.',
  },
  {
    question: 'How do I find out if my child is behind in math or reading?',
    answer:
      'Ask the teacher directly: "Is my child reading at grade level?" and "Are there any foundational skills from last year they haven\'t fully consolidated?" These are different from asking about grades.',
  },
  {
    question: "What if my child's teacher says everything is fine but I notice something seems off?",
    answer:
      'Grades and classroom performance are not the same as skill mastery. A child can earn B grades while missing foundational concepts. A diagnostic assessment, not a grade report, shows the real picture.',
  },
  {
    question: 'How early should I address a learning gap?',
    answer:
      'The earlier the better. Gaps compound: a fractions gap in Grade 5 becomes a pre-algebra gap in Grade 6. If back-to-school night surfaces a concern, act in September — not after the first report card.',
  },
] as const

export const BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_JSONLD_FAQS: readonly ResourceArticleFaq[] =
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_FAQS

export const BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/back-to-school-math-assessment-dublin-ca',
    title: 'Back-to-School Math Assessment Guide',
    description: 'Is your child ready for the next grade? Use this guide to check before the school year starts.',
  },
  {
    href: '/resources/why-grades-hide-learning-gaps',
    title: 'Why Grades Hide Learning Gaps',
    description: 'A B grade can coexist with a serious skill gap. Here\'s why.',
  },
  {
    href: '/resources/middle-school-math-readiness-checklist',
    title: 'Middle School Math Readiness Checklist',
    description: 'Check which math skills are solid before the school year starts.',
  },
] as const
