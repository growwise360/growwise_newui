import { ImGetReadySeoLandingPage } from '@/components/camps/ImGetReadySeoLandingPage';

export default async function SummerImGetReadyDublinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ImGetReadySeoLandingPage locale={locale} />;
}
