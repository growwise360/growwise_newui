import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

/** Client page uses useSearchParams — force dynamic to avoid prerender/runtime 500s. */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Summer camp request received | GrowWise',
    description: 'Thank you for your GrowWise summer camp request.',
    path: '/camps/summer/summercamp-success',
    locale,
  });
}

export default function SummercampSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
