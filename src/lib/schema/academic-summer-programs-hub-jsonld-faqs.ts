import { CONTACT_INFO } from '@/lib/constants';
import type { FAQItem } from '@/components/schema/FAQSchema';

/** Visible FAQ accordion + FAQPage JSON-LD — single source of truth (8 items). */
export const ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS: FAQItem[] = [
  {
    question: 'What grades do these programs serve?',
    answer:
      'Academic Summer Sprint (Read to Prove, Write to Explain, Bridge the Gap Math) serves Grades 1–8. Get Ready Sprint (IM1, Algebra 1, Geometry) serves Grades 7–10. Both programs run at 4564 Dublin Blvd, Dublin, CA.',
  },
  {
    question: 'How is this different from tutoring?',
    answer:
      'Tutoring is typically one-on-one with no set curriculum. GrowWise academic sprints are structured small-group programs — max 8 students — with a subject-trained instructor following a defined DUSD and PUSD-aligned curriculum. Every session has a clear objective, instruction block, and guided practice component.',
  },
  {
    question: 'What is the guided practice lab?',
    answer:
      'The 30-minute practice lab is included in every session at no extra cost. Students apply what they just learned while the instructor is still in the room — not at home alone. It is not optional homework.',
  },
  {
    question: 'What is the difference between Cohort 1 and Cohort 2?',
    answer:
      'Each cohort is a separate 2-week enrollment slot for different students. Cohort 1 and Cohort 2 cover the same curriculum — parents choose whichever dates fit their schedule. Some families enroll in both cohorts for extended practice.',
  },
  {
    question: 'Are these programs DUSD aligned?',
    answer:
      'Yes. Get Ready Sprint programs (IM1, Algebra 1, Geometry) are 100% aligned to Dublin Unified School District curriculum. Academic Summer Sprint programs follow Common Core standards and are designed to prepare students for DUSD and PUSD grade-level expectations.',
  },
  {
    question: 'What if my child misses a session?',
    answer:
      'We recommend attending every session for best results. If your child misses a day, the instructor will provide a brief catch-up note. We do not offer make-up sessions or prorated refunds for missed individual days.',
  },
  {
    question: 'Can my child enroll in more than one track?',
    answer:
      'Yes. Tracks run at different times so a student can enroll in multiple programs. For example, a student could attend Bridge the Gap Math in the morning and Algebra Get Ready in the evening. Contact us to confirm schedule compatibility before enrolling.',
  },
  {
    question: 'How do I enroll?',
    answer: `Select your program and cohort on this page, then add to cart and complete checkout. Spots are limited to 8 students per class. If a cohort is full, Cohort 2 is available as an alternative start date. Call ${CONTACT_INFO.phone} with any questions.`,
  },
];
