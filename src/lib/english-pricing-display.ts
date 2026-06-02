import { ELEMENTARY_ENGLISH_PROGRAM_ID } from '@/lib/elementary-english-copy'
import type { PricingConfig } from '@/hooks/usePricingConfig'

export const ENGLISH_TRIAL_SESSION_FEE_USD = 45 as const

export function getElementaryEnglishProgram(config: PricingConfig | null) {
  return config?.programs?.find((p) => p.id === ELEMENTARY_ENGLISH_PROGRAM_ID) ?? null
}

export function getElementaryEnglishMinMonthlyUsd(config: PricingConfig | null): number | null {
  const program = getElementaryEnglishProgram(config)
  if (!program?.tiers?.length) return null
  const prices = program.tiers
    .map((t) => t.price_live ?? t.price_studio)
    .filter((p): p is number => typeof p === 'number' && p > 0)
  return prices.length ? Math.min(...prices) : null
}

export function formatElementaryEnglishFromMonthly(config: PricingConfig | null): string {
  const amount = getElementaryEnglishMinMonthlyUsd(config)
  if (amount == null) return 'Programs start from pricing shown at enrollment'
  return `Programs start from $${amount}/month`
}

export function formatElementaryEnglishFromMonthlyLabel(config: PricingConfig | null): string {
  const amount = getElementaryEnglishMinMonthlyUsd(config)
  if (amount == null) return 'Contact us for current pricing'
  return `From $${amount}/month`
}

export function getElementaryEnglishSchemaOfferPrice(config: PricingConfig | null): string {
  const amount = getElementaryEnglishMinMonthlyUsd(config)
  return amount != null ? String(amount) : '289'
}

export function buildElementaryEnglishPricingTiers(config: PricingConfig | null) {
  const program = getElementaryEnglishProgram(config)
  if (!program?.tiers?.length) {
    return [{ name: 'Elementary English', schedule: '2 × 60 min/week', price: '$289/mo', featured: true }]
  }
  return program.tiers.map((tier) => ({
    name: tier.name.charAt(0).toUpperCase() + tier.name.slice(1),
    schedule: '2 × 60 min/week · 24 sessions per block',
    price: `$${tier.price_live ?? tier.price_studio}/mo`,
    featured: tier.is_featured,
  }))
}
