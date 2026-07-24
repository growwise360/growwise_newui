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
    await expect(page.getByText(/Parent name is required|Email address is required|Phone number is invalid|Grade level is required|Subject interest is required|Consent is required/i)).toHaveCount(0);

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

  test('shows updated assessment positioning and Growy intake helper', async ({ page }) => {
    await page.goto(localePath('/book-assessment'));

    await expect(page.getByRole('heading', { level: 1, name: /Free 30-Minute Assessment/i })).toBeVisible();
    await expect(page.getByText(/Find the exact gap\. Leave with a written plan\. No cost, no pressure\./i).first()).toBeVisible();
    await expect(page.getByText(/Leave knowing the exact skill gap\. If we cannot identify it, we.ll run a second session free\./i).first()).toBeVisible();
    await expect(page.getByText(/60-Minute Full Diagnostic · \$49/i).first()).toBeVisible();

    await page.getByText(/60-Minute Full Diagnostic · \$49/i).first().click();
    await page.getByRole('button', { name: /Choose Full Diagnostic/i }).click();
    await expect(page.getByRole('button', { name: /Switch to free assessment/i })).toBeVisible();

    await expect(page.getByRole('heading', { name: /Why families choose GrowWise after comparing options/i })).toBeVisible();

    await page.locator('#assessment-booking-form').scrollIntoViewIfNeeded();
    await expect(page.getByText(/Want Growy to help/i)).toBeVisible({ timeout: 8000 });

    await page.getByRole('button', { name: /Let Growy Help/i }).click();
    await expect(page.getByText(/I can help with this/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/How would you like to start/i)).toBeVisible();
  });
});
