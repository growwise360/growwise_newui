import { CONTACT_INFO } from '@/lib/constants';
import type { FAQItem } from '@/components/schema/FAQSchema';

/** Visible FAQ accordion + FAQPage JSON-LD — single source of truth. */
export const HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS: FAQItem[] = [
  {
    question: 'What if my child is behind in math?',
    answer:
      'Our instructors work at each student\'s level. We start with fundamentals and build from there. Small class size means personalized attention.',
  },
  {
    question: 'Is this online or in-person?',
    answer:
      'All classes are in-person at our Dublin campus, Monday–Friday, 2 hours per day. We provide a focused, interactive learning environment.',
  },
  {
    question: 'What grade levels are these courses for?',
    answer:
      'Algebra 1 is Grades 8–9; Algebra 2 and Advanced Algebra 2 are Grades 10–11; Precalculus and AP Precalculus are Grade 11; Calculus AB is Grades 11–12. Placement depends on your child\'s math level.',
  },
  {
    question: 'How small are the classes?',
    answer:
      'Maximum 8 students per class. This ensures every student gets personal feedback and attention from the instructor.',
  },
  {
    question: 'What if I\'m not sure which course to pick?',
    answer: `We recommend a free assessment call. Our team will evaluate your child's current level and recommend the best fit. Email us or call ${CONTACT_INFO.phone}.`,
  },
  {
    question: 'What\'s your refund policy?',
    answer:
      'Refunds are available if you cancel at least 2 weeks before the start date. Partial refunds are available for cancellations closer to the start.',
  },
];
