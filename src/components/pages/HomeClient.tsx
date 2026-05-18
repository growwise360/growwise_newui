'use client';

import React, {
  startTransition,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations, useLocale } from 'next-intl';
import { RootState } from '@/store';
import { fetchHomeStart, fetchHomeSuccess } from '@/store/slices/homeSlice';
import { getIconComponent } from '@/lib/iconMap';
import { useChatbot } from '@/contexts/ChatbotContext';
import { HeroSection } from '../sections/home/HeroSection';
import { useRouter } from 'next/navigation';
import { publicPath } from '@/lib/publicPath';
import {
  HeroSkeleton,
  StatisticsSkeleton,
  PopularCoursesSkeleton,
  ProgramsSkeleton,
  WhyChooseSkeleton,
  TestimonialsSkeleton,
} from '../ui/loading-skeletons';
import type { HomeContentData } from '@/store/slices/homeSlice';

// SSR enabled (default): below-the-fold HTML ships in first response — better mobile parse/paint than client-only chunks.
const PopularCoursesSection = dynamic(
  () =>
    import('../sections/home/PopularCoursesSection').then((m) => ({
      default: m.PopularCoursesSection,
    })),
  { loading: () => <PopularCoursesSkeleton /> }
);

const StatisticsSection = dynamic(
  () => import('../sections/home/StatisticsSection').then((m) => ({ default: m.StatisticsSection })),
  { loading: () => <StatisticsSkeleton /> }
);

const ProgramsSection = dynamic(
  () => import('../sections/home/ProgramsSection').then((m) => ({ default: m.ProgramsSection })),
  { loading: () => <ProgramsSkeleton /> }
);

const WhyChooseSection = dynamic(
  () => import('../sections/home/WhyChooseSection').then((m) => ({ default: m.WhyChooseSection })),
  { loading: () => <WhyChooseSkeleton /> }
);

const TestimonialsSection = dynamic(
  () => import('../sections/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <TestimonialsSkeleton /> }
);

const CtaSection = dynamic(() =>
  import('../sections/home/CtaSection').then((m) => ({ default: m.CtaSection })),
);

const FreeAssessmentModal = dynamic(
  () => import('../FreeAssessmentModal'),
  { ssr: false }
);

const STEAMTrialModal = dynamic(
  () => import('../ui/STEAMTrialModal'),
  { ssr: false }
);

interface HomeClientProps {
  initialData: HomeContentData | null;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const storeState = useSelector((s: RootState) => s.home);
  const { data: storeData, loading: storeLoading, error } = storeState;

  // Use server data for first paint (LCP) when available; otherwise use store
  const data = initialData ?? storeData;
  const loading = !initialData && storeLoading;

  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isSTEAMTrialModalOpen, setIsSTEAMTrialModalOpen] = useState(false);
  const openAssessmentModal = useCallback(() => setIsAssessmentModalOpen(true), []);
  const closeAssessmentModal = useCallback(() => setIsAssessmentModalOpen(false), []);
  const openSTEAMTrialModal = useCallback(() => setIsSTEAMTrialModalOpen(true), []);
  const closeSTEAMTrialModal = useCallback(() => setIsSTEAMTrialModalOpen(false), []);
  const navigateToEnrollForm = useCallback(
    () => router.push(publicPath('/enroll-academic', locale) + '#enrollment-form'),
    [router, locale],
  );
  const { openChatbot } = useChatbot();

  const heroSlides = useMemo(
    () =>
      (data?.heroSlides || []).map((s) => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        cta: s.cta,
        secondaryCta: s.secondaryCta,
        secondaryCtaUrl: s.secondaryCtaUrl,
        IconComponent: getIconComponent(s.icon),
        bgGradient: s.bgGradient,
        iconColor: s.iconColor,
        ctaColor: s.ctaColor,
        bgImage: s.bgImage,
        onClick:
          s.id === 1
            ? openAssessmentModal
            : s.id === 2
              ? openSTEAMTrialModal
              : s.id === 3
                ? navigateToEnrollForm
                : openAssessmentModal,
      })),
    [data, openAssessmentModal, openSTEAMTrialModal, navigateToEnrollForm]
  );

  const popularCourses = useMemo(
    () =>
      (data?.popularCourses || []).map((c) => {
        const raw = typeof c.href === 'string' ? c.href.trim() : '';
        // ELA / English card is id 4 in mocks; some API payloads omit `href` — keep navigation working.
        const href =
          raw ||
          (c.id === 4 ? '/courses/english' : undefined);
        return {
          ...c,
          href,
          IconComponent: getIconComponent(c.icon),
        };
      }),
    [data]
  );

  const statisticsData = useMemo(
    () =>
      (data?.statisticsData || []).map((s) => ({
        id: s.id,
        value: s.value,
        label: s.label,
        IconComponent: getIconComponent(s.icon),
        color: s.color,
        bgColor: s.bgColor,
      })),
    [data]
  );

  const k12Programs = useMemo(
    () =>
      (data?.k12Programs || []).map((p) => ({
        ...p,
        IconComponent: getIconComponent(p.icon),
      })),
    [data]
  );

  const steamPrograms = useMemo(
    () =>
      (data?.steamPrograms || []).map((p) => ({
        ...p,
        IconComponent: getIconComponent(p.icon),
      })),
    [data]
  );

  const whyChooseUs = useMemo(
    () =>
      (data?.whyChooseUs || []).map((w) => ({
        ...w,
        IconComponent: getIconComponent(w.icon),
      })),
    [data]
  );

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  /** Delay auto-advance so LCP/hydration are not competing with timer-driven hero re-renders. */
  const [heroCarouselReady, setHeroCarouselReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (initialData) {
      startTransition(() => {
        dispatch(fetchHomeSuccess(initialData));
      });
    } else {
      dispatch(fetchHomeStart());
    }
  }, [dispatch, initialData]);

  useEffect(() => {
    const id = window.setTimeout(() => setHeroCarouselReady(true), 2000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!heroCarouselReady || isPaused) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % (heroSlides.length || 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [heroSlides.length, isPaused, heroCarouselReady]);

  const nextHeroSlide = () =>
    setCurrentHeroSlide((prev) => (prev + 1) % (heroSlides.length || 1));
  const prevHeroSlide = () =>
    setCurrentHeroSlide((prev) => (prev - 1 + (heroSlides.length || 1)) % (heroSlides.length || 1));
  const goToHeroSlide = (index: number) =>
    setCurrentHeroSlide(index % (heroSlides.length || 1));
  const pauseCarousel = () => setIsPaused(true);
  const resumeCarousel = () => setIsPaused(false);

  // Failed fetch with no server data: show error — do not leave the user on a permanent skeleton.
  if (error && !data) {
    return (
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4"
        style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
      >
        <p className="text-center text-red-700 max-w-md">{error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchHomeStart())}
          className="rounded-full bg-[#1F396D] px-6 py-2 text-white hover:bg-[#29335C]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div
        className="relative z-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
        style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
      >
        <HeroSkeleton />
        <PopularCoursesSkeleton />
        <StatisticsSkeleton />
        <ProgramsSkeleton />
        <WhyChooseSkeleton />
        <TestimonialsSkeleton />
      </div>
    );
  }

  return (
    <div
      className="relative z-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
      style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}
    >
      <HeroSection
        slides={heroSlides as any}
        currentIndex={currentHeroSlide}
        onPrev={prevHeroSlide}
        onNext={nextHeroSlide}
        onGoTo={goToHeroSlide}
        onMouseEnter={pauseCarousel}
        onMouseLeave={resumeCarousel}
        error={error}
        onRetry={() => dispatch(fetchHomeStart())}
        lcpImageInDocument={!!initialData}
      />

      <PopularCoursesSection
        courses={popularCourses as any}
        error={error}
        onRetry={() => dispatch(fetchHomeStart())}
      />

      {/* ── Self-Check Banner ─────────────────────────────────────────── */}
      <section style={{
        background: '#1F396D',
        padding: '48px 24px',
        margin: '0',
      }}>
        <style>{`
          @media (max-width: 767px) {
            .sc-banner-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
            .sc-banner-cta { align-items: center !important; width: 100% !important; }
            .sc-banner-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; }
          }
        `}</style>
        <div className="sc-banner-inner" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          {/* Left — JTBD copy */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <p style={{
              color: '#a8c4e8',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '700',
              margin: '0 0 12px',
            }}>
              FREE DIAGNOSTIC · GRADES 3–8
            </p>
            <h2 style={{
              color: '#ffffff',
              fontSize: '26px',
              fontWeight: '700',
              lineHeight: '1.3',
              margin: '0 0 12px',
            }}>
              Not sure which program is right for your child?
            </h2>
            <p style={{
              color: '#a8c4e8',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0',
            }}>
              Find the exact mistake pattern holding them back —
              before choosing any program. Free. 5 minutes.
              Personalized report in your inbox.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="sc-banner-cta" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            minWidth: '240px',
          }}>
            <a
              href="/self-check"
              className="sc-banner-btn"
              style={{
                display: 'inline-block',
                background: '#E87722',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Get My Child&apos;s Report →
            </a>
            <p style={{
              color: '#6b8ab8',
              fontSize: '12px',
              margin: '0',
              textAlign: 'center',
            }}>
              Free · No sign-up · Report emailed in minutes
            </p>
          </div>
        </div>
      </section>
      {/* ─────────────────────────────────────────────────────────────── */}

      <StatisticsSection
        title={
          <span>
            {t('home.statistics.titlePrefix')}
            <span className="bg-gradient-to-r from-[#F16112] to-[#F1894F] bg-clip-text text-transparent">
              {t('home.statistics.titleHighlight')}
            </span>
          </span>
        }
        subtitle={t('home.statistics.subtitle')}
        stats={statisticsData as any}
        error={error}
        onRetry={() => dispatch(fetchHomeStart())}
      />

      <ProgramsSection k12={k12Programs as any} steam={steamPrograms as any} />

      <WhyChooseSection
        items={whyChooseUs as any}
        error={error}
        onRetry={() => dispatch(fetchHomeStart())}
      />

      <TestimonialsSection
        fallbackTestimonials={data?.testimonials ?? null}
        homeError={error}
        onRetryHome={() => dispatch(fetchHomeStart())}
      />

      <CtaSection
        title={data?.cta?.title || t('home.cta.title')}
        subtitle={data?.cta?.subtitle || t('home.cta.subtitle')}
        primaryText={data?.cta?.primaryCta || t('home.cta.primaryCta')}
        secondaryText={data?.cta?.secondaryCta || t('home.cta.secondaryCta')}
        onPrimary={openAssessmentModal}
        onSecondary={openChatbot}
      />

      <FreeAssessmentModal isOpen={isAssessmentModalOpen} onClose={closeAssessmentModal} />
      <STEAMTrialModal isOpen={isSTEAMTrialModalOpen} onClose={closeSTEAMTrialModal} />
    </div>
  );
}
