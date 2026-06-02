import { test, expect } from '@playwright/test';

/** GSC 404/noindex rows — retired locale prefixes must 301 to prefix-free English URLs. */
const LEGACY_LOCALE_REDIRECTS: { from: string; to: string }[] = [
  { from: '/en/programs', to: '/programs' },
  { from: '/en/enroll', to: '/enroll' },
  { from: '/en/steam/ml-ai-coding', to: '/steam/ml-ai-coding' },
  { from: '/hi/steam/game-development', to: '/steam/game-development' },
  { from: '/zh/programs', to: '/programs' },
  { from: '/zh/steam/game-development', to: '/steam/game-development' },
  { from: '/es/programs', to: '/programs' },
  { from: '/es/about', to: '/about' },
  { from: '/hi/courses/math', to: '/academic/math' },
  { from: '/zh/enroll', to: '/enroll' },
  { from: '/zh/courses/english', to: '/academic/english' },
  { from: '/en/courses/english', to: '/academic/english' },
  { from: '/math-courses-in-dublin-ca-growwise', to: '/academic/math' },
  { from: '/math-courses-in-dublin-ca-growwise/', to: '/academic/math' },
];

async function expectCanonicalDestination(
  page: import('@playwright/test').Page,
  expectedPath: string,
) {
  const escaped = expectedPath.replace(/\//g, '\\/');
  await expect(page).toHaveURL(new RegExp(`${escaped}$`));

  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute('href', new RegExp(`${escaped}$`));
  const href = await canonical.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href).not.toMatch(/\/(en|hi|zh|es)\//);
  expect(href).not.toMatch(/^https?:\/\/www\./);

  const robots = page.locator('meta[name="robots"]');
  if ((await robots.count()) > 0) {
    await expect(robots).not.toHaveAttribute('content', /noindex/i);
  }
  await expect(page.locator('main h1')).toHaveCount(1);
}

test.describe('Legacy locale prefix redirects', { tag: '@critical' }, () => {
  for (const { from, to } of LEGACY_LOCALE_REDIRECTS) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from);
      await expectCanonicalDestination(page, to);
    });
  }

  test('/programs/ (trailing slash) → /programs', async ({ page }) => {
    await page.goto('/programs/');
    await expectCanonicalDestination(page, '/programs');
  });
});
