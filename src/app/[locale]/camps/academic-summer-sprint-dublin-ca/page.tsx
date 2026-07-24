import { redirect } from 'next/navigation';
import { createLocaleUrl } from '@/components/layout/Header/utils';

/** Legacy URL — all programs now live on the academic hub (summer camp-style enroll surface). */
export default async function AcademicSummerSprintRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(createLocaleUrl('/camps/academic-summer-programs-dublin-ca', locale));
}
