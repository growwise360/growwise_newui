import { Suspense } from 'react';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';
import BookAssessmentPageClient from './BookAssessmentPageClient';

export default function BookAssessmentPage() {
  return (
    <>
      <Suspense
        fallback={
          <SeoPageFallback
            eyebrow="Free assessment"
            title="Book a Free Math and English Assessment at GrowWise"
            description="Schedule a free GrowWise assessment for math, English, or academic readiness in Dublin, CA. Families get a clear next step before choosing tutoring or enrichment."
            links={[
              { href: '/academic', label: 'Explore academics' },
              { href: '/contact', label: 'Contact GrowWise' },
            ]}
          />
        }
      >
        <BookAssessmentPageClient />
      </Suspense>
    </>
  );
}
