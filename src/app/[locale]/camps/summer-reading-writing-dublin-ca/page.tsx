import { AcademicSeoLandingPage } from '@/components/camps/AcademicSeoLandingPage';

export default async function SummerReadingWritingDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AcademicSeoLandingPage pageId="readingWriting" locale={locale} />;
}
