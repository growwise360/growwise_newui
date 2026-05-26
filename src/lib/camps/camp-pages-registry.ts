import { getCampSlugs } from '@/lib/camps/get-camp-page';
import {
  ACADEMIC_SEO_LANDING_PAGE_IDS,
  ACADEMIC_SEO_LANDING_PAGES,
} from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { getAcademicSeoLandingCopy } from '@/lib/academic-seo-landing-copy';

/** Static camp hub routes (not dynamic `[slug]` landings). */
export const CAMP_STATIC_HUB_PATHS = [
  '/camps',
  '/camps/summer',
  '/camps/winter',
  '/camps/winter/calendar',
  '/camps/academic-summer-programs-dublin-ca',
  '/camps/academic-summer-sprint-dublin-ca',
] as const;

export type CampStaticHubPath = (typeof CAMP_STATIC_HUB_PATHS)[number];

/** Published academic SEO landing pages under `/camps/summer-*-dublin-ca`. */
export const ACADEMIC_SEO_CAMP_PATHS = ACADEMIC_SEO_LANDING_PAGE_IDS.map(
  (id) => ACADEMIC_SEO_LANDING_PAGES[id].path,
);

export type AcademicSeoCampPath = (typeof ACADEMIC_SEO_CAMP_PATHS)[number];

/** Data-driven STEAM camp SEO pages at `/camps/[slug]`. */
export function getCampLandingPaths(): string[] {
  return getCampSlugs().map((slug) => `/camps/${slug}`);
}

/** Every camps-related path that should return 200 in smoke tests. */
export function getAllCampsSmokePaths(): string[] {
  const redirectFrom = new Set(CAMP_REDIRECT_PATHS.map((entry) => entry.from));
  return [...CAMP_STATIC_HUB_PATHS, ...ACADEMIC_SEO_CAMP_PATHS, ...getCampLandingPaths()].filter(
    (path) => !redirectFrom.has(path),
  );
}

export type HubFilterSmokeCase = {
  query: string | null;
  activeChipLabel: string;
  visibleProgramTitles: readonly string[];
  hiddenProgramTitles: readonly string[];
};

export const ACADEMIC_HUB_FILTER_SMOKE_CASES: readonly HubFilterSmokeCase[] = [
  {
    query: null,
    activeChipLabel: 'All Programs',
    visibleProgramTitles: [
      'Read to Prove',
      'Write to Explain',
      'Bridge the Gap Math',
      'IM1 Get Ready',
      'IM2 Get Ready',
      'Algebra Get Ready',
      'Geometry Get Ready',
    ],
    hiddenProgramTitles: [],
  },
  {
    query: ACADEMIC_HUB_FILTER_QUERY_VALUES.readingWriting,
    activeChipLabel: 'Reading & Writing',
    visibleProgramTitles: ['Read to Prove', 'Write to Explain'],
    hiddenProgramTitles: ['Bridge the Gap Math', 'Algebra Get Ready'],
  },
  {
    query: ACADEMIC_HUB_FILTER_QUERY_VALUES.bridgeTheGap,
    activeChipLabel: 'Bridge the Gap',
    visibleProgramTitles: ['Bridge the Gap Math'],
    hiddenProgramTitles: ['Read to Prove', 'Algebra Get Ready'],
  },
  {
    query: ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath,
    activeChipLabel: 'Get Ready Math',
    visibleProgramTitles: ['IM1 Get Ready', 'IM2 Get Ready', 'Algebra Get Ready', 'Geometry Get Ready'],
    hiddenProgramTitles: ['Read to Prove', 'Bridge the Gap Math'],
  },
];

export type AcademicSeoPageSmokeExpectation = {
  path: AcademicSeoCampPath;
  h1: string;
  hubFilterQuery: string;
  relatedPaths: readonly AcademicSeoCampPath[];
};

export function getAcademicSeoPageSmokeExpectations(): AcademicSeoPageSmokeExpectation[] {
  return ACADEMIC_SEO_LANDING_PAGE_IDS.map((id) => {
    const config = ACADEMIC_SEO_LANDING_PAGES[id];
    const copy = getAcademicSeoLandingCopy(id);
    return {
      path: config.path as AcademicSeoCampPath,
      h1: copy.hero.h1,
      hubFilterQuery: ACADEMIC_HUB_FILTER_QUERY_VALUES[config.hubFilter],
      relatedPaths: config.relatedPageOrder.map(
        (relatedId) => ACADEMIC_SEO_LANDING_PAGES[relatedId].path as AcademicSeoCampPath,
      ),
    };
  });
}

/** Paths that should redirect (legacy → hub). */
export const CAMP_REDIRECT_PATHS: ReadonlyArray<{
  from: string;
  toPattern: RegExp;
}> = [
  {
    from: '/camps/academic-summer-sprint-dublin-ca',
    toPattern: /\/camps\/academic-summer-programs-dublin-ca/,
  },
];
