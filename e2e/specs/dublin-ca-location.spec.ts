import { test, expect } from '@playwright/test'
import { findGraphNode } from '../helpers/jsonLdAudit'
import { localePath } from '../localePath'

test.describe('/dublin-ca location hub', () => {
  test('renders H1, program links, FAQ, and assessment CTA', async ({ page }) => {
    await page.goto(localePath('/dublin-ca'))

    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toHaveText('K-12 Tutoring & Coding Classes in Dublin, CA')

    const programHrefs = [
      '/courses/math',
      '/courses/english',
      '/coding',
      '/courses/sat-prep',
      '/steam/game-development',
      '/camps/summer',
    ]
    for (const href of programHrefs) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible()
    }

    await expect(page.locator('#faq')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Where is GrowWise located in Dublin, CA?' })).toBeVisible()

    await expect(page.getByRole('button', { name: 'Do you serve San Ramon families?' })).toBeVisible()

    await expect(page.getByRole('heading', { name: /Book a Free In-Person Assessment at our Dublin center/i })).toBeVisible()
    await expect(page.locator('main a[href="/book-assessment"]').first()).toBeVisible()
  })

  test('includes LocalBusiness JSON-LD graph', async ({ page }) => {
    await page.goto(localePath('/dublin-ca'))
    const localBusiness = await findGraphNode<{
      name: string
      openingHours: string[]
    }>(page, 'LocalBusiness')
    expect(localBusiness?.name).toBe('GrowWise School — Dublin, CA')
    expect(localBusiness?.openingHours).toEqual(['Mo-Fr 09:00-19:00', 'Sa 10:00-16:00'])
  })
})
