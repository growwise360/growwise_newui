import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/i18n/localeConfig';

export const metadata: Metadata = {
  title: 'Coding Classes for Kids | GrowWise School',
  description: 'Coding paths for Grades 5-12: Python, AI, and app development. Start with the right program and book a trial class.',
};

export default function CodingPage() {
  redirect(`/${DEFAULT_LOCALE}/coding`);
}
