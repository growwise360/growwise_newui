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
  const fromMonthly = formatFromMonthlyPhrase('high-school');
  const trial = formatTrialSessionFeeLabel();
  return `Algebra 2, Pre-Calc & AP math in Dublin, CA. Monthly programs ${fromMonthly}, ${trial} trial for Grades 9–12. School-aligned small groups. Free assessment.`;
}

export function buildHighSchoolSeoIntroParagraph(): string {
  const fromMonthly = formatFromMonthlyPhrase('high-school');
  const trial = formatTrialSessionFeeLabel();
  return `GrowWise offers structured math learning programs for high school students in Dublin, CA — from Algebra 1 through Pre-Calculus, Integrated Math, and beyond. Small classes, expert instructors, results that show up on report cards. Start with a free assessment or a ${trial} trial session (Grades 9–12) before enrolling in a monthly program ${fromMonthly}.`;
}

export function buildHighSchoolTrialFaqAnswer(): string {
  const trial = formatTrialSessionFeeLabel();
  return `A single 90-minute instructional session aligned to the student's current high school course. The instructor works through real problems, identifies gaps, and gives a parent debrief on course fit and monthly program options. The ${trial} fee is fully waived if you enroll in a monthly program within 7 days.`;
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
  const fromMonthly = formatFromMonthlyPhrase('high-school');
  const trial = formatTrialSessionFeeLabel();
  return `Monthly programs (${fromMonthly}) are structured 3-month enrollments with a fixed curriculum scope and live small groups. Per-session options in the course catalog are single-session drop-ins at listed rates (${trial}–$75). The ${trial} trial is a one-time way to try instruction before choosing a monthly program.`;
}
