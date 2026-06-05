'use client'

import { useState, useMemo, useEffect, useRef } from 'react'

const SECTIONS = [
  {
    id: 'math-1-4',
    title: 'Math Readiness — Grades 1–4',
    max: 7,
    items: [
      'Counts on fingers for basic addition or subtraction past 1st grade',
      'Cannot recall basic multiplication facts by end of 3rd grade',
      'Struggles to explain how they got an answer — guesses without process',
      'Makes the same arithmetic mistakes repeatedly — not random errors',
      'Avoids word problems or skips them entirely',
      'Confuses place value — treats 34 and 43 as similar or interchangeable',
      'Cannot identify simple fractions visually (½, ¼) by 3rd grade',
    ],
  },
  {
    id: 'math-5-8',
    title: 'Math Readiness — Grades 5–8',
    max: 7,
    items: [
      'Cannot convert between fractions, decimals, and percentages fluently',
      'Struggles with negative numbers or gets confused by signs in subtraction',
      'Cannot set up a ratio or proportion from a word problem',
      'Pre-algebra feels impossible — variables cause shutdown or refusal',
      'Makes consistent errors in multi-step problems — loses track of the process',
      'Cannot identify what operation a word problem is asking for',
      'Integrated Math 1 is assigned next year and current foundations are weak',
    ],
  },
  {
    id: 'reading',
    title: 'Reading Comprehension',
    max: 7,
    items: [
      'Reads words correctly but cannot explain what a passage means',
      'Cannot identify the main idea vs. a supporting detail',
      'Struggles to make inferences — only understands what is stated explicitly',
      'Cannot answer "why" or "how" questions about a text',
      'Avoids reading independently — prefers to be read to past 2nd grade',
      'Comprehension drops significantly when text length increases',
      'Cannot compare two texts or identify an author\'s purpose',
    ],
  },
  {
    id: 'writing',
    title: 'Writing Gaps',
    max: 7,
    items: [
      'Writes short, vague sentences without supporting detail',
      'Cannot construct a clear argument with evidence from a text',
      'Uses the same sentence structure repeatedly throughout a piece',
      'Avoids writing — freezes or shuts down when given a blank page',
      'Cannot revise their own work — does not see what is unclear',
      'Written explanations are much weaker than verbal explanations of the same idea',
      'Essays lack a clear beginning, middle, and conclusion — ideas run together',
    ],
  },
  {
    id: 'middle-school',
    title: 'Middle School Readiness — Grades 5–6 Transition',
    max: 6,
    items: [
      'Study habits are not in place — relies on parent reminders for everything',
      'Cannot manage a multi-day assignment independently from start to finish',
      'Does not review mistakes after a graded test — moves on without correction',
      'Struggles when a teacher does not re-explain every concept individually',
      'Cannot identify their own knowledge gaps — says "I get it" but scores poorly',
      'Homework takes 2–3× longer than peers without a clear reason',
    ],
  },
] as const

const CHECKLIST_ITEMS = SECTIONS.flatMap((section) =>
  section.items.map((text, itemIndex) => ({
    key: `${section.id}-${itemIndex}`,
    sectionId: section.id,
    section: section.title,
    text,
  })),
)

const GRADE_BANDS = [
  {
    id: 'grades-1-4',
    label: 'Grades 1-4',
    description: 'Elementary math, reading, and writing signals',
    sectionIds: ['math-1-4', 'reading', 'writing'],
  },
  {
    id: 'grades-5-6',
    label: 'Grades 5-6',
    description: 'Upper elementary plus middle-school transition readiness',
    sectionIds: ['math-5-8', 'reading', 'writing', 'middle-school'],
  },
  {
    id: 'grades-7-8',
    label: 'Grades 7-8',
    description: 'Middle-school math, reading, and writing signals',
    sectionIds: ['math-5-8', 'reading', 'writing'],
  },
] as const

type GradeBandId = (typeof GRADE_BANDS)[number]['id']

interface ChecklistSection {
  id: string
  name: string
  number: string
  max: number
  items: Array<{ key: string; idx: number; text: string }>
}

type ThresholdKey = 'watch' | 'clear'
type SectionClassification = 'high' | 'monitor' | 'strong'

type RankedSection = {
  id: string
  title: string
  hits: number
  max: number
  rate: number
  classification: SectionClassification
}

function getScoreRate(count: number, total: number) {
  return total > 0 ? Math.round((count / total) * 100) : 0
}

function getScoreBand(count: number, total: number) {
  const rate = getScoreRate(count, total)
  if (rate >= 30) return 'clear_pattern'
  if (rate >= 15) return 'watch'
  if (count >= 1) return 'low'
  return '0'
}

function getThresholdKey(count: number, total: number): ThresholdKey | null {
  const rate = getScoreRate(count, total)
  if (rate >= 30) return 'clear'
  if (rate >= 15) return 'watch'
  return null
}

function classifySection(rate: number): SectionClassification {
  if (rate >= 40) return 'high'
  if (rate >= 20) return 'monitor'
  return 'strong'
}

function sectionPriorityLabel(classification: SectionClassification): string {
  if (classification === 'high') return 'Priority'
  if (classification === 'monitor') return 'Watch'
  return 'Strong'
}

function sectionPriorityClass(classification: SectionClassification): string {
  if (classification === 'high') return 'bg-[#F97316] text-white'
  if (classification === 'monitor') return 'bg-yellow-300 text-slate-950'
  return 'bg-green-600 text-white'
}

function trackChecklistEvent(event: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  const analyticsWindow = window as typeof window & {
    gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void
    dataLayer?: Array<Record<string, unknown>>
  }
  analyticsWindow.gtag?.('event', event, params)
  analyticsWindow.dataLayer?.push({ event, ...params })
}

export function ReadinessChecklistClient() {
  const [gradeBandId, setGradeBandId] = useState<GradeBandId>('grades-1-4')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [showFixedScoreBar, setShowFixedScoreBar] = useState(false)
  const startedTracked = useRef(false)
  const reachedThresholds = useRef<Set<ThresholdKey>>(new Set())
  const scoreBarRef = useRef<HTMLDivElement | null>(null)
  const checklistEndRef = useRef<HTMLDivElement | null>(null)

  const selectedGradeBand = useMemo(
    () => GRADE_BANDS.find((gradeBand) => gradeBand.id === gradeBandId) ?? GRADE_BANDS[0],
    [gradeBandId],
  )

  const activeSectionIds = useMemo(
    () => new Set<string>(selectedGradeBand.sectionIds),
    [selectedGradeBand],
  )

  const activeItems = useMemo(
    () => CHECKLIST_ITEMS.filter((item) => activeSectionIds.has(item.sectionId)),
    [activeSectionIds],
  )

  const activeTotal = activeItems.length

  const handleToggle = (key: string, idx: number) => {
    const newChecked = {
      ...checked,
      [key]: !checked[key],
    }
    setChecked(newChecked)
    const nextCheckedCount = activeItems.filter((item) => newChecked[item.key]).length

    trackChecklistEvent('checklist_item_toggled', {
      checked_count: nextCheckedCount,
      total_items: activeTotal,
      grade_band: selectedGradeBand.label,
      item_section: CHECKLIST_ITEMS[idx].section,
      score_band: getScoreBand(nextCheckedCount, activeTotal),
    })
  }

  const checkedCount = activeItems.filter((item) => checked[item.key]).length
  const pct = getScoreRate(checkedCount, activeTotal)

  const sections = useMemo(() => {
    const grouped: Record<string, ChecklistSection> = {}
    activeItems.forEach((item) => {
      const idx = CHECKLIST_ITEMS.findIndex((checklistItem) => checklistItem.key === item.key)
      if (!grouped[item.section]) {
        const sectionIndex = SECTIONS.findIndex((section) => section.title === item.section)
        grouped[item.section] = {
          id: SECTIONS[sectionIndex]?.id ?? item.section,
          name: item.section,
          number: String(sectionIndex + 1).padStart(2, '0'),
          max: SECTIONS[sectionIndex]?.max ?? 0,
          items: [],
        }
      }
      grouped[item.section].items.push({ key: item.key, idx, text: item.text })
    })
    return Object.values(grouped)
  }, [activeItems])

  const sectionScores = useMemo<Record<string, RankedSection>>(() => {
    return Object.fromEntries(SECTIONS.filter((section) => activeSectionIds.has(section.id)).map((section) => {
      const hits = section.items.filter((_, itemIndex) => checked[`${section.id}-${itemIndex}`]).length
      const rate = Math.round((hits / section.max) * 100)
      const score = {
        id: section.id,
        title: section.title,
        hits,
        max: section.max,
        rate,
        classification: classifySection(rate),
      }
      return [section.id, score]
    }))
  }, [activeSectionIds, checked])

  const rankedSections = useMemo<RankedSection[]>(() => {
    return Object.values(sectionScores)
      .filter((section) => section.hits > 0)
      .sort((a, b) => b.rate - a.rate || b.hits - a.hits)
  }, [sectionScores])

  const flaggedSections = useMemo(
    () => rankedSections.filter((section) => section.classification !== 'strong').slice(0, 3),
    [rankedSections],
  )

  useEffect(() => {
    if (checkedCount > 0 && !startedTracked.current) {
      startedTracked.current = true
      trackChecklistEvent('checklist_started', {
        checked_count: checkedCount,
        total_items: activeTotal,
        grade_band: selectedGradeBand.label,
      })
    }

    const threshold = getThresholdKey(checkedCount, activeTotal)
    if (threshold && !reachedThresholds.current.has(threshold)) {
      reachedThresholds.current.add(threshold)
      trackChecklistEvent(`score_${threshold}_reached`, {
        checked_count: checkedCount,
        total_items: activeTotal,
        grade_band: selectedGradeBand.label,
        score_band: getScoreBand(checkedCount, activeTotal),
      })
    }
  }, [activeTotal, checkedCount, selectedGradeBand.label])

  const scoreMessage = useMemo(() => {
    if (checkedCount === 0) {
      return { text: 'Check the signs that apply to your child.', alert: false }
    } else if (pct < 15) {
      const plural = checkedCount > 1 ? 's' : ''
      return { text: `${checkedCount} sign${plural} identified — low concern. Monitor if it repeats.`, alert: false }
    } else if (pct < 30) {
      return { text: `${checkedCount} signs identified — watch for a repeated pattern.`, alert: true }
    } else {
      return { text: `${checkedCount} signs identified — a clear pattern has emerged.`, alert: true }
    }
  }, [checkedCount, pct])

  const resultBlock = useMemo(() => {
    if (checkedCount < 2) {
      return null
    }
    const priority = flaggedSections[0] ?? rankedSections[0]
    const flaggedCount = flaggedSections.length
    const hasPriorityArea = flaggedSections.some((section) => section.classification === 'high')
    const highIntent = pct >= 30 || hasPriorityArea
    const priorityLine = priority
      ? `Highest concentration: ${priority.title} — ${priority.hits} of ${priority.max} signs.`
      : ''
    const alsoFlagged = flaggedSections.slice(1).map((section) => section.title)
    const alsoLine = alsoFlagged.length ? ` Also watch: ${alsoFlagged.join(', ')}.` : ''
    const overallLine = `Overall score: ${checkedCount} of ${activeTotal} signs (${pct}%).`
    const body = `${overallLine} ${priorityLine}${alsoLine}`.trim()

    if (!highIntent) {
      return {
        title: priority ? `Early pattern worth watching in ${priority.title}` : 'Early pattern worth watching',
        text: body,
        highIntent: false,
        visible: true,
      }
    }

    return {
      title: `Clear pattern across ${Math.max(flaggedCount, 1)} area${Math.max(flaggedCount, 1) > 1 ? 's' : ''}`,
      text: body,
      highIntent: true,
      visible: true,
    }
  }, [activeTotal, checkedCount, flaggedSections, pct, rankedSections])

  useEffect(() => {
    const updateFixedScoreBar = () => {
      const scoreBar = scoreBarRef.current
      const checklistEnd = checklistEndRef.current
      if (!scoreBar || !checklistEnd) {
        setShowFixedScoreBar(false)
        return
      }

      const scoreBarTop = scoreBar.getBoundingClientRect().top
      const checklistEndBottom = checklistEnd.getBoundingClientRect().bottom
      setShowFixedScoreBar(scoreBarTop <= 12 && checklistEndBottom > 120)
    }

    updateFixedScoreBar()
    window.addEventListener('scroll', updateFixedScoreBar, { passive: true })
    window.addEventListener('resize', updateFixedScoreBar)

    return () => {
      window.removeEventListener('scroll', updateFixedScoreBar)
      window.removeEventListener('resize', updateFixedScoreBar)
    }
  }, [activeTotal, checkedCount, gradeBandId])

  const scoreBarContent = (
    <>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {selectedGradeBand.label} score
          </span>
          <span className="block text-sm font-semibold text-[#1E3A5F]">
            {scoreMessage.text}
          </span>
        </div>
        <span className="shrink-0 text-3xl font-black tabular-nums text-[#1E3A5F] sm:text-4xl">
          {checkedCount}
          <span className="text-base font-bold text-slate-400">/{activeTotal}</span>
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#F97316] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </>
  )

  return (
    <div id="checklist-start" className="space-y-10 scroll-mt-24">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="grade-band-heading">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
          Step 1
        </p>
        <h2 id="grade-band-heading" className="font-heading text-xl font-black text-[#1E3A5F]">
          Choose the student&apos;s current grade band.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          The checklist and score will use only the sections that apply to that grade band.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {GRADE_BANDS.map((gradeBand) => {
            const isSelected = gradeBand.id === gradeBandId
            return (
              <button
                key={gradeBand.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  const nextSectionIds = new Set<string>(gradeBand.sectionIds)
                  const nextActiveItems = CHECKLIST_ITEMS.filter((item) => nextSectionIds.has(item.sectionId))
                  setGradeBandId(gradeBand.id)
                  reachedThresholds.current.clear()
                  trackChecklistEvent('checklist_grade_band_selected', {
                    grade_band: gradeBand.label,
                    checked_count: nextActiveItems.filter((item) => checked[item.key]).length,
                    total_items: nextActiveItems.length,
                  })
                }}
                className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                  isSelected
                    ? 'border-[#F97316] bg-[#FFF7ED] text-[#1E3A5F] ring-1 ring-[#F97316]/30'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-[#1E3A5F]/30 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm font-black">{gradeBand.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                  {gradeBand.description}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <div
        ref={scoreBarRef}
        className="sticky top-3 z-40 rounded-2xl border border-[#1E3A5F]/20 bg-white/95 p-4 shadow-lg backdrop-blur sm:p-5"
      >
        {scoreBarContent}
      </div>

      {showFixedScoreBar ? (
        <div className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6 lg:px-8" aria-live="polite">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#1E3A5F]/20 bg-white/95 p-4 shadow-xl backdrop-blur sm:p-5">
            {scoreBarContent}
          </div>
        </div>
      ) : null}

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative overflow-hidden border-l-4 border-[#F97316] bg-[#1E3A5F] px-5 py-4 text-white">
              <span className="pointer-events-none absolute -right-2 -top-8 text-7xl font-black text-[#F97316]/20">
                {section.number}
              </span>
              <div className="relative space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.12em]">
                    {section.name}
                  </h2>
                  {sectionScores[section.id]?.hits > 0 ? (
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${sectionPriorityClass(sectionScores[section.id].classification)}`}
                    >
                      {sectionPriorityLabel(sectionScores[section.id].classification)}
                    </span>
                  ) : null}
                </div>
                {sectionScores[section.id]?.hits > 0 ? (
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-[#F97316] transition-all duration-500 ease-out"
                        style={{ width: `${sectionScores[section.id].rate}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-black tabular-nums text-white">
                      {sectionScores[section.id].hits}/{sectionScores[section.id].max}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {section.items.map(({ key, idx, text }) => {
                const isChecked = Boolean(checked[key])
                return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleToggle(key, idx)}
                  aria-pressed={isChecked}
                  className={`flex min-h-12 w-full items-start gap-3 p-4 text-left transition-colors duration-200 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-inset ${
                    isChecked ? 'bg-[#FFF7ED]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ease-out ${
                      isChecked
                        ? 'scale-110 border-[#F97316] bg-[#F97316]'
                        : 'scale-100 border-[#1E3A5F] bg-white'
                    }`}
                  >
                    {isChecked && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <span
                    className={`flex-1 text-sm leading-normal ${
                      isChecked ? 'text-[#1E3A5F] font-medium' : 'text-slate-900'
                    }`}
                  >
                    {text}
                  </span>
                </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div ref={checklistEndRef} aria-hidden="true" />

      {/* Dynamic Result Block */}
      {resultBlock && resultBlock.visible && (
        <div
          className={`rounded-2xl border-2 p-7 text-center shadow-sm transition-all ${
            resultBlock.highIntent
              ? 'border-[#F97316] bg-[#F97316] text-white'
              : 'border-[#F97316]/30 bg-[#FFF7ED] text-[#1E3A5F]'
          }`}
        >
          <p className={`mb-2 text-xs font-black uppercase tracking-[0.18em] ${resultBlock.highIntent ? 'text-white/80' : 'text-[#F97316]'}`}>
            Result
          </p>
          <h3 className="mb-2 text-2xl font-black">{resultBlock.title}</h3>
          <p className={`mx-auto mb-5 max-w-2xl text-sm leading-relaxed ${resultBlock.highIntent ? 'text-white/90' : 'text-slate-700'}`}>
            {resultBlock.text}
          </p>
          {flaggedSections.length > 0 ? (
            <div className="mx-auto mb-5 grid max-w-2xl gap-2 sm:grid-cols-3">
              {flaggedSections.map((section) => (
                <div
                  key={section.id}
                  className={`rounded-lg px-3 py-2 text-left text-xs ${
                    resultBlock.highIntent ? 'bg-white/15 text-white' : 'bg-white text-[#1E3A5F]'
                  }`}
                >
                  <p className="font-black leading-snug">{section.title}</p>
                  <p className={resultBlock.highIntent ? 'text-white/80' : 'text-slate-600'}>
                    {section.hits}/{section.max} signs · {section.rate}%
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
