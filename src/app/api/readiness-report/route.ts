import { NextResponse } from 'next/server'

import { isOriginAllowed } from '@/lib/requestGuard'
import {
  READINESS_SECTIONS,
  getReadinessActiveItems,
  getReadinessGradeBand,
} from '@/lib/readiness-checklist-data'

type SectionClassification = 'priority' | 'watch' | 'steady'

interface SectionScore {
  id: string
  title: string
  hits: number
  max: number
  rate: number
  classification: SectionClassification
  selectedSigns: string[]
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getScoreRate(count: number, total: number) {
  return total > 0 ? Math.round((count / total) * 100) : 0
}

function classifySection(hits: number, max: number): SectionClassification {
  const rate = getScoreRate(hits, max)
  if (rate >= 40 || hits >= 4) return 'priority'
  if (rate >= 20 || hits >= 2) return 'watch'
  return 'steady'
}

function sectionPriorityLabel(classification: SectionClassification) {
  if (classification === 'priority') return 'Review first'
  if (classification === 'watch') return 'Watch closely'
  return 'Normal monitoring'
}

function getOverallInterpretation(count: number, total: number) {
  const rate = getScoreRate(count, total)
  if (count === 0) {
    return {
      label: 'No clear pattern selected',
      meaning:
        'No readiness signs were selected for this grade band. From this checklist alone, there is no obvious academic readiness pattern.',
      nextStep:
        'Continue normal monitoring, especially during grade transitions or if homework suddenly becomes harder.',
    }
  }
  if (count <= 2 && rate < 15) {
    return {
      label: 'Strong foundation with a few signs to watch',
      meaning:
        'Only a small number of signs were selected. This does not suggest a broad readiness concern, but repeated signs still deserve attention.',
      nextStep:
        'Watch the selected signs for two to three weeks. If the same issue repeats across assignments, bring one concrete example to the teacher or program lead.',
    }
  }
  if (rate < 30) {
    return {
      label: 'Early action recommended',
      meaning:
        'Several grade-relevant signs were selected. This may point to an emerging pattern, especially if the same signs show up in classwork, homework, or tests.',
      nextStep:
        'Start with the area that has the highest concentration. Compare the checklist signs with recent schoolwork before adding more practice.',
    }
  }
  return {
    label: 'Clear pattern identified',
    meaning:
      'The selected signs are concentrated enough to suggest a clear academic readiness pattern for this grade band.',
    nextStep:
      'Use this report to guide a structured conversation with a teacher, school program lead, aftercare director, or academic support provider.',
  }
}

function getSectionInterpretation(section: SectionScore) {
  if (section.classification === 'priority') {
    return {
      meaning:
        'This area has the strongest concentration of selected signs and should be reviewed first.',
      nextStep:
        'Choose one or two specific skills from this section and compare them with recent assignments, tests, or teacher feedback.',
    }
  }
  if (section.classification === 'watch') {
    return {
      meaning:
        'This area shows enough signs to watch. It may be an emerging gap or a support habit that has not fully settled yet.',
      nextStep:
        'Track whether the same signs repeat over the next few assignments. Repetition matters more than one difficult day.',
    }
  }
  return {
    meaning:
      'This area does not currently show a concentrated pattern based on the selected signs.',
    nextStep:
      'Keep this area in normal monitoring unless new signs appear or school feedback points in the same direction.',
  }
}

function buildReportHtml({
  gradeBandLabel,
  checkedCount,
  activeTotal,
  sectionScores,
}: {
  gradeBandLabel: string
  checkedCount: number
  activeTotal: number
  sectionScores: SectionScore[]
}) {
  const pct = getScoreRate(checkedCount, activeTotal)
  const overall = getOverallInterpretation(checkedCount, activeTotal)
  const generatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date())

  const sectionRows = sectionScores
    .map((section) => {
      const interpretation = getSectionInterpretation(section)
      const selectedList = section.selectedSigns.length
        ? `<ul>${section.selectedSigns.map((sign) => `<li>${escapeHtml(sign)}</li>`).join('')}</ul>`
        : '<p class="muted">No signs selected in this section.</p>'

      return `
        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(section.title)}</h2>
            <span>${escapeHtml(sectionPriorityLabel(section.classification))}</span>
          </div>
          <p>${section.hits} of ${section.max} signs selected (${section.rate}% section concentration).</p>
          <p><strong>Interpretation:</strong> ${escapeHtml(interpretation.meaning)}</p>
          <p><strong>Suggested next step:</strong> ${escapeHtml(interpretation.nextStep)}</p>
          <p><strong>Selected signs:</strong></p>
          ${selectedList}
        </section>
      `
    })
    .join('')

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GrowWise Readiness Evaluation Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #14213d; margin: 32px; line-height: 1.45; }
          .eyebrow { color: #f97316; font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; }
          h1 { color: #1E3A5F; margin: 8px 0 10px; font-size: 30px; }
          h2 { color: #1E3A5F; font-size: 18px; margin: 0; }
          .summary { border: 1px solid #d9e2ef; border-radius: 14px; padding: 18px; margin: 22px 0; background: #f8fafc; }
          .score { font-size: 34px; font-weight: 900; color: #f97316; margin: 6px 0; }
          .section { border-top: 1px solid #d9e2ef; padding: 18px 0; break-inside: avoid; }
          .section-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
          .section-head span { border-radius: 999px; background: #fff7ed; color: #9a3412; padding: 5px 10px; font-size: 11px; font-weight: 800; text-transform: uppercase; white-space: nowrap; }
          ul { margin: 10px 0 0 20px; padding: 0; }
          li { margin: 6px 0; }
          .muted { color: #64748b; }
          .disclaimer { margin-top: 24px; padding-top: 14px; border-top: 1px solid #d9e2ef; color: #64748b; font-size: 12px; }
          .actions { margin: 22px 0; }
          button { border: 0; border-radius: 10px; background: #f97316; color: white; cursor: pointer; font-weight: 800; padding: 11px 18px; }
          @media print { .actions { display: none; } body { margin: 20px; } }
        </style>
      </head>
      <body>
        <p class="eyebrow">GrowWise evaluation report</p>
        <h1>Math & Reading Readiness Checklist</h1>
        <p class="muted">Generated ${escapeHtml(generatedAt)} · ${escapeHtml(gradeBandLabel)}</p>
        <div class="summary">
          <p class="eyebrow">Overall score</p>
          <p class="score">${checkedCount}/${activeTotal}</p>
          <p>${pct}% of grade-relevant signs were selected.</p>
          <p><strong>${escapeHtml(overall.label)}:</strong> ${escapeHtml(overall.meaning)}</p>
          <p><strong>Suggested next step:</strong> ${escapeHtml(overall.nextStep)}</p>
        </div>
        <div class="actions">
          <button onclick="window.print()">Download / Save as PDF</button>
        </div>
        ${sectionRows}
        <p class="disclaimer">
          This report is an educational pattern-finding tool, not a diagnosis. Use it as a discussion aid with a teacher,
          school program lead, aftercare director, or qualified academic support provider.
        </p>
        <script>window.addEventListener('load', () => setTimeout(() => window.print(), 250));</script>
      </body>
    </html>`
}

export async function POST(req: Request) {
  if (!isOriginAllowed(req)) {
    return jsonError('Origin not allowed', 403)
  }

  const length = Number(req.headers.get('content-length') ?? 0)
  if (length > 8192) {
    return jsonError('Request too large', 413)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return jsonError('Invalid JSON', 400)
  }

  if (!body || typeof body !== 'object') {
    return jsonError('Invalid request', 400)
  }

  const { gradeBandId, selectedKeys } = body as {
    gradeBandId?: unknown
    selectedKeys?: unknown
  }

  if (typeof gradeBandId !== 'string' || !Array.isArray(selectedKeys)) {
    return jsonError('Invalid request', 400)
  }

  const gradeBand = getReadinessGradeBand(gradeBandId)
  if (!gradeBand) {
    return jsonError('Invalid grade band', 400)
  }

  const activeItems = getReadinessActiveItems(gradeBandId)
  const activeKeySet = new Set(activeItems.map((item) => item.key))
  const cleanKeys = Array.from(
    new Set(selectedKeys.filter((key): key is string => typeof key === 'string' && activeKeySet.has(key))),
  )
  if (cleanKeys.length > activeItems.length) {
    return jsonError('Invalid selection', 400)
  }

  const selectedKeySet = new Set(cleanKeys)
  const gradeBandSectionIds = new Set<string>(gradeBand.sectionIds)
  const sectionScores = READINESS_SECTIONS.filter((section) => gradeBandSectionIds.has(section.id)).map(
    (section) => {
      const selectedSigns = section.items.filter((_, index) => selectedKeySet.has(`${section.id}-${index}`))
      const hits = selectedSigns.length
      const max = section.items.length
      return {
        id: section.id,
        title: section.title,
        hits,
        max,
        rate: getScoreRate(hits, max),
        classification: classifySection(hits, max),
        selectedSigns,
      }
    },
  )

  const html = buildReportHtml({
    gradeBandLabel: gradeBand.label,
    checkedCount: cleanKeys.length,
    activeTotal: activeItems.length,
    sectionScores,
  })

  return NextResponse.json({ success: true, html })
}
