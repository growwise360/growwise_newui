import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Academic summer programs hub', () => {
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
        name: 'Summer reading & writing program in Dublin, CA',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-reading-writing-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Summer math foundations program in Dublin, CA',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-math-foundations-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Summer algebra program in Dublin, CA',
      }).first(),
    ).toHaveAttribute('href', /\/camps\/summer-algebra-dublin-ca/);
    await expect(
      page.locator('#program-grid').getByRole('link', {
        name: 'Summer geometry program in Dublin, CA',
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
