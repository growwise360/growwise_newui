import { test, expect } from '@playwright/test'
import { LEGACY_PATH_REDIRECTS } from '../../src/lib/seo/legacy-path-redirects'
import { localePath } from '../localePath'

test.describe('Legacy path redirects', { tag: '@nightly' }, () => {
  for (const { from, to } of LEGACY_PATH_REDIRECTS) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(localePath(from))
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, '\\/')}$`))
    })

    test(`${from}/ (trailing slash) redirects to ${to}`, async ({ page }) => {
      await page.goto(localePath(`${from}/`))
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, '\\/')}$`))
    })
  }
})
