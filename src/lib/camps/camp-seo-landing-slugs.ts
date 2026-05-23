/** Data-driven STEAM camp SEO landing pages at `/camps/[slug]`. */
export const CAMP_SEO_LANDING_SLUGS = [
  'math-olympiad-camp-dublin-ca',
  'game-development-camp-dublin-ca',
  'robotics-camp-dublin-ca',
  'young-authors-camp-dublin-ca',
] as const;

export type CampSeoLandingSlug = (typeof CAMP_SEO_LANDING_SLUGS)[number];

export function isCampSeoLandingPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return CAMP_SEO_LANDING_SLUGS.some((slug) => pathname.includes(`/camps/${slug}`));
}

export function isRoboticsCampSeoPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.includes('/camps/robotics-camp-dublin-ca');
}
