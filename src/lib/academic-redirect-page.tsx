import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/i18n/localeConfig';
import { publicPath } from '@/lib/publicPath';

type AcademicRedirectPageProps = {
  params: Promise<{ locale: string }>;
  targetPath: string;
};

/** Server redirect for retired /courses/* URLs (next.config 301 is primary; this covers locale routing). */
export async function AcademicRedirectPage({ params, targetPath }: AcademicRedirectPageProps) {
  await params;
  redirect(publicPath(targetPath, DEFAULT_LOCALE));
}
