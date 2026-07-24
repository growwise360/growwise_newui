import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Camp guide sent | GrowWise Summer Camp',
    description: 'Thank you — your camp guide PDF is on the way by email.',
    path: '/camps/summer/guide-success',
    locale,
  });
}

export default function GuideSuccessLayout({ children }: { children: ReactNode }) {
  return children;
}
