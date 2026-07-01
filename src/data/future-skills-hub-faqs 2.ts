import type { FAQItem } from '@/components/schema/FAQSchema';

/** Visible hub FAQ accordion + FAQPage JSON-LD — single source of truth. */
export const FUTURE_SKILLS_HUB_FAQS: readonly FAQItem[] = [
  {
    question: 'What is GrowWise Future Skills?',
    answer:
      'Future Skills is GrowWise’s certification pathway program for Grades 6–12. Students build real projects at every level, then prepare for optional external credentials — Adobe, Python Institute, Certiport, and more — when they are ready.',
  },
  {
    question: 'How is Future Skills different from Coding or STEAM classes?',
    answer:
      'Coding and STEAM pages are for exploring foundations and trial classes. Future Skills is a structured multi-level pathway with placement, portfolio review, and optional external exam prep. Families who want certifications and a clear level progression start here.',
  },
  {
    question: 'Does my child need a pathway assessment before enrolling?',
    answer:
      'Yes. A pathway assessment confirms the right starting level and which track fits your child’s goals. Tuition is shared at assessment — not listed as fixed prices on the website.',
  },
  {
    question: 'Are external certifications required?',
    answer:
      'No. Every pathway is project-first. External exams are optional and pursued separately when the student and family are ready. GrowWise issues level completion certificates; third-party credentials are issued by those providers upon passing.',
  },
  {
    question: 'Can students take Certiport exams at GrowWise Dublin?',
    answer:
      'Yes. GrowWise Dublin is a Certiport Authorized Testing Center. Eligible students can sit on-site exams when ready. Exam vouchers are purchased separately at certiport.com.',
  },
  {
    question: 'Which pathways are available?',
    answer:
      'Four pathways: Design & Creative Media, Python Certification, AI & Machine Learning, and AI Entrepreneurship. Each has four levels with 90-minute live online sessions and optional certification prep at the top level.',
  },
] as const;
