import type { AcademicProgramFilterId } from '@/lib/academic-summer-program-filters';
import type {
  AcademicGetReadyTrackId,
  AcademicSummerSprintTrackId,
} from '@/lib/academic-summer-programs-hub-data';

export type AcademicSeoLandingPageId =
  | 'readingWriting'
  | 'mathFoundations'
  | 'algebra'
  | 'geometry'
  | 'imGetReady'
  | 'im1GetReady'
  | 'im2GetReady';

export type AcademicSeoLandingVariant =
  | 'sprint-multi'
  | 'sprint-single'
  | 'get-ready-single'
  | 'get-ready-multi';

export type AcademicSeoLandingPageConfig = {
  readonly id: AcademicSeoLandingPageId;
  readonly slug: string;
  readonly path: `/camps/${string}`;
  readonly variant: AcademicSeoLandingVariant;
  readonly trackIds: readonly (AcademicSummerSprintTrackId | AcademicGetReadyTrackId)[];
  readonly hubFilter: Exclude<AcademicProgramFilterId, 'all'>;
  readonly breadcrumbLabel: string;
  readonly relatedPageOrder: readonly AcademicSeoLandingPageId[];
  /** When false, hero uses solid navy background instead of the shared banner image. */
  readonly showHeroBanner?: boolean;
};

export const ACADEMIC_SEO_HUB_PATH = '/camps/academic-summer-programs-dublin-ca' as const;

export const ACADEMIC_SEO_LANDING_PAGES: Record<
  AcademicSeoLandingPageId,
  AcademicSeoLandingPageConfig
> = {
  readingWriting: {
    id: 'readingWriting',
    slug: 'summer-reading-writing-dublin-ca',
    path: '/camps/summer-reading-writing-dublin-ca',
    variant: 'sprint-multi',
    trackIds: ['read-to-prove', 'write-to-explain'],
    hubFilter: 'readingWriting',
    breadcrumbLabel: 'Summer Reading & Writing',
    relatedPageOrder: ['mathFoundations', 'algebra', 'geometry'],
    showHeroBanner: false,
  },
  mathFoundations: {
    id: 'mathFoundations',
    slug: 'summer-math-foundations-dublin-ca',
    path: '/camps/summer-math-foundations-dublin-ca',
    variant: 'sprint-single',
    trackIds: ['bridge-the-gap-math'],
    hubFilter: 'bridgeTheGap',
    breadcrumbLabel: 'Summer Math Foundations',
    relatedPageOrder: ['readingWriting', 'algebra', 'geometry'],
  },
  algebra: {
    id: 'algebra',
    slug: 'summer-algebra-dublin-ca',
    path: '/camps/summer-algebra-dublin-ca',
    variant: 'get-ready-single',
    trackIds: ['algebra-1'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'Summer Algebra',
    relatedPageOrder: ['im1GetReady', 'im2GetReady', 'geometry', 'readingWriting'],
    showHeroBanner: false,
  },
  geometry: {
    id: 'geometry',
    slug: 'summer-geometry-precalculus-dublin-ca',
    path: '/camps/summer-geometry-precalculus-dublin-ca',
    variant: 'get-ready-single',
    trackIds: ['geometry'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'Summer Geometry',
    relatedPageOrder: ['im1GetReady', 'im2GetReady', 'algebra', 'mathFoundations'],
  },
  imGetReady: {
    id: 'imGetReady',
    slug: 'summer-im-get-ready-dublin-ca',
    path: '/camps/summer-im-get-ready-dublin-ca',
    variant: 'get-ready-multi',
    trackIds: ['im1', 'im2'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'IM Get Ready Programs',
    relatedPageOrder: ['im1GetReady', 'im2GetReady', 'algebra', 'geometry'],
    showHeroBanner: false,
  },
  im1GetReady: {
    id: 'im1GetReady',
    slug: 'summer-im1-get-ready-dublin-ca',
    path: '/camps/summer-im1-get-ready-dublin-ca',
    variant: 'get-ready-single',
    trackIds: ['im1'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'IM1 Get Ready',
    relatedPageOrder: ['im2GetReady', 'algebra', 'geometry'],
    showHeroBanner: false,
  },
  im2GetReady: {
    id: 'im2GetReady',
    slug: 'summer-im2-get-ready-dublin-ca',
    path: '/camps/summer-im2-get-ready-dublin-ca',
    variant: 'get-ready-single',
    trackIds: ['im2'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'IM2 Get Ready',
    relatedPageOrder: ['im1GetReady', 'algebra', 'geometry'],
    showHeroBanner: false,
  },
};

export const ACADEMIC_SEO_LANDING_PAGE_IDS = Object.keys(
  ACADEMIC_SEO_LANDING_PAGES,
) as AcademicSeoLandingPageId[];

export function getAcademicSeoLandingPageConfig(
  pageId: AcademicSeoLandingPageId,
): AcademicSeoLandingPageConfig {
  return ACADEMIC_SEO_LANDING_PAGES[pageId];
}

export function getAcademicSeoLandingPageBySlug(
  slug: string,
): AcademicSeoLandingPageConfig | undefined {
  return ACADEMIC_SEO_LANDING_PAGE_IDS.map((id) => ACADEMIC_SEO_LANDING_PAGES[id]).find(
    (page) => page.slug === slug,
  );
}
