import type { FAQItem } from '@/components/schema/FAQSchema'
import { CONTACT_INFO } from '@/lib/constants'

/** Visible FAQ accordion + FAQPage JSON-LD — single source of truth. */
export const PROGRAMS_FAQS: readonly FAQItem[] = [
  {
    question: 'What programs does GrowWise offer?',
    answer:
      'GrowWise offers Academic Programs (Grades 3–12 Math and English), STEAM Programs (ML/AI, Game Development, Python coding, and more), and Future Skills certification pathways (Grades 6-12 design, Python, AI/ML, and entrepreneurship). We also offer SAT Prep and specialized high school math programs.',
  },
  {
    question: 'What is the difference between Academic and STEAM programs?',
    answer:
      'Academic programs focus on core subjects like Math and English, aligned with school curriculum standards. STEAM programs focus on Science, Technology, Engineering, Arts, and Mathematics through hands-on projects like game development, coding, and machine learning.',
  },
  {
    question: 'Can students enroll in both Academic and STEAM programs?',
    answer:
      'Yes! Many students benefit from combining academic support with STEAM enrichment. Our flexible scheduling allows students to participate in both program types based on their interests and needs.',
  },
  {
    question: 'Are the programs suitable for all grade levels?',
    answer:
      'Yes, we offer programs for Grades 3–12 students. Academic programs are available for all grade levels, while STEAM programs are typically designed for elementary through high school students, with age-appropriate content for each level.',
  },
  {
    question: 'How do I choose the right program for my child?',
    answer:
      "We recommend booking a free assessment to evaluate your child's strengths and areas for improvement. Our team can then recommend the best combination of Academic and STEAM programs based on your child's needs, interests, and goals.",
  },
  {
    question: 'Do you offer trial classes or assessments?',
    answer: `Yes, we offer free academic assessments to help determine the best program fit. Contact us at ${CONTACT_INFO.email} or ${CONTACT_INFO.phone} to schedule your free assessment.`,
  },
]
