import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Self-check complete | GrowWise',
    description: 'Your GrowWise self-check report has been prepared.',
    path: '/self-check/done',
    locale,
  });
}

export default function SelfCheckDoneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
