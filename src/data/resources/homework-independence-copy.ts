import type { ResourceArticleFaq, ResourceArticleMeta, ResourceArticleRelated } from '@/data/resources/types'

export const HOMEWORK_INDEPENDENCE_PATH = '/resources/homework-independence' as const

export const HOMEWORK_INDEPENDENCE_META: ResourceArticleMeta = {
  path: HOMEWORK_INDEPENDENCE_PATH,
  category: 'academic',
  categoryLabel: 'ACADEMIC',
  h1: 'How to Stop Sitting Next to Your Child Every Homework Night',
  readTime: '5 min read',
  updated: 'Updated May 2026',
  title: 'How to Stop Sitting Next to Your Child Every Homework Night | GrowWise',
  description:
    "If you have to sit with your child every night for homework to get done, that's a system problem — not a character flaw. Here's how to build real homework independence in 6–8 weeks.",
  keywords:
    'how to get child to do homework independently, child won\'t do homework without me, homework independence kids, stop sitting with child for homework, homework battles every night, building homework routine kids, child procrastinates homework, how to stop homework battles, homework independence grades 3-8',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
}

export type HomeworkWeekPhase = {
  weeks: string
  title: string
  paragraphs: readonly string[]
  bullets?: readonly string[]
}

export const HOMEWORK_INDEPENDENCE_WEEK_PHASES: readonly HomeworkWeekPhase[] = [
  {
    weeks: 'Week 1–2',
    title: 'Set the trigger',
    paragraphs: [
      "Choose a consistent homework start time that works for your child's energy. Some children work best immediately after school. Others need 30–45 minutes of decompression first. The time matters less than the consistency.",
      'The trigger should be environmental, not verbal — a timer that starts automatically, a snack that marks the transition, a playlist that signals work mode. Not: "Did you start your homework yet?"',
    ],
  },
  {
    weeks: 'Week 3–4',
    title: 'Structure the workspace',
    paragraphs: [
      'Designate one location for homework only. Remove devices from the space. Have all supplies already there. A clutter-free, predictable workspace reduces the time between sitting down and actually starting.',
      "The Child Mind Institute's February 2026 guide notes that building choice into the process reduces power struggles. Let your child have input on the workspace setup — which lamp, which chair, which music if any. Ownership reduces resistance.",
    ],
  },
  {
    weeks: 'Week 5–6',
    title: 'Teach task initiation',
    paragraphs: [
      "The skill most students are missing is not focus — it's how to start. Teach a 3-step launch:",
      'The 5-minute rule breaks the initiation freeze. Almost every student who sits down for 5 minutes continues past it.',
    ],
    bullets: [
      'Open the planner or assignment list',
      'Write down the three tasks for tonight',
      'Start the first one for exactly 5 minutes before deciding if you need help',
    ],
  },
  {
    weeks: 'Week 7–8',
    title: 'Step back deliberately',
    paragraphs: [
      'Start by being in the same room but not at the table. Move to a nearby room. Move further. Each week, reduce your proximity while keeping availability.',
      "The key signal to your child: I'm here if you need me, but I trust you to start.",
    ],
  },
]

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly (all 5 from spec). */
export const HOMEWORK_INDEPENDENCE_FAQS: readonly ResourceArticleFaq[] = [
  {
    question: 'Why does my child do homework fine some nights but refuse other nights?',
    answer:
      "Consistency is a function of the trigger, not the child's mood. When there's no reliable routine, the child makes a fresh decision every night — and some nights, the resistance wins. A consistent trigger removes the decision entirely.",
  },
  {
    question: 'Is it normal to sit with my child for homework in Grades 3–5?',
    answer:
      "Occasional help is normal. Sitting for the entire session every night is a signal that the independence habit hasn't been built yet. Most children in Grades 3–5 should be able to work independently for 20–30 minutes with a parent available nearby.",
  },
  {
    question: "My child says they don't have homework. What do I do?",
    answer:
      'Ask to see the planner or assignment app. Children with low homework independence often also struggle with tracking assignments. The habit of recording and checking homework is part of the same system.',
  },
  {
    question: "How long should homework take for my child's grade level?",
    answer:
      'A commonly cited guideline is 10 minutes per grade level per night (Grade 3 = 30 minutes, Grade 5 = 50 minutes). If homework consistently takes significantly longer, that\'s a signal worth investigating — it may indicate a skill gap, not a routine issue.',
  },
  {
    question: 'My child has an IEP — does this system still apply?',
    answer:
      "General homework-structure principles may still help at home, but accommodations such as extended time, reduced task length, or modified environments should be determined by your child's school IEP team—not by a supplemental tutoring center. GrowWise is not equipped to implement IEP or Section 504 plans; see our Terms & Conditions for details. Work with your school's special-education team for formal accommodations, and use any home routine in alignment with their guidance.",
  },
] as const

export const HOMEWORK_INDEPENDENCE_RELATED: readonly ResourceArticleRelated[] = [
  {
    href: '/resources/reading-fluency-vs-comprehension',
    title: 'Reading Fluency vs. Reading Comprehension: Which Gap Does Your Child Have?',
  },
  {
    href: '/resources/careless-math-mistakes',
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
  },
  {
    href: '/resources/when-to-start-sat-prep',
    title: 'When Should My Child Start SAT Prep?',
  },
] as const
