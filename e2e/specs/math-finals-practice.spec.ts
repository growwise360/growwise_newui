import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { localePath } from '../localePath';
import { fillStable } from '../helpers';

async function selectRadixOption(page: Page, triggerId: string, optionName: RegExp | string) {
  const trigger = page.locator(`#${triggerId}`);
  await expect(trigger).toBeVisible({ timeout: 15_000 });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click({ force: true });
  await page.getByRole('option', { name: optionName }).click();
}

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

    await page.goto(localePath('/math-finals-practice-session'), {
      waitUntil: 'domcontentloaded',
    });

    const parentName = page.locator('#parentName');
    await expect(parentName).toBeVisible({ timeout: 20_000 });
    await parentName.scrollIntoViewIfNeeded();

    await fillStable(page, /Parent name/i, 'E2E Parent');
    await fillStable(page, /Parent email/i, 'math-finals.e2e@example.com');
    await fillStable(page, /Student name/i, 'E2E Student');
    await fillStable(page, /Parent phone/i, '5551234567');
    await page.locator('#school').fill('Dublin High');

    await selectRadixOption(page, 'grade-select', /^Grade 10$/i);
    await selectRadixOption(page, 'subject-select', /Algebra 1/i);

    await page.getByRole('button', { name: /^Submit$/i }).click();

    const thankYouPath = localePath('/math-finals-practice-session/thank-you').replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    await expect(page).toHaveURL(new RegExp(`${thankYouPath}(\\?|$)`), { timeout: 20_000 });
  });
});
