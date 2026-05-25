import { test, expect } from '@playwright/test'
import { getCampSlugs } from '../../src/lib/camps/get-camp-page'
import { countFaqPageOnPage } from '../helpers/jsonLdAudit'
import { localePath } from '../localePath'

const FAQ_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/academic',
  '/steam',
  '/programs',
  '/courses/math',
  '/courses/english',
  '/dublin-ca',
  '/resources/careless-math-mistakes',
  '/camps/summer',
  `/camps/${getCampSlugs()[0]}`,
] as const

const CRITICAL_FAQ_ROUTES = ['/', '/courses/math'] as const

for (const path of FAQ_ROUTES) {
  const tags = CRITICAL_FAQ_ROUTES.includes(path as (typeof CRITICAL_FAQ_ROUTES)[number])
    ? ['@critical']
    : ['@nightly']

  test.describe(`FAQPage JSON-LD — ${path}`, { tag: tags }, () => {
    test(`emits exactly one FAQPage on ${path}`, async ({ page }) => {
      await page.goto(localePath(path))
      const faqCount = await countFaqPageOnPage(page)
      expect(faqCount, `Expected 1 FAQPage on ${path}, found ${faqCount}`).toBe(1)
    })
  })
}
