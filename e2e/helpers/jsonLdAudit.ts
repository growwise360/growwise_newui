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

/** Parse all JSON-LD script blocks (site-wide + page @graph). */
export async function parseAllJsonLdOnPage(page: Page): Promise<unknown[]> {
  const contents = await page.locator('script[type="application/ld+json"]').allTextContents()
  return contents
    .map((raw) => {
      try {
        return JSON.parse(raw.trim())
      } catch {
        return null
      }
    })
    .filter((p): p is unknown => p !== null)
}

/** Find first node of schemaType in any @graph block on the page. */
export async function findGraphNode<T extends Record<string, unknown>>(
  page: Page,
  schemaType: string,
): Promise<T | undefined> {
  for (const payload of await parseAllJsonLdOnPage(page)) {
    if (!payload || typeof payload !== 'object') continue
    const graph = (payload as Record<string, unknown>)['@graph']
    if (!Array.isArray(graph)) continue
    const node = graph.find((n) => n && typeof n === 'object' && (n as Record<string, unknown>)['@type'] === schemaType)
    if (node) return node as T
  }
  return undefined
}
