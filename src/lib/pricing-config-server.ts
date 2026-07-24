import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { PricingConfig } from '@/hooks/usePricingConfig'

export async function fetchPricingConfigServer(): Promise<PricingConfig | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'api', 'mock', 'en', 'pricing-config.json')
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw) as PricingConfig
  } catch {
    return null
  }
}
