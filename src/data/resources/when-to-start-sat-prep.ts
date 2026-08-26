import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const WHEN_TO_START_SAT_PREP_PATH = '/resources/when-to-start-sat-prep' as const

export const WHEN_TO_START_SAT_PREP_META: ResourceArticleMeta = {
  path: WHEN_TO_START_SAT_PREP_PATH,
  category: 'sat-prep',
  categoryLabel: 'SAT PREP',
  h1: 'When Should My Child Start SAT Prep? A Grade-by-Grade Answer',
  readTime: '6 min read',
  updated: 'Updated May 2026',
  title: 'SAT Prep Timeline by Grade | Parent Guide',
  description:
    'Grade 8, 9, 10, or already in 11th grade? See when SAT prep should start, what to fix first, and how parents can plan a smarter test prep timeline.',
  keywords:
    'when to start SAT prep, what grade to start SAT preparation, when should my child start SAT prep, SAT prep grade 8 9 10, SAT prep for 11th graders, how early to start SAT prep, digital SAT prep 2026, SAT preparation timeline high school, PSAT preparation grades 8-10, SAT math foundation gaps',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
}

/** Visible FAQ accordion — full answers from the user brief. */
export const WHEN_TO_START_SAT_PREP_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Is Grade 8 too early to start SAT prep?',
    answer:
      'Yes, for most students. Grade 8 is better used for building the Algebra 1 and reading foundations the SAT tests. Formal SAT prep before those foundations are solid typically produces frustration and modest results.',
  },
  {
    question: 'What is the best grade to start SAT preparation?',
    answer:
      "Grade 10 is the most commonly recommended starting point among SAT tutors and specialists. By Grade 10, most students have enough academic content to make targeted prep effective, and there's sufficient time before the primary testing window in Grade 11.",
  },
  {
    question: 'Can my child still do well if they start SAT prep in Grade 11?',
    answer:
      'Yes. Grade 11 is a compressed but workable timeline. The key is starting with a diagnostic, identifying gaps immediately, and building a focused plan. Students who test in spring of Grade 11 and again in fall of Grade 12 typically see the most score improvement.',
  },
  {
    question: "What's the difference between the PSAT and the SAT?",
    answer:
      "The PSAT (Preliminary SAT) is a practice version of the SAT offered in Grades 8, 10, and 11. PSAT scores don't count for college admissions but are used for the National Merit Scholarship Program in Grade 11. More importantly, PSAT scores are a strong predictor of SAT trajectory and an excellent diagnostic tool.",
  },
  {
    question: 'How long does it take to raise an SAT score significantly?',
    answer:
      'Most students see meaningful improvement (50–100+ points) with 3–6 months of focused preparation. Larger improvements (150+ points) typically require addressing foundation gaps first, which adds 2–3 months to the timeline. Score gains depend heavily on consistency of practice and whether content gaps are identified and closed before test strategy begins.',
  },
] as const

/** FAQPage JSON-LD — must match the user-provided schema block exactly. */
export const WHEN_TO_START_SAT_PREP_JSONLD_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Is Grade 8 too early to start SAT prep?',
    answer:
      'Yes, for most students. Grade 8 is better used for building the Algebra 1 and reading foundations the SAT tests. Formal SAT prep before those foundations are solid typically produces frustration and modest results.',
  },
  {
    question: 'What is the best grade to start SAT preparation?',
    answer:
      'Grade 10 is the most commonly recommended starting point. By Grade 10, most students have enough academic content to make targeted prep effective, and there is sufficient time before the primary testing window in Grade 11.',
  },
  {
    question: 'Can my child still do well if they start SAT prep in Grade 11?',
    answer:
      'Yes. Grade 11 is a compressed but workable timeline. Students who test in spring of Grade 11 and again in fall of Grade 12 typically see the most score improvement.',
  },
  {
    question: 'How long does it take to raise an SAT score significantly?',
    answer:
      'Most students see meaningful improvement of 50-100+ points with 3-6 months of focused preparation. Larger improvements typically require addressing foundation gaps first, which adds 2-3 months to the timeline.',
  },
  {
    question: 'What is the difference between the PSAT and the SAT?',
    answer:
      'The PSAT is a practice version of the SAT offered in Grades 8, 10, and 11. PSAT scores do not count for college admissions but are used for the National Merit Scholarship Program and are an excellent diagnostic tool for predicting SAT trajectory.',
  },
] as const

export const WHEN_TO_START_SAT_PREP_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/careless-math-mistakes',
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
    description: 'A useful companion if SAT math errors are coming from habits rather than content gaps.',
  },
  {
    href: '/courses/sat-prep',
    title: 'SAT Prep Tutoring in Dublin, CA',
    description: 'Diagnostic-first SAT support for students who are ready for focused test preparation.',
  },
  {
    href: '/academic/math/high-school',
    title: 'High School Math Programs',
    description: 'Close Algebra, Geometry, and Precalculus gaps before layering on test strategy.',
  },
  {
    href: '/resources/reading-fluency-vs-comprehension',
    title: 'Reading Fluency vs. Comprehension',
    description: 'SAT reading struggles often trace back here. Know which gap to fix first.',
  },
] as const
