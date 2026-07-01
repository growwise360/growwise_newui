'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

import {
  READINESS_CHECKLIST_ITEMS,
  READINESS_GRADE_BANDS,
  READINESS_SECTIONS,
  getReadinessActiveItems,
  type ReadinessGradeBandId,
} from '@/lib/readiness-checklist-data'
import { publicPath } from '@/lib/publicPath'

interface ChecklistSection {
  id: string
  name: string
  number: string
  items: Array<{ key: string; idx: number; text: string }>
}

type ThresholdKey = 'watch' | 'clear'

const READINESS_FEEDBACK_SESSION_KEY = 'growwise_readiness_feedback_state'
const READINESS_SHARE_URL = 'https://growwiseschool.org/readinesschecklist'
const REPORT_FEEDBACK_EMAIL = 'contact@growwiseschool.org'

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

function shouldUseInlineReportWindow() {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  const isMobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
  return isMobileUa || isCoarsePointer
}

export function ReadinessChecklistClient() {
  const locale = useLocale()
  const [gradeBandId, setGradeBandId] = useState<ReadinessGradeBandId>('grades-1-4')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [evaluationReadyKey, setEvaluationReadyKey] = useState('')
  const [showFixedScoreBar, setShowFixedScoreBar] = useState(false)
  const [exportError, setExportError] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null)
  const [shareCopied, setShareCopied] = useState(false)
  const startedTracked = useRef(false)
  const reachedThresholds = useRef<Set<ThresholdKey>>(new Set())
  const feedbackTimerRef = useRef<number | null>(null)
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

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current)
      }
    }
  }, [])

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

  const assessmentHref = publicPath('/book-assessment?source=readiness-checklist-result', locale)

  const hasFeedbackSessionState = () => {
    if (typeof window === 'undefined') return true
    return Boolean(window.sessionStorage.getItem(READINESS_FEEDBACK_SESSION_KEY))
  }

  const scheduleFeedbackPrompt = () => {
    if (typeof window === 'undefined' || hasFeedbackSessionState()) return

    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current)
    }

    feedbackTimerRef.current = window.setTimeout(() => {
      if (hasFeedbackSessionState()) return
      setFeedbackVisible(true)
      trackChecklistEvent('readiness_feedback_shown', {
        checked_count: checkedCount,
        total_items: activeTotal,
        grade_band: selectedGradeBand.label,
      })
    }, 5000)
  }

  const handleDismissFeedback = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(READINESS_FEEDBACK_SESSION_KEY, 'dismissed')
    }
    setFeedbackVisible(false)
    trackChecklistEvent('readiness_feedback_dismissed', {
      checked_count: checkedCount,
      total_items: activeTotal,
      grade_band: selectedGradeBand.label,
    })
  }

  const handleFeedbackRating = (rating: number) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(READINESS_FEEDBACK_SESSION_KEY, `rated:${rating}`)
    }
    setFeedbackRating(rating)
    setShareCopied(false)
    trackChecklistEvent('readiness_feedback_rated', {
      rating,
      checked_count: checkedCount,
      total_items: activeTotal,
      grade_band: selectedGradeBand.label,
    })
  }

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(READINESS_SHARE_URL)
      setShareCopied(true)
      trackChecklistEvent('readiness_feedback_link_copied', {
        rating: feedbackRating ?? 0,
        grade_band: selectedGradeBand.label,
      })
    } catch {
      setShareCopied(false)
    }
  }

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

      if (shouldUseInlineReportWindow()) {
        reportWindow.document.open()
        reportWindow.document.write(payload.html)
        reportWindow.document.close()
      } else {
        const reportUrl = URL.createObjectURL(new Blob([payload.html], { type: 'text/html' }))
        reportWindow.location.href = reportUrl
        window.setTimeout(() => URL.revokeObjectURL(reportUrl), 60000)
      }
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
          {evaluationStatus === 'ready' ? (
            <div className="mx-auto mt-5 max-w-2xl rounded-xl bg-white/15 p-4">
              <p className="text-sm font-semibold text-white">
                Want us to check what these signs mean for your child?
              </p>
              <Link
                href={assessmentHref}
                onClick={() =>
                  trackChecklistEvent('readiness_assessment_cta_clicked', {
                    checked_count: checkedCount,
                    total_items: activeTotal,
                    grade_band: selectedGradeBand.label,
                    score_band: getScoreBand(checkedCount, activeTotal),
                  })
                }
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1E3A5F] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#142D4C]"
              >
                Book an assessment
              </Link>
            </div>
          ) : null}
          {exportError ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-white">{exportError}</p>
          ) : null}
          {feedbackVisible ? (
            <div className="mx-auto mt-6 max-w-2xl border border-slate-200 border-l-[3px] border-l-[#F97316] bg-white p-5 text-left text-slate-900 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-black text-[#1E3A5F]">Was this helpful?</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Your rating helps us improve this free resource. No email required.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDismissFeedback}
                  aria-label="Dismiss feedback"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold leading-none text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Rate this report">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const selected = feedbackRating === rating
                  return (
                    <button
                      key={rating}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={`${rating} star${rating === 1 ? '' : 's'}`}
                      onClick={() => handleFeedbackRating(rating)}
                      className={`min-h-10 rounded-full border bg-white px-3 text-xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                        selected
                          ? 'border-[#F97316] text-[#F97316]'
                          : 'border-slate-200 text-slate-400 hover:border-[#F97316]/60 hover:text-[#F97316]'
                      }`}
                    >
                      ★
                    </button>
                  )
                })}
              </div>

              {feedbackRating ? (
                <div className="mt-4 border-t border-slate-200 pt-4" aria-live="polite">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#F97316]">
                    Rating saved
                  </p>
                  {feedbackRating >= 4 ? (
                    <>
                      <p className="text-sm font-semibold text-[#1E3A5F]">
                        Thank you. Want to share it with another parent or academic support institution?
                      </p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <input
                          readOnly
                          value={READINESS_SHARE_URL}
                          aria-label="Readiness checklist share URL"
                          className="min-h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
                        />
                        <button
                          type="button"
                          onClick={handleCopyShareUrl}
                          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#1E3A5F] bg-white px-4 text-sm font-black text-[#1E3A5F] transition-colors hover:bg-slate-50"
                        >
                          {shareCopied ? 'Copied' : 'Copy link'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[#1E3A5F]">
                        Thank you. We&apos;ll use this to make the report clearer.
                      </p>
                      <p className="text-sm leading-relaxed text-slate-600">
                        If something in the report does not look correct, email us at{' '}
                        <a href={`mailto:${REPORT_FEEDBACK_EMAIL}`} className="font-bold text-[#1E3A5F] underline underline-offset-2">
                          {REPORT_FEEDBACK_EMAIL}
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
