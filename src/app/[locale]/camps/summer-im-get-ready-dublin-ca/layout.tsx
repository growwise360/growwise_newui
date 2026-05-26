import {
  AcademicSeoLandingLayout,
  createAcademicSeoLandingGenerateMetadata,
} from '@/components/camps/AcademicSeoLandingLayout';

export const generateMetadata = createAcademicSeoLandingGenerateMetadata('imGetReady');

export default async function SummerImGetReadyDublinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <AcademicSeoLandingLayout pageId="imGetReady" locale={locale}>
      {children}
    </AcademicSeoLandingLayout>
  );
}
