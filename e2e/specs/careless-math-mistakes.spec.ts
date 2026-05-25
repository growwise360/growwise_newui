import { test, expect } from '@playwright/test'
import { findGraphNode } from '../helpers/jsonLdAudit'
import { localePath } from '../localePath'

test.describe('/resources/careless-math-mistakes', () => {
  test('renders H1, CTAs, internal links, and FAQ', async ({ page }) => {
    await page.goto(localePath('/resources/careless-math-mistakes'))

    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toContainText('Careless Math Mistakes')

    await expect(page.getByText('6 min read · Updated May 2026')).toBeVisible()

    await expect(page.locator('main a[href="/self-check"]').first()).toBeVisible()
    await expect(page.locator('main a[href="/book-assessment"]').first()).toBeVisible()
    await expect(page.locator('main a[href="/courses/math"]').first()).toBeVisible()
    await expect(page.locator('main a[href="/courses/sat-prep"]').first()).toBeVisible()
    await expect(page.locator('main a[href="/resources/homework-independence"]').first()).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Are careless mistakes in math a sign of a learning problem?' }),
    ).toBeVisible()
  })

  test('includes FAQPage JSON-LD graph', async ({ page }) => {
    await page.goto(localePath('/resources/careless-math-mistakes'))
    const faqNode = await findGraphNode<{ mainEntity: unknown[] }>(page, 'FAQPage')
    expect(faqNode?.mainEntity).toHaveLength(5)
  })
})
