import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

const STUDENT_LOGIN_URL = 'https://thegrowwise.com/student-login';

test.describe('Student login redirect', { tag: '@critical' }, () => {
  test('redirects the existing login URL to the external portal', async ({ request }) => {
    const response = await request.get(localePath('/student-login'), { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe(STUDENT_LOGIN_URL);
  });

  for (const width of [390, 1440]) {
    test(`opens the external login page from the header at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      // Verify the redirect independently of the external WordPress site's health.
      await page.route('https://thegrowwise.com/**', (route) => route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<h1>External student portal</h1>',
      }));
      await page.goto(localePath('/'));
      await page.locator('header').getByRole('link', {
        name: 'Student Login', exact: true,
      }).click();

      await expect(page).toHaveURL(STUDENT_LOGIN_URL);
      await expect(page.getByRole('heading', { name: 'External student portal' })).toBeVisible();
    });
  }
});
