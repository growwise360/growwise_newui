import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { FutureSkillsHubPage } from '@/components/future-skills/FutureSkillsHubPage';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/future-skills', locale) ?? {
    title: 'Future Skills Certification Pathways | GrowWise',
    description:
      'Premium 90-minute certification pathways for Grades 6-12: creative media, Python, AI and machine learning, and AI entrepreneurship.',
  };
}

export default function FutureSkillsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-[#1F396D]">Loading...</div>}>
      <FutureSkillsHubPage />
    </Suspense>
  );
}
