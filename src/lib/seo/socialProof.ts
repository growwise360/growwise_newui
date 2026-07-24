/**
 * Cross-platform review totals shown in visible UI badges.
 *
 * JSON-LD note (SEO audit 2026-07-08): these values must NOT be emitted as
 * AggregateRating markup on GrowWise's own Organization/LocalBusiness schema —
 * self-serving ratings are ineligible for rich results and a review-snippet
 * spam-policy risk. Ratings belong on third-party profiles (Google Business
 * Profile, Yelp), referenced via `sameAs`.
 */
export const AGGREGATE_RATING_VALUE = '4.9' as const

/** Minimum published review count (Google, Yelp, TripAdvisor, Trustpilot combined). */
export const AGGREGATE_REVIEW_COUNT = 40 as const

export const AGGREGATE_REVIEW_COUNT_LABEL = '40+' as const

export const REVIEW_PLATFORMS_LABEL = 'Google, Yelp, TripAdvisor & Trustpilot' as const
