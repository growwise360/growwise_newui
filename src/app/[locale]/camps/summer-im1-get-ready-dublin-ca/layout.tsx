import {
  AcademicSeoLandingLayout,
  createAcademicSeoLandingGenerateMetadata,
} from '@/components/camps/AcademicSeoLandingLayout';

export const generateMetadata = createAcademicSeoLandingGenerateMetadata('im1GetReady');

export default async function SummerIm1GetReadyDublinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <AcademicSeoLandingLayout pageId="im1GetReady" locale={locale}>
      {children}
    </AcademicSeoLandingLayout>
  );
}
