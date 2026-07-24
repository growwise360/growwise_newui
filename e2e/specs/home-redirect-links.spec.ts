import { test, expect } from '@playwright/test';

/**
 * Routes that home/program sections should navigate to (CTAs and card links).
 * Smoke: each path returns a non-404 response when loaded directly.
 */
const MARKETING_ROUTES = [
  '/book-assessment',
  '/academic/math',
  '/academic/english',
  '/courses/sat-prep',
  '/self-check',
  '/academic',
  '/steam',
  '/steam/ml-ai-coding',
  '/steam/game-development',
  '/workshop-calendar',
  '/camps/academic-summer-programs-dublin-ca',
  '/camps/summer',
] as const;

test.describe('Marketing route targets (home CTAs)', { tag: '@critical' }, () => {
  for (const path of MARKETING_ROUTES) {
    test(`${path} responds without 404`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), `${path} status`).not.toBe(404);
    });
  }

  test('home page exposes internal links in main', async ({ page }) => {
    // domcontentloaded — avoid networkidle (analytics/third-party keeps network busy → flaky timeouts)
    const res = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).not.toBe(404);

    await page.locator('main').waitFor({ state: 'attached', timeout: 15_000 });
    // Home is client-heavy and hydrates progressively — the top-of-main proof
    // slot's link can paint well before the rest of the hero, so poll the count
    // instead of sampling once right after the first link appears.
    await expect
      .poll(() => page.locator('main a[href^="/"]').count(), {
        message: 'main should contain internal links',
        timeout: 20_000,
      })
      .toBeGreaterThan(5);
  });
});
