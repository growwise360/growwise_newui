export const CARELESS_MATH_MISTAKES_PATH = '/resources/careless-math-mistakes' as const

export const CARELESS_MATH_MISTAKES_TITLE =
  'Why Kids Make Careless Math Mistakes on Tests (And How to Actually Fix It)'

export const CARELESS_MATH_MISTAKES_META_TITLE =
  'Why Kids Make Careless Math Mistakes on Tests | GrowWise'

export const CARELESS_MATH_MISTAKES_DESCRIPTION =
  "Your child knows the material but still loses points. Careless math mistakes follow specific patterns — and each pattern has a fix. Here's how to find the real blocker."

export const CARELESS_MATH_MISTAKES_KEYWORDS =
  'careless mistakes in math, why kids lose points on math tests, child makes careless math mistakes, how to stop careless mistakes in math, child understands math but gets wrong answers, math mistake patterns, procedural errors in math'

export const CARELESS_MATH_MISTAKES_HERO = {
  categoryLabel: 'ACADEMIC',
  h1: CARELESS_MATH_MISTAKES_TITLE,
  meta: '6 min read · Updated May 2026',
} as const

export type CarelessMistakePattern = {
  id: string
  title: string
  description: string
  examples: readonly string[]
  fix: string
}

export const CARELESS_MATH_MISTAKES_PATTERNS: readonly CarelessMistakePattern[] = [
  {
    id: 'transfer',
    title: 'Pattern 1: The Transfer Error',
    description:
      'The child solves the problem correctly in their head or on scratch work, then copies the answer incorrectly onto the answer line. Common in multi-step algebra and word problems.',
    examples: [],
    fix: 'Train the habit of boxing or circling the final answer at each step before moving on. Slow the transfer, not the solving.',
  },
  {
    id: 'formula-confusion',
    title: 'Pattern 2: Formula Confusion',
    description:
      'Two concepts learned around the same time sit too close together mentally. The child reaches for the wrong one under time pressure.',
    examples: [
      'Area vs. perimeter (same dimensions, different operations)',
      'Mean vs. median vs. mode (taught together, confused under pressure)',
      'Adding vs. multiplying fractions (common denominator required for one, not the other)',
    ],
    fix: 'Spaced repetition of both concepts side-by-side, not isolated drilling of each. The student needs to practice distinguishing, not just remembering.',
  },
  {
    id: 'rush-to-hard',
    title: 'Pattern 3: The Rush-to-Hard Trap',
    description:
      'The student scans the test, identifies hard questions, and decides to do easy ones quickly. In rushing through "easy" questions, they make careless errors. They then lose more points on simple problems than on the hard questions they were worried about.',
    examples: [],
    fix: 'Timed practice with a structured sequencing protocol. Students who practice consistent pacing under realistic test conditions break this pattern within 4–6 sessions.',
  },
  {
    id: 'verification-gap',
    title: 'Pattern 4: The Verification Gap',
    description:
      "The student checks their work but does so too quickly and in the same mental frame they used to solve it. They don't actually catch errors because they're confirming, not re-solving.",
    examples: [],
    fix: 'Teach a 2-step checking system — first check that the answer makes sense (estimation check), then re-solve the problem using a different method when possible.',
  },
]

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly. */
export const CARELESS_MATH_MISTAKES_FAQS = [
  {
    question: 'Are careless mistakes in math a sign of a learning problem?',
    answer:
      "Not necessarily. Most careless mistakes follow a specific pattern — procedural, pacing, formula confusion, or checking gap — and are correctable with targeted practice. They are rarely a sign of a deeper learning disability unless they persist across all subjects after targeted intervention.",
  },
  {
    question: 'Why does my child make mistakes on tests but not on homework?',
    answer:
      'Test conditions introduce time pressure, which amplifies existing habits. Mistakes that are suppressed during calm homework become visible under pressure. The habit needs to be corrected under realistic conditions, not just in a low-stress environment.',
  },
  {
    question: 'Does telling my child to slow down help with careless math mistakes?',
    answer:
      'Rarely. Slowing down is too vague to change a specific habit. What works is identifying which part of the problem is breaking down — reading the question, setting up the steps, calculating, or checking — and practicing that specific step.',
  },
  {
    question: 'How long does it take to fix careless mistake patterns in math?',
    answer:
      'Most students with a single identifiable pattern show measurable improvement within 4–6 targeted sessions. Patterns involving multiple mixed-up formulas may take 8–10 sessions to fully stabilize under test conditions.',
  },
  {
    question: 'Is careless mistakes in math the same as ADHD or attention issues?',
    answer:
      'Not always. Some careless mistakes do relate to attention regulation, but many are purely habitual — formed through repeated low-stakes practice without correction. A proper error analysis distinguishes between attention-based errors and habit-based errors.',
  },
] as const

export const CARELESS_MATH_MISTAKES_RELATED = {
  title: 'How to Build Homework Independence',
  description: 'The system that builds independence in 6–8 weeks — without the fights.',
  href: '/resources/homework-independence',
} as const

export const CARELESS_MATH_MISTAKES_CTA = {
  heading: 'Not sure what pattern your child has?',
  subtext:
    'Start with the GrowWise free diagnostic tool — a 5-minute self-check that identifies the likely mistake pattern behind your child\'s test scores. Or book a free 45-minute academic assessment for a skill snapshot and clear plan.',
  selfCheckLabel: 'Take the Free Diagnostic →',
  assessmentLabel: 'Book a Free Assessment →',
} as const
