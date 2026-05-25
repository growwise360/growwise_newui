import { test, expect, type Page } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Academic summer programs hub', { tag: '@nightly' }, () => {
  test('shows hero, FAQ, and internal backlinks', async ({ page }) => {
    await page.goto(localePath('/camps/academic-summer-programs-dublin-ca'));

    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toContainText(
      'Daily 90-Minute Academic Summer Programs in Dublin, CA',
    );

    await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Looking for something else this summer?' }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'Summer STEAM Camps 2026' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a free assessment' })).toBeVisible();
  });

  test('program cards link to related SEO landing pages', async ({ page }) => {
    await page.goto(localePath('/camps/academic-summer-programs-dublin-ca'));

    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Read to Prove program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-reading-writing-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Write to Explain program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-reading-writing-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Bridge the Gap Math program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-math-foundations-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Algebra Get Ready program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-algebra-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Geometry Get Ready program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-geometry-precalculus-dublin-ca/);
  });

  test('legacy sprint URL redirects to the hub', async ({ page }) => {
    await page.goto(localePath('/camps/academic-summer-sprint-dublin-ca'));
    await expect(page).toHaveURL(/\/camps\/academic-summer-programs-dublin-ca/);
  });

  for (const width of [375, 430] as const) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 });
      await page.goto(localePath('/camps/academic-summer-programs-dublin-ca'));
      await expect(page.locator('main h1')).toBeVisible();

      const hasOverflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth;
      });
      expect(hasOverflow).toBe(false);
    });
  }
});

const ACADEMIC_CAMP_LANDING_PATHS = [
  '/camps/summer-reading-writing-dublin-ca',
  '/camps/summer-math-foundations-dublin-ca',
] as const;

async function expectCanonicalWwwNoEn(page: Page, path: string) {
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute('href', new RegExp(`https://www\\.growwiseschool\\.org${path.replace(/\//g, '\\/')}$`));
  const href = await canonical.getAttribute('href');
  expect(href).not.toMatch(/\/en\//);
  const ogUrl = page.locator('meta[property="og:url"]');
  if ((await ogUrl.count()) > 0) {
    await expect(ogUrl).toHaveAttribute('content', new RegExp(`https://www\\.growwiseschool\\.org${path.replace(/\//g, '\\/')}$`));
    const og = await ogUrl.getAttribute('content');
    expect(og).not.toMatch(/\/en\//);
  }
}

test.describe('Academic summer SEO landings — canonical & indexability', { tag: '@nightly' }, () => {
  for (const path of ACADEMIC_CAMP_LANDING_PATHS) {
    test(`${path} returns 200 with www canonical (no /en)`, async ({ page }) => {
      const response = await page.goto(localePath(path));
      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expectCanonicalWwwNoEn(page, path);
    });
  }

  test('hub links to reading-writing and math-foundations landings', async ({ page }) => {
    await page.goto(localePath('/camps/academic-summer-programs-dublin-ca'));
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Read to Prove program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-reading-writing-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Bridge the Gap Math program details →',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-math-foundations-dublin-ca/);
  });
});
