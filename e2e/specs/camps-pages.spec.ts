import { test, expect, type Page } from '@playwright/test';
import { localePath } from '../localePath';
import {
  ACADEMIC_HUB_FILTER_SMOKE_CASES,
  CAMP_REDIRECT_PATHS,
  getAcademicSeoPageSmokeExpectations,
  getStandardAcademicSeoPageSmokeExpectations,
  getAllCampsSmokePaths,
  getCampLandingPaths,
} from '../../src/lib/camps/camp-pages-registry';
import { getCampPage } from '../../src/lib/camps/get-camp-page';

const HUB_PATH = '/camps/academic-summer-programs-dublin-ca';

function visibleProgramTitleInGrid(page: Page, title: string) {
  return page.locator('#program-grid').getByText(title, { exact: false }).locator('visible=true');
}

test.describe('Camps pages — smoke (200, h1, main landmark)', { tag: '@nightly' }, () => {
  for (const path of getAllCampsSmokePaths()) {
    test(`${path} loads with exactly one main h1`, async ({ page }) => {
      const response = await page.goto(localePath(path));
      expect(response?.status(), `Expected 200 for ${path}`).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('main h1')).toBeVisible();
    });
  }
});

test.describe('Camps pages — STEAM landing SEO content', { tag: '@nightly' }, () => {
  for (const path of getCampLandingPaths()) {
    const slug = path.replace('/camps/', '');
    const campPage = getCampPage(slug);
    test(`${path} shows camp h1 from data`, async ({ page }) => {
      test.skip(!campPage, `Missing camp data for ${slug}`);
      await page.goto(localePath(path));
      await expect(page.locator('main h1')).toContainText(campPage!.h1);
    });
  }
});

test.describe('Camps pages — legacy redirects', { tag: '@nightly' }, () => {
  for (const { from, toPattern } of CAMP_REDIRECT_PATHS) {
    test(`${from} redirects`, async ({ page }) => {
      await page.goto(localePath(from));
      await expect(page).toHaveURL(toPattern);
    });
  }
});

test.describe('Academic SEO landing pages', { tag: '@nightly' }, () => {
  for (const seoPage of getStandardAcademicSeoPageSmokeExpectations()) {
    test(`${seoPage.path} hero, FAQ, related links, no checkout panel`, async ({ page }) => {
      await page.goto(localePath(seoPage.path));

      await expect(page.locator('[data-academic-seo-landing]')).toBeVisible();
      await expect(page.locator('main h1')).toHaveText(seoPage.h1);
      await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Related summer programs' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'What your child will work on' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Who teaches this program' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Who this is right for' })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Why GrowWise for/i })).toBeVisible();
      await expect(page.locator('#faq button')).toHaveCount(seoPage.faqCount);

      for (const relatedPath of seoPage.relatedPaths) {
        const link = page.locator(`a[href="${relatedPath}"], a[href$="${relatedPath}"]`).first();
        await expect(link).toBeVisible();
      }

      await expect(page.locator('#slots-panel')).toHaveCount(0);
      await expect(page.getByRole('button', { name: /add to cart/i })).toHaveCount(0);
    });

    test(`${seoPage.path} primary CTA opens hub with filter=${seoPage.hubFilterQuery}`, async ({
      page,
    }) => {
      await page.goto(localePath(seoPage.path));
      const cta = page.getByRole('link', { name: 'View schedule & pricing →' }).first();
      await expect(cta).toBeVisible();
      await cta.click();
      await expect(page).toHaveURL(
        new RegExp(`/camps/academic-summer-programs-dublin-ca\\?filter=${seoPage.hubFilterQuery}`),
      );
    });
  }
});

test.describe('Academic hub — filter query params', { tag: '@nightly' }, () => {
  for (const filterCase of ACADEMIC_HUB_FILTER_SMOKE_CASES) {
    const label = filterCase.query ?? 'default';
    test(`?filter=${label} shows expected programs`, async ({ page }) => {
      const url = filterCase.query
        ? localePath(`${HUB_PATH}?filter=${filterCase.query}`)
        : localePath(HUB_PATH);
      await page.goto(url);

      await expect(page.locator('#program-grid')).toBeVisible();

      for (const title of filterCase.visibleProgramTitles) {
        await expect(visibleProgramTitleInGrid(page, title).first()).toBeVisible();
      }
      for (const title of filterCase.hiddenProgramTitles) {
        await expect(visibleProgramTitleInGrid(page, title)).toHaveCount(0);
      }
    });
  }

  test('invalid filter param falls back to all programs', async ({ page }) => {
    await page.goto(localePath(`${HUB_PATH}?filter=not-a-real-filter`));
    await expect(visibleProgramTitleInGrid(page, 'Read to Prove').first()).toBeVisible();
    await expect(visibleProgramTitleInGrid(page, 'Geometry Get Ready').first()).toBeVisible();
  });
});

test.describe('Academic SEO pages — structured data', { tag: '@nightly' }, () => {
  for (const seoPage of getAcademicSeoPageSmokeExpectations()) {
    test(`${seoPage.path} includes FAQPage JSON-LD`, async ({ page }) => {
      await page.goto(localePath(seoPage.path));
      const jsonLd = page.locator('script[type="application/ld+json"]');
      await expect(jsonLd.first()).toBeAttached();
      const contents = await jsonLd.allTextContents();
      expect(contents.some((c) => c.includes('"FAQPage"'))).toBe(true);
      expect(contents.some((c) => c.includes('"Course"') || c.includes('"ItemList"'))).toBe(true);
    });
  }
});

test.describe('Camps pages — mobile layout', { tag: '@nightly' }, () => {
  for (const width of [375, 430] as const) {
    test(`no horizontal overflow on academic hub at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 });
      await page.goto(localePath(HUB_PATH));
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow).toBe(false);
    });

    test(`no horizontal overflow on reading/writing SEO page at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 });
      await page.goto(localePath('/camps/summer-reading-writing-dublin-ca'));
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow).toBe(false);
    });
  }
});
