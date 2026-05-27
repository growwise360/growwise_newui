import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Math hub (grade-band router)', { tag: '@critical' }, () => {
  test('/academic/math shows hub H1 and grade-band CTAs', async ({ page }) => {
    await page.goto(localePath('/academic/math'), { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: "Find the right math program for your child's grade and goal.",
      }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'See elementary programs' })).toHaveAttribute(
      'href',
      /\/courses\/math\/elementary/,
    );
    await expect(page.getByRole('link', { name: 'See middle school programs' })).toHaveAttribute(
      'href',
      /\/courses\/math\/middle-school/,
    );
    await expect(page.getByRole('link', { name: 'See high school programs' })).toHaveAttribute(
      'href',
      /\/courses\/high-school-math/,
    );

    const packages = page.locator('#packages');
    await expect(packages.getByRole('heading', { name: 'Elementary math' })).toBeVisible();
    await expect(packages.getByText('Beginner · Champ · Pro')).toBeVisible();
    await expect(packages.getByText('$169/mo')).toBeVisible();
    await expect(packages.getByText('$376/mo')).toBeVisible();
    await expect(packages.getByRole('link', { name: 'See full program' }).first()).toHaveAttribute(
      'href',
      /\/courses\/math\/elementary/,
    );
    await expect(packages.getByText('Academic + Coding')).toHaveCount(0);
    await expect(
      packages.getByText(
        'Complimentary 60-minute weekly practice session included with every program',
      ),
    ).toHaveCount(2);
  });

  test('JTBD selector reveals resolution on click', async ({ page }) => {
    await page.goto(localePath('/academic/math'), { waitUntil: 'domcontentloaded' });

    await page
      .getByRole('button', { name: 'My child is falling behind and struggling to keep up' })
      .click();

    await expect(page.getByText(/A gap from 12–18 months back/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book free assessment' }).first()).toBeVisible();
  });

  test('/academic/math/high-school redirects to canonical high school page', async ({ page }) => {
    await page.goto(localePath('/academic/math/high-school'), { waitUntil: 'commit' });
    await expect(page).toHaveURL(/\/courses\/high-school-math/);
  });
});
