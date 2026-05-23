import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';
import { escapeForRegex, expectCartHydrated, stubRecaptcha } from '../helpers';

const TEST_CART = {
  items: [
    {
      id: 'test-course',
      name: 'Test Course',
      price: 100,
      quantity: 1,
    },
  ],
  total: 100,
  itemCount: 1,
};

test.describe('Cart, checkout, and Stripe test checkout', { tag: '@critical' }, () => {
  test('go to checkout from pre-filled cart and redirect to Stripe test page', async ({ page }) => {
    await page.goto(localePath('/'));
    await page.evaluate((cart) => {
      window.localStorage.setItem('growwise_cart', JSON.stringify(cart));
    }, TEST_CART);

    await page.goto(localePath('/cart'), { waitUntil: 'domcontentloaded' });
    await expect(page.getByText(/Shopping Cart/i)).toBeVisible();
    await expectCartHydrated(page, 'Test Course');

    const checkoutPath = escapeForRegex(localePath('/checkout'));
    const proceedToCheckout = page.getByRole('link', { name: /Proceed to Checkout/i });

    await Promise.all([
      page.waitForURL(new RegExp(`${checkoutPath}(\\?|$)`), { timeout: 15_000 }),
      proceedToCheckout.click(),
    ]);
    await expect(page.getByRole('heading', { name: /^Checkout$/i })).toBeVisible({ timeout: 15_000 });

    let checkoutRequestSeen = false;
    await page.route('**/api/payment/create-checkout-session', async (route) => {
      checkoutRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sessionId: 'cs_test_123',
          url: 'https://checkout.stripe.com/pay/cs_test_123',
        }),
      });
    });

    await page.getByRole('button', { name: /Proceed to Payment/i }).click();
    await expect(page).toHaveURL('https://checkout.stripe.com/pay/cs_test_123', { timeout: 15_000 });
    expect(checkoutRequestSeen).toBeTruthy();
  });
});
