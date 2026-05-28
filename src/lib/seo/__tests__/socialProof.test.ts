import { buildAggregateRatingJsonLd, AGGREGATE_REVIEW_COUNT } from '@/lib/seo/socialProof';

describe('socialProof', () => {
  it('buildAggregateRatingJsonLd reflects 40+ cross-platform reviews', () => {
    expect(AGGREGATE_REVIEW_COUNT).toBe(40);
    expect(buildAggregateRatingJsonLd()).toMatchObject({
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '40',
      bestRating: '5',
      worstRating: '1',
    });
  });
});
