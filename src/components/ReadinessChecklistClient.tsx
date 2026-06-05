'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import {
  READINESS_CHECKLIST_ITEMS,
  READINESS_GRADE_BANDS,
  READINESS_SECTIONS,
  getReadinessActiveItems,
  type ReadinessGradeBandId,
} from '@/lib/readiness-checklist-data'

interface ChecklistSection {
  id: string
  name: string
  number: string
  items: Array<{ key: string; idx: number; text: string }>
}

type ThresholdKey = 'watch' | 'clear'

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
  const [gradeBandId, setGradeBandId] = useState<ReadinessGradeBandId>('grades-1-4')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [evaluationReadyKey, setEvaluationReadyKey] = useState('')
  const [showFixedScoreBar, setShowFixedScoreBar] = useState(false)
  const [exportError, setExportError] = useState('')
  const startedTracked = useRef(false)
  const reachedThresholds = useRef<Set<ThresholdKey>>(new Set())
  const scoreBarRef = useRef<HTMLDivElement | null>(null)
  const checklistEndRef = useRef<HTMLDivElement | null>(null)

  const selectedGradeBand = useMemo(
    () =>
      READINESS_GRADE_BANDS.find((gradeBand) => gradeBand.id === gradeBandId) ??
      READINESS_GRADE_BANDS[0],
    [gradeBandId],
  )

  const activeItems = useMemo(() => getReadinessActiveItems(gradeBandId), [gradeBandId])
  const activeTotal = activeItems.length
  const checkedCount = activeItems.filter((item) => checked[item.key]).length
  const pct = getScoreRate(checkedCount, activeTotal)

  const selectedKeySignature = activeItems
    .filter((item) => checked[item.key])
    .map((item) => item.key)
    .join('|')
  const evaluationKey = `${gradeBandId}:${selectedKeySignature}`
  const evaluationStatus =
    checkedCount < 2 ? 'idle' : evaluationReadyKey === evaluationKey ? 'ready' : 'evaluating'

  const sections = useMemo(() => {
    const grouped: Record<string, ChecklistSection> = {}
    activeItems.forEach((item) => {
      const idx = READINESS_CHECKLIST_ITEMS.findIndex((checklistItem) => checklistItem.key === item.key)
      const sectionIndex = READINESS_SECTIONS.findIndex((section) => section.id === item.sectionId)
      if (!grouped[item.sectionId]) {
        grouped[item.sectionId] = {
          id: item.sectionId,
          name: item.section,
          number: String(sectionIndex + 1).padStart(2, '0'),
          items: [],
        }
      }
      grouped[item.sectionId].items.push({ key: item.key, idx, text: item.text })
    })
    return Object.values(grouped)
  }, [activeItems])

  const handleToggle = (key: string, idx: number) => {
    const newChecked = {
      ...checked,
      [key]: !checked[key],
    }
    setChecked(newChecked)
    setExportError('')
    const nextCheckedCount = activeItems.filter((item) => newChecked[item.key]).length

    trackChecklistEvent('checklist_item_toggled', {
      checked_count: nextCheckedCount,
      total_items: activeTotal,
      grade_band: selectedGradeBand.label,
      item_section: READINESS_CHECKLIST_ITEMS[idx]?.section ?? 'Unknown',
      score_band: getScoreBand(nextCheckedCount, activeTotal),
    })
  }

  useEffect(() => {
    if (checkedCount < 2) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setEvaluationReadyKey(evaluationKey)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [checkedCount, evaluationKey])

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

  const scoreMessage = useMemo(() => {
    if (checkedCount === 0) {
      return 'Check the signs that apply to your child.'
    }
    if (evaluationStatus === 'evaluating') {
      return 'Evaluating selected signs for the report.'
    }
    if (evaluationStatus === 'ready') {
      return 'Evaluation report ready.'
    }
    const plural = checkedCount > 1 ? 's' : ''
    return `${checkedCount} sign${plural} selected. Continue checking if more apply.`
  }, [checkedCount, evaluationStatus])

  const resultBlock = useMemo(() => {
    if (checkedCount < 2) return null
    const isEvaluating = evaluationStatus === 'evaluating'
    return {
      title: isEvaluating ? 'Evaluating...' : 'Evaluation report ready',
      text: isEvaluating
        ? 'Processing the selected signs across the relevant grade-band sections.'
        : 'Export the report to see the detailed interpretation and suggested next steps.',
    }
  }, [checkedCount, evaluationStatus])

  const handleExportReport = async () => {
    if (evaluationStatus !== 'ready') return

    const reportWindow = window.open('', '_blank')
    if (!reportWindow) {
      setExportError('Please allow pop-ups to export the report.')
      return
    }

    reportWindow.document.write(`<!doctype html><html><head><title>Preparing report</title></head><body style="font-family: Arial, sans-serif; padding: 32px;"><p>Preparing evaluation report...</p></body></html>`)
    reportWindow.document.close()

    try {
      const response = await fetch('/api/readiness-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeBandId,
          selectedKeys: activeItems.filter((item) => checked[item.key]).map((item) => item.key),
        }),
      })
      const payload = (await response.json()) as { success?: boolean; html?: string; error?: string }

      if (!response.ok || !payload.success || typeof payload.html !== 'string') {
        throw new Error(payload.error ?? 'Report generation failed')
      }

      reportWindow.document.open()
      reportWindow.document.write(payload.html)
      reportWindow.document.close()
      setExportError('')

      trackChecklistEvent('readiness_report_export_clicked', {
        checked_count: checkedCount,
        total_items: activeTotal,
        grade_band: selectedGradeBand.label,
        score_band: getScoreBand(checkedCount, activeTotal),
      })
    } catch {
      reportWindow.document.open()
      reportWindow.document.write(`<!doctype html><html><head><title>Report unavailable</title></head><body style="font-family: Arial, sans-serif; padding: 32px; color: #14213d;"><h1>Report unavailable</h1><p>Please return to the checklist and try exporting again.</p></body></html>`)
      reportWindow.document.close()
      setExportError('Could not generate the report. Please try again.')
    }
  }

  const scoreBarContent = (
    <>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {selectedGradeBand.label} score
          </span>
          <span className="block text-sm font-semibold text-[#1E3A5F]">{scoreMessage}</span>
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
          {READINESS_GRADE_BANDS.map((gradeBand) => {
            const isSelected = gradeBand.id === gradeBandId
            return (
              <button
                key={gradeBand.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  const nextActiveItems = getReadinessActiveItems(gradeBand.id)
                  setGradeBandId(gradeBand.id)
                  setExportError('')
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
          <div key={section.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative overflow-hidden border-l-4 border-[#F97316] bg-[#1E3A5F] px-5 py-4 text-white">
              <span className="pointer-events-none absolute -right-2 -top-8 text-7xl font-black text-[#F97316]/20">
                {section.number}
              </span>
              <h2 className="relative text-sm font-black uppercase tracking-[0.12em]">
                {section.name}
              </h2>
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
                    className={`flex min-h-12 w-full select-none items-start gap-3 p-4 text-left transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-inset ${
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
                      {isChecked && <span className="text-xs font-bold text-white">✓</span>}
                    </div>
                    <span
                      className={`flex-1 text-sm leading-normal ${
                        isChecked ? 'font-medium text-[#1E3A5F]' : 'text-slate-900'
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

      {resultBlock ? (
        <div className="rounded-2xl border-2 border-[#F97316] bg-[#F97316] p-7 text-center text-white shadow-sm transition-all">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
            Result
          </p>
          <h3 className="mb-2 text-2xl font-black">{resultBlock.title}</h3>
          <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-white/90">
            {resultBlock.text}
          </p>
          <button
            type="button"
            onClick={handleExportReport}
            disabled={evaluationStatus !== 'ready'}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-black text-[#1E3A5F] transition-colors hover:bg-[#EFF6FF] disabled:cursor-wait disabled:bg-white/70"
          >
            {evaluationStatus === 'evaluating' ? 'Evaluating...' : 'Export evaluation report'}
          </button>
          {exportError ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-white">{exportError}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
