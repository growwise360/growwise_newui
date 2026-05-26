import {
  ACADEMIC_HUB_FILTER_SMOKE_CASES,
  ACADEMIC_SEO_CAMP_PATHS,
  CAMP_REDIRECT_PATHS,
  CAMP_STATIC_HUB_PATHS,
  getAcademicSeoPageSmokeExpectations,
  getAllCampsSmokePaths,
  getCampLandingPaths,
} from '@/lib/camps/camp-pages-registry';
import { CAMPS_STATIC_PATH_SEGMENTS } from '@/lib/camps/camp-routes';
import { getCampSlugs } from '@/lib/camps/get-camp-page';
import { getMetadataConfig } from '@/lib/seo/metadataConfig';
import { buildPagesUrls } from '@/lib/seo/sitemapData';
import { buildAcademicSeoLandingCourseSchema } from '@/lib/schema/academic-seo-landing-jsonld';
import { ACADEMIC_SEO_LANDING_PAGE_IDS } from '@/lib/academic-seo-landing-config';
import { getAcademicSeoLandingCopy } from '@/lib/academic-seo-landing-copy';

const STANDARD_ACADEMIC_SEO_LANDING_PAGE_IDS = ACADEMIC_SEO_LANDING_PAGE_IDS.filter(
  (id) => id !== 'imGetReady' && id !== 'im1GetReady' && id !== 'im2GetReady',
);

const ITEM_LIST_JSON_LD_PAGE_IDS = new Set(['readingWriting', 'imGetReady']);

describe('camp-pages-registry', () => {
  it('lists all static camp hubs and SEO landing paths without duplicates', () => {
    const all = getAllCampsSmokePaths();
    expect(all.length).toBe(new Set(all).size);
    expect(all).not.toContain('/camps/academic-summer-sprint-dublin-ca');
    expect(all.length).toBeGreaterThanOrEqual(
      (CAMP_STATIC_HUB_PATHS.length - CAMP_REDIRECT_PATHS.length) +
        ACADEMIC_SEO_CAMP_PATHS.length +
        getCampSlugs().length,
    );
  });

  it('includes every academic SEO path in static route guard', () => {
    for (const path of ACADEMIC_SEO_CAMP_PATHS) {
      const segment = path.replace('/camps/', '');
      expect(CAMPS_STATIC_PATH_SEGMENTS.has(segment)).toBe(true);
    }
  });

  it('defines hub filter smoke cases for all SEO filter query values', () => {
    expect(ACADEMIC_HUB_FILTER_SMOKE_CASES).toHaveLength(4);
    const queries = ACADEMIC_HUB_FILTER_SMOKE_CASES.map((c) => c.query).filter(Boolean);
    expect(queries).toEqual(['reading-writing', 'bridge-the-gap', 'get-ready-math']);
  });

  it('maps each SEO page to hub filter and related paths', () => {
    const expectations = getAcademicSeoPageSmokeExpectations();
    expect(expectations).toHaveLength(ACADEMIC_SEO_LANDING_PAGE_IDS.length);
    for (const page of expectations) {
      expect(page.h1.length).toBeGreaterThan(10);
      expect(page.hubFilterQuery).toMatch(/^(reading-writing|bridge-the-gap|get-ready-math)$/);
      expect(page.relatedPaths.length).toBeGreaterThanOrEqual(3);
      expect(page.relatedPaths).not.toContain(page.path);
    }
  });
});

describe('camp pages metadata', () => {
  it.each(ACADEMIC_SEO_CAMP_PATHS)('has metadata config for %s', (path) => {
    const config = getMetadataConfig(path);
    expect(config).not.toBeNull();
    expect(config!.title.length).toBeLessThanOrEqual(60);
    expect(config!.description.length).toBeLessThanOrEqual(155);
  });
});

describe('camp pages sitemap', () => {
  it('includes academic SEO landing pages and core camp hubs', () => {
    const urls = buildPagesUrls('https://growwiseschool.org', '2026-05-22');
    const locs = urls.map((u) => u.loc);
    for (const path of [
      '/camps/summer',
      '/camps/academic-summer-programs-dublin-ca',
      ...ACADEMIC_SEO_CAMP_PATHS,
    ]) {
      expect(locs).toContain(`https://growwiseschool.org${path}`);
    }
  });
});

describe('academic SEO landing copy', () => {
  it.each(STANDARD_ACADEMIC_SEO_LANDING_PAGE_IDS)('%s has body sections and at least five FAQ items', (pageId) => {
    const copy = getAcademicSeoLandingCopy(pageId);
    expect(copy.bodySections.whatYourChildWillWorkOn.subsections.length).toBeGreaterThan(0);
    expect(copy.bodySections.whoTeaches.body.length).toBeGreaterThan(50);
    expect(copy.bodySections.whoIsRightFor.groups.length).toBeGreaterThan(0);
    expect(copy.bodySections.whyGrowWise.body.length).toBeGreaterThan(50);
    expect(copy.faq.length).toBeGreaterThanOrEqual(5);
  });
});

describe('academic SEO JSON-LD', () => {
  it.each(ACADEMIC_SEO_LANDING_PAGE_IDS)('builds course schema for %s', (pageId) => {
    const schema = buildAcademicSeoLandingCourseSchema(pageId) as Record<string, unknown>;
    expect(schema['@context']).toBe('https://schema.org');
    if (ITEM_LIST_JSON_LD_PAGE_IDS.has(pageId)) {
      expect(schema['@type']).toBe('ItemList');
    } else {
      expect(schema['@type']).toBe('Course');
    }
  });
});

describe('camp landing slug coverage', () => {
  it('includes expected STEAM camp landing slugs', () => {
    expect(getCampLandingPaths()).toEqual(
      expect.arrayContaining([
        '/camps/ai-studio-dublin-ca',
        '/camps/robotics-camp-dublin-ca',
        '/camps/math-olympiad-camp-dublin-ca',
      ]),
    );
  });
});

describe('camp redirect registry', () => {
  it('documents legacy academic sprint redirect', () => {
    expect(CAMP_REDIRECT_PATHS[0]?.from).toBe('/camps/academic-summer-sprint-dublin-ca');
  });
});
