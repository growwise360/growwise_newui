import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { CodingCertPathwayBanner } from '@/components/coding/CodingCertPathwayBanner';
import { CodingProgramDetailHero } from '@/components/coding/CodingProgramDetailHero';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/coding/ml-ai', locale) ?? {
    title: 'ML & AI Coding Classes for Kids | Dublin CA | GrowWise',
    description:
      'Machine learning and AI coding classes for Grades 7-12 in Dublin, CA. Build AI projects after Python foundations and book a trial class.',
  };
}

const stages = [
  {
    title: 'AI Foundations',
    body: 'Students connect Python concepts to datasets, model behavior, prompts, and responsible AI use.',
  },
  {
    title: 'Model Builder',
    body: 'Students experiment with classification, prediction, computer vision, and model evaluation.',
  },
  {
    title: 'AI Capstone',
    body: 'Students build a project they can explain: problem, data, model choices, limitations, and result.',
  },
];

export default function MlAiCodingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen page-bg-coding flex items-center justify-center text-[#1F396D]">Loading...</div>}>
      <main className="min-h-screen page-bg-coding">
        <CodingProgramDetailHero namespace="codingPage.mlAiDetail" pathwayHref="#ml-ai-pathway" />

        <section id="ml-ai-pathway" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
                ML / AI pathway
              </p>
              <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
                The right next step after Python foundations.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Students learn that AI is not magic or just prompting. They build, test, explain, and improve projects with a clear understanding of what the model is doing.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {stages.map((stage, index) => (
                <article key={stage.title} className="rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#1F396D] text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">{stage.title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{stage.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CodingCertPathwayBanner slug="ai-machine-learning" />
      </main>
    </Suspense>
  );
}
