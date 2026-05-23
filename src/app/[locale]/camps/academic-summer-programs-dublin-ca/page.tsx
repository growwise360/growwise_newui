import { Suspense } from 'react';
import { AcademicSummerProgramsPage } from '@/components/camps/AcademicSummerProgramsPage';

export default function AcademicSummerProgramsRoutePage() {
  return (
    <Suspense fallback={null}>
      <AcademicSummerProgramsPage />
    </Suspense>
  );
}
