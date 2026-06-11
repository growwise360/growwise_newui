'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  LEARNING_MODE_KEYS,
  LEARNING_MODE_FORMAT,
  LEARNING_MODE_TIME,
  ADV_MATH_PROGRAM_KEYS,
  type Program,
  type Level,
  type Slot,
  type LearningModeKey,
  type AdvMathProgramKey,
  type OlympiadTierId,
  type OlympiadTierConfig,
  type ProgramAddOn,
} from '@/lib/summer-camp-data';
import { isSummerCampApplicationsClosed } from '@/lib/summer-camp-data';
import { type CartItem, useCart } from '@/components/gw/CartContext';
import { X, Clock, CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import {
  getRoboticsFullDaySeoLink,
  getSummerCampProgramSeoLink,
  summerCampSeoMessagePath,
} from '@/lib/summer-camp-seo-links';
import { getSummerCampPickCardMeta } from '@/lib/summer-camp-pick-card-meta';
import {
  EnrollmentPanelControls,
  EnrollmentPanelDescriptionStrip,
  EnrollmentPanelDropdownsRow,
  EnrollmentPanelHeader,
  EnrollmentPanelInfoButton,
  EnrollmentPanelScrollBody,
  EnrollmentPanelShell,
  EnrollmentPanelSlotList,
  EnrollmentPanelTierBadge,
  enrollmentPanelSelectClass,
} from '@/components/camps/EnrollmentPanelLayout';
import { EnrollmentCompactAddButton } from '@/components/camps/AcademicPricingSlotRowLayout';
import { SummerMobileProgramSwitcher } from '@/components/camps/SummerMobileProgramSwitcher';
import { formatAdvMathWeekSlotHeading } from '@/lib/adv-math-week-sessions';
import {
  formatCampWeekSlotHeading,
  formatOlympiadTier2SlotHeading,
  isJune8SummerCampRegistrationClosed,
  SUMMER_CAMP_JULY4_NOTE,
  SUMMER_CAMP_SEASON_RANGE_TEXT,
} from '@/lib/summer-camp-week-calendar';

const AI_PROFILE_BUILDING_ADDON_ID = 'ai-profile-building';

function summerCampAddOnCartItemId(slotId: string, addOnId: string): string {
  return `${slotId}-${addOnId}`;
}

function InfoModal({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) {
  const t = useTranslations('summerCamp');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const details = program.details ?? null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${program.title} — program details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-[320px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1F396D] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-0.5">
                Program Details
              </p>
              <h3 className="font-heading font-black text-white text-base leading-tight">
                {program.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="flex-shrink-0 mt-0.5 p-1 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 w-9 h-9 flex items-center justify-center min-w-9 min-h-9"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {details ? (
          <>
            {/* Schedule strip — days per week, schedule, daily hours */}
            <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-[#1F396D]/5 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#1F396D]">
                <CalendarDays className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Days per week</p>
                  <p className="text-xs font-bold text-slate-900">{details.daysPerWeek} days</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200" aria-hidden="true" />
              <div className="flex items-center gap-2 text-[#1F396D]">
                <CalendarDays className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Schedule</p>
                  <p className="text-xs font-bold text-slate-900">
                    {details.schedule.split('\n').map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200" aria-hidden="true" />
              <div className="flex items-center gap-2 text-[#1F396D]">
                <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{details.hoursLabel ?? 'Daily hours'}</p>
                  <p className="text-xs font-bold text-slate-900">{details.dailyHours}</p>
                </div>
              </div>
            </div>

            {/* Camp season + format (shared calendar; delivery from program JSON) */}
            <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-white border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#1F396D]">
                <CalendarDays className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{t('infoModal.campDatesLabel')}</p>
                  <p className="text-xs font-bold text-slate-900">{SUMMER_CAMP_SEASON_RANGE_TEXT}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 max-[360px]:hidden" aria-hidden="true" />
              <div className="flex items-center gap-2 text-[#1F396D]">
                <CalendarDays className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{t('infoModal.seasonNoteLabel')}</p>
                  <p className="text-xs font-bold text-slate-900">{SUMMER_CAMP_JULY4_NOTE}</p>
                </div>
              </div>
              {details.deliverySummary ? (
                <>
                  <div className="w-px h-8 bg-slate-200 max-[360px]:hidden" aria-hidden="true" />
                  <div className="flex items-center gap-2 text-[#1F396D]">
                    <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{t('infoModal.deliveryLabel')}</p>
                      <p className="text-xs font-bold text-slate-900">{details.deliverySummary}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* What's included */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-3">
                What&apos;s Included
              </p>
              <ul className="space-y-2">
                {(details.includes ?? []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1F396D] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-slate-700 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="px-5 py-6">
            <p className="text-sm text-slate-600">{t('infoModal.detailsUnavailable')}</p>
          </div>
        )}

        {/* Grade group footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Grade group: </span>
          <span className="text-[10px] font-black text-slate-900">{program.ageGroup}</span>
        </div>
      </div>
    </div>
  );

  // Render into document.body via portal — keeps the modal completely outside
  // the SSR component tree, so it can never cause a hydration mismatch.
  return createPortal(modalContent, document.body);
}

export function SlotRow({
  slot,
  level,
  cartItemIds,
  onAdd,
  onRemove,
  applicationsClosed = false,
}: {
  slot: Slot;
  level: Level;
  program: Program;
  cartItemIds: Set<string>;
  onAdd: (level: Level, slot: Slot) => void;
  onRemove: (slotId: string) => void;
  applicationsClosed?: boolean;
}) {
  const t = useTranslations('summerCamp');
  const inCart = cartItemIds.has(slot.id);
  const registrationClosed =
    applicationsClosed || isJune8SummerCampRegistrationClosed(slot.label);

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-2 max-[768px]:py-2.5 ${
        inCart ? 'bg-green-50/30' : registrationClosed ? 'bg-slate-50' : ''
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className={`truncate text-[12px] font-bold leading-tight max-[768px]:whitespace-normal max-[768px]:line-clamp-2 ${
          registrationClosed ? 'text-slate-500' : 'text-slate-800'
        }`}>
          {slot.label}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0 text-[11px] text-slate-600">
          <span className="flex items-center gap-1">
            <span
              aria-hidden="true"
              className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                slot.format === 'Online' ? 'bg-sky-400' : 'bg-amber-400'
              }`}
            />
            {slot.format}
          </span>
          <span className="text-slate-700">{slot.time}</span>
          {registrationClosed ? (
            <span className="font-bold text-slate-500">
              {applicationsClosed ? 'Applications closed' : 'Registration closed'}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2.5 max-[768px]:w-full max-[768px]:justify-between max-[768px]:border-t max-[768px]:border-slate-100 max-[768px]:pt-2">
        <span className="text-[13px] font-black tabular-nums text-slate-900">${slot.price}</span>
        {registrationClosed ? (
          <EnrollmentCompactAddButton
            label="Closed"
            ariaLabel={`Registration closed for ${slot.label}`}
            onClick={() => undefined}
            disabled
          />
        ) : inCart ? (
          <EnrollmentCompactAddButton
            label={t('slots.remove')}
            ariaLabel={`${t('slots.remove')} ${slot.label}`}
            onClick={() => onRemove(slot.id)}
            variant="remove"
          />
        ) : (
          <EnrollmentCompactAddButton
            label={t('slots.add')}
            ariaLabel={`${t('slots.add')} ${slot.label}`}
            onClick={() => onAdd(level, slot)}
          />
        )}
      </div>
    </div>
  );
}

function toGlobalCartItem(program: Program, level: Level, slot: Slot) {
  return {
    id: slot.id,
    name: `${program.title} — ${level.name} — ${slot.label}`,
    price: slot.price,
    quantity: 1,
    image: program.image,
    category: program.category,
    type: 'summer-camp' as const,
    level: level.name,
  };
}

function toSummerCampAddOnCartItem(
  program: Program,
  slot: Slot,
  addOn: ProgramAddOn
): CartItem {
  return {
    id: summerCampAddOnCartItemId(slot.id, addOn.id),
    name: `${program.title} — ${addOn.name} — ${slot.label}`,
    price: addOn.price,
    quantity: 1,
    image: program.image,
    category: `${program.category} Add-on`,
    type: 'summer-camp',
    level: 'Add-on',
  };
}

export function SummerCampEmptySlotsPanel() {
  const t = useTranslations('summerCamp.enrollmentPanel');

  return (
    <EnrollmentPanelShell ariaLabel={t('emptyTitle')}>
      <div className="flex min-h-[200px] flex-col items-center justify-center px-6 py-8 text-center">
        <p className="font-heading text-base font-bold text-slate-900">{t('emptyTitle')}</p>
        <p className="mt-2 text-sm text-slate-600">{t('emptyPanel')}</p>
      </div>
    </EnrollmentPanelShell>
  );
}

export function SlotsPanel({
  program,
  programs,
  selectedProgramId,
  onSelectProgram,
  olympiadTierConfigs,
}: {
  program: Program;
  programs: readonly Program[];
  selectedProgramId: string;
  onSelectProgram: (program: Program) => void;
  olympiadTierConfigs: OlympiadTierConfig[];
}) {
  const t = useTranslations('summerCamp');
  const locale = useLocale();
  const { state: cartState, addItem, removeItem } = useCart();

  const [advMathMode, setAdvMathMode] = useState<LearningModeKey>('inPerson');
  const [advMathProgram, setAdvMathProgram] = useState<AdvMathProgramKey>('algebra');
  const [olympiadMode, setOlympiadMode] = useState<LearningModeKey>('inPerson');
  const [olympiadTier, setOlympiadTier] = useState<OlympiadTierId>('tier1');
  const [aiEntrepreneurMode, setAiEntrepreneurMode] = useState<LearningModeKey>('online');
  const [includeAiProfileAddOn, setIncludeAiProfileAddOn] = useState(false);
  const [scratchMode, setScratchMode] = useState<LearningModeKey>('online');
  const [robloxMode, setRobloxMode] = useState<LearningModeKey>('inPerson');
  const [showInfo, setShowInfo] = useState(false);

  const summerCampItemIds = useMemo(
    () => new Set(cartState.items.filter((i) => i.type === 'summer-camp').map((i) => i.id)),
    [cartState.items]
  );

  // Resolved display labels — derived from i18n, stable per render via useMemo.
  const modeLabels = useMemo<Record<LearningModeKey, string>>(
    () => ({
      inPerson: t('mode.inPerson'),
      online: t('mode.online'),
    }),
    [t]
  );

  const programLabels = useMemo<Record<AdvMathProgramKey, string>>(
    () => ({
      algebra: t('advMathProgram.algebra'),
      precalculus: t('advMathProgram.precalculus'),
    }),
    [t]
  );

  const tierLabels = useMemo<Record<OlympiadTierId, { name: string; description: string }>>(
    () => ({
      tier1: { name: t('tier.tier1.name'), description: t('tier.tier1.description') },
      tier2: { name: t('tier.tier2.name'), description: t('tier.tier2.description') },
    }),
    [t]
  );

  const isAdvMath = program.id === 'adv-math';
  const isMathOlympiad = program.id === 'math-olympiad';
  const isAiEntrepreneur = program.id === 'ai-entrepreneur';
  const isScratch = program.id === 'scratch-online' || program.id === 'scratch';
  const isRoblox = program.id === 'roblox-in-person';
  const isRoboticsCamp = program.id === 'robotics-camp';
  const applicationsClosed = isSummerCampApplicationsClosed(program.id);
  const aiProfileBuildingAddOn = useMemo(
    () =>
      isAiEntrepreneur
        ? program.addOns.find((addOn) => addOn.id === AI_PROFILE_BUILDING_ADDON_ID && addOn.active)
        : undefined,
    [isAiEntrepreneur, program.addOns]
  );

  const handleAdd = (level: Level, slot: Slot) => {
    if (applicationsClosed) return;
    if (summerCampItemIds.has(slot.id)) return;
    if (isJune8SummerCampRegistrationClosed(slot.label)) return;
    void import('@/lib/meta-pixel').then(({ trackEnrollClick }) =>
      trackEnrollClick(program.title, slot.price)
    );
    addItem(toGlobalCartItem(program, level, slot));
    if (isAiEntrepreneur && includeAiProfileAddOn && aiProfileBuildingAddOn) {
      addItem(toSummerCampAddOnCartItem(program, slot, aiProfileBuildingAddOn));
    }
  };

  const handleRemove = (slotId: string) => {
    removeItem(slotId);
    if (isAiEntrepreneur && aiProfileBuildingAddOn) {
      removeItem(summerCampAddOnCartItemId(slotId, aiProfileBuildingAddOn.id));
    }
  };

  const programSeoLink = useMemo(
    () => getSummerCampProgramSeoLink(program.id),
    [program.id]
  );
  const roboticsFullDaySeo = useMemo(
    () => (isRoboticsCamp ? getRoboticsFullDaySeoLink() : null),
    [isRoboticsCamp]
  );

  const advMathSlots: Slot[] = useMemo(() => {
    if (!isAdvMath || !program.levels[0]) return [];
    const level = program.levels[0];
    const formatMap = LEARNING_MODE_FORMAT ?? {};
    const timeMap = LEARNING_MODE_TIME ?? {};
    const format: Slot['format'] = formatMap[advMathMode] ?? 'In-Person';
    const priceByProgramAndFormat = level.priceByProgramAndFormat;
    const price =
      (priceByProgramAndFormat?.[advMathProgram]?.[format] ?? level.slots[0]?.price) ?? 0;
    return level.slots.map((s, i) => ({
      ...s,
      id: `${s.id}-${advMathMode}-${advMathProgram}`,
      label: `${formatAdvMathWeekSlotHeading(advMathProgram, i)}`,
      format,
      time: timeMap[advMathMode] ?? '9:00 AM - 12:00 PM',
      price,
    }));
  }, [isAdvMath, program, advMathMode, advMathProgram, programLabels]);

  const aiEntrepreneurSlots: Slot[] = useMemo(() => {
    if (!isAiEntrepreneur || !program.levels[0]) return [];
    const level = program.levels[0];
    const formatMap = LEARNING_MODE_FORMAT ?? {};
    const timeMap = LEARNING_MODE_TIME ?? {};
    const format: Slot['format'] = formatMap[aiEntrepreneurMode] ?? 'Online';
    const priceByProgramAndFormat = level.priceByProgramAndFormat;
    const price =
      (priceByProgramAndFormat?.default?.[format] ?? level.slots[0]?.price) ?? 0;
    return level.slots.map((s) => ({
      ...s,
      id: `${s.id}-${aiEntrepreneurMode}`,
      label: s.label,
      format,
      time: timeMap[aiEntrepreneurMode] ?? '9:00 AM - 12:00 PM',
      price,
    }));
  }, [isAiEntrepreneur, program, aiEntrepreneurMode]);

  const scratchSlots: Slot[] = useMemo(() => {
    if (!isScratch || !program.levels[0]) return [];
    const level = program.levels[0];
    const formatMap = LEARNING_MODE_FORMAT ?? {};
    const timeMap = LEARNING_MODE_TIME ?? {};
    const format: Slot['format'] = formatMap[scratchMode] ?? 'Online';
    const priceByProgramAndFormat = level.priceByProgramAndFormat;
    const price =
      (priceByProgramAndFormat?.default?.[format] ?? level.slots[0]?.price) ?? 0;
    return level.slots.map((s) => ({
      ...s,
      id: `${s.id}-${scratchMode}`,
      label: s.label,
      format,
      time: timeMap[scratchMode] ?? '9:00 AM - 12:00 PM',
      price,
    }));
  }, [isScratch, program, scratchMode]);

  const robloxSlots: Slot[] = useMemo(() => {
    if (!isRoblox || !program.levels[0]) return [];
    const level = program.levels[0];
    const formatMap = LEARNING_MODE_FORMAT ?? {};
    const timeMap = LEARNING_MODE_TIME ?? {};
    const format: Slot['format'] = formatMap[robloxMode] ?? 'In-Person';
    const priceByProgramAndFormat = level.priceByProgramAndFormat;
    const price =
      (priceByProgramAndFormat?.default?.[format] ?? level.slots[0]?.price) ?? 0;
    return level.slots.map((s) => ({
      ...s,
      id: `${s.id}-${robloxMode}`,
      label: s.label,
      format,
      time: timeMap[robloxMode] ?? '9:00 AM - 12:00 PM',
      price,
    }));
  }, [isRoblox, program, robloxMode]);

  const olympiadTierConfig = useMemo(
    () => (olympiadTierConfigs ?? []).find((c) => c.id === olympiadTier),
    [olympiadTierConfigs, olympiadTier]
  );

  const olympiadSlots: Slot[] = useMemo(() => {
    if (!isMathOlympiad || !olympiadTierConfig) return [];
    const formatMap = LEARNING_MODE_FORMAT ?? {};
    const timeMap = LEARNING_MODE_TIME ?? {};
    const format = (formatMap[olympiadMode] ?? 'In-Person') as Slot['format'];
    const price = olympiadTierConfig.priceByFormat[format];
    return Array.from({ length: olympiadTierConfig.slotCount }).map((_, i) => {
      const weekHeading =
        olympiadTierConfig.weeksPerSlot === 1
          ? formatCampWeekSlotHeading(i)
          : formatOlympiadTier2SlotHeading(i);
      return {
        id: `${olympiadTierConfig.slotId(i)}-${olympiadMode}`,
        label: weekHeading,
        time: timeMap[olympiadMode] ?? '9:00 AM - 12:00 PM',
        format,
        price,
      };
    });
  }, [isMathOlympiad, olympiadTierConfig, olympiadMode, tierLabels]);

  const pickCardMeta = getSummerCampPickCardMeta(program.id);
  const panelTitle = pickCardMeta?.title ?? program.title;

  const activeModeLabel = useMemo(() => {
    if (isAdvMath) return modeLabels[advMathMode];
    if (isMathOlympiad) return modeLabels[olympiadMode];
    if (isAiEntrepreneur) return modeLabels[aiEntrepreneurMode];
    if (isScratch) return modeLabels[scratchMode];
    if (isRoblox) return modeLabels[robloxMode];
    return pickCardMeta?.formatPill;
  }, [
    isAdvMath,
    isMathOlympiad,
    isAiEntrepreneur,
    isScratch,
    isRoblox,
    modeLabels,
    advMathMode,
    olympiadMode,
    aiEntrepreneurMode,
    scratchMode,
    robloxMode,
    pickCardMeta?.formatPill,
  ]);

  const panelMetaLine = pickCardMeta
    ? `${pickCardMeta.gradeLine} · ${pickCardMeta.dayType} · ${activeModeLabel ?? pickCardMeta.formatPill}`
    : undefined;

  const selectTriggerClass = 'h-8 rounded-lg text-[12px]';

  const renderSlotList = (slots: Slot[], level: Level) => (
    <EnrollmentPanelSlotList>
      {slots.map((slot) => (
        <SlotRow
          key={slot.id}
          slot={slot}
          level={level}
          program={program}
          cartItemIds={summerCampItemIds}
          onAdd={handleAdd}
          onRemove={handleRemove}
          applicationsClosed={applicationsClosed}
        />
      ))}
    </EnrollmentPanelSlotList>
  );

  const seoFooter =
    programSeoLink || roboticsFullDaySeo ? (
      <div className="mt-2 flex flex-col gap-1 border-t border-slate-100 pt-2">
        {programSeoLink ? (
          <Link
            href={createLocaleUrl(`/camps/${programSeoLink.slug}`, locale)}
            className="rounded-sm text-[12px] font-semibold text-[#1F396D] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {t(summerCampSeoMessagePath(programSeoLink.labelKey))}
          </Link>
        ) : null}
        {roboticsFullDaySeo ? (
          <Link
            href={createLocaleUrl(`/camps/${roboticsFullDaySeo.slug}`, locale)}
            className="rounded-sm text-[12px] font-semibold text-[#1F396D] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {t(summerCampSeoMessagePath(roboticsFullDaySeo.labelKey))}
          </Link>
        ) : null}
      </div>
    ) : null;

  return (
    <EnrollmentPanelShell ariaLabel={panelTitle}>
      {showInfo ? <InfoModal program={program} onClose={() => setShowInfo(false)} /> : null}

      <SummerMobileProgramSwitcher
        programs={programs}
        selectedProgramId={selectedProgramId}
        onSelectProgram={onSelectProgram}
      />

      <EnrollmentPanelHeader
        title={panelTitle}
        subtitle={pickCardMeta?.outcome}
        metaLine={panelMetaLine}
        topRight={
          <div className="flex items-center gap-1.5">
            {isMathOlympiad && olympiadTierConfig ? (
              <EnrollmentPanelTierBadge label={tierLabels[olympiadTierConfig.id].name} />
            ) : null}
            <EnrollmentPanelInfoButton
              onClick={() => setShowInfo(true)}
              ariaLabel={`View details for ${panelTitle}`}
            />
          </div>
        }
        footer={seoFooter}
      />

      {applicationsClosed ? (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-center text-[13px] font-semibold leading-snug text-slate-600">
          {t('slots.applicationsClosedBanner')}
        </div>
      ) : null}

      {isScratch && program.levels[0] ? (
        <>
          <EnrollmentPanelControls>
            <EnrollmentPanelDropdownsRow>
              <select
                id="scratch-format"
                value={scratchMode}
                onChange={(e) => setScratchMode(e.target.value as LearningModeKey)}
                className={enrollmentPanelSelectClass}
                aria-label={t('slots.selectMode')}
              >
                <option value="inPerson">{modeLabels.inPerson}</option>
                <option value="online">{modeLabels.online}</option>
              </select>
            </EnrollmentPanelDropdownsRow>
          </EnrollmentPanelControls>
          <EnrollmentPanelScrollBody>
            {renderSlotList(scratchSlots, program.levels[0])}
          </EnrollmentPanelScrollBody>
        </>
      ) : null}

      {isRoblox && program.levels[0] ? (
        <>
          <EnrollmentPanelControls>
            <EnrollmentPanelDropdownsRow>
              <select
                id="roblox-format"
                value={robloxMode}
                onChange={(e) => setRobloxMode(e.target.value as LearningModeKey)}
                className={enrollmentPanelSelectClass}
                aria-label={t('slots.selectMode')}
              >
                <option value="inPerson">{modeLabels.inPerson}</option>
                <option value="online">{modeLabels.online}</option>
              </select>
            </EnrollmentPanelDropdownsRow>
          </EnrollmentPanelControls>
          <EnrollmentPanelScrollBody>
            {renderSlotList(robloxSlots, program.levels[0])}
          </EnrollmentPanelScrollBody>
        </>
      ) : null}

      {isAdvMath && program.levels[0] ? (
        <>
          <EnrollmentPanelControls>
            <EnrollmentPanelDropdownsRow>
              <Select value={advMathMode} onValueChange={(v) => setAdvMathMode(v as LearningModeKey)}>
                <SelectTrigger id="adv-math-mode" className={selectTriggerClass} aria-label={t('slots.selectMode')}>
                  <SelectValue placeholder={t('slots.selectMode')} />
                </SelectTrigger>
                <SelectContent>
                  {(LEARNING_MODE_KEYS ?? []).map((key) => (
                    <SelectItem key={key} value={key}>
                      {modeLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={advMathProgram} onValueChange={(v) => setAdvMathProgram(v as AdvMathProgramKey)}>
                <SelectTrigger id="adv-math-program" className={selectTriggerClass} aria-label={t('slots.selectProgram')}>
                  <SelectValue placeholder={t('slots.selectProgram')} />
                </SelectTrigger>
                <SelectContent>
                  {(ADV_MATH_PROGRAM_KEYS ?? []).map((key) => (
                    <SelectItem key={key} value={key}>
                      {programLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </EnrollmentPanelDropdownsRow>
            <EnrollmentPanelDescriptionStrip>{t('slots.weeklyIntensiveNote')}</EnrollmentPanelDescriptionStrip>
          </EnrollmentPanelControls>
          <EnrollmentPanelScrollBody>
            {renderSlotList(advMathSlots, program.levels[0])}
          </EnrollmentPanelScrollBody>
        </>
      ) : null}

      {isAiEntrepreneur && program.levels[0] ? (
        <>
          <EnrollmentPanelControls>
            <EnrollmentPanelDropdownsRow>
              <Select
                value={aiEntrepreneurMode}
                onValueChange={(v) => setAiEntrepreneurMode(v as LearningModeKey)}
              >
                <SelectTrigger id="ai-entrepreneur-mode" className={selectTriggerClass} aria-label={t('slots.selectMode')}>
                  <SelectValue placeholder={t('slots.selectMode')} />
                </SelectTrigger>
                <SelectContent>
                  {(LEARNING_MODE_KEYS ?? []).map((key) => (
                    <SelectItem key={key} value={key}>
                      {modeLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </EnrollmentPanelDropdownsRow>
            {aiProfileBuildingAddOn ? (
              <label
                htmlFor="ai-profile-building-addon"
                className="mt-2 flex cursor-pointer items-start gap-2 rounded-lg border border-[#1F396D]/15 bg-[#1F396D]/5 px-3 py-2 text-left"
              >
                <Checkbox
                  id="ai-profile-building-addon"
                  checked={includeAiProfileAddOn}
                  onCheckedChange={(checked) => setIncludeAiProfileAddOn(checked === true)}
                  className="mt-0.5"
                  aria-label={`Add ${aiProfileBuildingAddOn.name}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center justify-between gap-2 text-[12px] font-black text-slate-900">
                    <span>{aiProfileBuildingAddOn.name}</span>
                    <span className="tabular-nums">+${aiProfileBuildingAddOn.price}</span>
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate-600">
                    {aiProfileBuildingAddOn.description}
                  </span>
                </span>
              </label>
            ) : null}
          </EnrollmentPanelControls>
          <EnrollmentPanelScrollBody>
            {renderSlotList(aiEntrepreneurSlots, program.levels[0])}
          </EnrollmentPanelScrollBody>
        </>
      ) : null}

      {isMathOlympiad && olympiadTierConfig ? (
        <>
          <EnrollmentPanelControls>
            <EnrollmentPanelDropdownsRow>
              <Select value={olympiadMode} onValueChange={(v) => setOlympiadMode(v as LearningModeKey)}>
                <SelectTrigger id="olympiad-mode" className={selectTriggerClass} aria-label={t('slots.selectMode')}>
                  <SelectValue placeholder={t('slots.selectMode')} />
                </SelectTrigger>
                <SelectContent>
                  {(LEARNING_MODE_KEYS ?? []).map((key) => (
                    <SelectItem key={key} value={key}>
                      {modeLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={olympiadTier} onValueChange={(v) => setOlympiadTier(v as OlympiadTierId)}>
                <SelectTrigger id="olympiad-tier" className={selectTriggerClass} aria-label={t('slots.selectTier')}>
                  <SelectValue placeholder={t('slots.selectTier')} />
                </SelectTrigger>
                <SelectContent>
                  {(olympiadTierConfigs ?? []).map((cfg) => (
                    <SelectItem key={cfg.id} value={cfg.id}>
                      {tierLabels[cfg.id].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </EnrollmentPanelDropdownsRow>
            <EnrollmentPanelDescriptionStrip>
              {tierLabels[olympiadTierConfig.id].description}
            </EnrollmentPanelDescriptionStrip>
          </EnrollmentPanelControls>
          <EnrollmentPanelScrollBody>
            {renderSlotList(olympiadSlots, {
              id: olympiadTierConfig.id,
              name: tierLabels[olympiadTierConfig.id].name,
              description: tierLabels[olympiadTierConfig.id].description,
              slots: [],
            })}
          </EnrollmentPanelScrollBody>
        </>
      ) : null}

      {!isAdvMath &&
      !isMathOlympiad &&
      !isAiEntrepreneur &&
      !isScratch &&
      !isRoblox
        ? program.levels.map((level) => (
            <div key={level.id} className="contents">
              {level.description ? (
                <EnrollmentPanelControls>
                  <EnrollmentPanelDescriptionStrip>{level.description}</EnrollmentPanelDescriptionStrip>
                </EnrollmentPanelControls>
              ) : null}
              <EnrollmentPanelScrollBody>
                {renderSlotList(level.slots, level)}
              </EnrollmentPanelScrollBody>
            </div>
          ))
        : null}
    </EnrollmentPanelShell>
  );
}
