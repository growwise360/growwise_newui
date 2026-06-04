import {
  buildElementaryEnglishPricingTiers,
  formatElementaryEnglishFromMonthlyLabel,
  getElementaryEnglishMinMonthlyUsd,
} from '@/lib/english-pricing-display'
import type { PricingConfig } from '@/hooks/usePricingConfig'

const mockConfig = {
  programs: [
    {
      id: 'elementary-english',
      track: 'academic' as const,
      name: 'Elementary English',
      tagline: '',
      age_min: 6,
      age_max: 11,
      studio_only: false,
      active: true,
      sort_order: 1,
      journey_levels: [],
      tiers: [
        {
          id: 'elem-eng-core',
          program_id: 'elementary-english',
          name: 'core',
          price_live: 289,
          price_studio: 289,
          is_featured: true,
          includes: [],
          sort_order: 1,
        },
      ],
      program_fees: [],
      program_addons: [],
    },
  ],
  last_updated: '2026-01-01',
} satisfies PricingConfig

describe('english-pricing-display', () => {
  it('reads minimum monthly from elementary-english program', () => {
    expect(getElementaryEnglishMinMonthlyUsd(mockConfig)).toBe(289)
    expect(formatElementaryEnglishFromMonthlyLabel(mockConfig)).toBe('From $289/month')
    expect(buildElementaryEnglishPricingTiers(mockConfig)[0]?.price).toBe('$289/mo')
  })
})
