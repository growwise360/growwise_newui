import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { MATH_COURSE_PATHS } from '../../src/lib/math-course-paths';

function pathPattern(suffix: string): RegExp {
  return new RegExp(`${suffix.replace(/\//g, '\\/')}$`);
}

test.describe('High school math (canonical page)', { tag: '@critical' }, () => {
  test('/academic/math/high-school shows monthly pricing and trust proof', async ({ page }) => {
    await page.goto(localePath('/academic/math/high-school'), { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /High School Math Tutoring/,
      }),
    ).toBeVisible();

    await expect(
      page.getByText('From $369/month · 150 minutes per week · 3-month program').first(),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'High School Math — 3-Month Program' }).first()).toBeVisible();
    await expect(page.getByText('From $369/month', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('$369/mo', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('2 Subject', { exact: true })).toHaveCount(0);
    await expect(page.getByText('150 min/week').first()).toBeVisible();
    await expect(page.getByText('AP Math').first()).toBeVisible();
    await expect(page.getByText('(100% School Aligned)').first()).toBeVisible();
    await expect(page.getByText('$376/mo', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Trial class $45' }).first()).toBeVisible();
    await expect(page.getByText('Free Sunday practice sessions')).toHaveCount(0);
    await expect(page.locator('#courses').first()).toBeVisible();
    await expect(page.getByText('Which situation fits your student?').first()).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Parents choose GrowWise when high school math needs a real plan.',
      }).first(),
    ).toBeVisible();
  });

  test('legacy /courses/math/high-school redirects to canonical URL', async ({ page }) => {
    await page.goto(localePath('/courses/math/high-school'), { waitUntil: 'load' });
    await page.waitForURL(pathPattern(MATH_COURSE_PATHS.highSchool), { timeout: 30000 });
    await expect(page.getByText('$369/mo', { exact: true }).first()).toBeVisible();
  });
});
