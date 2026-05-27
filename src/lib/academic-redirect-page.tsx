import { redirect } from 'next/navigation';
import { publicPath } from '@/lib/publicPath';

type AcademicRedirectPageProps = {
  params: Promise<{ locale: string }>;
  targetPath: string;
};

/** Server redirect for retired /courses/* URLs (next.config 301 is primary; this covers locale routing). */
export async function AcademicRedirectPage({ params, targetPath }: AcademicRedirectPageProps) {
  const { locale } = await params;
  redirect(publicPath(targetPath, locale));
}
