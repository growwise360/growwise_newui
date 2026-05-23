export type TrustBadge = {
  id: 'patch' | 'activityhero' | '6crickets';
  href: string;
  imageSrc: string;
  imageAlt: string;
  showOnHome: boolean;
};

export const FOOTER_TRUST_BADGES: TrustBadge[] = [
  {
    id: 'patch',
    href: 'https://patch.com/california/dublin/business/listing/526397/growwise?utm_source=badge&utm_medium=referral&utm_campaign=business_badge',
    imageSrc: 'https://patch.com/api_v1/bizpost/526397/badge',
    imageAlt: 'GrowWise on Patch',
    showOnHome: true,
  },
  {
    id: 'activityhero',
    href: 'https://www.activityhero.com/biz/169146-growwise-dublin-ca',
    imageSrc: 'https://assets.activityhero.com/badges/Rate_usnew.png',
    imageAlt: 'GrowWise on ActivityHero',
    showOnHome: false,
  },
  {
    id: '6crickets',
    href: 'https://www.6crickets.com/providerDirectory/US/CA/Dublin/GrowWise-03fcd68e5673f08b?refer&provider=6121&utm_medium=provider&utm_source=providers',
    imageSrc: 'https://www.6crickets.com/_assets/images/fav.png',
    imageAlt: 'GrowWise on 6crickets',
    showOnHome: false,
  },
];

export function getFooterTrustBadges(isHome: boolean): TrustBadge[] {
  return FOOTER_TRUST_BADGES.filter((badge) => (isHome ? badge.showOnHome : true));
}
