import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Checkout | GrowWise',
    description: 'Complete your secure GrowWise checkout.',
    path: '/checkout',
    locale,
  });
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
