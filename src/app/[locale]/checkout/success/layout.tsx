import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Payment confirmation | GrowWise',
    description: 'GrowWise payment confirmation and receipt details.',
    path: '/checkout/success',
    locale,
  });
}

export default function CheckoutSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
