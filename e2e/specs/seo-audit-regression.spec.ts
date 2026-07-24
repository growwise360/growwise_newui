import { expect, test } from '@playwright/test';

test.describe('SEO audit regressions @nightly', () => {
  test('missing dotted files are hard 404s while real assets remain available', async ({ request }) => {
    for (const path of ['/logo.png', '/missing.css', '/missing.js', '/not-real-image.png']) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }

    const logo = await request.get('/assets/growwise-logo.png');
    expect(logo.status()).toBe(200);
    expect(logo.headers()['content-type']).toContain('image/png');
  });

  test('legacy utility routes use permanent HTTP redirects', async ({ request }) => {
    const cases = [
      ['/camps/academic-summer-sprint-dublin-ca', '/camps/academic-summer-programs-dublin-ca'],
      ['/detective', '/self-check'],
      ['/results', '/self-check'],
    ] as const;

    for (const [path, destination] of cases) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(308);
      expect(new URL(response.headers().location, 'http://localhost').pathname).toBe(destination);
    }
  });

  test('blog pagination rejects invalid pages and self-canonicalizes valid pages', async ({ page }) => {
    for (const query of ['999', '-1', 'abc']) {
      const response = await page.request.get(`/growwise-blogs?page=${query}`);
      expect(response.status(), query).toBe(404);
    }

    await page.goto('/growwise-blogs?page=2');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://growwiseschool.org/growwise-blogs?page=2',
    );
  });

  test('utility, completion, and expired winter pages are noindex', async ({ page }) => {
    for (const path of [
      '/checkout',
      '/checkout/success',
      '/self-check/done',
      '/testimonials-test',
      '/camps/summer/guide-success',
      '/camps/winter',
      '/camps/winter/calendar',
    ]) {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute(
        'content',
        /noindex/i,
      );
    }
  });

  test('sitemaps omit expired winter URLs and fabricated request-time lastmod values', async ({ request }) => {
    const pages = await (await request.get('/sitemap-pages.xml')).text();
    const blogs = await (await request.get('/sitemap-blogs.xml')).text();

    expect(pages).not.toContain('/camps/winter');
    expect(pages).not.toContain('<lastmod>');
    expect(blogs).not.toContain('<lastmod>');
  });

  test('homepage renders without loading-shell or hydration errors', async ({ page, request }) => {
    const initialHtml = await (await request.get('/')).text();
    expect(initialHtml).toContain('<h1');
    expect(initialHtml).not.toContain('aria-label="Loading page"');

    const errors: string[] = [];
    const pendingConsoleErrors: Promise<void>[] = [];
    await page.addInitScript(() => {
      const mutations: string[] = [];
      Object.defineProperty(window, '__seoHydrationMutations', {
        value: mutations,
        configurable: true,
      });
      new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.removedNodes) {
            if (
              node instanceof HTMLElement &&
              record.target.nodeName !== 'HEAD' &&
              mutations.length < 20
            ) {
              mutations.push(
                `${record.target.nodeName}: ${node.outerHTML.slice(0, 500)}`,
              );
            }
          }
        }
      }).observe(document, { childList: true, subtree: true });
    });
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      pendingConsoleErrors.push(
        Promise.all(
          message.args().map((arg) =>
            arg.evaluate((value) =>
              value instanceof Error ? value.stack || value.message : String(value),
            ),
          ),
        ).then((values) => {
          errors.push(values.join('\n'));
        }),
      );
    });
    page.on('pageerror', (error) => errors.push(error.stack || error.message));

    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByLabel('Loading page')).toHaveCount(0);
    await page.waitForTimeout(1_000);
    await Promise.all(pendingConsoleErrors);

    const hydrationErrors = errors.filter((message) => /hydration|react error #418/i.test(message));
    const hydrationMutations = await page.evaluate(
      () => (window as Window & { __seoHydrationMutations?: string[] }).__seoHydrationMutations ?? [],
    );
    expect(
      hydrationErrors,
      `Hydration DOM removals:\n${hydrationMutations.join('\n\n')}`,
    ).toEqual([]);
  });

  test('site-wide organization schema uses the real logo and canonical office hours', async ({ page }) => {
    await page.goto('/');
    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
      nodes.map((node) => JSON.parse(node.textContent || '{}')),
    );
    const organization = schemas
      .flatMap((schema) => (Array.isArray(schema['@graph']) ? schema['@graph'] : [schema]))
      .find((schema) => {
        const type = schema['@type'];
        return Array.isArray(type)
          ? type.includes('EducationalOrganization')
          : type === 'EducationalOrganization';
      });

    expect(organization).toBeTruthy();
    expect(organization.logo).toBe('https://growwiseschool.org/assets/growwise-logo.png');
    expect(organization.openingHours).toEqual(['Mo-Fr 09:00-19:00', 'Sa 10:00-16:00']);
  });

  test('representative academic page hydrates without React mismatch errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto('/academic/math');
    await page.waitForTimeout(1_000);

    expect(errors.filter((message) => /hydration|react error #418/i.test(message))).toEqual([]);
  });
});
