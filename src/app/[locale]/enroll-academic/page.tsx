import { EnrollAcademicPageJsonLd } from '@/components/seo/EnrollAcademicPageJsonLd';
import EnrollAcademicPageClient from './EnrollAcademicPageClient';

export default function EnrollAcademicPage() {
  return (
    <>
      <EnrollAcademicPageJsonLd />
      <EnrollAcademicPageClient />
    </>
  );
}
