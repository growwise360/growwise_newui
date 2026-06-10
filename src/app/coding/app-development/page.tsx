import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/i18n/localeConfig';

export const metadata: Metadata = {
  title: 'App Development Classes for Kids | GrowWise School',
  description: 'App development classes for students ready to build webpages, interactive apps, and portfolio projects.',
};

export default function AppDevelopmentCodingRedirectPage() {
  redirect(`/${DEFAULT_LOCALE}/coding/app-development`);
}
