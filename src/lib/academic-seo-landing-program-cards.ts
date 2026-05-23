import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import {
  formatAcademicSprintUsd,
  getAcademicGetReadyPickCardMeta,
  getAcademicSprintById,
  getAcademicSprintPickCardMeta,
  getAcademicSummerProgramsHubData,
  getGetReadyPanelMeta,
  isAcademicGetReadyProgram,
  isAcademicSummerSprintProgram,
  type AcademicGetReadyTrackId,
  type AcademicSummerSprintTrackId,
} from '@/lib/academic-summer-programs-hub-data';

export type AcademicSeoStaticProgramCardModel = {
  id: string;
  title: string;
  tagline: string;
  gradeBadge: string;
  scheduleLine: string;
  bestFor: readonly string[];
  bestForLabel: string;
  pricingRows: readonly { label: string; amount: string }[];
};

function sprintPricingRows(): AcademicSeoStaticProgramCardModel['pricingRows'] {
  const sprint = getAcademicSprintById('academic-summer-sprint');
  const tierLabels = hubCopy.sprintCards.sprints['academic-summer-sprint'].pricingTiers;
  if (!sprint?.pricing) return [];
  return sprint.pricing.tiers.map((tier) => ({
    label: tierLabels[tier.id]?.label ?? tier.id,
    amount: formatAcademicSprintUsd(tier.perCohortPrice),
  }));
}

function getReadyPricingRows(
  trackId: AcademicGetReadyTrackId,
): AcademicSeoStaticProgramCardModel['pricingRows'] {
  const panelMeta = getGetReadyPanelMeta(trackId);
  const hub = getAcademicSummerProgramsHubData();
  const groupId = hub.getReadyPricingGroups[trackId];
  const prices = hub.getReadyPricing[groupId];
  if (!panelMeta || !prices) return [];

  return [
    { label: panelMeta.cohort1.title, amount: formatAcademicSprintUsd(prices.twoWeek) },
    { label: panelMeta.cohort2.title, amount: formatAcademicSprintUsd(prices.twoWeek) },
    { label: panelMeta.both.title, amount: formatAcademicSprintUsd(prices.fourWeek) },
  ];
}

function displayTitle(trackId: string, fallback: string): string {
  if (trackId === 'algebra-1') return 'Algebra 1 Get Ready';
  return fallback;
}

export function buildAcademicSeoStaticProgramCard(
  trackId: string,
  overrides?: { tagline?: string; title?: string },
): AcademicSeoStaticProgramCardModel | null {
  const trackCopy = hubCopy.tracks[trackId as keyof typeof hubCopy.tracks];

  if (isAcademicSummerSprintProgram(trackId)) {
    const cardMeta = getAcademicSprintPickCardMeta(trackId as AcademicSummerSprintTrackId);
    if (!cardMeta || !trackCopy) return null;
    return {
      id: trackId,
      title: overrides?.title ?? displayTitle(trackId, trackCopy.name),
      tagline: overrides?.tagline ?? trackCopy.tagline,
      gradeBadge: cardMeta.gradeBadge,
      scheduleLine: cardMeta.scheduleLine,
      bestFor: cardMeta.bestFor,
      bestForLabel: cardMeta.bestForLabel,
      pricingRows: sprintPricingRows(),
    };
  }

  if (isAcademicGetReadyProgram(trackId)) {
    const cardMeta = getAcademicGetReadyPickCardMeta(trackId as AcademicGetReadyTrackId);
    if (!cardMeta || !trackCopy) return null;
    return {
      id: trackId,
      title: overrides?.title ?? displayTitle(trackId, trackCopy.name),
      tagline: overrides?.tagline ?? trackCopy.tagline,
      gradeBadge: cardMeta.gradeBadge,
      scheduleLine: cardMeta.scheduleLine,
      bestFor: cardMeta.bestFor,
      bestForLabel: cardMeta.bestForLabel,
      pricingRows: getReadyPricingRows(trackId as AcademicGetReadyTrackId),
    };
  }

  return null;
}
