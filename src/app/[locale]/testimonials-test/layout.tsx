import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildNoIndexMetadata({
    title: 'Testimonials integration test | GrowWise',
    description: 'Internal GrowWise testimonials integration test.',
    path: '/testimonials-test',
    locale,
  });
}

export default function TestimonialsTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
