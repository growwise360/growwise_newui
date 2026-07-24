import { getValidLocale } from '@/i18n/localeConfig';
import { getHomeDataServer } from '@/lib/homeDataServer';
import HomeClient from '@/components/pages/HomeClient';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getValidLocale(rawLocale);
  const initialData = getHomeDataServer(locale);

  return <HomeClient initialData={initialData} />;
}
