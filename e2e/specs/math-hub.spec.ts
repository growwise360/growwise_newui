import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { MATH_COURSE_PATHS } from '../../src/lib/math-course-paths';

function pathPattern(suffix: string): RegExp {
  return new RegExp(`${suffix.replace(/\//g, '\\/')}$`);
}

test.describe('Math hub (grade-band router)', { tag: '@critical' }, () => {
  test('/academic/math shows hub H1 and grade-band CTAs', async ({ page }) => {
    await page.goto(localePath('/academic/math'), { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Math Classes & Enrichment for Grades 1-12 in Dublin, CA',
      }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'See elementary programs' })).toHaveAttribute(
      'href',
      pathPattern(MATH_COURSE_PATHS.elementary),
    );
    await expect(page.getByRole('link', { name: 'See middle school programs' })).toHaveAttribute(
      'href',
      pathPattern(MATH_COURSE_PATHS.middleSchool),
    );
    await expect(page.getByRole('link', { name: 'See high school programs' })).toHaveAttribute(
      'href',
      pathPattern(MATH_COURSE_PATHS.highSchool),
    );

    const packages = page.locator('#packages');
    await expect(packages.getByRole('heading', { name: 'Elementary math' })).toBeVisible();
    await expect(packages.getByText('Beginner · Champ · Pro')).toBeVisible();
    await expect(packages.getByText('$169/mo')).toBeVisible();
    await expect(packages.getByText('$376/mo')).toBeVisible();
    await expect(packages.getByRole('link', { name: 'See full program' }).first()).toHaveAttribute(
      'href',
      pathPattern(MATH_COURSE_PATHS.elementary),
    );
    await expect(packages.getByText('Academic + Coding')).toHaveCount(0);
    await expect(
      packages.getByText(
        'Complimentary 60-minute weekly practice session included with every program',
      ),
    ).toHaveCount(0);
  });

  test('JTBD selector reveals resolution on click', async ({ page }) => {
    await page.goto(localePath('/academic/math'), { waitUntil: 'load' });
    await expect(page.getByText('Step 2 — Find your situation')).toBeVisible();

    const jtbdSection = page.locator('section').filter({ hasText: 'Step 2 — Find your situation' });
    const situation = jtbdSection.getByText('My child is falling behind and struggling to keep up', {
      exact: true,
    });
    await expect(situation).toBeVisible();
    await situation.click();

    await expect(page.getByText(/A gap from 12–18 months back/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book free assessment' }).first()).toBeVisible();
  });

  test('/academic/math/high-school serves canonical high school page', async ({ page }) => {
    await page.goto(localePath('/academic/math/high-school'), { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pathPattern(MATH_COURSE_PATHS.highSchool));
    await expect(page.getByText('$369/mo', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('2 Subject', { exact: true })).toHaveCount(0);
  });
});
