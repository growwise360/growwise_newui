import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { FutureSkillsDetailPage } from '@/components/future-skills/FutureSkillsDetailPage';
import { futureSkillsPathways, getFutureSkillsPathway, type FutureSkillsSlug } from '@/lib/futureSkillsPathways';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return futureSkillsPathways.map((pathway) => ({ slug: pathway.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pathway = getFutureSkillsPathway(slug);

  if (!pathway) {
    return {
      title: 'Future Skills Pathway | GrowWise',
      description: 'GrowWise Future Skills pathway for students.',
    };
  }

  return generateMetadataFromPath(`/future-skills/${slug}`, locale) ?? {
    title: `${pathway.shortTitle} | GrowWise Future Skills`,
    description: pathway.summary,
  };
}

export default async function FutureSkillsDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pathway = getFutureSkillsPathway(slug);

  if (!pathway) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-[#1F396D]">Loading...</div>}>
      <FutureSkillsDetailPage slug={pathway.slug as FutureSkillsSlug} />
    </Suspense>
  );
}
