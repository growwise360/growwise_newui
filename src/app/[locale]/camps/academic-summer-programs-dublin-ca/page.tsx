import { Suspense } from 'react';
import { AcademicSummerProgramsPage } from '@/components/camps/AcademicSummerProgramsPage';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';

export default function AcademicSummerProgramsRoutePage() {
  return (
    <Suspense
      fallback={
        <SeoPageFallback
          eyebrow="Summer academic programs"
          title="Academic Summer Programs in Dublin, CA"
          description="GrowWise academic summer programs help Grades 3–12 students strengthen math, reading, writing, and study skills before the next school year. Families can compare small-group tracks, readiness goals, and summer schedules for Dublin and Tri-Valley students."
          links={[
            { href: '/camps/summer', label: 'Summer camps' },
            { href: '/resources/summer-academic-program-checklist', label: 'Summer checklist' },
            { href: '/book-assessment', label: 'Book a free assessment' },
          ]}
        />
      }
    >
      <AcademicSummerProgramsPage />
    </Suspense>
  );
}
