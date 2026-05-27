import type { FAQItem } from '@/components/schema/FAQSchema'
import {
  buildHighSchoolMonthlyVsDropInFaqAnswer,
  buildHighSchoolTrialFaqAnswer,
  formatTrialSessionFeeLabel,
} from '@/lib/math-pricing-display'

/** Visible accordion + JSON-LD on /academic/math/high-school — single source */
export const HS_MATH_VISIBLE_FAQS: FAQItem[] = [
  {
    question:
      'My child is lost in Algebra or Geometry — how is targeted tutoring different from just sitting with them and doing the homework?',
    answer:
      "Targeted tutoring addresses the concept your child does not understand, not just tonight's problem set. GrowWise high school math covers Algebra I, Geometry, Algebra II, and Precalculus for Grades 9 through 12. Sessions begin with a free assessment that identifies whether the issue is in the current unit, a gap from a previous course, or a missing prerequisite skill.",
  },
  {
    question:
      'My child is in an honours math class and still struggling — is that something tutoring can help with?',
    answer:
      'Struggling in an honours course does not mean the student is in the wrong class. It often means the pace is faster than the student can absorb independently. GrowWise high school math sessions provide focused time on specific concepts that large classroom settings cannot. The free assessment identifies which concepts need reinforcing.',
  },
  {
    question: 'Can GrowWise help my child prepare for Precalculus before the next school year starts?',
    answer:
      'Yes. GrowWise Precalculus support is available through the high school math program. Students preparing for a harder course can use the period between school years to build the skills they will need. The free assessment sets the right starting point.',
  },
  {
    question: `What is the ${formatTrialSessionFeeLabel()} paid trial session for high school math?`,
    answer: buildHighSchoolTrialFaqAnswer(),
  },
  {
    question: 'What is the difference between monthly programs and per-session drop-in courses?',
    answer: buildHighSchoolMonthlyVsDropInFaqAnswer(),
  },
  {
    question: 'Do high school students get free Sunday practice sessions?',
    answer:
      'Yes. All enrolled Grades 6–12 students get access to free Sunday timed practice sessions — exam-style problems designed to build test-readiness between paid sessions.',
  },
  {
    question: 'How are lessons aligned to my student\'s school curriculum?',
    answer:
      'Students share their syllabus, pacing guide, portal topics, or current unit plan. After curriculum review, lessons are personalized around that school sequence — designed to stay closely aligned to what the student is learning in class.',
  },
]
