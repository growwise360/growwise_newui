import {
  ACADEMIC_SEO_LANDING_PAGES,
  type AcademicSeoLandingPageId,
} from '@/lib/academic-seo-landing-config';

describe('academic-seo-landing-config showHeroBanner', () => {
  it.each(['algebra', 'readingWriting', 'imGetReady', 'im1GetReady', 'im2GetReady'] as const)(
    '%s disables the hero image banner',
    (pageId: AcademicSeoLandingPageId) => {
      expect(ACADEMIC_SEO_LANDING_PAGES[pageId].showHeroBanner).toBe(false);
    },
  );

  it.each(['mathFoundations', 'geometry'] as const)(
    '%s keeps the hero image banner enabled',
    (pageId: AcademicSeoLandingPageId) => {
      expect(ACADEMIC_SEO_LANDING_PAGES[pageId].showHeroBanner).not.toBe(false);
    },
  );
});
