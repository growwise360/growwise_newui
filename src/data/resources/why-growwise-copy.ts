export const WHY_GROWWISE_PATH = '/why-growwise' as const

export const WHY_GROWWISE_TITLE =
  'Why Families Choose GrowWise Over Traditional Tutoring Programs'

export const WHY_GROWWISE_META_TITLE =
  'Why GrowWise | Structured, School-Aligned Programs for Grades 3–12'

export const WHY_GROWWISE_DESCRIPTION =
  'GrowWise uses a diagnostic-first, 3-level progression model with monthly progress reports and school-aligned curriculum. See how it compares to traditional tutoring programs.'

export const WHY_GROWWISE_KEYWORDS =
  'tutoring programs, structured tutoring, diagnostic assessment, school-aligned curriculum, diagnostic-first learning, small group tutoring, monthly progress reports, diagnostic learning model'

export const WHY_GROWWISE_HERO = {
  h1: WHY_GROWWISE_TITLE,
  opening: `Most tutoring programs start teaching on day one. GrowWise starts with a diagnostic — a structured assessment that identifies exactly where your child's understanding breaks down before a single session is planned. Every program, every level, and every instruction style is built from that starting point.`,
} as const

export type WhyGrowWiseSection = {
  h2: string
  body: string | readonly string[]
}

export const WHY_GROWWISE_SECTIONS: readonly WhyGrowWiseSection[] = [
  {
    h2: 'What most programs get wrong',
    body: [
      'Worksheet-based programs move students through fixed packets at a set pace. Drop-in tutoring centers assign work and check answers. Neither approach identifies *why* a student is struggling — only *that* they are.',
      'The result: parents end up sitting at the kitchen table at 9pm trying to explain concepts the program didn\'t close. The child completes the homework. The gap stays open.',
      'GrowWise is built around a different principle: a student who understands the material should be able to do their work independently. If they can\'t, the gap hasn\'t been closed — regardless of how many sessions they\'ve attended.',
    ],
  },
  {
    h2: 'Three levels. Clear milestones. Earned progression.',
    body: [
      'For Grades 1–5, every student enters one of three structured levels: **Beginner → Champ → Pro**',
      'Advancement is earned, not assumed. A student moves to the next level only after reaching 90% or above on a structured 3-month assessment. Students who reach that threshold receive a certificate and a milestone reward — a recognition system that builds genuine confidence, not participation trophies.',
      'Every level is also personalized to your child\'s learning style. Two students at the Champ level in the same class will receive instruction adapted to how they individually process and retain information.',
      '**What this means for parents:** You receive a monthly progress report showing exactly which skills were covered, which patterns were corrected, and what the next 30 days will focus on. No guessing. No waiting for the next report card.',
    ],
  },
  {
    h2: '95% aligned to your child\'s actual school curriculum',
    body: [
      'From Grade 6 upward, GrowWise programs are built around what your child\'s school is actually teaching — not a generic national curriculum.',
      'For DUSD and PUSD students, this means:',
      '- Math programs aligned 95% to the Integrated Math sequence (IM1, IM2, IM3) your child\'s school follows',
      '- English programs that shift focus to writing — analytical writing, structured essays, and the skills middle and high school teachers actually grade on',
      '- Instruction that maps directly to the pacing guide your child\'s teacher is following right now',
      '**Why this matters:** A student preparing for an IM1 unit test needs support on *that unit*, not a generic algebra review. School alignment means every session has immediate, visible impact on the class your child is actually in.',
    ],
  },
]

export type ComparisonRow = {
  label: string
  worksheetPrograms: string
  dropInCenters: string
  growwise: string
}

export const WHY_GROWWISE_COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    label: 'Starting point',
    worksheetPrograms: 'Fixed curriculum entry',
    dropInCenters: 'Whatever homework is due',
    growwise: 'Diagnostic assessment',
  },
  {
    label: 'Class size',
    worksheetPrograms: '15–20+ students',
    dropInCenters: 'Open floor',
    growwise: '6–10 students',
  },
  {
    label: 'Progression',
    worksheetPrograms: 'Timed packet completion',
    dropInCenters: 'No defined levels',
    growwise: '90% mastery required',
  },
  {
    label: 'Milestones',
    worksheetPrograms: 'None',
    dropInCenters: 'None',
    growwise: 'Certificate + reward every level',
  },
  {
    label: 'Curriculum alignment',
    worksheetPrograms: 'Generic national track',
    dropInCenters: 'None',
    growwise: '95% school-aligned (Gr 6+)',
  },
  {
    label: 'Progress visibility',
    worksheetPrograms: 'None',
    dropInCenters: 'None',
    growwise: 'Monthly written report',
  },
  {
    label: 'Student independence',
    worksheetPrograms: 'Parents often fill the gap',
    dropInCenters: 'Homework sent home unresolved',
    growwise: 'Students work independently',
  },
]

export type WhyGrowWiseFaq = {
  question: string
  answer: string
}

export const WHY_GROWWISE_FAQS: readonly WhyGrowWiseFaq[] = [
  {
    question: 'What makes GrowWise different from other tutoring centers in Dublin and Pleasanton?',
    answer:
      'Three things. First, school alignment — GrowWise is one of the few programs in the Tri-Valley that follows DUSD, PUSD, and SRVUSD curriculum week by week. Second, real teaching — a qualified instructor teaches in the room, explains concepts, catches mistakes in real time, and guides practice before students go home. Third, gap-specific planning — every student starts with a diagnostic assessment that identifies the root cause of their struggle, and their program is built around that finding, not a generic curriculum. Classes are small groups of 6 to 10 students.',
  },
  {
    question: 'How does GrowWise identify what my child needs?',
    answer:
      'Every student starts with a diagnostic assessment — not a placement quiz, a full gap analysis. We look at what your child knows, what they are missing, and what mistake pattern keeps repeating across their work. A student failing fractions in 7th grade may have a number sense gap from 5th grade that was never identified; the diagnostic finds that root cause. Every program decision — level placement, session focus, practice design — is built from that finding.',
  },
  {
    question: 'Who teaches GrowWise classes?',
    answer:
      'GrowWise hires instructors for subject mastery and teaching ability, then trains them on the GrowWise diagnostic and level system. Because classes are small groups of 6 to 10 students, instructors know each student by name, by strength, and by the specific mistake pattern they are working on — and can adjust an explanation mid-session when a student needs it framed differently.',
  },
  {
    question: 'How is GrowWise different from worksheet-based tutoring programs?',
    answer:
      'GrowWise does not use fixed packet progressions or timed worksheets. Every student starts with a diagnostic assessment, is placed in one of three structured levels (Beginner, Champ, or Pro), and advances only after reaching 90% mastery on a 3-month assessment. Instruction is personalized to each student\'s learning style within each level.',
  },
  {
    question: 'How many students are in a GrowWise class?',
    answer:
      'GrowWise classes have 6 to 10 students. This size allows instructors to give close individual attention during every session while maintaining the collaborative energy of a group learning environment.',
  },
  {
    question: 'Does GrowWise provide progress reports?',
    answer:
      'Yes. Parents receive a written monthly progress report detailing which skills were covered, which mistake patterns were corrected, and what the next 30 days will focus on — a clear breakdown of what your child has mastered, not a status label like "on track." At the end of every 3-month cycle, your child completes a level assessment with an objective threshold: 90% or above advances to the next level, and scores between 80 and 89 percent trigger a one-month prep plan and reassessment. You always know exactly where your child stands and what happens next.',
  },
  {
    question: 'How does GrowWise align to my child\'s school curriculum?',
    answer:
      'For Grade 6 and above, GrowWise math programs are 95% aligned to the Integrated Math sequence used by DUSD and PUSD schools. English programs at this level focus on analytical writing and essay structure — the skills graded at the middle and high school level.',
  },
  {
    question: 'What happens when my child reaches 90% in their GrowWise level?',
    answer:
      'Students who reach 90% or above on their 3-month assessment advance to the next program level and receive a certificate and milestone reward. Advancement is earned through demonstrated mastery, not time spent in the program.',
  },
  {
    question: 'How does GrowWise personalize instruction?',
    answer:
      'Personalization at GrowWise operates at two levels. First, every student\'s program starts from their diagnostic results — not a generic starting point. Second, within each level, instructors adapt how concepts are taught based on each student\'s learning style. Two students at the same level receive instruction framed differently based on how they individually process information.',
  },
  {
    question: 'Will my child need my help with homework after GrowWise sessions?',
    answer:
      'The goal of every GrowWise session is genuine understanding — not completion. If a student consistently needs parent help with work covered in their program, that signals a gap the program hasn\'t closed yet. GrowWise instructors track this and adjust before it becomes a pattern.',
  },
]

export const WHY_GROWWISE_CTA = {
  h2: 'Not sure where your child is right now?',
  body: 'The free 10-minute Self-Check identifies your child\'s current mistake patterns — the same diagnostic lens GrowWise uses before placing any student.',
  buttonLabel1: 'Take the Free Self-Check',
  buttonHref1: '/self-check',
  buttonLabel2: 'Book a Free 45-Minute Assessment',
  buttonHref2: '/book-assessment',
} as const
