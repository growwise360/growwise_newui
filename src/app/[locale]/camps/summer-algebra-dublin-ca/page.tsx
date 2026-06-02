import { AcademicSeoLandingPage } from '@/components/camps/AcademicSeoLandingPage';

export default async function SummerAlgebraDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AcademicSeoLandingPage pageId="algebra" locale={locale} />;
}
