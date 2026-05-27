import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { MATH_COURSE_PATHS } from '../../src/lib/math-course-paths';

function pathPattern(suffix: string): RegExp {
  return new RegExp(`${suffix.replace(/\//g, '\\/')}$`);
}

test.describe('Academic nested Math navigation', { tag: '@critical' }, () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  async function openAcademicFlyout(page: import('@playwright/test').Page) {
    await page.goto(localePath('/'));
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });

    const nav = page.locator('.header-desktop-nav');
    await expect(nav).toBeVisible({ timeout: 15000 });
    await expect(nav.locator(`a[href$="${MATH_COURSE_PATHS.hub}"]`).first()).toBeAttached({
      timeout: 15000,
    });

    const academic = nav.getByRole('link', { name: 'Academic' });
    await academic.hover();
    await expect(nav.getByRole('link', { name: 'English Courses' })).toBeVisible({
      timeout: 15000,
    });
  }

  test('desktop flyout: clicking Math opens math hub', async ({ page }) => {
    await openAcademicFlyout(page);

    const nav = page.locator('.header-desktop-nav');
    const mathHubLink = nav
      .getByRole('link')
      .filter({ has: page.getByText('Math', { exact: true }) })
      .first();
    await expect(mathHubLink).toBeVisible();
    await expect(mathHubLink).toHaveAttribute('href', pathPattern(MATH_COURSE_PATHS.hub));
    await mathHubLink.click();

    await expect(page).toHaveURL(pathPattern(MATH_COURSE_PATHS.hub));
  });

  test('desktop flyout: Academic → Math → Elementary Math', async ({ page }) => {
    await openAcademicFlyout(page);

    const nav = page.locator('.header-desktop-nav');
    await expect(nav.getByText('Courses', { exact: true })).not.toBeVisible();

    await nav.getByRole('button', { name: /Show Math grade levels/i }).first().click();

    const elementary = nav.getByRole('link', { name: 'Elementary Math' }).first();
    await expect(elementary).toBeVisible({ timeout: 10000 });
    await expect(elementary).toHaveAttribute('href', pathPattern(MATH_COURSE_PATHS.elementary));
    await elementary.click();

    await expect(page).toHaveURL(pathPattern(MATH_COURSE_PATHS.elementary));
  });
});
