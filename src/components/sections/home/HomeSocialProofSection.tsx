'use client';

import { HOME_GOOGLE_REVIEWS } from '@/lib/homeGoogleReviews';
import { TestimonialsSection } from './TestimonialsSection';

export function HomeSocialProofSection() {
  return (
    <TestimonialsSection
      fallbackTestimonials={HOME_GOOGLE_REVIEWS}
      preferCuratedFallback
    />
  );
}
