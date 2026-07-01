import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { localePath } from '../localePath';
import { stubRecaptcha } from '../helpers';

/** Click a Radix SelectTrigger reliably — scroll it into view first to avoid sticky-header interception. */
async function clickTrigger(page: Page, testId: string) {
  const trigger = page.getByTestId(testId);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click({ force: true });
}

/** Select a Radix option and confirm the trigger reflects the chosen label. */
async function selectOption(
  page: Page,
  triggerTestId: string,
  optionName: RegExp | string,
  expectedTriggerText: RegExp | string,
) {
  await clickTrigger(page, triggerTestId);
  await page.getByRole('option', { name: optionName }).click();
  await expect(page.getByTestId(triggerTestId)).toContainText(expectedTriggerText, { timeout: 8000 });
}

test.describe('Book assessment form', { tag: '@critical' }, () => {
  test('submits free assessment booking with mocked backend', async ({ page }) => {
    await stubRecaptcha(page);

    await page.route('**/api/assessment', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
        return;
      }
      await route.continue();
    });

    await page.goto(localePath('/book-assessment'));

    await page.getByLabel(/Parent Name/i).fill('Parent Name');
    await page.getByLabel(/Email Address/i).fill('parent@example.com');
    await page.getByLabel(/Phone Number/i).fill('5551234567');

    await selectOption(page, 'assessment-grade-trigger', /^Grade 5$/i, /Grade 5/i);
    await selectOption(page, 'assessment-subject-interest-trigger', /^Math$/i, /Math/i);

    // No visible field-level validation errors before submit
    await expect(page.getByText(/Parent name is required|Email address is required|Phone number is invalid|Grade level is required|Consent is required/i)).toHaveCount(0);

    const submitBtn = page.getByTestId('assessment-submit');
    await expect(submitBtn).toBeEnabled({ timeout: 15000 });
    await submitBtn.scrollIntoViewIfNeeded();

    const successPath = localePath('/book-assessment/thank-you');
    const thankYouPattern = new RegExp(
      `${successPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`,
    );
    await Promise.all([
      page.waitForURL(thankYouPattern, { timeout: 20000 }),
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/assessment') && response.request().method() === 'POST',
      ),
      submitBtn.click(),
    ]);
    await expect(page).toHaveURL(thankYouPattern);
    await expect(page.getByTestId('form-thank-you')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('heading', { level: 1, name: /you.*re booked|thank you/i })).toBeVisible();
  });
});
