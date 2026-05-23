import { getAcademicProgramSeoLink } from '@/lib/academic-summer-seo-links';

describe('academic-summer-seo-links', () => {
  it.each([
    ['read-to-prove', 'summer-reading-writing-dublin-ca'],
    ['write-to-explain', 'summer-reading-writing-dublin-ca'],
    ['bridge-the-gap-math', 'summer-math-foundations-dublin-ca'],
    ['algebra-1', 'summer-algebra-dublin-ca'],
    ['geometry', 'summer-geometry-precalculus-dublin-ca'],
  ] as const)('maps %s to /camps/%s', (programId, slug) => {
    expect(getAcademicProgramSeoLink(programId)?.slug).toBe(slug);
  });

  it('does not link IM1 until a dedicated SEO page exists', () => {
    expect(getAcademicProgramSeoLink('im1')).toBeUndefined();
  });
});
