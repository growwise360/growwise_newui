import type { FAQItem } from '@/components/schema/FAQSchema'
import {
  buildHighSchoolMonthlyVsDropInFaqAnswer,
  buildHighSchoolTrialFaqAnswer,
} from '@/lib/math-pricing-display'

/** Visible accordion + JSON-LD on /academic/math/high-school — single source */
export const HS_MATH_VISIBLE_FAQS: FAQItem[] = [
  {
    question:
      'My child is lost in high school math — how is targeted tutoring different from homework help?',
    answer:
      "Targeted tutoring addresses the concept your child does not understand, not just tonight's problem set. GrowWise high school math covers Algebra 1, Algebra 2, Advanced Algebra 2, Precalculus, AP Precalculus, and Calculus for Grades 9 through 12. Sessions are aligned to the student's current course and the skills that course assumes.",
  },
  {
    question:
      'My child is in an honors, AP, or accelerated math class and still struggling — can tutoring help?',
    answer:
      'Struggling in an honors or AP course does not always mean the student is in the wrong class. It often means the pace is faster than the student can absorb independently. GrowWise sessions provide focused time on specific concepts, prerequisite skills, and test-readiness habits that large classroom settings cannot always address.',
  },
  {
    question: 'Can GrowWise help my child prepare for Precalculus, AP Precalculus, or Calculus?',
    answer:
      'Yes. GrowWise supports Precalculus, AP Precalculus, and Calculus readiness through the high school math program. Students preparing for a harder course work on prerequisite algebra, functions, trigonometry, and problem-solving habits before those gaps affect the next class.',
  },
  {
    question: 'What happens in the free high school math assessment?',
    answer: buildHighSchoolTrialFaqAnswer(),
  },
  {
    question: 'What is the difference between structured programs and drop-in homework help?',
    answer: buildHighSchoolMonthlyVsDropInFaqAnswer(),
  },
  {
    question: 'How are lessons aligned to my student\'s school curriculum?',
    answer:
      'Students share their syllabus, pacing guide, portal topics, or current unit plan. After curriculum review, lessons are personalized around that school sequence — designed to stay closely aligned to what the student is learning in class.',
  },
]
