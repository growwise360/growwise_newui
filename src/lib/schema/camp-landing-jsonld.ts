import type { CampLandingPage } from '@/lib/camps/camp-types';
import { CONTACT_INFO } from '@/lib/constants';
import { absoluteSiteUrl } from '@/lib/publicPath';
import {
  generateBreadcrumbSchema,
  generateCourseSchema,
  generateEventSchema,
  generateItemListSchema,
} from '@/lib/seo/structuredData';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';
import {
  filterSummerCampHubPrograms,
  getDefaultSummerCampData,
  isSummerCampApplicationsClosed,
  type Level,
  type Program,
} from '@/lib/summer-camp-data';
import { orderProgramsBySummerCampTrack } from '@/lib/summer-camp-program-groups';
import { getSummerCampProgramSeoLink } from '@/lib/summer-camp-seo-links';
import {
  formatCampWeekSlotHeading,
  formatOlympiadTier2SlotHeading,
  getMathOlympiadTier2IsoRange,
  getSummerCampWeekIsoRange,
} from '@/lib/summer-camp-week-calendar';

/** Maps `/camps/[slug]` landing pages to summer hub program ids. */
export const CAMP_SLUG_TO_PROGRAM_ID: Record<string, string> = {
  'ai-studio-dublin-ca': 'ai-entrepreneur',
  'game-development-camp-dublin-ca': 'roblox-in-person',
  'math-olympiad-camp-dublin-ca': 'math-olympiad',
  'robotics-camp-dublin-ca': 'robotics-camp',
  'robotics-full-day-dublin-ca': 'robotics-camp',
  'young-authors-camp-dublin-ca': 'young-authors',
};

const PT_OFFSET = '-08:00';
const IN_STOCK = 'https://schema.org/InStock';
const SOLD_OUT = 'https://schema.org/SoldOut';
const EVENT_SCHEDULED = 'https://schema.org/EventScheduled';
const OFFLINE_MODE = 'https://schema.org/OfflineEventAttendanceMode';

function stripJsonLdContext(node: Record<string, unknown>): Record<string, unknown> {
  const { '@context': _ctx, ...rest } = node;
  return rest;
}

function growWiseEventLocation() {
  return {
    name: 'GrowWise',
    address: {
      streetAddress: CONTACT_INFO.street,
      addressLocality: 'Dublin',
      addressRegion: 'CA',
      postalCode: CONTACT_INFO.zipCode || '94568',
      addressCountry: 'US',
    },
  };
}

function parseClockTo24h(clock: string): string {
  const m = clock.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return '09:00:00';
  let hour = parseInt(m[1], 10);
  const min = m[2];
  const pm = m[3].toUpperCase() === 'PM';
  if (pm && hour !== 12) hour += 12;
  if (!pm && hour === 12) hour = 0;
  return `${String(hour).padStart(2, '0')}:${min}:00`;
}

function slotTimeToIso(date: string, timeRange: string, isEnd: boolean): string {
  const parts = timeRange.split('-').map((s) => s.trim());
  const clock = isEnd ? parts[parts.length - 1] : parts[0];
  return `${date}T${parseClockTo24h(clock)}${PT_OFFSET}`;
}

function formatEducationalLevel(program: Program): string {
  const ag = program.ageGroup;
  if (ag.startsWith('Grades')) return ag;
  if (ag === 'HighSchool') return 'High School';
  if (program.ageGroupLabel === 'Grade group' || /^\d/.test(ag)) {
    return `Grades ${ag}`;
  }
  return ag;
}

function resolveProgramUrl(
  programId: string,
  locale: string,
  baseUrl: string,
): string {
  const seoLink = getSummerCampProgramSeoLink(programId);
  if (seoLink) {
    return absoluteSiteUrl(`/camps/${seoLink.slug}`, locale, baseUrl);
  }
  return absoluteSiteUrl('/camps/summer', locale, baseUrl);
}

function getProgramById(programId: string): Program | undefined {
  return getDefaultSummerCampData().programs.find((p) => p.id === programId);
}

function getInPersonSlotPrice(level: Level, slotPrice: number): number {
  if (slotPrice > 0) return slotPrice;
  const byProgram = level.priceByProgramAndFormat;
  if (!byProgram) return 0;
  const prices = byProgram.default ?? Object.values(byProgram)[0];
  return prices?.['In-Person'] ?? 0;
}

function defaultSlotTime(program: Program): string {
  return program.category === 'Full Day Camps' ? '9:00 AM - 4:00 PM' : '9:00 AM - 12:00 PM';
}

const GROWWISE_PERFORMER = { name: 'GrowWise School', type: 'Organization' as const };

function offerAvailabilityForProgram(programId: string | undefined): string {
  return programId && isSummerCampApplicationsClosed(programId) ? SOLD_OUT : IN_STOCK;
}

function buildEventNode({
  name,
  description,
  startDate,
  endDate,
  price,
  pageUrl,
  baseUrl,
  availability,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  pageUrl: string;
  baseUrl: string;
  availability?: string;
}): Record<string, unknown> {
  return stripJsonLdContext(
    generateEventSchema({
      name,
      description,
      startDate,
      endDate,
      location: growWiseEventLocation(),
      organizer: { name: 'GrowWise', url: baseUrl },
      offers: {
        price: String(price),
        priceCurrency: 'USD',
        availability: availability ?? IN_STOCK,
        url: pageUrl,
        validFrom: '2026-01-01',
      },
      eventStatus: EVENT_SCHEDULED,
      eventAttendanceMode: OFFLINE_MODE,
      performer: GROWWISE_PERFORMER,
    }) as Record<string, unknown>,
  );
}

function buildWeeklySlotEvents(
  page: CampLandingPage,
  program: Program,
  pageUrl: string,
  baseUrl: string,
): Record<string, unknown>[] {
  const events: Record<string, unknown>[] = [];
  const timeRange = defaultSlotTime(program);

  for (const level of program.levels) {
    for (const slot of level.slots) {
      const weekMatch = slot.label.match(/Week\s+(\d+)/i);
      const weekIndex0 = weekMatch ? parseInt(weekMatch[1], 10) - 1 : -1;
      const range = weekIndex0 >= 0 ? getSummerCampWeekIsoRange(weekIndex0) : undefined;
      if (!range) continue;

      const price = getInPersonSlotPrice(level, slot.price);
      events.push(
        buildEventNode({
          name: `${page.h1} — ${slot.label}`,
          description: page.metaDescription,
          startDate: slotTimeToIso(range.startDate, slot.time || timeRange, false),
          endDate: slotTimeToIso(range.endDate, slot.time || timeRange, true),
          price,
          pageUrl,
          baseUrl,
          availability: offerAvailabilityForProgram(program.id),
        }),
      );
    }
  }

  return events;
}

function buildMathOlympiadEvents(
  page: CampLandingPage,
  pageUrl: string,
  baseUrl: string,
): Record<string, unknown>[] {
  const { olympiadTierConfigs } = getDefaultSummerCampData();
  const tier1 = olympiadTierConfigs.find((t) => t.id === 'tier1');
  const tier2 = olympiadTierConfigs.find((t) => t.id === 'tier2');
  const events: Record<string, unknown>[] = [];
  const timeRange = '9:00 AM - 12:00 PM';

  if (tier1) {
    for (let i = 0; i < tier1.slotCount; i++) {
      const range = getSummerCampWeekIsoRange(i);
      if (!range) continue;
      events.push(
        buildEventNode({
          name: `${page.h1} — ${formatCampWeekSlotHeading(i)} (Tier 1)`,
          description: page.metaDescription,
          startDate: slotTimeToIso(range.startDate, timeRange, false),
          endDate: slotTimeToIso(range.endDate, timeRange, true),
          price: tier1.priceByFormat['In-Person'],
          pageUrl,
          baseUrl,
        }),
      );
    }
  }

  if (tier2) {
    for (let i = 0; i < tier2.slotCount; i++) {
      const range = getMathOlympiadTier2IsoRange(i);
      if (!range) continue;
      events.push(
        buildEventNode({
          name: `${page.h1} — ${formatOlympiadTier2SlotHeading(i)} (Tier 2)`,
          description: page.metaDescription,
          startDate: slotTimeToIso(range.startDate, timeRange, false),
          endDate: slotTimeToIso(range.endDate, timeRange, true),
          price: tier2.priceByFormat['In-Person'],
          pageUrl,
          baseUrl,
        }),
      );
    }
  }

  return events;
}

function buildCampCourseNode(
  page: CampLandingPage,
  program: Program,
  pageUrl: string,
): Record<string, unknown> {
  return stripJsonLdContext(
    generateCourseSchema({
      name: page.h1,
      description: page.metaDescription,
      provider: 'GrowWise',
      educationalLevel: formatEducationalLevel(program),
      url: pageUrl,
      location: growWiseEventLocation(),
      offers: {
        price: String(program.startingPrice),
        priceCurrency: 'USD',
        availability: offerAvailabilityForProgram(program.id),
        url: pageUrl,
        validFrom: '2026-01-01',
      },
    }) as Record<string, unknown>,
  );
}

function buildCampWebPageNode(page: CampLandingPage, pageUrl: string): Record<string, unknown> {
  const baseUrl = getCanonicalSiteUrl();
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.seoTitle,
    description: page.metaDescription,
    isPartOf: {
      '@type': 'WebSite',
      name: 'GrowWise School',
      url: baseUrl,
    },
    about: {
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: baseUrl,
    },
  };
}

function buildCampFaqNode(page: CampLandingPage): Record<string, unknown> | null {
  if (page.faqItems.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: page.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** ItemList of all 7 summer hub programs in track order. */
export function buildSummerHubCampItemListSchema(locale: string) {
  const baseUrl = getCanonicalSiteUrl();
  const ordered = orderProgramsBySummerCampTrack(
    filterSummerCampHubPrograms(getDefaultSummerCampData().programs),
  );
  const items = ordered.map((program) => ({
    name: program.title,
    url: resolveProgramUrl(program.id, locale, baseUrl),
  }));
  return generateItemListSchema('Summer camp programs (Dublin, CA)', items);
}

/** Single @graph JSON-LD for a camp landing page: Course, Events, Breadcrumb, WebPage, FAQ. */
export function buildCampLandingJsonLdGraph(
  page: CampLandingPage,
  locale: string,
): Record<string, unknown> {
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl(`/camps/${page.slug}`, locale, baseUrl);
  const programId = CAMP_SLUG_TO_PROGRAM_ID[page.slug];
  const program = programId ? getProgramById(programId) : undefined;

  const graph: Record<string, unknown>[] = [];

  if (program) {
    graph.push(buildCampCourseNode(page, program, pageUrl));

    const events =
      program.id === 'math-olympiad'
        ? buildMathOlympiadEvents(page, pageUrl, baseUrl)
        : buildWeeklySlotEvents(page, program, pageUrl, baseUrl);
    graph.push(...events);
  }

  graph.push(
    stripJsonLdContext(
      generateBreadcrumbSchema([
        { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
        { name: 'Summer Camps', url: absoluteSiteUrl('/camps/summer', locale, baseUrl) },
        { name: page.h1, url: pageUrl },
      ]) as Record<string, unknown>,
    ),
  );

  graph.push(buildCampWebPageNode(page, pageUrl));

  const faq = buildCampFaqNode(page);
  if (faq) graph.push(faq);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
