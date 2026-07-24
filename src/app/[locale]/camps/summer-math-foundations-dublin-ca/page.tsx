import { AcademicSeoLandingPage } from '@/components/camps/AcademicSeoLandingPage';

export default async function SummerMathFoundationsDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AcademicSeoLandingPage pageId="mathFoundations" locale={locale} />;
}
