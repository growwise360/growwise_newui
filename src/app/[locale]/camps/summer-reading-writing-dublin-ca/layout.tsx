import {
  AcademicSeoLandingLayout,
  createAcademicSeoLandingGenerateMetadata,
} from '@/components/camps/AcademicSeoLandingLayout';

export const generateMetadata = createAcademicSeoLandingGenerateMetadata('readingWriting');

export default async function SummerReadingWritingDublinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <AcademicSeoLandingLayout pageId="readingWriting" locale={locale}>
      {children}
    </AcademicSeoLandingLayout>
  );
}
