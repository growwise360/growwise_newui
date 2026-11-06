import { test, expect } from '@playwright/test';
import { ONLINE_SCIENCE_COURSES } from '../../src/data/online-science-courses';

const bands = [
  { label: 'Elementary', trial: '$197', core: '$327', advanced: null },
  { label: 'Middle school', trial: '$207', core: '$347', advanced: '$397' },
  { label: 'High school', trial: '$237', core: '$387', advanced: '$437' },
];

test.describe('Online launch regression checks', { tag: '@critical' }, () => {
  test('published online routes return 200 and unknown paths remain 404', async ({ request }) => {
    for (const path of ['/pricing', '/online-tutoring', ...ONLINE_SCIENCE_COURSES.map(({ slug }) => `/academic/science/${slug}`)]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
    expect((await request.get('/not-a-growwise-page-pr408')).status()).toBe(404);
  });

  test('public locale prefixes redirect once while clean paths remain reachable', async ({ request }) => {
    for (const path of ['/pricing', '/book-assessment']) {
      const clean = await request.get(path, { maxRedirects: 0 });
      expect(clean.status(), path).toBe(200);
      for (const locale of ['en', 'hi']) {
        const response = await request.get(`/${locale}${path}`, { maxRedirects: 0 });
        expect([301, 308]).toContain(response.status());
        const location = response.headers().location;
        expect(new URL(location, response.url()).pathname).toBe(path);
        expect((await request.get(location)).status()).toBe(200);
      }
    }
  });

  for (const [mode, viewport] of [
    ['desktop', { width: 1440, height: 1000 }],
    ['mobile', { width: 390, height: 844 }],
  ] as const) {
    test.describe(mode, () => {
      test.use({ viewport });
      test.beforeEach(async ({ page, baseURL }) => {
        const origin = new URL(baseURL!).origin;
        await page.route('**/*', (route) => {
          const request = route.request();
          if (new URL(request.url()).origin !== origin || request.method() !== 'GET') return route.abort();
          return route.continue();
        });
      });

      test('plan cards distinguish billing and never assume an actual grade', async ({ page, baseURL }) => {
        await page.goto('/pricing');
        for (const { label, trial, core, advanced } of bands) {
          await page.getByRole('tab', { name: label, exact: true }).click();
          const panel = page.getByRole('tabpanel', { name: label, exact: true });
          const trialCard = panel.locator('article').filter({ has: page.getByRole('heading', { name: 'Trial month', exact: true }) });
          await expect(trialCard).toContainText(`${trial} one-time`);
          await expect(trialCard).not.toContainText('/ month');
          const coreCard = panel.locator('article').filter({ has: page.getByRole('heading', { name: 'Core', exact: true }) });
          await expect(coreCard).toContainText(`${core} / month`);
          if (advanced) {
            const advancedCard = panel.locator('article').filter({ has: page.getByRole('heading', { name: 'Advanced', exact: true }) });
            await expect(advancedCard).toContainText(`${advanced} / month`);
          }
          for (const link of await panel.getByRole('link', { name: 'Book a free assessment', exact: true }).all()) {
            const url = new URL((await link.getAttribute('href'))!, baseURL);
            expect(url.searchParams.has('grade')).toBe(false);
            expect(url.searchParams.get('package')).toContain(`${label} · `);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
        const core = page.getByRole('tabpanel', { name: 'High school', exact: true }).locator('article').filter({ has: page.getByRole('heading', { name: 'Core', exact: true }) });
        await core.getByRole('link', { name: 'Book a free assessment', exact: true }).click();
        await expect(page.getByTestId('assessment-grade-trigger')).not.toContainText(/Grade\s+\d/);
        await expect(page.locator('#mainConcern')).toHaveValue('Package interest: High school · Core');
      });

      test('an explicitly selected grade and subject still reach the assessment', async ({ page }) => {
        await page.goto('/online-tutoring');
        await page.getByLabel(/^Student grade/).selectOption('12');
        await page.getByLabel(/^Subject/).selectOption('Physics');
        await page.getByRole('button', { name: 'Continue with parent or guardian', exact: true }).click();
        await expect(page.getByTestId('assessment-grade-trigger')).toContainText('Grade 12');
        await expect(page.locator('#subjectInterest')).toContainText('Physics');
      });

      test('summer program details have no empty claim items', async ({ page }) => {
        await page.goto('/camps/high-school-summer-intensive-dublin-ca');
        const details = page.getByRole('region', { name: 'Program details', exact: true });
        await expect(details).toHaveText('Max 8 per class');
        await expect(details.locator('.w-px')).toHaveCount(0);
        await expect(details.locator('span:empty, div:empty')).toHaveCount(0);
      });
    });
  }
});
