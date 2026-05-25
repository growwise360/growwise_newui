import { buildPagesUrls } from '@/lib/seo/sitemapData';

describe('sitemapData', () => {
  it('includes academic summer programs hub in camp pages', () => {
    const urls = buildPagesUrls('https://www.growwiseschool.org', '2026-05-20');
    const locs = urls.map((u) => u.loc);
    expect(locs).toContain(
      'https://www.growwiseschool.org/camps/academic-summer-programs-dublin-ca',
    );
    expect(locs).toContain('https://www.growwiseschool.org/camps/summer');
    expect(locs).toContain(
      'https://www.growwiseschool.org/camps/summer-reading-writing-dublin-ca',
    );
    expect(locs).toContain(
      'https://www.growwiseschool.org/camps/summer-math-foundations-dublin-ca',
    );
    expect(locs).toContain('https://www.growwiseschool.org/camps/summer-algebra-dublin-ca');
    expect(locs).toContain(
      'https://www.growwiseschool.org/camps/summer-geometry-precalculus-dublin-ca',
    );
  });

  it('includes resource article pages', () => {
    const urls = buildPagesUrls('https://www.growwiseschool.org', '2026-05-20');
    const locs = urls.map((u) => u.loc);
    expect(locs).toContain('https://www.growwiseschool.org/resources/python-vs-scratch');
  });
});
