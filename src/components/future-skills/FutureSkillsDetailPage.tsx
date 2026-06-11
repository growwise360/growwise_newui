'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';

import BookTrialModal from '@/components/ui/BookTrialModal';
import { FutureSkillsAdvisorCta } from '@/components/future-skills/detail/FutureSkillsAdvisorCta';
import { FutureSkillsClosingCta } from '@/components/future-skills/detail/FutureSkillsClosingCta';
import { FutureSkillsCourseFormat } from '@/components/future-skills/detail/FutureSkillsCourseFormat';
import { FutureSkillsCredentialSection } from '@/components/future-skills/detail/FutureSkillsCredentialSection';
import { FutureSkillsDiscoveryLink } from '@/components/future-skills/detail/FutureSkillsDiscoveryLink';
import { FutureSkillsDetailHero } from '@/components/future-skills/detail/FutureSkillsDetailHero';
import { FutureSkillsDetailSidebar } from '@/components/future-skills/detail/FutureSkillsDetailSidebar';
import { FutureSkillsFaqSection } from '@/components/future-skills/detail/FutureSkillsFaqSection';
import { FutureSkillsLearningOutcomes } from '@/components/future-skills/detail/FutureSkillsLearningOutcomes';
import { FutureSkillsLevelsSection } from '@/components/future-skills/detail/FutureSkillsLevelsSection';
import { FutureSkillsProgramStory } from '@/components/future-skills/detail/FutureSkillsProgramStory';
import { FutureSkillsRelatedPathways } from '@/components/future-skills/detail/FutureSkillsRelatedPathways';
import { FutureSkillsSampleSchedule } from '@/components/future-skills/detail/FutureSkillsSampleSchedule';
import { FutureSkillsStickyCta } from '@/components/future-skills/detail/FutureSkillsStickyCta';
import { FutureSkillsTrustSection } from '@/components/future-skills/detail/FutureSkillsTrustSection';
import { publicPath } from '@/lib/publicPath';
import { getFutureSkillsPathway, type FutureSkillsSlug } from '@/lib/futureSkillsPathways';

interface FutureSkillsDetailPageProps {
  slug: FutureSkillsSlug;
}

export function FutureSkillsDetailPage({ slug }: FutureSkillsDetailPageProps) {
  const locale = useLocale();
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const pathway = getFutureSkillsPathway(slug);
  const assessmentHref = publicPath(`/book-assessment?interest=future-skills-${slug}`, locale);

  if (!pathway) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <FutureSkillsDetailHero pathway={pathway} assessmentHref={assessmentHref} locale={locale} />

      <FutureSkillsDiscoveryLink pathway={pathway} />

      <div className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-[1fr_280px] lg:gap-10 lg:px-4">
        <div className="min-w-0">
          <FutureSkillsProgramStory pathway={pathway} />
          <FutureSkillsLearningOutcomes pathway={pathway} />
          <FutureSkillsCourseFormat pathway={pathway} />
          <FutureSkillsSampleSchedule pathway={pathway} />
          <FutureSkillsLevelsSection pathway={pathway} />
          <FutureSkillsCredentialSection pathway={pathway} />
          <FutureSkillsAdvisorCta
            pathway={pathway}
            assessmentHref={assessmentHref}
            onTrialClick={() => setIsTrialOpen(true)}
          />
          <FutureSkillsTrustSection pathway={pathway} />
          <FutureSkillsFaqSection pathway={pathway} />
          <FutureSkillsRelatedPathways pathway={pathway} />
        </div>

        <FutureSkillsDetailSidebar
          pathway={pathway}
          assessmentHref={assessmentHref}
          onTrialClick={() => setIsTrialOpen(true)}
        />
      </div>

      <FutureSkillsClosingCta pathway={pathway} assessmentHref={assessmentHref} />

      <FutureSkillsStickyCta assessmentHref={assessmentHref} />

      <BookTrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
        source="book-trial-modal-future-skills"
        programContext={`Future Skills: ${pathway.shortTitle}`}
      />
    </main>
  );
}
