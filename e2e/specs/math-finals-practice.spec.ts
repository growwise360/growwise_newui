import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Math finals practice form', { tag: '@critical' }, () => {
  test('submits math finals request with mocked backend', async ({ page }) => {
    await page.route('**/api/math-finals-practice', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'OK' }),
      });
    });

    const res = await page.goto(`${localePath('/math-finals-practice-session')}#signup`, {
      waitUntil: 'domcontentloaded',
    });
    expect(res?.status(), 'math-finals page status').not.toBe(404);

    const parentName = page.getByRole('textbox', { name: /^Parent name/i });
    await expect(parentName).toBeVisible({ timeout: 20_000 });

    await parentName.fill('E2E Parent');
    await page.getByRole('textbox', { name: /^Parent email/i }).fill('math-finals.e2e@example.com');
    await page.getByRole('textbox', { name: /^Student name/i }).fill('E2E Student');
    await page.getByRole('textbox', { name: /^Parent phone/i }).fill('5551234567');
    await page.getByRole('textbox', { name: /^School/i }).fill('Dublin High');

    await page.getByRole('combobox', { name: /^Grade/i }).click({ force: true });
    await page.getByRole('option', { name: /^Grade 10$/i }).click();

    await page.getByRole('combobox', { name: /Current math course/i }).click({ force: true });
    await page.getByRole('option', { name: /Algebra 1/i }).click();

    await page.getByRole('checkbox', { name: /I agree to the Terms/i }).check();
    await page.getByRole('button', { name: /^Submit$/i }).click();

    const thankYouPath = localePath('/math-finals-practice-session/thank-you').replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    await expect(page).toHaveURL(new RegExp(`${thankYouPath}(\\?|$)`), { timeout: 20_000 });
  });
});
