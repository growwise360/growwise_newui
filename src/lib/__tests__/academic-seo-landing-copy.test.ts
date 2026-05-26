import { ACADEMIC_SEO_LANDING_PAGE_IDS } from '@/lib/academic-seo-landing-config';
import {
  countAcademicSeoLandingCopyWords,
  getAcademicSeoLandingCopy,
} from '@/lib/academic-seo-landing-copy';

const MIN_VISIBLE_COPY_WORDS = 600;

describe('academic-seo-landing-copy', () => {
  const standardPageIds = ACADEMIC_SEO_LANDING_PAGE_IDS.filter((id) => id !== 'imGetReady');

  it.each(standardPageIds)(
    '%s has at least %i words of visible copy',
    (pageId) => {
      const copy = getAcademicSeoLandingCopy(pageId);
      expect(countAcademicSeoLandingCopyWords(copy)).toBeGreaterThanOrEqual(MIN_VISIBLE_COPY_WORDS);
    },
  );
});
