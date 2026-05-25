import type { FAQItem } from '@/components/schema/FAQSchema';

export const HOME_STEAM_FAQS: FAQItem[] = [
  {
    question: 'What age should my child start coding?',
    answer:
      'Ages 8–10 for block-based tools like Scratch. Ages 10+ for Python and text-based coding. GrowWise focuses on ages 10–18 — the range where students move from learning concepts to building real projects.',
  },
  {
    question: 'What is vibe coding — and should my child learn it?',
    answer:
      "Vibe coding means building apps using AI through natural language — describing what you want, and using AI to generate and refine code. In 2026, it's a real skill. GrowWise teaches students to vibe code AND understand what's happening underneath — so they control the AI, not the other way around.",
  },
  {
    question: 'Will coding still matter if AI writes code?',
    answer:
      "More than ever. Kids who understand coding don't get replaced by AI — they're the ones who use it, guide it, and build with it. Python and AI literacy are becoming as foundational as reading and writing.",
  },
  {
    question: 'How long until my child builds something real?',
    answer:
      'Most students ship their first working project within 4–6 sessions. By Month 3, they\u2019re building apps or games they can actually show people.',
  },
  {
    question: 'Is 1:1 or group coding better?',
    answer:
      'Research shows 1:1 students achieve in 20 hours what takes 40–60 hours in group classes. GrowWise offers both — small groups (max 8 students) and 1:1 sessions — depending on your child\u2019s goals.',
  },
];

export const HOME_ACADEMIC_FAQS: FAQItem[] = [
  {
    question: 'Why does my child keep making careless mistakes on tests?',
    answer:
      "It's rarely a knowledge problem. Careless mistakes usually come from a checking system issue, pacing pattern, or attention gap — not from not knowing the content. We run a diagnostic to find the exact pattern and fix it with targeted practice.",
  },
  {
    question: 'How long does tutoring take to show results?',
    answer:
      'Most students show measurable improvement within 4–6 sessions. Our 4–8 week plans are built around specific milestones — not open-ended sessions.',
  },
  {
    question: 'How is GrowWise different from Kumon or Mathnasium?',
    answer:
      "Kumon and Mathnasium use fixed worksheets and repetition sequences. GrowWise runs a diagnostic first, builds a personalized plan, and aligns every session to your child's exact school curriculum and upcoming assessments.",
  },
  {
    question: 'Is online tutoring as effective as in-person?',
    answer:
      'For most students, yes — especially with live sessions and real-time screen sharing. GrowWise offers both: live online nationwide and in-person in Dublin, CA.',
  },
];

export const HOME_VISIBLE_FAQS: FAQItem[] = [...HOME_STEAM_FAQS, ...HOME_ACADEMIC_FAQS];
