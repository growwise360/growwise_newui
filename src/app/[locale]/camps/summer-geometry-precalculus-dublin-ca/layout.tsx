import {
  AcademicSeoLandingLayout,
  createAcademicSeoLandingGenerateMetadata,
} from '@/components/camps/AcademicSeoLandingLayout';

export const generateMetadata = createAcademicSeoLandingGenerateMetadata('geometry');

export default async function SummerGeometryPrecalculusDublinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <AcademicSeoLandingLayout pageId="geometry" locale={locale}>
      {children}
    </AcademicSeoLandingLayout>
  );
}
