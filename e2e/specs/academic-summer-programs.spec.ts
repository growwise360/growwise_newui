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

  test('legacy sprint URL redirects to the hub', async ({ page }) => {
    await page.goto(localePath('/camps/academic-summer-sprint-dublin-ca'));
    await expect(page).toHaveURL(/\/camps\/academic-summer-programs-dublin-ca/);
  });
});
