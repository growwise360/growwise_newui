import { RESOURCE_ARTICLE_PATHS } from '@/data/resources';
import { buildBlogUrls, buildPagesUrls } from '@/lib/seo/sitemapData';

const BASE = 'https://growwiseschool.org';
const LASTMOD = '2026-05-20';

describe('sitemapData', () => {
  it('includes academic summer programs hub in camp pages', () => {
    const urls = buildPagesUrls(BASE, LASTMOD);
    const locs = urls.map((u) => u.loc);
    expect(locs).toContain(
      'https://growwiseschool.org/camps/academic-summer-programs-dublin-ca',
    );
    expect(locs).toContain('https://growwiseschool.org/camps/summer');
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-reading-writing-dublin-ca',
    );
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-math-foundations-dublin-ca',
    );
    expect(locs).toContain('https://growwiseschool.org/camps/summer-algebra-dublin-ca');
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-geometry-precalculus-dublin-ca',
    );
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-im-get-ready-dublin-ca',
    );
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-im1-get-ready-dublin-ca',
    );
    expect(locs).toContain(
      'https://growwiseschool.org/camps/summer-im2-get-ready-dublin-ca',
    );
  });

  it('includes resources hub in pages sitemap but not individual articles', () => {
    const pageLocs = buildPagesUrls(BASE, LASTMOD).map((u) => u.loc);
    expect(pageLocs).toContain(`${BASE}/resources`);
    RESOURCE_ARTICLE_PATHS.forEach((path) => {
      expect(pageLocs).not.toContain(`${BASE}${path}`);
    });
  });

  it('includes resources hub and all articles in blogs sitemap', () => {
    const blogLocs = buildBlogUrls(BASE, LASTMOD).map((u) => u.loc);
    expect(blogLocs).toContain(`${BASE}/resources`);
    RESOURCE_ARTICLE_PATHS.forEach((path) => {
      expect(blogLocs).toContain(`${BASE}${path}`);
    });
    expect(blogLocs).toContain(`${BASE}/resources/python-vs-scratch`);
  });

  it('does not include retired locale prefixes in sitemap URLs', () => {
    const allLocs = [
      ...buildPagesUrls(BASE, LASTMOD).map((u) => u.loc),
      ...buildBlogUrls(BASE, LASTMOD).map((u) => u.loc),
    ];
    const localePrefixPattern = /\/(en|hi|zh|es)\//;
    for (const loc of allLocs) {
      expect(loc).not.toMatch(localePrefixPattern);
    }
  });
});
