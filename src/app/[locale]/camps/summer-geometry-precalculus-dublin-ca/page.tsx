import { AcademicSeoLandingPage } from '@/components/camps/AcademicSeoLandingPage';

export default async function SummerGeometryPrecalculusDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AcademicSeoLandingPage pageId="geometry" locale={locale} />;
}
