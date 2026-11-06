export const ONLINE_ONLY_SWITCH = false
export const ONLINE_ONLY_SWITCH_DATE = '[OPEN: confirm online-only transition date]'

export type GradeBandId = 'elementary' | 'middle' | 'high-school'
export type PlanLane = 'core' | 'advanced'

export const ONLINE_CATALOG_CONFIG = {
  currency: 'USD',
  termMonths: 3,
  weeklyClassMinutes: 90,
  onlineOfferingEnabled: true,
  checkoutEnabled: false,
  trialEligibilityEnforcementEnabled: false,
  creditLedgerEnabled: false,
  subjectSkus: {
    math: 'academic-math',
    english: 'academic-english',
    chemistry: 'academic-chemistry',
    physics: 'academic-physics',
  },
  classFormat: '[OPEN: confirm small group or 1:1]',
  markets: '[OPEN: confirm countries served]',
  studentSupportDetails: '[OPEN: define student support included in middle and high school plans]',
  bands: [
    {
      id: 'elementary',
      label: 'Elementary',
      grades: 'Grades 3–5',
      subjects: ['Math', 'English'],
      trial: 197,
      core: 327,
      advanced: null,
      includes: ['Live class', 'Gap lessons', 'Reteach', 'Parent dashboard', 'Monthly progress report'],
    },
    {
      id: 'middle',
      label: 'Middle school',
      grades: 'Grades 6–8',
      subjects: ['Math', 'English'],
      trial: 207,
      core: 347,
      advanced: 397,
      includes: ['Everything in Elementary', 'Student support'],
    },
    {
      id: 'high-school',
      label: 'High school',
      grades: 'Grades 9–12',
      subjects: ['Math', 'English', 'Chemistry', 'Physics'],
      trial: 237,
      core: 387,
      advanced: 437,
      includes: ['Live class', 'Gap lessons', 'Reteach', 'Parent dashboard', 'Monthly assessment', 'Student support'],
    },
  ] satisfies Array<{
    id: GradeBandId
    label: string
    grades: string
    subjects: string[]
    trial: number
    core: number
    advanced: number | null
    includes: string[]
  }>,
  bundles: [
    { id: 'elementary-two', label: 'Elementary Math + English', core: 587, advanced: null },
    { id: 'middle-two-core', label: 'Middle school, any 2 Core subjects', core: 627, advanced: null },
    { id: 'middle-two-advanced', label: 'Middle school, any 2 Advanced subjects', core: null, advanced: 717 },
    { id: 'high-two', label: 'High school, any 2 subjects', core: 697, advanced: 787 },
    { id: 'high-three', label: 'High school, any 3 subjects', core: 987, advanced: 1117 },
    { id: 'high-four', label: 'High school, all 4 subjects', core: 1317, advanced: 1487 },
    { id: 'middle-mixed', label: 'Middle school, 1 Core + 1 Advanced', core: 667, advanced: null },
    { id: 'high-two-mixed', label: 'High school, 1 Core + 1 Advanced', core: 737, advanced: null },
    { id: 'high-three-mixed-core', label: 'High school, 2 Core + 1 Advanced', core: 1027, advanced: null },
    { id: 'high-three-mixed-advanced', label: 'High school, 1 Core + 2 Advanced', core: 1067, advanced: null },
    { id: 'high-four-mixed-core', label: 'High school, 3 Core + 1 Advanced', core: 1357, advanced: null },
    { id: 'high-four-mixed-advanced', label: 'High school, 1 Core + 3 Advanced', core: 1447, advanced: null },
    { id: 'high-four-mixed-even', label: 'High school, 2 Core + 2 Advanced', core: 1397, advanced: null },
  ],
  singlePurchaseCredit: 50,
  bundlePurchaseCredit: 65,
  upfrontDiscountPercent: 5,
  homeworkHelpAddon: {
    highSchoolAvailability: true,
    price: '[OPEN: reconcile the supplied $85 value with the price-ending-in-7 requirement]',
    elementaryAndMiddleAvailability: '[OPEN: confirm availability]',
    displayPrice: false,
    reason: 'The supplied $85 price conflicts with the requirement that every displayed price end in 7; keep hidden pending owner resolution.',
  },
  samePackageCreditRenewal: '[OPEN: different course only by default; confirm same-package renewal policy]',
  trialEligibility: 'Once per student, per subject SKU',
  faqs: [
    {
      question: 'How does the three-month term work?',
      answer: 'The listed monthly price is per subject on a three-month term. The trial is a one-time, four-week purchase for one student and one subject.',
    },
    {
      question: 'What happens during the trial month?',
      answer: 'The trial includes the scheduled live class and a trial report that lists the gap lessons queued for a paid plan. Student support is not included.',
    },
    {
      question: 'How do I know which subject and level to choose?',
      answer: 'A parent completes the assessment, then a GrowWise teacher confirms the recommended subject, level, available schedule, and price before enrollment.',
    },
    {
      question: 'Are Chemistry and Physics classes online?',
      answer: 'Online science classes use simulations. Hands-on labs remain with the student’s school.',
    },
  ],
} as const

export type OnlineGradeBand = (typeof ONLINE_CATALOG_CONFIG.bands)[number]

export function formatOnlinePrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: ONLINE_CATALOG_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function roundPriceEndingIn7(amount: number): number {
  const lower = Math.floor((amount - 7) / 10) * 10 + 7
  const upper = lower + 10
  return amount - lower <= upper - amount ? lower : upper
}

export function upfrontTermPrice(monthlyPrice: number): number {
  return roundPriceEndingIn7(monthlyPrice * ONLINE_CATALOG_CONFIG.termMonths * 0.95)
}
