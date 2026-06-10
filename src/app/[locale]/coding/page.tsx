import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { CodingOverviewHero } from '@/components/coding/CodingOverviewHero';
import { CodingPathCards } from '@/components/coding/CodingPathCards';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/coding', locale) ?? {
    title: 'Coding Classes for Kids | Dublin CA | GrowWise',
    description: 'Coding paths for Grades 5-12 in Dublin, CA: Python, AI, and app development. Start with the right program and book a trial class.',
  };
}

export default function CodingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen page-bg-coding flex items-center justify-center text-[#1F396D]">
          Loading…
        </div>
      }
    >
      <main className="min-h-screen page-bg-coding">
        <CodingOverviewHero />
        <CodingPathCards />
      </main>
    </Suspense>
  );
}
