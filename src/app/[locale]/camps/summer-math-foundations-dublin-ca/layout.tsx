import {
  AcademicSeoLandingLayout,
  createAcademicSeoLandingGenerateMetadata,
} from '@/components/camps/AcademicSeoLandingLayout';

export const generateMetadata = createAcademicSeoLandingGenerateMetadata('mathFoundations');

export default async function SummerMathFoundationsDublinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <AcademicSeoLandingLayout pageId="mathFoundations" locale={locale}>
      {children}
    </AcademicSeoLandingLayout>
  );
}
