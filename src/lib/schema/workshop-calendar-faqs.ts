import type { FAQItem } from '@/components/schema/FAQSchema';

/**
 * Single source of truth for /workshop-calendar FAQs.
 * Used for both the visible accordion and the FAQPage JSON-LD schema.
 */
export const WORKSHOP_CALENDAR_FAQS: FAQItem[] = [
  {
    question: 'What are the GrowWise parent workshops?',
    answer:
      'GrowWise parent workshops are free 30-minute sessions held on Tuesdays (12:00–12:30 PM PT) at GrowWise School in Dublin, CA. Parents learn how to understand what their child is learning, spot early gaps, and know when to seek targeted support — for English (Grades 1–10) or Advanced Math (Grades 7–12, IM1/IM2/High School).',
  },
  {
    question: 'Are GrowWise workshops really free?',
    answer:
      'Yes. There is no cost to attend any GrowWise parent workshop or webinar. Seats are limited and registration is required so we can prepare materials and ensure a quality session.',
  },
  {
    question: 'Who should attend the parent workshops?',
    answer:
      'Any parent who wants to understand how their child is doing academically, identify gaps before they compound, or learn what to look for at home. English workshops are designed for parents of students in Grades 1–10. Advanced Math workshops are for parents of students in Grades 7–12 covering Integrated Math 1 (IM1), IM2, and high school math courses.',
  },
  {
    question: 'What does the English Parent Workshop cover?',
    answer:
      'The English Parent Workshop helps parents understand what strong reading comprehension and writing looks like at each grade level, how to spot gaps at home before they affect grades, and how GrowWise\'s structured English program identifies and closes those gaps for students in Grades 1–10.',
  },
  {
    question: 'What does the Advanced Math Parent Workshop cover?',
    answer:
      'The Advanced Math Parent Workshop covers how IM1, IM2, Algebra, Precalculus, and AP-level courses are structured, where students most commonly hit the wall, and how GrowWise\'s diagnostic approach identifies the specific skill gap rather than just re-teaching the whole unit.',
  },
  {
    question: 'Where are the workshops held in Dublin, CA?',
    answer:
      'Tuesday workshops (12:00–12:30 PM) and Sunday workshops (11:30 AM–12:30 PM) are held in person at GrowWise School, 4564 Dublin Blvd, Dublin, CA 94568. Monthly evening webinars are held online via Zoom and are accessible from anywhere.',
  },
  {
    question: 'What is the difference between a parent workshop and a free assessment?',
    answer:
      'A parent workshop is a group session for parents — you learn about programs, what to watch for, and how GrowWise works. A free assessment is a one-on-one 45-minute diagnostic session for your child, resulting in a personalized program recommendation. Both are free. Most families attend a parent workshop first, then book a free assessment for their child within the same week.',
  },
  {
    question: 'Will I get a recommendation for my child after the workshop?',
    answer:
      'Yes. After attending a parent workshop, you can schedule a free 45-minute diagnostic assessment for your child. You will leave with a specific academic gap analysis and program recommendation tailored to your child\'s grade level and current curriculum.',
  },
  {
    question: 'How is a GrowWise workshop different from a typical open house?',
    answer:
      'GrowWise workshops are structured parent-education sessions, not sales presentations. Each session covers a specific academic topic (reading comprehension milestones, IM math structure, etc.) so parents leave with practical knowledge — not just a brochure. The workshops are capped at 25 seats to allow direct Q&A.',
  },
];
