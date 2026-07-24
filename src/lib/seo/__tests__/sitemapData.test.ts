import { RESOURCE_ARTICLE_PATHS } from '@/data/resources';
import {
  buildBlogUrls,
  buildPagesUrls,
  getChildSitemaps,
  renderSitemapIndex,
} from '@/lib/seo/sitemapData';

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

  it('keeps the resources hub out of the blogs sitemap while including all resource articles', () => {
    const blogLocs = buildBlogUrls(BASE, LASTMOD).map((u) => u.loc);
    expect(blogLocs).not.toContain(`${BASE}/resources`);
    expect(blogLocs).toContain(
      `${BASE}/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help`,
    );
    expect(blogLocs).toContain(
      `${BASE}/growwise-blogs/common-core-math-strategies-parents`,
    );
    expect(blogLocs).toContain(
      `${BASE}/growwise-blogs/why-is-my-child-struggling-with-fractions`,
    );
    expect(blogLocs).toContain(
      `${BASE}/growwise-blogs/child-reads-but-doesnt-understand-passage`,
    );
    RESOURCE_ARTICLE_PATHS.forEach((path) => {
      expect(blogLocs).toContain(`${BASE}${path}`);
    });
    expect(blogLocs).toContain(`${BASE}/resources/python-vs-scratch`);
  });

  it('does not duplicate any URL across page and blog sitemaps', () => {
    const allLocs = [
      ...buildPagesUrls(BASE, LASTMOD).map((u) => u.loc),
      ...buildBlogUrls(BASE, LASTMOD).map((u) => u.loc),
    ];
    expect(new Set(allLocs).size).toBe(allLocs.length);
  });

  it('excludes expired winter camp pages until a current schedule is published', () => {
    const pageLocs = buildPagesUrls(BASE, LASTMOD).map((u) => u.loc);
    expect(pageLocs).not.toContain(`${BASE}/camps/winter`);
    expect(pageLocs).not.toContain(`${BASE}/camps/winter/calendar`);
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

  it('emits a lastmod for every URL, from real git dates (not one faked date)', () => {
    const urls = [...buildPagesUrls(BASE), ...buildBlogUrls(BASE)];
    for (const u of urls) {
      expect(u.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    const distinct = new Set(urls.map((u) => u.lastmod));
    expect(distinct.size).toBeGreaterThanOrEqual(2);
  });

  it('prefers the generated git-history date over a caller fallback', () => {
    const urls = buildPagesUrls(BASE, '1999-01-01');
    const home = urls.find((u) => u.loc === `${BASE}/`);
    expect(home?.lastmod).not.toBe('1999-01-01');
  });

  it('renders a sitemap index for child sitemaps', () => {
    const xml = renderSitemapIndex(getChildSitemaps(BASE, LASTMOD));
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain(`<loc>${BASE}/sitemap-pages.xml</loc>`);
    expect(xml).toContain(`<loc>${BASE}/sitemap-blogs.xml</loc>`);
    expect(xml).not.toContain('<urlset');
  });
});
