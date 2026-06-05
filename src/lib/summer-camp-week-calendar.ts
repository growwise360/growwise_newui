/**
 * Single source of truth for 2026 summer camp calendar buckets (Mon–Fri weeks).
 * Season: June 8 (Mon) through July 31 (Fri), 2026 — eight full weeks.
 */

/** Human-readable season span for modal / marketing (matches week list). */
export const SUMMER_CAMP_SEASON_RANGE_TEXT = 'June 8 – July 31, 2026';

/** Short note for parents (July 4, 2026 is a Saturday; still stated for clarity). */
export const SUMMER_CAMP_JULY4_NOTE = 'No camp July 4';

/** ISO-8601 with Pacific offset for Event JSON-LD. */
export const SUMMER_CAMP_EVENT_START_ISO = '2026-06-08T09:00:00-08:00';

export const SUMMER_CAMP_EVENT_END_ISO = '2026-07-31T17:00:00-08:00';

/**
 * Eight Monday–Friday camp weeks, fixed labels (avoids TZ bugs from Date parsing).
 */
export const SUMMER_CAMP_WEEK_LABELS_2026 = [
  'Jun 8–12, 2026',
  'Jun 15–19, 2026',
  'Jun 22–26, 2026',
  'Jun 29 – Jul 3, 2026',
  'Jul 6–10, 2026',
  'Jul 13–17, 2026',
  'Jul 20–24, 2026',
  'Jul 27–31, 2026',
] as const;

export const SUMMER_CAMP_WEEK_COUNT = SUMMER_CAMP_WEEK_LABELS_2026.length;

/** Mon–Fri ISO date pairs for each camp week (Event JSON-LD). */
export const SUMMER_CAMP_WEEK_ISO_RANGES_2026 = [
  { startDate: '2026-06-08', endDate: '2026-06-12' },
  { startDate: '2026-06-15', endDate: '2026-06-19' },
  { startDate: '2026-06-22', endDate: '2026-06-26' },
  { startDate: '2026-06-29', endDate: '2026-07-03' },
  { startDate: '2026-07-06', endDate: '2026-07-10' },
  { startDate: '2026-07-13', endDate: '2026-07-17' },
  { startDate: '2026-07-20', endDate: '2026-07-24' },
  { startDate: '2026-07-27', endDate: '2026-07-31' },
] as const;

/** Math Olympiad Tier 2: each slot spans two consecutive calendar weeks. */
export const MATH_OLYMPIAD_TIER2_ISO_RANGES_2026 = [
  { startDate: '2026-06-08', endDate: '2026-06-19' },
  { startDate: '2026-06-22', endDate: '2026-07-03' },
  { startDate: '2026-07-06', endDate: '2026-07-17' },
  { startDate: '2026-07-20', endDate: '2026-07-31' },
] as const;

export type SummerCampWeekIsoRange = {
  startDate: string;
  endDate: string;
};

export function getSummerCampWeekIsoRange(weekIndex0: number): SummerCampWeekIsoRange | undefined {
  return SUMMER_CAMP_WEEK_ISO_RANGES_2026[weekIndex0];
}

export function getMathOlympiadTier2IsoRange(
  slotIndex0: number,
): SummerCampWeekIsoRange | undefined {
  return MATH_OLYMPIAD_TIER2_ISO_RANGES_2026[slotIndex0];
}

export function getSummerCampWeekLabel(weekIndex0: number): string {
  const label = SUMMER_CAMP_WEEK_LABELS_2026[weekIndex0];
  if (label) return label;
  return `Week ${weekIndex0 + 1}`;
}

/** Standard slot line: `Week 1 (Jun 8–12, 2026)` — used across camp programs. */
export function formatCampWeekSlotHeading(weekIndex0: number): string {
  const dates = getSummerCampWeekLabel(weekIndex0);
  if (/^Week\s+\d+$/.test(dates)) return dates;
  return `Week ${weekIndex0 + 1} (${dates})`;
}

/**
 * Registration is closed for camp slots that start on June 8, 2026.
 * Uses the rendered slot label so generated one-week and multi-week slots share the same guard.
 */
export function isJune8SummerCampRegistrationClosed(slotLabel: string): boolean {
  return /\bJun\s+8\b/.test(slotLabel);
}

/** Math Olympiad Tier 2: `Weeks 1-2 (Jun 8 – Jun 19, 2026)` */
export function formatOlympiadTier2SlotHeading(slotIndex0: number): string {
  const dates = getMathOlympiadTier2SlotLabel(slotIndex0);
  if (/^Weeks\s/.test(dates)) return dates;
  const start = slotIndex0 * 2 + 1;
  const end = slotIndex0 * 2 + 2;
  return `Weeks ${start}-${end} (${dates})`;
}

/** Math Olympiad Tier 2: each slot spans two consecutive calendar weeks. */
const MATH_OLYMPIAD_TIER2_SLOT_LABELS = [
  'Jun 8 – Jun 19, 2026',
  'Jun 22 – Jul 3, 2026',
  'Jul 6 – Jul 17, 2026',
  'Jul 20 – Jul 31, 2026',
] as const;

export function getMathOlympiadTier2SlotLabel(slotIndex0: number): string {
  const label = MATH_OLYMPIAD_TIER2_SLOT_LABELS[slotIndex0];
  if (label) return label;
  return `Weeks ${slotIndex0 * 2 + 1}–${slotIndex0 * 2 + 2}`;
}
