'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import { AcademicEnrollmentPanel } from '@/components/camps/AcademicEnrollmentPanel';
import { AcademicProgramList } from '@/components/camps/AcademicProgramList';
import { AcademicProgramsHero } from '@/components/camps/AcademicProgramsHero';
import { AcademicHowItWorksSection } from '@/components/camps/AcademicHowItWorksSection';
import { AcademicInternalLinksSection } from '@/components/camps/AcademicInternalLinksSection';
import { AcademicSeoParentGuidesBlock } from '@/components/camps/AcademicSeoParentGuidesBlock';
import { AcademicProblemSection } from '@/components/camps/AcademicProblemSection';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { SummerCampTrustBlock } from '@/components/camps/SummerCampTrustBlock';
import { enrollmentPanelStickyWrapClass } from '@/components/camps/EnrollmentPanelLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import { useChatbot } from '@/contexts/ChatbotContext';
import copy from '@/i18n/messages/academic-summer-programs-en.json';
import {
  buildAllAcademicSummerPrograms,
  getDefaultAcademicHubProgram,
} from '@/lib/academic-summer-programs-hub-data';
import {
  ACADEMIC_PROGRAM_FILTER_ORDER,
  filterAcademicProgramsByChip,
  resolveAcademicHubFilterFromQuery,
  type AcademicProgramFilterId,
} from '@/lib/academic-summer-program-filters';
import { ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS } from '@/lib/schema/academic-summer-programs-hub-jsonld-faqs';
import { getParentGuidesForAcademicHub } from '@/lib/academic-seo-parent-guides';
import type { Program } from '@/lib/summer-camp-data';
import { CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import pageStyles from '@/components/camps/academic-summer-programs-page.module.css';

const PAGE = copy;
const TRUST = copy.trust;
const PROGRAMS = buildAllAcademicSummerPrograms();

const FILTER_LABELS: Record<AcademicProgramFilterId, string> = {
  all: PAGE.booking.filter.all,
  readingWriting: PAGE.booking.filter.readingWriting,
  bridgeTheGap: PAGE.booking.filter.bridgeTheGap,
  getReadyMath: PAGE.booking.filter.getReadyMath,
};

const FILTER_CHIP_STYLE = {
  bar: {
    gap: 12,
    padding: '16px 0 20px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    marginBottom: 24,
  },
  active: {
    background: '#146c43',
    border: '1px solid #146c43',
    color: 'white',
  },
  inactive: {
    background: 'white',
    border: '1px solid #d0d5dd',
    color: '#344054',
  },
} as const;

function filterChipStyle(active: boolean) {
  return active ? FILTER_CHIP_STYLE.active : FILTER_CHIP_STYLE.inactive;
}

function resolveProgramFromHash(hash: string): Program | null {
  const normalized = hash.replace(/^#/, '');
  if (!normalized.startsWith('track-')) return null;
  const id = normalized.replace('track-', '');
  return PROGRAMS.find((p) => p.id === id) ?? null;
}

export function AcademicSummerProgramsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const locale = typeof params?.locale === 'string' ? params.locale : 'en';
  const { openChatbot } = useChatbot();
  const slotsSectionRef = useRef<HTMLElement>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(() =>
    getDefaultAcademicHubProgram(),
  );
  const [programFilter, setProgramFilter] = useState<AcademicProgramFilterId>('all');
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [enrollmentPanelInView, setEnrollmentPanelInView] = useState(false);

  const filteredPrograms = useMemo(
    () => filterAcademicProgramsByChip(PROGRAMS, programFilter),
    [programFilter],
  );

  const handleFilterChange = useCallback((filter: AcademicProgramFilterId) => {
    setProgramFilter(filter);
    const nextPrograms = filterAcademicProgramsByChip(PROGRAMS, filter);
    setSelectedProgram(nextPrograms[0] ?? getDefaultAcademicHubProgram());
    if (typeof window !== 'undefined') {
      const base = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', base);
    }
  }, []);

  const openAcademicAssistant = useCallback(
    (topic: 'schedule' | 'not-sure') => {
      const initialUserMessage =
        topic === 'schedule'
          ? 'Hi! I have questions about the academic summer program schedule.'
          : 'Hi! I\'m not sure which academic summer program is right for my child.';
      openChatbot({ initialUserMessage });
    },
    [openChatbot],
  );

  useEffect(() => {
    const resolved = resolveAcademicHubFilterFromQuery(filterParam);
    if (!resolved) return;
    setProgramFilter(resolved);
    const nextPrograms = filterAcademicProgramsByChip(PROGRAMS, resolved);
    setSelectedProgram(nextPrograms[0] ?? getDefaultAcademicHubProgram());
    const scrollTimer = window.setTimeout(() => {
      document.getElementById('program-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    return () => window.clearTimeout(scrollTimer);
  }, [filterParam]);

  useEffect(() => {
    const applyHash = () => {
      const fromHash = resolveProgramFromHash(window.location.hash);
      if (fromHash) {
        setProgramFilter('all');
        setSelectedProgram(fromHash);
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          requestAnimationFrame(() => {
            document.getElementById('slots-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === 'undefined') return;
      setShowStickyCta(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const panel = document.getElementById('slots-panel');
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth > 768) {
          setEnrollmentPanelInView(false);
          return;
        }
        setEnrollmentPanelInView(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' },
    );
    observer.observe(panel);

    const onResize = () => {
      if (window.innerWidth > 768) setEnrollmentPanelInView(false);
    };
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [selectedProgram]);

  const showBottomStickyBar = showStickyCta && !enrollmentPanelInView;

  const scrollToSlots = useCallback(() => {
    slotsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectProgram = useCallback((program: Program) => {
    setSelectedProgram(program);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#track-${program.id}`);
      if (window.innerWidth < 1024) {
        document.getElementById('slots-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleAskScheduleFromPanel = useCallback(() => {
    openAcademicAssistant('schedule');
  }, [openAcademicAssistant]);

  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;

  return (
    <div
      data-academic-summer-page
      className={cn(
        pageStyles.pageRoot,
        'min-h-screen bg-background font-sans selection:bg-[#1F396D]/20 selection:text-[#1F396D]',
      )}
    >
      <main
        className={cn(
          showBottomStickyBar
            ? 'max-[768px]:pb-[calc(9rem+env(safe-area-inset-bottom,0px))] md:pb-24'
            : 'max-[768px]:pb-[60px]',
        )}
      >
        <AcademicProgramsHero onInquireClick={() => openAcademicAssistant('schedule')} />

        <section
          id="slots-section"
          ref={slotsSectionRef}
          className="scroll-mt-24 relative border-y border-slate-100 py-20"
          style={{
            background:
              'linear-gradient(135deg, #dbeafe 0%, #eff6ff 30%, #fff7ed 70%, #fed7aa 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 hidden overflow-clip md:block"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            <div className="absolute left-0 top-0 h-[50%] w-[45%] rounded-full bg-[#1F396D]/20 opacity-30 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[50%] w-[45%] rounded-full bg-orange-400/20 opacity-30 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6" style={{ position: 'relative', zIndex: 1 }}>
            <div className="mb-10">
              <div
                className="flex flex-wrap"
                style={FILTER_CHIP_STYLE.bar}
                role="group"
                aria-label={PAGE.booking.filter.ariaLabel}
              >
                {ACADEMIC_PROGRAM_FILTER_ORDER.map((filterId) => (
                  <button
                    key={filterId}
                    type="button"
                    onClick={() => handleFilterChange(filterId)}
                    className="cursor-pointer rounded-[20px] px-[18px] py-2 text-sm font-medium transition-colors duration-300"
                    style={filterChipStyle(programFilter === filterId)}
                  >
                    {FILTER_LABELS[filterId]}
                  </button>
                ))}
              </div>

              <h2 className="font-heading mb-2 text-3xl font-black uppercase tracking-tight text-slate-900">
                {PAGE.booking.sectionTitle}
              </h2>
              <p className="text-sm font-medium text-slate-500">{PAGE.booking.sectionSub}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-950">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden />
                {PAGE.booking.july4HolidayNote}
              </p>
            </div>

            <div className="relative grid items-start gap-8 lg:grid-cols-12">
              <div id="program-grid" className="scroll-mt-24 max-[768px]:overflow-x-hidden lg:col-span-7">
                <AcademicProgramList
                  programs={filteredPrograms}
                  selectedProgramId={selectedProgram?.id ?? null}
                  onSelectProgram={handleSelectProgram}
                  onInquire={() => openAcademicAssistant('not-sure')}
                />
              </div>

              <div
                className={cn(
                  'min-w-0 lg:col-span-5 max-[768px]:min-h-0',
                  enrollmentPanelStickyWrapClass,
                  showBottomStickyBar
                    ? 'lg:max-h-[calc(100vh-var(--header-height,10rem)-5.5rem)]'
                    : undefined,
                )}
              >
                <AcademicEnrollmentPanel
                  program={selectedProgram}
                  programs={PROGRAMS}
                  onSelectProgram={handleSelectProgram}
                  onInquireClick={handleAskScheduleFromPanel}
                  onChooseProgram={scrollToSlots}
                />
              </div>
            </div>
          </div>
        </section>

        <AcademicProblemSection />

        <AcademicHowItWorksSection />

        <section className="border-b border-slate-200 bg-white py-14 md:py-20" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-[1100px] px-10 text-center md:px-12">
            <h2 id="final-cta-heading" className="font-heading text-2xl font-bold text-slate-900 md:text-4xl">
              {PAGE.finalCta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-700 md:text-base">{PAGE.finalCta.body}</p>
            <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-lg">
              <button
                type="button"
                onClick={scrollToSlots}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#183056] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 md:text-base"
              >
                {PAGE.finalCta.secondaryCta}
              </button>
              <button
                type="button"
                onClick={() =>
                  openChatbot({
                    initialUserMessage:
                      'Hi! I need help choosing the right academic summer program for my child.',
                  })
                }
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2"
              >
                {PAGE.finalCta.primaryCta}
              </button>
            </div>
          </div>
        </section>

        <SummerCampTrustBlock
          heading={TRUST.heading}
          googleRatingLine={TRUST.googleRatingLine}
          reviews={TRUST.reviews}
          proofStrip={TRUST.proofStrip}
          bullets={TRUST.bullets}
          projectsCta={TRUST.projectsCta}
          projectsCtaHref={TRUST.projectsUrl}
        />

        <AcademicInternalLinksSection locale={locale} />

        <SectionContainer className="border-t border-slate-100 bg-white">
          <AcademicSeoParentGuidesBlock
            locale={locale}
            guides={getParentGuidesForAcademicHub()}
            className="mx-auto max-w-3xl"
          />
        </SectionContainer>

        <SectionContainer id="faq" className="border-b border-slate-100 bg-slate-50/60">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-2xl font-bold text-slate-900 md:text-3xl">{PAGE.faq.title}</h2>
            <p className="mt-2 text-center text-slate-600">{PAGE.faq.subtitle}</p>
            <div className="mt-10 space-y-3">
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={getDefaultOpenFaqValues(
                  ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS.length,
                  (idx) => `faq-${idx}`,
                )}
              >
                {ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS.map((item, idx) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${idx}`}
                    className="overflow-hidden rounded-xl border-0 bg-white shadow-sm ring-1 ring-slate-200/90"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline sm:px-5">
                      <span className="flex items-center gap-3">
                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F16112]/10 ring-1 ring-[#F16112]/15"
                          aria-hidden
                        >
                          <HelpCircle className="h-4 w-4 text-[#F16112]" />
                        </span>
                        <span className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-white">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">{PAGE.finalCta.footerNote}</p>
            <a
              href={phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-slate-600 hover:text-[#1F396D]"
            >
              {PAGE.finalCta.phonePrompt.replace('{phone}', CONTACT_INFO.phone)}
            </a>
          </div>
        </SectionContainer>
      </main>

      {showBottomStickyBar ? (
        <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200/80 bg-white/95 p-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-6">
          <div className="mx-auto flex max-w-[1100px] flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={scrollToSlots}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183056] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 sm:w-auto md:text-base"
            >
              {PAGE.stickyCta.primaryButton}
            </button>
            <button
              type="button"
              onClick={() => openAcademicAssistant('schedule')}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#F16112] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto"
            >
              {PAGE.stickyCta.secondaryButton}
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}
