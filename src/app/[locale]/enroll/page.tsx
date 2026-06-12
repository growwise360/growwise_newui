import { Suspense } from 'react';
import { EnrollPageJsonLd } from '@/components/seo/EnrollPageJsonLd';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';
import EnrollPageClient from './EnrollPageClient';

export default function EnrollPage() {
  return (
    <>
      <EnrollPageJsonLd />
      <SeoPageFallback
        eyebrow="Enrollment"
        title="Enroll at GrowWise"
        description="Start a GrowWise enrollment for tutoring, academic programs, coding, camps, and readiness support in Dublin, CA. Families can review the next steps, share student details, and choose the right program path."
        links={[
          { href: '/en/programs', label: 'Explore programs' },
          { href: '/en/book-assessment', label: 'Book a free assessment' },
          { href: '/en/contact', label: 'Contact GrowWise' },
        ]}
        className="sr-only"
      />
      <Suspense
        fallback={
          <SeoPageFallback
            eyebrow="Enrollment"
            title="Enroll at GrowWise"
            description="Start a GrowWise enrollment for tutoring, academic programs, coding, camps, and readiness support in Dublin, CA. Families can review the next steps, share student details, and choose the right program path."
            links={[
              { href: '/en/programs', label: 'Explore programs' },
              { href: '/en/book-assessment', label: 'Book a free assessment' },
              { href: '/en/contact', label: 'Contact GrowWise' },
            ]}
          />
        }
      >
        <EnrollPageClient />
      </Suspense>
    </>
  );
}
