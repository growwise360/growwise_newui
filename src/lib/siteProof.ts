export const SITE_PROOF = {
  students: '387+ Students',
  googleRating: '4.9★ Google',
  parentSatisfaction: '98% Parent Satisfaction',
} as const;

export const SITE_PROOF_LINE = [
  SITE_PROOF.students,
  SITE_PROOF.googleRating,
  SITE_PROOF.parentSatisfaction,
].join(' · ');

type CommercialValueOffer = {
  outcome: string;
  firstResult: string;
  actionLabel: string;
  actionHref: string;
};

export const COMMERCIAL_VALUE_ROUTES = {
  '/': {
    outcome: 'Find the right academic or technology starting point for your child.',
    firstResult: 'Written next-step plan after a 30-minute assessment',
    actionLabel: 'Find the Right Starting Point',
    actionHref: '/book-assessment',
  },
  '/academic': {
    outcome: 'Find the academic gap and leave with a clear next step.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Book a Free Assessment',
    actionHref: '/book-assessment',
  },
  '/academic/math': {
    outcome: 'Match math support to the exact concept holding your child back.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the Math Gap',
    actionHref: '/book-assessment',
  },
  '/academic/english': {
    outcome: 'Build stronger reading and writing from the skill that needs attention first.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the English Gap',
    actionHref: '/book-assessment',
  },
  '/academic/english/elementary': {
    outcome: 'Identify whether fluency, comprehension, grammar, or writing structure needs attention first.',
    firstResult: 'Written next-step plan after a 30-minute assessment',
    actionLabel: 'Find the English Gap',
    actionHref: '/book-assessment',
  },
  '/coding': {
    outcome: 'Turn screen time into real coding skills and finished projects.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the Right Coding Class',
    actionHref: '/contact',
  },
  '/future-skills': {
    outcome: 'Build practical AI, coding, and creative skills through guided projects.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the Right Program',
    actionHref: '/contact',
  },
  '/steam': {
    outcome: 'Help your child create, test, and explain instead of only watching.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the Right STEAM Class',
    actionHref: '/contact',
  },
  '/game-dev': {
    outcome: 'Move from playing games to designing and building them.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Find the Right Game Dev Class',
    actionHref: '/contact',
  },
  '/camps': {
    outcome: 'Choose a camp with a clear learning outcome before you reserve.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Compare Camp Options',
    actionHref: '/camps/summer',
  },
  '/camps/academic-summer-programs-dublin-ca': {
    outcome: 'Choose a summer sprint by the exact math, reading, or writing skill your child needs next.',
    firstResult: 'See schedules, fit, and pricing before reserving',
    actionLabel: 'Compare Summer Programs',
    actionHref: '#program-grid',
  },
  '/camps/summer-im-get-ready-dublin-ca': {
    outcome: 'Start Integrated Math with the prerequisite skills already refreshed.',
    firstResult: 'Compare IM1 and IM2 readiness tracks now',
    actionLabel: 'Compare IM Tracks',
    actionHref: '#course-cards',
  },
  '/camps/summer-algebra-dublin-ca': {
    outcome: 'Refresh equations, functions, and graphing before the first week of Algebra.',
    firstResult: 'See schedule, fit, and pricing now',
    actionLabel: 'View Algebra Sprint Options',
    actionHref: '/camps/academic-summer-programs-dublin-ca?filter=get-ready-math',
  },
  '/camps/summer-geometry-precalculus-dublin-ca': {
    outcome: 'Rebuild the algebra and geometry skills that advanced math expects on day one.',
    firstResult: 'See schedule, fit, and pricing now',
    actionLabel: 'View Geometry Options',
    actionHref: '/camps/academic-summer-programs-dublin-ca?filter=get-ready-math',
  },
  '/camps/summer-math-foundations-dublin-ca': {
    outcome: 'Strengthen number sense, fractions, and problem solving before the next grade.',
    firstResult: 'See schedule, fit, and pricing now',
    actionLabel: 'View Math Foundations',
    actionHref: '/camps/academic-summer-programs-dublin-ca?filter=academic-sprints',
  },
  '/camps/summer-reading-writing-dublin-ca': {
    outcome: 'Build stronger comprehension and organized writing before school resumes.',
    firstResult: 'See schedule, fit, and pricing now',
    actionLabel: 'View Reading and Writing',
    actionHref: '/camps/academic-summer-programs-dublin-ca?filter=academic-sprints',
  },
  '/camps/high-school-summer-intensive-dublin-ca': {
    outcome: 'Close the exact Algebra, Geometry, or Precalculus gap before the next course begins.',
    firstResult: 'Choose a focused course and schedule now',
    actionLabel: 'Compare High School Courses',
    actionHref: '#courses',
  },
  '/courses/integrated-math-1-dublin-ca': {
    outcome: 'Find the algebra, functions, or problem-solving gap lowering Integrated Math 1 confidence.',
    firstResult: 'Written next-step plan after a 30-minute assessment',
    actionLabel: 'Find the IM1 Gap',
    actionHref: '/book-assessment',
  },
  '/dublin-ca': {
    outcome: 'Get local academic support matched to your child’s current level.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Book a Free Assessment',
    actionHref: '/book-assessment',
  },
  '/contact': {
    outcome: 'Tell us what your child needs and get a clear next step within 24 hours.',
    firstResult: 'Clear response within 24 hours',
    actionLabel: 'Ask GrowWise',
    actionHref: '#contact-form',
  },
} as const satisfies Record<string, CommercialValueOffer>;

export type CommercialValueRoute = keyof typeof COMMERCIAL_VALUE_ROUTES;
