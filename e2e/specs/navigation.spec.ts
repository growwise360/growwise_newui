import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Navigation and layout', { tag: '@critical' }, () => {
  test('header links, cart icon, and enroll CTA work', async ({ page }) => {
    await page.goto(localePath('/'));

    // Header is visible
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });

    // Book Assessment CTA in header has correct href (replaced Enroll in PR #379)
    const bookAssessmentLink = page.getByRole('banner').getByRole('link', { name: /book assessment/i }).first();
    await expect(bookAssessmentLink).toHaveAttribute('href', localePath('/book-assessment'));

    // Cart icon link points to cart page
    const cartLink = page.getByRole('link', { name: /shopping cart/i }).first();
    await expect(cartLink).toHaveAttribute('href', localePath('/cart'));
  });
});
