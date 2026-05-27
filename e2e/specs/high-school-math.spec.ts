import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('High school math (canonical page)', { tag: '@critical' }, () => {
  test('/academic/math/high-school shows monthly pricing and Sunday callout', async ({ page }) => {
    await page.goto(localePath('/academic/math/high-school'), { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /High School Math Tutoring/,
      }),
    ).toBeVisible();

    await expect(page.getByText('From $189/month · 75 min, once a week · 3-month program')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'High School Math — 3-Month Program' })).toBeVisible();
    await expect(page.getByText('From $189/month')).toBeVisible();
    await expect(page.getByText('$189/mo')).toBeVisible();
    await expect(page.getByText('$369/mo')).toBeVisible();
    await expect(page.getByText('AP Math')).toBeVisible();
    await expect(page.getByText('(100% School Aligned)')).toBeVisible();
    await expect(page.getByText('$376/mo')).toBeVisible();
    await expect(
      page.getByText('Free Sunday practice sessions — included for all Grades 6–12 students'),
    ).toBeVisible();
    await expect(page.locator('#courses')).toBeVisible();
    await expect(page.getByText('Which situation fits your student?')).toBeVisible();
    await expect(page.getByText('Trial session — Grades 9–12')).toBeVisible();
  });

  test('/academic/math/high-school redirects to canonical URL', async ({ page }) => {
    await page.goto(localePath('/academic/math/high-school'), { waitUntil: 'commit' });
    await expect(page).toHaveURL(/\/courses\/high-school-math/);
    await expect(page.getByText('$189/mo')).toBeVisible();
  });
});
