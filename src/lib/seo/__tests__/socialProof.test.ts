import * as socialProof from '@/lib/seo/socialProof';
import { AGGREGATE_RATING_VALUE, AGGREGATE_REVIEW_COUNT } from '@/lib/seo/socialProof';

describe('socialProof', () => {
  it('exposes UI badge values for 40+ cross-platform reviews', () => {
    expect(AGGREGATE_RATING_VALUE).toBe('4.9');
    expect(AGGREGATE_REVIEW_COUNT).toBe(40);
  });

  it('no longer exports a JSON-LD AggregateRating builder (self-serving rating policy)', () => {
    expect('buildAggregateRatingJsonLd' in socialProof).toBe(false);
  });
});
