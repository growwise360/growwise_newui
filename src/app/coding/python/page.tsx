import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/i18n/localeConfig';

export const metadata: Metadata = {
  title: 'Python Coding Classes for Kids | GrowWise School',
  description:
    'Python-first coding programs for Grades 5-12. Build real projects and prepare for high school computer science, AI, and data science.',
};

export default function PythonCodingRedirectPage() {
  redirect(`/${DEFAULT_LOCALE}/coding/python`);
}
