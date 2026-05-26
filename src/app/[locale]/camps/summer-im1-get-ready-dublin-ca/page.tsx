import { ImTrackGetReadySeoLandingPage } from '@/components/camps/ImTrackGetReadySeoLandingPage';
import { getIm1GetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';

export default async function SummerIm1GetReadyDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ImTrackGetReadySeoLandingPage locale={locale} copy={getIm1GetReadySeoLandingCopy()} />;
}
