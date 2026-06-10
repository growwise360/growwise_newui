import type { LucideIcon } from 'lucide-react';
import { BookOpen, Calculator, PenTool } from 'lucide-react';
import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import type { Program, ProgramDetails, Slot } from '@/lib/summer-camp-data';
import hubDataJson from '../../public/api/mock/en/academic-summer-programs-hub.json';

export const ACADEMIC_SUMMER_BANNER_SRC = '/assets/camps/acabanner.webp' as const;

export type AcademicSprintPricingTierId = 'grades-3-5' | 'grades-6-8';

export type AcademicSprintTrackId =
  | 'read-to-prove'
  | 'write-to-explain'
  | 'bridge-the-gap-math'
  | 'im1'
  | 'im2'
  | 'algebra-1'
  | 'geometry';

export type AcademicSprintId = 'academic-summer-sprint' | 'get-ready-sprint';

export type AcademicSprintPricingTier = {
  readonly id: AcademicSprintPricingTierId;
  readonly perCohortPrice: number;
  readonly bothCohortsPrice: number;
  readonly perHourRate: number;
};

export type AcademicSprintPricing = {
  readonly cohortWeeks: number;
  readonly cohortHours: number;
  readonly bothCohortsWeeks: number;
  readonly bothCohortsHours: number;
  readonly upsellSaveAmount: number;
  readonly tiers: readonly AcademicSprintPricingTier[];
};

export type AcademicSprintHubEntry = {
  readonly id: AcademicSprintId;
  readonly href: string;
  readonly startDateIso: string;
  readonly trackIds: readonly AcademicSprintTrackId[];
  readonly pricing: AcademicSprintPricing | null;
};

export type TrackSection = 'readingWriting' | 'math';

export type GetReadyPricingGroupId = 'standard' | 'im1' | 'geometry';

export type GetReadyPricing = {
  readonly twoWeek: number;
  readonly fourWeek: number;
  readonly upfront: number;
};

export type TrackHubMeta = {
  readonly sprintId: AcademicSprintId;
  readonly section: TrackSection;
  readonly gradeBadge: string;
  readonly ctaType: 'page' | 'phone';
  readonly ctaHref: string | null;
};

export type AcademicTrackCardModel = {
  readonly id: AcademicSprintTrackId;
  readonly section: TrackSection;
  readonly name: string;
  readonly tagline: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly gradeBadge: string;
  readonly bestFor: readonly string[];
  readonly formatLines: readonly string[];
  readonly cohortLines: readonly { readonly label: string; readonly dates: string }[];
  readonly pricingLines: readonly { readonly label: string; readonly amount: number }[];
  readonly pricingVariant: 'gradeBand' | 'getReady';
  readonly ctaType: 'page' | 'phone';
  readonly ctaHref: string | null;
  readonly icon: 'book' | 'pen' | 'calculator';
};

export type SprintOverviewCardModel = {
  readonly id: AcademicSprintId;
  readonly title: string;
  readonly summary: string;
  readonly anchorHref: string;
  readonly anchorLabel: string;
};

export type AcademicSummerProgramsHubData = {
  readonly sprints: readonly AcademicSprintHubEntry[];
  readonly academicSummerSprintFormat: {
    readonly weekdayCount: number;
    readonly sessionMinutesPerDay: number;
  };
  readonly cohorts: {
    readonly academicSummerSprint: {
      readonly cohort1: string;
      readonly cohort2: string;
    };
    readonly getReadySprint: {
      readonly startLabel: string;
    };
  };
  readonly howItWorks: {
    readonly instructionMinutes: number;
    readonly practiceLabMinutes: number;
    readonly maxStudents: number;
    readonly minStudents: number;
  };
  readonly cohortDateLabels: {
    readonly cohort1: string;
    readonly cohort2: string;
    readonly bothCohorts: string;
  };
  readonly sessionTimeLabel: string;
  readonly getReadySprintFormat: {
    readonly schedule: string;
  };
  readonly getReadyCohortDateLabels: {
    readonly cohort1TwoWeek: string;
    readonly cohort1FourWeek: string;
    readonly cohort2TwoWeek: string;
    readonly cohort2FourWeek: string;
  };
  readonly getReadyUpsellSaveAmount: number;
  readonly getReadyPricing: Record<GetReadyPricingGroupId, GetReadyPricing>;
  readonly getReadyPricingGroups: Record<'im1' | 'im2' | 'algebra-1' | 'geometry', GetReadyPricingGroupId>;
  readonly tracks: Record<AcademicSprintTrackId, TrackHubMeta>;
  readonly trackAssets: Partial<
    Record<AcademicSprintTrackId, { readonly image: string }>
  >;
  readonly socialProof: {
    readonly googleRating: number;
    readonly googleReviewCount: number;
    readonly studentsEnrolled: number;
    readonly maxStudentsPerClass: number;
  };
};

const DEFAULT_TRACK_CARD_IMAGE = '/images/camps/banners/read_to_prove_4291b661_web.webp';

/** Banner artwork uploaded under public/images/camps/banners/ */
export const ACADEMIC_TRACK_BANNER_SRC: Record<AcademicSprintTrackId, string> = {
  'read-to-prove': '/images/camps/banners/read_to_prove_4291b661_web.webp',
  'write-to-explain': '/images/camps/banners/write_with_structure_85f6d387_web.webp',
  'bridge-the-gap-math': '/images/camps/banners/mistake_proof_math_3968b793_web.webp',
  im1: '/images/camps/banners/im1_get_ready_04d2d274_web.webp',
  im2: '/images/camps/banners/im1_get_ready_04d2d274_web.webp',
  'algebra-1': '/images/camps/banners/algebra_1_get_ready_3572836f_web.webp',
  geometry: '/images/camps/banners/geometry_get_ready_girl_2409911a_web.webp',
};

function getTrackCardImage(
  trackId: AcademicSprintTrackId,
  hub: AcademicSummerProgramsHubData,
): string {
  return hub.trackAssets[trackId]?.image ?? ACADEMIC_TRACK_BANNER_SRC[trackId] ?? DEFAULT_TRACK_CARD_IMAGE;
}
const ACADEMIC_SUMMER_SPRINT_TRACK_ICONS: Record<
  'read-to-prove' | 'write-to-explain' | 'bridge-the-gap-math',
  LucideIcon
> = {
  'read-to-prove': BookOpen,
  'write-to-explain': PenTool,
  'bridge-the-gap-math': Calculator,
};

const SHARED_SPRINT_DETAILS = (
  instructionMinutes: number,
  practiceLabMinutes: number,
): ProgramDetails => ({
  schedule: 'Mon–Fri during your enrolled cohort weeks',
  daysPerWeek: 5,
  dailyHours: `${instructionMinutes + practiceLabMinutes} min / day (${instructionMinutes} instruction + ${practiceLabMinutes} guided practice)`,
  hoursLabel: 'Session length',
  deliverySummary: 'In-person at GrowWise Dublin',
  includes: [
    'Small groups (8–12 students max)',
    'Guided practice lab included every session — not an add-on',
  ],
});

function buildSprintTrackSlots(
  trackId: 'read-to-prove' | 'write-to-explain' | 'bridge-the-gap-math',
  pricing: AcademicSprintPricing,
  tierLabels: Record<AcademicSprintPricingTierId, { label: string }>,
  cohortShortDates: AcademicSummerProgramsHubData['cohorts']['academicSummerSprint'],
  bothCohortsShortLabel: string,
  sessionTimeLabel: string,
): Slot[] {
  const slots: Slot[] = [];
  for (const tier of pricing.tiers) {
    const label = tierLabels[tier.id]?.label ?? tier.id;
    slots.push({
      id: `${trackId}-${tier.id}-cohort1`,
      label: `${label} · Cohort 1 (${cohortShortDates.cohort1})`,
      time: sessionTimeLabel,
      format: 'In-Person',
      price: tier.perCohortPrice,
    });
    slots.push({
      id: `${trackId}-${tier.id}-cohort2`,
      label: `${label} · Cohort 2 (${cohortShortDates.cohort2})`,
      time: sessionTimeLabel,
      format: 'In-Person',
      price: tier.perCohortPrice,
    });
    slots.push({
      id: `${trackId}-${tier.id}-both`,
      label: `${label} · Both cohorts (${bothCohortsShortLabel})`,
      time: sessionTimeLabel,
      format: 'In-Person',
      price: tier.bothCohortsPrice,
    });
  }
  return slots;
}

export const ACADEMIC_SUMMER_SPRINT_TRACK_IDS = [
  'read-to-prove',
  'write-to-explain',
  'bridge-the-gap-math',
] as const;

export type AcademicSummerSprintTrackId = (typeof ACADEMIC_SUMMER_SPRINT_TRACK_IDS)[number];

export function isAcademicSummerSprintProgram(programId: string): programId is AcademicSummerSprintTrackId {
  return (ACADEMIC_SUMMER_SPRINT_TRACK_IDS as readonly string[]).includes(programId);
}

export function findAcademicSprintSlot(
  program: Program,
  tierId: AcademicSprintPricingTierId,
  cohort: 'cohort1' | 'cohort2' | 'both',
): Slot | undefined {
  return program.levels[0]?.slots.find((slot) => slot.id.endsWith(`-${tierId}-${cohort}`));
}

/** Builds summer-camp-compatible programs for Academic Summer Sprint tracks (pricing from hub JSON). */
export function buildAcademicSummerSprintPrograms(): Program[] {
  const hub = getAcademicSummerProgramsHubData();
  const sprint = getAcademicSprintById('academic-summer-sprint');
  const sprintCopy = hubCopy.sprintCards.sprints['academic-summer-sprint'];
  if (!sprint?.pricing) return [];

  const tierLabels = sprintCopy.pricingTiers;
  const { instructionMinutes, practiceLabMinutes } = hub.howItWorks;
  const details = SHARED_SPRINT_DETAILS(instructionMinutes, practiceLabMinutes);

  return sprint.trackIds
    .filter(
      (trackId): trackId is 'read-to-prove' | 'write-to-explain' | 'bridge-the-gap-math' =>
        trackId === 'read-to-prove' ||
        trackId === 'write-to-explain' ||
        trackId === 'bridge-the-gap-math',
    )
    .map((trackId) => {
      const track = sprintCopy.tracks[trackId];
      const icon = ACADEMIC_SUMMER_SPRINT_TRACK_ICONS[trackId];
      const image = getTrackCardImage(trackId, hub);
      const bothCohortsShortLabel = hub.cohortDateLabels.bothCohorts
        .replace(', 2026', '')
        .replace(' – ', '–')
        .replace(' - ', '–');
      const slots = buildSprintTrackSlots(
        trackId,
        sprint.pricing!,
        tierLabels,
        hub.cohorts.academicSummerSprint,
        bothCohortsShortLabel,
        hub.sessionTimeLabel,
      );

      return {
        id: trackId,
        title: track.name,
        description: track.description,
        outcome: track.description,
        bullets: [
          `${hub.howItWorks.instructionMinutes} min instruction + ${hub.howItWorks.practiceLabMinutes} min practice lab`,
          'In-person · Dublin campus',
        ],
        icon,
        category: 'Half-Day Camps' as const,
        hoursPerWeek: `${sprint.pricing!.cohortHours / sprint.pricing!.cohortWeeks} hours / week`,
        ageGroup: 'Grades 1-8',
        startingPrice: Math.min(...sprint.pricing!.tiers.map((t) => t.perCohortPrice)),
        image,
        levels: [
          {
            id: `${trackId}-enrollment`,
            name: hubCopy.enrollmentPanel.sprintChooseCohortGradeHeader,
            description: '',
            slots,
          },
        ],
        details,
      };
    });
}

const GET_READY_TRACK_IDS = ['im1', 'im2', 'algebra-1', 'geometry'] as const;

export type AcademicGetReadyTrackId = (typeof GET_READY_TRACK_IDS)[number];

export function isAcademicGetReadyProgram(programId: string): programId is AcademicGetReadyTrackId {
  return (GET_READY_TRACK_IDS as readonly string[]).includes(programId);
}

function formatGetReadyRowSubline(trackId: AcademicGetReadyTrackId, sessions: number): string {
  const panelCopy = hubCopy.enrollmentPanel.getReadyPanel.tracks;
  const track = panelCopy[trackId as keyof typeof panelCopy] as
    | { rowTimeLabel?: string }
    | undefined;
  const timeLabel = track?.rowTimeLabel ?? '5–6:30 PM';
  return hubCopy.enrollmentPanel.getReadyRowFormat
    .replace('{time}', timeLabel)
    .replace('{sessions}', String(sessions));
}

function buildGetReadyTrackSlots(
  trackId: AcademicGetReadyTrackId,
  prices: GetReadyPricing,
  panelMeta: GetReadyPanelMeta,
): Slot[] {
  const cohort1Time = panelMeta.cohort1.schedule
    ? `${panelMeta.cohort1.schedule} · ${panelMeta.cohort1.sessions} sessions`
    : formatGetReadyRowSubline(trackId, panelMeta.cohort1.sessions);
  const cohort2Time = panelMeta.cohort2.schedule
    ? `${panelMeta.cohort2.schedule} · ${panelMeta.cohort2.sessions} sessions`
    : formatGetReadyRowSubline(trackId, panelMeta.cohort2.sessions);

  return [
    {
      id: `${trackId}-cohort1`,
      label: panelMeta.cohort1.title,
      time: cohort1Time,
      format: 'In-Person',
      price: panelMeta.cohort1.price ?? prices.twoWeek,
    },
    {
      id: `${trackId}-cohort2`,
      label: panelMeta.cohort2.title,
      time: cohort2Time,
      format: 'In-Person',
      price: panelMeta.cohort2.price ?? prices.twoWeek,
    },
  ];
}

/** July Get Ready programs — all tracks checkout via cart. */
export function buildGetReadySummerPrograms(): Program[] {
  const hub = getAcademicSummerProgramsHubData();
  const { instructionMinutes, practiceLabMinutes } = hub.howItWorks;
  const sprint = getAcademicSprintById('get-ready-sprint');
  const trackIds = (sprint?.trackIds ?? []) as AcademicGetReadyTrackId[];

  return trackIds.map((trackId) => {
    const trackCopy = hubCopy.tracks[trackId];
    const groupId = hub.getReadyPricingGroups[trackId];
    const prices = hub.getReadyPricing[groupId];
    const image = getTrackCardImage(trackId, hub);
    const panelMeta = getGetReadyPanelMeta(trackId);
    if (!panelMeta) {
      throw new Error(`Missing Get Ready panel meta for track: ${trackId}`);
    }
    const slots = buildGetReadyTrackSlots(trackId, prices, panelMeta);
    const startingPrice = Math.min(
      panelMeta.cohort1.price ?? prices.twoWeek,
      panelMeta.cohort2.price ?? prices.twoWeek,
    );

    const includes = [
      'Small groups (8–12 students max)',
      `${instructionMinutes} min instruction + ${practiceLabMinutes} min guided practice`,
      hub.cohorts.getReadySprint.startLabel,
    ];
    if (trackId === 'im1') {
      includes.unshift('DUSD/PUSD-aligned Grade 7 IM1 prep');
    }
    if (trackId === 'im2') {
      includes.unshift('DUSD/PUSD-aligned Grade 8 IM2 prep');
    }

    return {
      id: trackId,
      title: trackCopy.name,
      description: trackCopy.tagline,
      outcome: trackCopy.tagline,
      bullets: [
        `${instructionMinutes} min instruction + ${practiceLabMinutes} min practice lab`,
        'In-person · Dublin campus',
        'DUSD & PUSD aligned',
      ],
      icon: Calculator,
      category: 'Half-Day Camps' as const,
      hoursPerWeek: hub.getReadySprintFormat.schedule,
      ageGroup: 'Grades 1-10',
      startingPrice,
      image,
      levels: [
        {
          id: `${trackId}-enrollment`,
          name: hubCopy.enrollmentPanel.getReadyChooseCohortHeader,
          description: '',
          slots,
        },
      ],
      details: {
        schedule: hub.getReadySprintFormat.schedule,
        daysPerWeek: 3,
        dailyHours: `${instructionMinutes + practiceLabMinutes} min / session (${instructionMinutes} instruction + ${practiceLabMinutes} guided practice)`,
        hoursLabel: 'Session length',
        deliverySummary: 'In-person at GrowWise Dublin',
        includes,
      },
    };
  });
}

/** Card display metadata for hub program picker (HTML text — not image overlays). */
export type AcademicProgramCardDisplay = {
  readonly id: AcademicSprintTrackId;
  readonly name: string;
  readonly tagline: string;
  readonly gradeLabel: string;
  readonly startLabel: string;
  readonly startingPrice: number;
};

export type AcademicSprintPickCardMeta = {
  readonly gradeBadge: string;
  readonly scheduleLine: string;
  readonly bestFor: readonly string[];
  readonly bestForLabel: string;
};

export function getAcademicSprintPickCardMeta(
  trackId: AcademicSummerSprintTrackId,
): AcademicSprintPickCardMeta | null {
  if (!isAcademicSummerSprintProgram(trackId)) return null;

  const cardCopy = hubCopy.programList.sprintPickCard;
  const track = cardCopy.tracks[trackId as keyof typeof cardCopy.tracks];
  if (!track) return null;

  return {
    gradeBadge: cardCopy.gradeBadge,
    scheduleLine: track.scheduleLine,
    bestFor: track.bestFor,
    bestForLabel: cardCopy.bestForLabel,
  };
}

export type AcademicGetReadyPickCardMeta = {
  readonly gradeBadge: string;
  readonly scheduleLine: string;
  readonly bestFor: readonly string[];
  readonly bestForLabel: string;
};

export type GetReadyPanelCohortRow = {
  readonly title: string;
  readonly sessions: number;
  readonly schedule?: string;
  readonly price?: number;
};

export type GetReadyPanelBothRow = GetReadyPanelCohortRow & {
  readonly upfrontAmount: number;
  readonly upfrontSaveAmount: number;
  readonly includeHolidaySuffix: boolean;
};

export type GetReadyPanelMeta = {
  readonly cohort1: GetReadyPanelCohortRow;
  readonly cohort2: GetReadyPanelCohortRow;
  readonly both: GetReadyPanelBothRow;
  readonly cohort2HolidayNote: string | null;
};

export function getAcademicGetReadyPickCardMeta(
  trackId: AcademicGetReadyTrackId,
): AcademicGetReadyPickCardMeta | null {
  if (!isAcademicGetReadyProgram(trackId)) return null;

  const cardCopy = hubCopy.programList.getReadyPickCard;
  const track = cardCopy.tracks[trackId as keyof typeof cardCopy.tracks];
  if (!track) return null;

  return {
    gradeBadge: track.gradeBadge,
    scheduleLine: track.scheduleLine,
    bestFor: track.bestFor,
    bestForLabel: cardCopy.bestForLabel,
  };
}

export function getGetReadyPanelMeta(trackId: AcademicGetReadyTrackId): GetReadyPanelMeta | null {
  if (!isAcademicGetReadyProgram(trackId)) return null;

  const panelCopy = hubCopy.enrollmentPanel.getReadyPanel.tracks;
  const track = panelCopy[trackId as keyof typeof panelCopy];
  if (!track) return null;

  return {
    cohort1: track.cohort1,
    cohort2: track.cohort2,
    both: track.both,
    cohort2HolidayNote: track.cohort2HolidayNote,
  };
}

export function getAcademicProgramCardDisplay(
  trackId: AcademicSprintTrackId,
): AcademicProgramCardDisplay {
  const hub = getAcademicSummerProgramsHubData();
  const trackCopy = hubCopy.tracks[trackId];
  const meta = hub.tracks[trackId];

  if (meta.sprintId === 'academic-summer-sprint') {
    const sprint = getAcademicSprintById('academic-summer-sprint');
    const startingPrice = sprint?.pricing
      ? Math.min(...sprint.pricing.tiers.map((t) => t.perCohortPrice))
      : 249;
    return {
      id: trackId,
      name: trackCopy.name,
      tagline: trackCopy.tagline,
      gradeLabel: meta.gradeBadge,
      startLabel: hubCopy.programList.juneStartLabel,
      startingPrice,
    };
  }

  const groupId = hub.getReadyPricingGroups[trackId as 'im1' | 'im2' | 'algebra-1' | 'geometry'];
  const prices = hub.getReadyPricing[groupId];
  return {
    id: trackId,
    name: trackCopy.name,
    tagline: trackCopy.tagline,
    gradeLabel: meta.gradeBadge,
    startLabel: hubCopy.programList.julyStartLabel,
    startingPrice: prices.twoWeek,
  };
}

export function getAcademicProgramCardDisplayMap(): Record<
  AcademicSprintTrackId,
  AcademicProgramCardDisplay
> {
  const ids: AcademicSprintTrackId[] = [
    'read-to-prove',
    'write-to-explain',
    'bridge-the-gap-math',
    'im1',
    'im2',
    'algebra-1',
    'geometry',
  ];
  return Object.fromEntries(ids.map((id) => [id, getAcademicProgramCardDisplay(id)])) as Record<
    AcademicSprintTrackId,
    AcademicProgramCardDisplay
  >;
}

export const DEFAULT_ACADEMIC_HUB_PROGRAM_ID = 'read-to-prove' as const;

/** All six academic hub programs in display order (June checkout + July phone). */
export function buildAllAcademicSummerPrograms(): Program[] {
  return [...buildAcademicSummerSprintPrograms(), ...buildGetReadySummerPrograms()];
}

export function getDefaultAcademicHubProgram(): Program | null {
  return (
    buildAllAcademicSummerPrograms().find((p) => p.id === DEFAULT_ACADEMIC_HUB_PROGRAM_ID) ??
    buildAllAcademicSummerPrograms()[0] ??
    null
  );
}

/** Whole-dollar prices (e.g. 249). Per-hour rates use two decimals (e.g. 16.60). */
export function formatAcademicSprintUsd(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function getAcademicSummerProgramsHubData(): AcademicSummerProgramsHubData {
  return hubDataJson as AcademicSummerProgramsHubData;
}

export function getAcademicSprintById(id: AcademicSprintId): AcademicSprintHubEntry | undefined {
  return getAcademicSummerProgramsHubData().sprints.find((s) => s.id === id);
}

const TRACK_ICON: Record<AcademicSprintTrackId, AcademicTrackCardModel['icon']> = {
  'read-to-prove': 'book',
  'write-to-explain': 'pen',
  'bridge-the-gap-math': 'calculator',
  im1: 'calculator',
  im2: 'calculator',
  'algebra-1': 'calculator',
  geometry: 'calculator',
};

const READING_WRITING_TRACKS: readonly AcademicSprintTrackId[] = [
  'read-to-prove',
  'write-to-explain',
];

const MATH_TRACKS: readonly AcademicSprintTrackId[] = [
  'bridge-the-gap-math',
  'im1',
  'im2',
  'algebra-1',
  'geometry',
];

function interpolate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function buildAcademicTrackCard(
  trackId: AcademicSprintTrackId,
  hub: AcademicSummerProgramsHubData,
): AcademicTrackCardModel | null {
  const meta = hub.tracks[trackId];
  const trackCopy = hubCopy.tracks[trackId as keyof typeof hubCopy.tracks];
  if (!meta || !trackCopy) return null;

  const academicSprint = getAcademicSprintById('academic-summer-sprint');
  const { instructionMinutes, practiceLabMinutes } = hub.howItWorks;
  const { weekdayCount, sessionMinutesPerDay } = hub.academicSummerSprintFormat;

  if (meta.sprintId === 'academic-summer-sprint' && academicSprint?.pricing) {
    const tierLabels = hubCopy.sprintCards.sprints['academic-summer-sprint'].pricingTiers;
    return {
      id: trackId,
      section: meta.section,
      name: trackCopy.name,
      tagline: trackCopy.tagline,
      image: getTrackCardImage(trackId, hub),
      imageAlt: `${trackCopy.name}: ${trackCopy.tagline}`,
      gradeBadge: meta.gradeBadge,
      bestFor: trackCopy.bestFor,
      formatLines: [
        interpolate(hubCopy.trackCard.formatWeekdays, {
          weekdays: weekdayCount,
          minutes: sessionMinutesPerDay,
        }),
        interpolate(hubCopy.trackCard.formatInstructionLab, {
          instruction: instructionMinutes,
          practice: practiceLabMinutes,
        }),
      ],
      cohortLines: [
        {
          label: hubCopy.trackCard.cohort1Prefix,
          dates: hub.cohorts.academicSummerSprint.cohort1,
        },
        {
          label: hubCopy.trackCard.cohort2Prefix,
          dates: hub.cohorts.academicSummerSprint.cohort2,
        },
      ],
      pricingLines: academicSprint.pricing.tiers.map((tier) => ({
        label: tierLabels[tier.id]?.label ?? tier.id,
        amount: tier.perCohortPrice,
      })),
      pricingVariant: 'gradeBand',
      ctaType: meta.ctaType,
      ctaHref: meta.ctaHref,
      icon: TRACK_ICON[trackId],
    };
  }

  if (meta.sprintId === 'get-ready-sprint') {
    const groupId = hub.getReadyPricingGroups[trackId as 'im1' | 'im2' | 'algebra-1' | 'geometry'];
    const prices = hub.getReadyPricing[groupId];
    if (!prices) return null;

    return {
      id: trackId,
      section: meta.section,
      name: trackCopy.name,
      tagline: trackCopy.tagline,
      image: getTrackCardImage(trackId, hub),
      imageAlt: `${trackCopy.name}: ${trackCopy.tagline}`,
      gradeBadge: meta.gradeBadge,
      bestFor: trackCopy.bestFor,
      formatLines: [hub.getReadySprintFormat.schedule],
      cohortLines: [
        {
          label: '',
          dates: hub.cohorts.getReadySprint.startLabel,
        },
      ],
      pricingLines: [
        { label: hubCopy.trackCard.getReadyTwoWeek, amount: prices.twoWeek },
        { label: hubCopy.trackCard.getReadyFourWeek, amount: prices.fourWeek },
        { label: hubCopy.trackCard.getReadyUpfront, amount: prices.upfront },
      ],
      pricingVariant: 'getReady',
      ctaType: meta.ctaType,
      ctaHref: meta.ctaHref,
      icon: TRACK_ICON[trackId],
    };
  }

  return null;
}

export function getAcademicTrackCards(): AcademicTrackCardModel[] {
  const hub = getAcademicSummerProgramsHubData();
  const order: AcademicSprintTrackId[] = [...READING_WRITING_TRACKS, ...MATH_TRACKS];
  return order
    .map((id) => buildAcademicTrackCard(id, hub))
    .filter((card): card is AcademicTrackCardModel => card !== null);
}

export function getAcademicTrackCardsBySection(section: TrackSection): AcademicTrackCardModel[] {
  return getAcademicTrackCards().filter((c) => c.section === section);
}

export function getAcademicTrackCardsBySprint(
  sprintId: AcademicSprintId,
): AcademicTrackCardModel[] {
  const hub = getAcademicSummerProgramsHubData();
  return getAcademicTrackCards().filter((card) => hub.tracks[card.id]?.sprintId === sprintId);
}
