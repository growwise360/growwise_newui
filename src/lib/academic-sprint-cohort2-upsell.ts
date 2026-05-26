import type { CartItem } from '@/components/gw/CartContext';

export const ACADEMIC_SPRINT_TRACK_IDS = [
  'read-to-prove',
  'write-to-explain',
  'bridge-the-gap-math',
] as const;

export const GET_READY_TRACK_IDS = ['im1', 'im2', 'algebra-1', 'geometry'] as const;

export type AcademicSprintUpsellTierId = 'grades-3-5' | 'grades-6-8';

export const ACADEMIC_SPRINT_COHORT2_UPSELL_SKUS = {
  'grades-3-5': {
    id: 'academic-sprint-cohort2-upsell-gr3-5',
    price: 189,
    compareAtPrice: 249,
    saveAmount: 60,
    gradeLabel: 'Grades 1–5',
    cohortDates: 'June 30–July 11',
  },
  'grades-6-8': {
    id: 'academic-sprint-cohort2-upsell-gr6-8',
    price: 289,
    compareAtPrice: 349,
    saveAmount: 60,
    gradeLabel: 'Grades 6–8',
    cohortDates: 'June 30–July 11',
  },
} as const;

export function isGetReadyCartItem(itemId: string): boolean {
  return GET_READY_TRACK_IDS.some(
    (trackId) => itemId === trackId || itemId.startsWith(`${trackId}-`),
  );
}

export function getAcademicSprintCohort1TierFromItemId(itemId: string): AcademicSprintUpsellTierId | null {
  for (const trackId of ACADEMIC_SPRINT_TRACK_IDS) {
    if (!itemId.startsWith(`${trackId}-`)) continue;
    if (itemId.endsWith('-grades-3-5-cohort1')) return 'grades-3-5';
    if (itemId.endsWith('-grades-6-8-cohort1')) return 'grades-6-8';
  }
  return null;
}

export function cartHasAcademicSprintCohort1Item(items: CartItem[]): boolean {
  return items.some((item) => getAcademicSprintCohort1TierFromItemId(item.id) !== null);
}

export function getEligibleAcademicSprintUpsellTiers(items: CartItem[]): AcademicSprintUpsellTierId[] {
  if (items.some((item) => isGetReadyCartItem(item.id))) return [];
  if (!cartHasAcademicSprintCohort1Item(items)) return [];

  const tiers = new Set<AcademicSprintUpsellTierId>();
  for (const item of items) {
    const tier = getAcademicSprintCohort1TierFromItemId(item.id);
    if (tier) tiers.add(tier);
  }

  return [...tiers].filter(
    (tier) => !items.some((item) => item.id === ACADEMIC_SPRINT_COHORT2_UPSELL_SKUS[tier].id),
  );
}

export function buildAcademicSprintCohort2UpsellCartItem(
  tier: AcademicSprintUpsellTierId,
): CartItem {
  const sku = ACADEMIC_SPRINT_COHORT2_UPSELL_SKUS[tier];
  return {
    id: sku.id,
    name: `Add Cohort 2 · ${sku.gradeLabel} · ${sku.cohortDates}`,
    price: sku.price,
    quantity: 1,
    category: 'Half-Day Camps',
    type: 'summer-camp',
    level: 'Academic Summer Sprint · Cohort 2',
  };
}
