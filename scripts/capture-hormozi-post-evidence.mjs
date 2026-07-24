import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.E2E_BASE_URL || 'http://127.0.0.1:3001';
const outputDirectory = path.resolve('docs/audits/evidence');
const defaultRoutes = [
  '/book-assessment',
  '/academic',
  '/academic/math',
  '/academic/english',
  '/coding',
  '/future-skills',
  '/steam',
  '/game-dev',
  '/camps',
  '/dublin-ca',
  '/contact',
  '/',
  '/camps/summer-im-get-ready-dublin-ca',
  '/courses/integrated-math-1-dublin-ca',
  '/camps/summer-algebra-dublin-ca',
  '/camps/summer-geometry-precalculus-dublin-ca',
  '/camps/summer-math-foundations-dublin-ca',
  '/camps/summer-reading-writing-dublin-ca',
  '/camps/high-school-summer-intensive-dublin-ca',
  '/camps/academic-summer-programs-dublin-ca',
  '/academic/english/elementary',
  '/academic/math/middle-school',
];
const routes = process.env.EVIDENCE_ROUTES
  ? process.env.EVIDENCE_ROUTES.split(',').map((route) => route.trim()).filter(Boolean)
  : defaultRoutes;
const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};

fs.mkdirSync(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport });

    for (const route of routes) {
      const page = await context.newPage();
      let response;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          response = await page.goto(`${baseUrl}${route}`, {
            waitUntil: 'domcontentloaded',
            timeout: 45_000,
          });
          break;
        } catch (error) {
          if (attempt === 1 || !String(error).includes('ERR_ABORTED')) throw error;
          await page.waitForTimeout(500);
        }
      }
      if (!response?.ok()) {
        throw new Error(`${route} returned ${response?.status() ?? 'no response'}`);
      }
      await page.locator('#main-content').waitFor({ state: 'visible' });
      if (route === '/book-assessment') {
        await page.locator('#book-assessment-hero-h1:visible').first().waitFor({ state: 'visible' });
      } else if (route === '/academic/math/middle-school') {
        await page.locator('[data-testid="parent-orientation-video"]:visible').first().waitFor({ state: 'visible' });
      } else {
        await page.locator('[data-testid="commercial-value-proof"]:visible').first().waitFor({ state: 'visible' });
      }
      await page.waitForTimeout(300);
      const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await page.screenshot({
        path: path.join(outputDirectory, `post-${slug}-${viewportName}.png`),
        fullPage: true,
      });
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(`Captured ${routes.length * Object.keys(viewports).length} post-change screenshots.`);
