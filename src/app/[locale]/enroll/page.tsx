import { Suspense } from 'react';
import { EnrollPageJsonLd } from '@/components/seo/EnrollPageJsonLd';
import EnrollPageClient from './EnrollPageClient';

export default function EnrollPage() {
  return (
    <>
      <EnrollPageJsonLd />
      <Suspense fallback={null}>
        <EnrollPageClient />
      </Suspense>
    </>
  );
}
