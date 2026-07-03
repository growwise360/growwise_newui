import { MATH_HUB_COPY, type MathGradeBandId } from '@/lib/math-hub-copy';

/** One-time trial session fee (USD) — referenced in trial copy, FAQs, and meta. */
export const MATH_TRIAL_SESSION_FEE_USD = 45 as const;

export function formatTrialSessionFeeLabel(): string {
  return `$${MATH_TRIAL_SESSION_FEE_USD}`;
}

/** Parse first dollar amount from strings like "$189/mo" or "From $189/month". */
export function parseMonthlyUsdFromLabel(label: string): number | null {
  const match = label.match(/\$(\d+)/);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

export function getMathHubProgramCard(bandId: MathGradeBandId) {
  return MATH_HUB_COPY.programOptions.cards.find((card) => card.id === bandId);
}

export function getMathHubGradeBandCard(bandId: MathGradeBandId) {
  return MATH_HUB_COPY.gradeBands.cards.find((card) => card.id === bandId);
}

/** Lowest monthly program tier (first option) for a grade band. */
export function getMathHubMinMonthlyUsd(bandId: MathGradeBandId): number {
  const card = getMathHubProgramCard(bandId);
  const firstPrice = card?.options[0]?.price;
  const parsed = firstPrice ? parseMonthlyUsdFromLabel(firstPrice) : null;
  if (parsed == null) {
    throw new Error(`Missing monthly price for math band: ${bandId}`);
  }
  return parsed;
}

export function formatFromMonthlyPhrase(bandId: MathGradeBandId): string {
  return `from $${getMathHubMinMonthlyUsd(bandId)}/month`;
}

export function formatUsdPerMonth(amount: number): string {
  return `$${amount}/mo`;
}

/** Schema.org offer price string (no currency symbol). */
export function getMathHubSchemaOfferPrice(bandId: MathGradeBandId): string {
  return String(getMathHubMinMonthlyUsd(bandId));
}

export function buildMiddleSchoolMetaDescription(): string {
  const fromMonthly = formatFromMonthlyPhrase('middle-school');
  const trial = formatTrialSessionFeeLabel();
  return `Grades 6–8 math: Course 1–IM2, school-aligned curriculum. ${trial} trial, monthly programs ${fromMonthly}. Live small groups. Free assessment.`;
}

export function buildHighSchoolMetaDescription(): string {
  return 'High school math tutoring in Dublin, CA for Algebra 1, Algebra 2, Advanced Algebra 2, Precalculus, AP Precalculus, and Calculus.';
}

export function buildHighSchoolSeoIntroParagraph(): string {
  return 'GrowWise offers structured math learning programs for high school students in Dublin, CA — from Algebra 1 through Calculus, including Advanced Algebra 2, Precalculus, and AP Precalculus. Small classes, expert instructors, and course-specific support help students build skills that show up on homework, tests, and report cards.';
}

export function buildHighSchoolTrialFaqAnswer(): string {
  return 'The free assessment is a short placement conversation and skills check. It helps identify the student\'s current course, prerequisite gaps, and the right starting point before enrollment.';
}

export function buildMiddleSchoolTrialFaqAnswer(): string {
  const trial = formatTrialSessionFeeLabel();
  return `A single 90-minute instructional session where your child works with a GrowWise instructor on real course-level problems. At the end, we give you a debrief on what we found, which track fits, and which course level to start at. The ${trial} fee is fully waived if you enroll within 7 days.`;
}

export function buildMiddleSchoolTrialVsMonthlyFaqAnswer(): string {
  const trial = formatTrialSessionFeeLabel();
  return `The ${trial} trial is a single 90-minute instructional session to try GrowWise before committing. Monthly programs are structured enrollments with a fixed curriculum scope, live small groups, and ongoing progress. The trial fee is waived if you enroll within 7 days.`;
}

export function buildHighSchoolMonthlyVsDropInFaqAnswer(): string {
  return 'Monthly high school math programs are structured enrollments with a defined course focus, weekly small-group instruction, curriculum alignment, and parent progress updates. Drop-in help is less structured and is better for one-off questions than long-term course improvement.';
}
