import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Header student login navigation', { tag: '@critical' }, () => {
  for (const width of [390, 1440]) {
    test(`opens the local login page from the header at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      // Validate our route independently of the external WordPress portal's health.
      await page.route('https://thegrowwise.com/**', (route) => route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<p>External student portal</p>',
      }));
      await page.goto(localePath('/'));
      await page.locator('header').getByRole('link', {
        name: 'Student Login', exact: true,
      }).click();

      await expect(page).toHaveURL(new RegExp(`${localePath('/student-login')}$`));
      await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
      const response = await page.request.get(localePath('/student-login'));
      expect(response.status()).toBe(200);
    });
  }
});

test.describe('Student login page', { tag: '@nightly' }, () => {
  test('renders login form fields and CTA', async ({ page }) => {
    await page.goto(localePath('/student-login'));

    await expect(
      page.getByRole('heading', { name: /Welcome back/i }),
    ).toBeVisible();

    // We don't assert inner fields because the content is rendered via external iframe / redirect.
    const redirectButton = page.getByRole('button', { name: /Go to Login Page/i });
    const iframe = page.frameLocator('iframe[title="Student Login"]');

    // Either the direct-login button (fallback) is visible, or the iframe-based login is rendered.
    if (await redirectButton.isVisible().catch(() => false)) {
      await expect(redirectButton).toBeVisible();
    } else {
      // Assert that at least the iframe container exists in the DOM
      await expect(page.locator('iframe[title="Student Login"]')).toBeVisible();
    }
  });
});

