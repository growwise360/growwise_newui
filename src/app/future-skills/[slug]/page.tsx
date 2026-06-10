import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/i18n/localeConfig';

export default async function FutureSkillsDetailRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/${DEFAULT_LOCALE}/future-skills/${slug}`);
}
