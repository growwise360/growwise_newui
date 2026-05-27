import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { MATH_COURSE_PATHS } from '../../src/lib/math-course-paths';

test.describe('Academic nested Math navigation', { tag: '@critical' }, () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('desktop flyout: clicking Math opens math hub', async ({ page }) => {
    await page.goto(localePath('/'));
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });

    const academic = page
      .getByRole('button', { name: 'Academic' })
      .or(page.getByRole('link', { name: 'Academic' }));
    await academic.first().hover();

    const mathHubLink = page
      .locator('.header-desktop-nav')
      .getByRole('link', { name: /^Math$/i })
      .first();
    await expect(mathHubLink).toBeVisible({ timeout: 10000 });
    await expect(mathHubLink).toHaveAttribute(
      'href',
      new RegExp(`${MATH_COURSE_PATHS.hub.replace(/\//g, '\\/')}$`),
    );
    await mathHubLink.click();

    await expect(page).toHaveURL(new RegExp(`${MATH_COURSE_PATHS.hub.replace(/\//g, '\\/')}$`));
  });

  test('desktop flyout: Academic → Math → Elementary Math', async ({ page }) => {
    await page.goto(localePath('/'));
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });

    const academic = page
      .getByRole('button', { name: 'Academic' })
      .or(page.getByRole('link', { name: 'Academic' }));
    await academic.first().hover();

    await expect(page.getByRole('link', { name: 'English Courses' })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Courses', { exact: true })).not.toBeVisible();

    await page
      .locator('.header-desktop-nav')
      .getByRole('button', { name: /Show Math grade levels/i })
      .first()
      .hover();

    const elementary = page.getByRole('link', { name: 'Elementary Math' }).first();
    await expect(elementary).toBeVisible({ timeout: 10000 });
    await elementary.click();

    await expect(page).toHaveURL(
      new RegExp(`${MATH_COURSE_PATHS.elementary.replace(/\//g, '\\/')}$`),
    );
  });
});
