import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

/** Mobile viewport only — nightly CI installs chromium, not webkit (iPhone 14 device). */
test.use({ viewport: { width: 390, height: 844 } });

test.describe('Courses pages (mobile)', { tag: '@nightly' }, () => {
  const paths = [
    '/courses/math',
    '/courses/english',
    '/courses/sat-prep',
    '/courses/high-school-math',
    '/courses/integrated-math-1-dublin-ca',
  ];

  for (const path of paths) {
    test(`${path} does not 404`, async ({ page }) => {
      const res = await page.goto(localePath(path), { waitUntil: 'domcontentloaded' });
      expect(res, `No response for ${path}`).not.toBeNull();
      expect(res!.status(), `${path} returned ${res!.status()}`).not.toBe(404);
    });
  }
});

test.describe('Camps pages (mobile)', { tag: '@nightly' }, () => {
  const paths = ['/camps/summer', '/camps/winter'];

  for (const path of paths) {
    test(`${path} does not 404`, async ({ page }) => {
      const res = await page.goto(localePath(path), { waitUntil: 'domcontentloaded' });
      expect(res, `No response for ${path}`).not.toBeNull();
      expect(res!.status(), `${path} returned ${res!.status()}`).not.toBe(404);
    });
  }
});
