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

    const academicWrapper = nav.locator('.relative').filter({
      has: page.getByRole('link', { name: 'Academic', exact: true }),
    });
    const flyoutSignal = nav.getByRole('link', { name: /English Courses|SAT Prep/ });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await academicWrapper.hover();
      if (await flyoutSignal.first().isVisible()) {
        return;
      }
      await academicWrapper.dispatchEvent('mouseenter');
      if (await flyoutSignal.first().isVisible()) {
        return;
      }
      await page.waitForTimeout(150);
    }

    await expect(flyoutSignal.first()).toBeVisible({ timeout: 15000 });
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

    const mathRow = nav
      .getByRole('link')
      .filter({ has: page.getByText('Math', { exact: true }) })
      .first();
    await mathRow.hover();

    const elementary = page.getByRole('link', { name: 'Elementary Math' }).first();
    await expect(elementary).toBeVisible({ timeout: 10000 });
    await expect(elementary).toHaveAttribute('href', pathPattern(MATH_COURSE_PATHS.elementary));
    await elementary.click();

    await expect(page).toHaveURL(pathPattern(MATH_COURSE_PATHS.elementary));
  });
});
