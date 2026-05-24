'use client';

import React, { startTransition, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchHomeStart, fetchHomeSuccess } from '@/store/slices/homeSlice';
import { HeroWrapper } from '../sections/home/HeroWrapper';
import { HomeHero } from '../sections/home/HomeHero';
import { HomeAcademicSection } from '../sections/home/HomeAcademicSection';
import { HomeCurriculumTicker } from '../sections/home/HomeCurriculumTicker';
import { HomeAssessmentOfferSection } from '../sections/home/HomeAssessmentOfferSection';
import { HomeSocialProofSection } from '../sections/home/HomeSocialProofSection';
import { HomeDiagnosticSection } from '../sections/home/HomeDiagnosticSection';
import { HomeSteamSection } from '../sections/home/HomeSteamSection';
import { HomeCampsStrip } from '../sections/home/HomeCampsStrip';
import { HomeFinalAssessmentCta } from '../sections/home/HomeFinalAssessmentCta';
import type { HomeContentData } from '@/store/slices/homeSlice';

interface HomeClientProps {
  initialData: HomeContentData | null;
}

function HomeHeroBlock() {
  return (
    <HeroWrapper>
      <HomeHero />
    </HeroWrapper>
  );
}

function HomeFunnelSections({ testimonials }: { testimonials: HomeContentData['testimonials'] }) {
  return (
    <>
      {/* OASC funnel (online-first): Outcome → Assess → Social proof → Convert expand (STEAM) → Diagnostic exit → Camps → Close */}
      <HomeAcademicSection />
      <HomeCurriculumTicker />
      <HomeAssessmentOfferSection />
      <HomeSocialProofSection fallbackTestimonials={testimonials ?? null} />
      <HomeSteamSection />
      <HomeDiagnosticSection />
      <HomeCampsStrip />
      <HomeFinalAssessmentCta />
    </>
  );
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const dispatch = useDispatch();
  const storeState = useSelector((s: RootState) => s.home);
  const { data: storeData, loading: storeLoading, error } = storeState;

  const data = initialData ?? storeData;
  const loading = !initialData && storeLoading;

  useEffect(() => {
    if (initialData) {
      startTransition(() => {
        dispatch(fetchHomeSuccess(initialData));
      });
    } else {
      dispatch(fetchHomeStart());
    }
  }, [dispatch, initialData]);

  if (error && !data) {
    return (
      <div
        className="home-page-root relative z-10 min-h-screen flex flex-col bg-white"
        style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
      >
        <HomeHeroBlock />
        <HomeFunnelSections testimonials={null} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12">
          <p className="text-center text-red-700 max-w-md">{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchHomeStart())}
            className="rounded-full bg-gw-navy px-6 py-2 text-white hover:bg-gw-navy/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div
        className="home-page-root relative z-10 min-h-screen bg-white"
        style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
      >
        <HomeHeroBlock />
        <HomeFunnelSections testimonials={null} />
      </div>
    );
  }

  return (
    <div
      className="home-page-root relative z-10 min-h-screen bg-white"
      style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
    >
      <HomeHeroBlock />
      <HomeFunnelSections testimonials={data.testimonials} />
    </div>
  );
}
