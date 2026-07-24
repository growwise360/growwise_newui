import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

const MOBILE_VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
];

test.describe('Mobile homepage layout', { tag: '@critical' }, () => {
  for (const viewport of MOBILE_VIEWPORTS) {
    test(`no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      // domcontentloaded — avoid networkidle (analytics/third-party keeps network busy → flaky timeouts).
      await page.goto(localePath('/'), { waitUntil: 'domcontentloaded' });
      await page.locator('button[aria-label="Open menu"]').waitFor({ state: 'visible', timeout: 20_000 });

      const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const menuBtn = document.querySelector('button[aria-label="Open menu"]');
        const steamBtn = Array.from(document.querySelectorAll('a')).find((a) =>
          a.textContent?.includes('STEAM'),
        );
        const menuBox = menuBtn?.getBoundingClientRect();
        const steamBox = steamBtn?.getBoundingClientRect();

        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          menuClipped: menuBox ? menuBox.right > window.innerWidth + 0.5 : false,
          steamClipped: steamBox ? steamBox.right > window.innerWidth + 0.5 : false,
        };
      });

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
      expect(layout.menuClipped).toBe(false);
      expect(layout.steamClipped).toBe(false);
    });
  }
});
