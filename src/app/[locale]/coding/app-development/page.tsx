import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { CodingProgramDetailHero } from '@/components/coding/CodingProgramDetailHero';
import { generateMetadataFromPath } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/coding/app-development', locale) ?? {
    title: 'App Development Classes for Kids | Dublin CA | GrowWise',
    description:
      'App development classes for middle and high school students in Dublin, CA. Learn web and app fundamentals, build interactive projects, and book a trial class.',
  };
}

const stages = [
  {
    title: 'Explorer',
    body: 'HTML, CSS, JavaScript basics, and the first webpage.',
  },
  {
    title: 'Builder',
    body: 'React basics, UI design, and interactive front-end apps.',
  },
  {
    title: 'Developer',
    body: 'Full-stack concepts, backend fundamentals, and deployment.',
  },
] as const;

export default function AppDevelopmentCodingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen page-bg-coding flex items-center justify-center text-[#1F396D]">
          Loading…
        </div>
      }
    >
      <main className="min-h-screen page-bg-coding">
        <CodingProgramDetailHero namespace="codingPage.appDevDetail" pathwayHref="#app-pathway" />
        <section id="app-pathway" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
                App development pathway
              </p>
              <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
                From webpage basics to interactive applications.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                This path is for students who want to build visible, shareable products while learning modern web and app development fundamentals.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {stages.map((stage, index) => (
                <article
                  key={stage.title}
                  className="rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm shadow-[#1F396D]/5"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-[#F16112]">
                    Stage {index + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-gray-950">{stage.title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{stage.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
