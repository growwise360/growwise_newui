import type { FAQItem } from '@/components/schema/FAQSchema'
import {
  buildMiddleSchoolTrialFaqAnswer,
  buildMiddleSchoolTrialVsMonthlyFaqAnswer,
  formatTrialSessionFeeLabel,
} from '@/lib/math-pricing-display'

/** Visible accordion FAQs on /academic/math/middle-school — single source for UI + JSON-LD in layout */
export const MIDDLE_SCHOOL_MATH_VISIBLE_FAQS: FAQItem[] = [
  {
    question: 'What is the difference between the standard and accelerated track?',
    answer:
      'In most districts, placement tests — not a single “track” label — decide the path. In 5th grade, students typically test into Course 1/2 or Course 1 for 6th grade. Before 7th grade, students in either course take placement again and may land in Course 3 or Integrated Math 1. GrowWise aligns instruction to whichever course your child is placed into. The free assessment helps confirm the right starting point.',
  },
  {
    question: 'What are Course 1, Course 2, and Course 3?',
    answer:
      'These are the three levels of the standard middle school math sequence. Course 1 covers ratios, proportions, and introductory algebra. Course 2 covers equations, geometry, and statistics. Course 3 covers functions, linear relationships, and data analysis.',
  },
  {
    question: 'What is Integrated Math 1 and Integrated Math 2?',
    answer:
      'Integrated Math 1 and 2 are the first two courses in California\'s Integrated Math pathway. IM1 covers linear equations, systems of equations, and introductory geometry. IM2 covers quadratic functions, geometric proof, and advanced algebraic reasoning. Both are used in DUSD and PUSD accelerated tracks.',
  },
  {
    question: 'How does a student advance from one course to the next?',
    answer:
      'At school, placement tests and grade-level progression decide whether a student moves from Course 1 to 2, into Course 3 or IM1, and along the accelerated sequence. In GrowWise programs, we align to that school placement and build mastery in the course they are in. Every 3 months, enrolled students take the GrowWise Mastery Assessment; scoring 90% or above means advancing within your GrowWise program at the next course level — staying longer is always fine when more building is needed.',
  },
  {
    question: 'What is the paid trial session?',
    answer: buildMiddleSchoolTrialFaqAnswer(),
  },
  {
    question: 'Do middle school students get free Sunday sessions?',
    answer:
      'Yes. All enrolled Grades 6–12 students get access to free Sunday timed practice sessions — exam-style problems structured like school assessments, designed to build test readiness between paid sessions.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'No registration fee through July 2026. Enroll before then to lock in fee-free enrollment.',
  },
  {
    question: 'How are lessons aligned to my child\'s school curriculum?',
    answer:
      'Students share their syllabus, pacing guide, portal topics, or current unit plan. After curriculum review, lessons are personalized around that school sequence — designed to stay closely aligned (95% school-aligned after review) to what the student is learning in class.',
  },
  {
    question: `What is the difference between the ${formatTrialSessionFeeLabel()} trial and monthly enrollment?`,
    answer: buildMiddleSchoolTrialVsMonthlyFaqAnswer(),
  },
]
