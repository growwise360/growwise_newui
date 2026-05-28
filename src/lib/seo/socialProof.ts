/** Cross-platform review totals shown in UI badges and AggregateRating JSON-LD. */
export const AGGREGATE_RATING_VALUE = '4.9' as const

/** Minimum published review count (Google, Yelp, TripAdvisor, Trustpilot combined). */
export const AGGREGATE_REVIEW_COUNT = 40 as const

export const AGGREGATE_REVIEW_COUNT_LABEL = '40+' as const

export const REVIEW_PLATFORMS_LABEL = 'Google, Yelp, TripAdvisor & Trustpilot' as const

export function buildAggregateRatingJsonLd(options?: { worstRating?: string }) {
  return {
    '@type': 'AggregateRating' as const,
    ratingValue: AGGREGATE_RATING_VALUE,
    reviewCount: String(AGGREGATE_REVIEW_COUNT),
    bestRating: '5',
    ...(options?.worstRating !== undefined ? { worstRating: options.worstRating } : { worstRating: '1' }),
  }
}
