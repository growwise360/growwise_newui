import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { fillStable, stubRecaptcha } from '../helpers';

test.describe('Enrollment form', { tag: '@critical' }, () => {
  test('submits general enrollment successfully with mocked backend', async ({ page }) => {
    await stubRecaptcha(page);

    await page.route('**/api/enroll', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      const body = await route.request().postDataJSON();
      expect(body.fullName).toContain('Test');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(localePath('/enroll'));

    await fillStable(page, /Your Full Name/i, 'Test Parent');
    await fillStable(page, /^Email\b/i, 'test@example.com');
    await fillStable(page, /Mobile phone number/i, '5551234567');
    await fillStable(page, /^City\b/i, 'Test City');
    await fillStable(page, /Postal code/i, '12345');

    await page.getByRole('button', { name: /Academic/i }).first().click();

    await page.locator('#course').click();
    await page.getByRole('option', { name: /Math Courses/i }).click();

    await page.locator('#level').click();
    await page.getByRole('option', { name: /Elementary/i }).click();

    await page.getByRole('checkbox', { name: /I agree to receive/i }).check();

    const submit = page.getByRole('button', { name: /Register for Assessment/i });
    await expect(submit).toBeEnabled({ timeout: 10_000 });

    await Promise.all([
      page.waitForURL(/\/enroll\/thank-you/, { timeout: 20_000 }),
      submit.click(),
    ]);
    await expect(page.getByRole('heading', { name: /Thank you/i })).toBeVisible();
  });
});
