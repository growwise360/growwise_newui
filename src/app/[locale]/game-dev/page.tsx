import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { EnrollProvider } from '@/contexts/EnrollContext';
import { GameDevHero } from '@/components/game-dev/GameDevHero';
import { GameDevPrograms } from '@/components/game-dev/GameDevPrograms';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromPath('/game-dev', locale) ?? {
    title: 'Game Dev for Kids | Dublin CA | GrowWise',
    description: 'Game dev for ages 6–16 in Dublin, CA. Scratch, Roblox, and project builds. Hands-on classes with expert coaches. Book a free trial.',
  };
}

export default function GameDevPage() {
  return (
    <Suspense
      fallback={
        <SeoPageFallback
          eyebrow="Game development"
          title="Game Development for Kids in Dublin, CA"
          description="GrowWise game development classes help kids move from playing games to building them through Scratch, Roblox, Minecraft, and project-based coding. This page remains live for families looking for creative coding and game design programs."
          links={[
            { href: '/future-skills', label: 'Future Skills pathways' },
            { href: '/coding/python', label: 'Python coding' },
            { href: '/book-assessment', label: 'Book a free assessment' },
          ]}
          className="page-bg-gamedev"
        />
      }
    >
      <EnrollProvider>
        <main className="min-h-screen page-bg-gamedev">
          <GameDevHero />
          <GameDevPrograms />
        </main>
      </EnrollProvider>
    </Suspense>
  );
}
