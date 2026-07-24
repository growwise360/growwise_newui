import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/** Avoid reCAPTCHA network calls blocking form submit in E2E. */
export async function stubRecaptcha(page: Page) {
  await page.addInitScript(() => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: async () => 'test-recaptcha-token',
    };
  });
}

export async function fillStable(page: Page, label: RegExp, value: string) {
  const loc = page.getByLabel(label);
  for (let i = 0; i < 3; i++) {
    await loc.fill(value);
    if ((await loc.inputValue()) === value) break;
  }
  await expect(loc).toHaveValue(value);
}

/** Wait until CartContext has hydrated seeded items from localStorage. */
export async function expectCartHydrated(page: Page, itemName: string) {
  await expect(page.getByText(itemName)).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole('link', { name: /Proceed to Checkout/i })).toBeVisible();
}

export function escapeForRegex(path: string) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
