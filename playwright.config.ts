import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for GrowWise NewUI
 *
 * Base URL:
 * - Uses E2E_BASE_URL if set (e.g. staging)
 * - Otherwise defaults to http://localhost:3000
 *
 * Test tiers (see `.cursor/rules.md` §17):
 * - @critical — enrollment, checkout, ad landing routes; run on every PR (`npm run test:e2e:smoke`)
 * - @nightly — bulk SEO/camps/mobile audit; run on morning schedule only (`npm run test:e2e:full`)
 *
 * Stripe:
 * - Checkout flow is expected to redirect to Stripe test checkout page.
 * - Tests should assert redirect to a Stripe URL and not real card charges.
 */

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e/specs',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // `next dev` + parallel Playwright workers reliably triggers RSC/JSON.parse races and flaky tests.
  // webServer: next start if built, else next dev. CI sets E2E_BASE_URL and starts the server in the workflow.
  workers: process.env.PLAYWRIGHT_WORKERS
    ? parseInt(process.env.PLAYWRIGHT_WORKERS, 10)
    : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'bash scripts/e2e-web-server.sh',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});

