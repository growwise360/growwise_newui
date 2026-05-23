import canonical from '@/i18n/messages/summer-camp-canonical-en.json';

export type SummerCampPickCardMeta = {
  title: string;
  gradeLine: string;
  dayType: string;
  formatPill: string;
  workOnLabel: string;
  workOnBullets: readonly string[];
  outcome: string;
  priceLine: string;
  ctaLabel: string;
};

const pickCards = canonical.pickCards as Record<
  string,
  Omit<SummerCampPickCardMeta, 'workOnLabel' | 'priceLine' | 'ctaLabel'>
>;

const common = canonical.pickCardsCommon;

export function getSummerCampPickCardMeta(programId: string): SummerCampPickCardMeta | undefined {
  const card = pickCards[programId];
  if (!card) return undefined;
  return {
    ...card,
    workOnLabel: common.workOnLabel,
    priceLine: common.priceLine,
    ctaLabel: common.ctaLabel,
  };
}
