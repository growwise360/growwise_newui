import type { AcademicProgramFilterId } from '@/lib/academic-summer-program-filters';
import type {
  AcademicGetReadyTrackId,
  AcademicSummerSprintTrackId,
} from '@/lib/academic-summer-programs-hub-data';

export type AcademicSeoLandingPageId =
  | 'readingWriting'
  | 'mathFoundations'
  | 'algebra'
  | 'geometry';

export type AcademicSeoLandingVariant = 'sprint-multi' | 'sprint-single' | 'get-ready-single';

export type AcademicSeoLandingPageConfig = {
  readonly id: AcademicSeoLandingPageId;
  readonly slug: string;
  readonly path: `/camps/${string}`;
  readonly variant: AcademicSeoLandingVariant;
  readonly trackIds: readonly (AcademicSummerSprintTrackId | AcademicGetReadyTrackId)[];
  readonly hubFilter: Exclude<AcademicProgramFilterId, 'all'>;
  readonly breadcrumbLabel: string;
  readonly relatedPageOrder: readonly AcademicSeoLandingPageId[];
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
    relatedPageOrder: ['mathFoundations', 'geometry', 'readingWriting'],
  },
  geometry: {
    id: 'geometry',
    slug: 'summer-geometry-precalculus-dublin-ca',
    path: '/camps/summer-geometry-precalculus-dublin-ca',
    variant: 'get-ready-single',
    trackIds: ['geometry'],
    hubFilter: 'getReadyMath',
    breadcrumbLabel: 'Summer Geometry',
    relatedPageOrder: ['algebra', 'mathFoundations', 'readingWriting'],
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
