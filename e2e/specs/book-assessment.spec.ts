import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { localePath } from '../localePath';

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

test.describe('Book assessment form', () => {
  test('submits free assessment booking with mocked backend', async ({ page }) => {
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

    // WebKit can reset controlled inputs before hydration settles
    const studentName = page.getByLabel(/Student Name/i);
    for (let i = 0; i < 3; i++) {
      await studentName.fill('Student Name');
      if (await studentName.inputValue() === 'Student Name') break;
    }
    await expect(studentName).toHaveValue('Student Name');

    await selectOption(page, 'assessment-grade-trigger', /^Grade 5$/i, /Grade 5/i);
    await selectOption(page, 'assessment-type-trigger', /Math Skills Assessment/i, /Math Skills Assessment/i);

    await page.getByTestId('assessment-mode-online').click({ force: true });

    await selectOption(page, 'assessment-schedule-day-trigger', /Monday.*Friday/i, /Monday.*Friday/i);
    await selectOption(page, 'assessment-schedule-time-trigger', /3:00.*7:00.*pm/i, /3:00.*7:00.*pm/i);
    await selectOption(page, 'hear-about-trigger', /Google/i, /Google/i);

    // No visible field-level validation errors before submit
    await expect(page.getByText(/Your first name is required|Student name is required|Phone number is invalid|Select preferred/i)).toHaveCount(0);

    const submitBtn = page.getByTestId('assessment-submit');
    await expect(submitBtn).toBeEnabled({ timeout: 15000 });
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    const successPath = localePath('/book-assessment/thank-you');
    await expect(page).toHaveURL(
      new RegExp(`${successPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`),
      { timeout: 20000 },
    );
    await expect(page.getByTestId('form-thank-you')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('heading', { level: 1, name: /you.*re booked|thank you/i })).toBeVisible();
  });
});
