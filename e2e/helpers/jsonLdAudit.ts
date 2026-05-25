import type { Page } from '@playwright/test'

export function countSchemaType(payload: unknown, schemaType: string): number {
  if (!payload || typeof payload !== 'object') return 0
  if (Array.isArray(payload)) {
    return payload.reduce((sum, item) => sum + countSchemaType(item, schemaType), 0)
  }
  const record = payload as Record<string, unknown>
  let count = record['@type'] === schemaType ? 1 : 0
  if (record['@graph']) count += countSchemaType(record['@graph'], schemaType)
  return count
}

export async function countFaqPageOnPage(page: Page): Promise<number> {
  const contents = await page.locator('script[type="application/ld+json"]').allTextContents()
  return contents.reduce((sum, raw) => {
    try {
      return sum + countSchemaType(JSON.parse(raw.trim()), 'FAQPage')
    } catch {
      return sum
    }
  }, 0)
}
