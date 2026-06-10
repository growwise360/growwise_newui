import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { CodingJTBDSection } from '@/components/coding/CodingJTBDSection';
import { CodingProgramDetailHero } from '@/components/coding/CodingProgramDetailHero';
import { PythonPathwaySection } from '@/components/coding/PythonPathwaySection';
import { PythonWhySection } from '@/components/coding/PythonWhySection';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/coding/python', locale) ?? {
    title: 'Python Coding Classes for Kids | Dublin CA | GrowWise',
    description:
      'Python coding classes for Grades 5-12 in Dublin, CA. Build real projects and prepare for high school computer science, AI, and data science. Book a trial class.',
  };
}

export default function PythonCodingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen page-bg-coding flex items-center justify-center text-[#1F396D]">
          Loading…
        </div>
      }
    >
      <main className="min-h-screen page-bg-coding">
        <CodingProgramDetailHero namespace="codingPage.pythonDetail" pathwayHref="#python-pathway" />
        <PythonWhySection />
        <PythonPathwaySection />
        <CodingJTBDSection />
      </main>
    </Suspense>
  );
}
