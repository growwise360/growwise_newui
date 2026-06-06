import { NextResponse } from 'next/server'

import { isOriginAllowed } from '@/lib/requestGuard'
import {
  READINESS_SECTIONS,
  getReadinessActiveItems,
  getReadinessGradeBand,
} from '@/lib/readiness-checklist-data'

type SectionClassification = 'priority' | 'watch' | 'steady'

const REPORT_FEEDBACK_EMAIL = 'contact@growwiseschool.org'

interface SectionScore {
  id: string
  title: string
  hits: number
  max: number
  rate: number
  classification: SectionClassification
  selectedSigns: string[]
}

interface RubricRow {
  skill: string
  whenStrong: string
  whenWeak: string
  firstStep: string
}

const SECTION_RUBRICS: Record<string, RubricRow[]> = {
  'math-1-4': [
    {
      skill: 'Number Facts',
      whenStrong: 'Recalls addition, subtraction, and multiplication facts with increasing automaticity.',
      whenWeak: 'Counts on fingers, uses tally marks, or takes extra time on facts that should be automatic.',
      firstStep: 'Use 5 minutes of daily verbal recall and short games. Speed matters after accuracy is stable.',
    },
    {
      skill: 'Place Value',
      whenStrong: 'Explains the position and value of each digit in a number.',
      whenWeak: 'Treats digits as separate numbers or reverses values in word problems.',
      firstStep: 'Use coins, blocks, or place-value charts before moving back to abstract notation.',
    },
    {
      skill: 'Word Problems',
      whenStrong: 'Identifies the operation before calculating and can explain the reasoning.',
      whenWeak: 'Guesses operations or skips word problems even when computation is possible.',
      firstStep: 'Have the student underline the question, circle numbers, and say the operation aloud first.',
    },
  ],
  'math-5-8': [
    {
      skill: 'Fractions & Decimals',
      whenStrong: 'Moves between fractions, decimals, and percentages with flexible understanding.',
      whenWeak: 'Memorizes procedures but cannot explain what the numbers represent.',
      firstStep: 'Use number lines and benchmark values such as 1/2, 0.5, and 50% before formulas.',
    },
    {
      skill: 'Ratios & Proportions',
      whenStrong: 'Sets up equivalent relationships from word problems and explains units.',
      whenWeak: 'Places numbers randomly or cross-multiplies without understanding the relationship.',
      firstStep: 'Write units next to every number and ask what is being compared before solving.',
    },
    {
      skill: 'Pre-Algebra Readiness',
      whenStrong: 'Understands variables as unknown values and follows multi-step logic.',
      whenWeak: 'Shuts down when letters appear or loses track across several steps.',
      firstStep: 'Translate each equation into a sentence before solving. Keep steps visible on paper.',
    },
  ],
  reading: [
    {
      skill: 'Main Idea',
      whenStrong: 'Separates the central point from supporting details.',
      whenWeak: 'Retells facts from the passage but cannot say what the passage is mostly about.',
      firstStep: 'After each paragraph, ask for a 7-word summary before moving on.',
    },
    {
      skill: 'Inference',
      whenStrong: 'Uses clues from the text to explain what is implied.',
      whenWeak: 'Only answers questions when the answer is stated directly.',
      firstStep: 'Ask, "What clue made you think that?" and require a text detail with every answer.',
    },
    {
      skill: 'Text Stamina',
      whenStrong: 'Maintains comprehension as passages get longer or more complex.',
      whenWeak: 'Understands short text but loses meaning across longer assignments.',
      firstStep: 'Chunk reading into sections and pause for brief written summaries.',
    },
  ],
  writing: [
    {
      skill: 'Paragraph Structure',
      whenStrong: 'Writes a clear topic sentence, supporting details, and a closing idea.',
      whenWeak: 'Ideas appear in a list or run together without a clear point.',
      firstStep: 'Use a one-paragraph frame before asking for longer essays.',
    },
    {
      skill: 'Evidence',
      whenStrong: 'Uses text evidence and explains how it supports the claim.',
      whenWeak: 'Makes claims without proof or drops quotes without explanation.',
      firstStep: 'Teach claim, evidence, explanation as three separate sentences first.',
    },
    {
      skill: 'Revision',
      whenStrong: 'Can reread, find unclear parts, and improve a draft independently.',
      whenWeak: 'Turns in first drafts or says the work is finished after spelling fixes only.',
      firstStep: 'Revise one target at a time: clarity first, then structure, then grammar.',
    },
  ],
  'middle-school': [
    {
      skill: 'Assignment Independence',
      whenStrong: 'Breaks multi-day work into steps and tracks what is due.',
      whenWeak: 'Depends on parent reminders or starts only when the deadline is close.',
      firstStep: 'Create a visible three-step checklist: start date, midpoint check, final review.',
    },
    {
      skill: 'Test Reflection',
      whenStrong: 'Reviews mistakes and can name the concept behind each error.',
      whenWeak: 'Moves on after a grade without correcting the source of mistakes.',
      firstStep: 'After each quiz, sort mistakes into concept, careless, or directions.',
    },
    {
      skill: 'Self-Advocacy',
      whenStrong: 'Can identify what is confusing and ask a specific question.',
      whenWeak: 'Says "I get it" but cannot explain the skill or repeat it independently.',
      firstStep: 'Have the student write one specific question before asking for help.',
    },
  ],
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

function sectionPriorityClass(classification: SectionClassification) {
  if (classification === 'priority') return 'badge-priority'
  if (classification === 'watch') return 'badge-watch'
  return 'badge-steady'
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

  const visibleSections = sectionScores.filter((section) => section.hits > 0)
  const sectionsToRender = visibleSections.length ? visibleSections : sectionScores
  const highestSection = visibleSections
    .slice()
    .sort((a, b) => b.rate - a.rate || b.hits - a.hits)[0]
  const concentrationText = highestSection
    ? `Highest concentration: ${highestSection.title} - ${highestSection.hits} of ${highestSection.max} signs.`
    : 'No section concentration identified.'

  const sectionRows = sectionsToRender
    .map((section) => {
      const interpretation = getSectionInterpretation(section)
      const selectedList = section.selectedSigns.length
        ? `<ul class="sign-list">${section.selectedSigns.map((sign) => `<li>${escapeHtml(sign)}</li>`).join('')}</ul>`
        : '<p class="muted">No signs selected in this section.</p>'
      const rubricRows = (SECTION_RUBRICS[section.id] ?? [])
        .map(
          (row) => `
            <tr>
              <th scope="row">${escapeHtml(row.skill)}</th>
              <td>${escapeHtml(row.whenStrong)}</td>
              <td>${escapeHtml(row.whenWeak)}</td>
              <td>${escapeHtml(row.firstStep)}</td>
            </tr>
          `,
        )
        .join('')

      return `
        <section class="section-card">
          <div class="section-head">
            <div>
              <p class="section-kicker">Section breakdown</p>
              <h2>${escapeHtml(section.title)}</h2>
            </div>
            <span class="badge ${sectionPriorityClass(section.classification)}">${escapeHtml(sectionPriorityLabel(section.classification))}</span>
          </div>
          <div class="section-score-row">
            <div class="mini-progress" aria-hidden="true"><span style="width: ${section.rate}%"></span></div>
            <strong>${section.hits} of ${section.max} signs - ${section.rate}%</strong>
          </div>
          <p class="section-copy"><strong>Interpretation:</strong> ${escapeHtml(interpretation.meaning)}</p>
          <p class="section-copy"><strong>What this may point toward:</strong> ${escapeHtml(interpretation.nextStep)}</p>
          <p class="list-label">Signs selected:</p>
          ${selectedList}
          ${rubricRows ? `
            <div class="rubric">
              <p class="rubric-title">Skill rubric</p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Skill</th>
                    <th scope="col">When strong</th>
                    <th scope="col">When weak</th>
                    <th scope="col">What to try first</th>
                  </tr>
                </thead>
                <tbody>${rubricRows}</tbody>
              </table>
            </div>
          ` : ''}
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
          :root {
            --navy: #1E3A5F;
            --navy-dark: #102542;
            --orange: #F97316;
            --orange-light: #FFF7ED;
            --border: #D9E2EF;
            --text: #14213D;
            --muted: #64748B;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: #eef3f8;
            color: var(--text);
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.5;
          }
          .page {
            width: min(820px, calc(100% - 32px));
            margin: 24px auto;
            background: white;
            border: 1px solid var(--border);
            box-shadow: 0 18px 45px rgba(15, 35, 71, 0.14);
            padding: 34px 42px 38px;
          }
          .topline {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            border-bottom: 4px solid var(--orange);
            padding-bottom: 12px;
            color: var(--navy);
            font-size: 11px;
            font-weight: 800;
          }
          .report-title {
            padding: 22px 0 14px;
          }
          .eyebrow {
            color: var(--orange);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }
          h1 {
            color: var(--navy);
            font-size: 28px;
            line-height: 1.1;
            margin: 6px 0 4px;
          }
          h2 {
            color: var(--navy);
            font-size: 17px;
            line-height: 1.2;
            margin: 0;
          }
          .muted { color: var(--muted); }
          .score-panel {
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
            padding: 18px 0 20px;
          }
          .score-grid {
            display: grid;
            grid-template-columns: 140px 1fr;
            gap: 20px;
            align-items: end;
          }
          .score-label {
            color: var(--navy);
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.11em;
            text-transform: uppercase;
          }
          .score {
            color: var(--navy);
            font-size: 42px;
            font-weight: 900;
            line-height: 1;
            margin-top: 4px;
          }
          .score small {
            color: var(--muted);
            font-size: 18px;
          }
          .score-meta {
            color: var(--navy);
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 10px;
          }
          .progress,
          .mini-progress {
            overflow: hidden;
            background: #E9EEF5;
          }
          .progress {
            height: 18px;
            margin-top: 8px;
          }
          .progress span,
          .mini-progress span {
            display: block;
            height: 100%;
            background: var(--orange);
          }
          .callout {
            border: 1px solid var(--border);
            border-left: 4px solid var(--orange);
            background: #FFFFFF;
            margin-top: 14px;
            padding: 13px 16px;
          }
          .callout.next {
            border-left-color: var(--navy);
            background: #F8FAFC;
          }
          .callout strong {
            color: var(--navy);
          }
          .actions {
            margin: 20px 0;
            text-align: right;
          }
          button {
            border: 0;
            border-radius: 8px;
            background: var(--orange);
            color: white;
            cursor: pointer;
            font-weight: 900;
            padding: 10px 16px;
          }
          .divider {
            border: 0;
            border-top: 1px solid var(--border);
            margin: 24px 0 18px;
          }
          .section-card {
            break-inside: avoid;
            border: 1px solid var(--border);
            margin-top: 18px;
            background: white;
          }
          .section-head {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: center;
            background: #F8FAFC;
            border-left: 4px solid var(--orange);
            padding: 14px 16px;
          }
          .section-kicker {
            color: var(--muted);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.15em;
            margin: 0 0 5px;
            text-transform: uppercase;
          }
          .badge {
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 112px;
            padding: 6px 10px;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            white-space: nowrap;
          }
          .badge-priority { background: var(--orange); color: white; }
          .badge-watch { background: #FEF3C7; color: #92400E; }
          .badge-steady { background: #DCFCE7; color: #166534; }
          .section-score-row {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 16px;
            align-items: center;
            padding: 12px 16px 0;
            color: var(--navy);
          }
          .mini-progress { height: 12px; }
          .section-copy,
          .list-label {
            margin: 10px 16px 0;
          }
          .list-label {
            color: var(--navy);
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .sign-list {
            list-style: none;
            margin: 8px 16px 14px;
            padding: 0;
          }
          .sign-list li {
            border-top: 1px solid #EDF2F7;
            padding: 8px 0 8px 18px;
            position: relative;
          }
          .sign-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 16px;
            width: 9px;
            border-top: 2px solid var(--navy);
          }
          .rubric {
            border-top: 1px solid var(--border);
            margin-top: 14px;
            padding: 14px 16px 16px;
          }
          .rubric-title {
            color: var(--navy);
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.14em;
            margin: 0 0 8px;
            text-transform: uppercase;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }
          th,
          td {
            border: 1px solid var(--border);
            padding: 9px 10px;
            text-align: left;
            vertical-align: top;
          }
          thead th {
            background: var(--navy);
            color: white;
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          tbody th {
            color: var(--navy);
            font-size: 12px;
            width: 22%;
          }
          tbody td {
            font-size: 11px;
          }
          .disclaimer {
            border-top: 1px solid var(--border);
            color: var(--muted);
            font-size: 11px;
            margin-top: 24px;
            padding-top: 14px;
          }
          .report-feedback {
            border: 1px solid var(--border);
            border-left: 4px solid var(--orange);
            color: var(--navy);
            font-size: 11px;
            margin-top: 14px;
            padding: 10px 12px;
          }
          .report-feedback a {
            color: var(--navy);
            font-weight: 800;
          }
          .report-feedback-top {
            margin: -6px 0 18px;
          }
          .report-survey {
            border: 1px solid var(--border);
            border-left: 4px solid var(--orange);
            background: white;
            box-shadow: 0 10px 28px rgba(15, 35, 71, 0.1);
            margin: -4px 0 20px;
            padding: 16px;
          }
          .report-survey[hidden] {
            display: none;
          }
          .survey-head {
            display: flex;
            align-items: start;
            justify-content: space-between;
            gap: 16px;
          }
          .survey-head h2 {
            font-size: 15px;
            margin: 0;
          }
          .survey-head p {
            color: var(--muted);
            font-size: 12px;
            margin: 3px 0 0;
          }
          .survey-close {
            border: 1px solid var(--border);
            border-radius: 999px;
            background: white;
            color: var(--muted);
            min-width: 28px;
            padding: 3px 8px;
          }
          .survey-stars {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 14px;
          }
          .survey-stars button {
            border: 1px solid var(--border);
            border-radius: 999px;
            background: white;
            color: #94A3B8;
            min-height: 38px;
            min-width: 38px;
            padding: 0 10px;
            font-size: 20px;
          }
          .survey-stars button.is-selected {
            border-color: var(--orange);
            color: var(--orange);
          }
          .survey-response {
            border-top: 1px solid var(--border);
            color: var(--navy);
            font-size: 12px;
            font-weight: 700;
            margin-top: 14px;
            padding-top: 12px;
          }
          @page { size: letter; margin: 0.5in; }
          @media print {
            body { background: white; }
            .page { width: 100%; margin: 0; border: 0; box-shadow: none; padding: 0; }
            .actions,
            .report-survey { display: none; }
          }
          @media (max-width: 640px) {
            .page { width: 100%; margin: 0; padding: 24px 18px; }
            .score-grid,
            .section-score-row { grid-template-columns: 1fr; }
            table { table-layout: auto; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <header class="topline">
            <span>GrowWise School - Readiness Evaluation Report</span>
            <span>Generated ${escapeHtml(generatedAt)}</span>
          </header>
          <section class="report-title">
            <p class="eyebrow">Academic readiness screen</p>
            <h1>Math & Reading Readiness Checklist</h1>
            <p class="muted">${escapeHtml(gradeBandLabel)}</p>
          </section>
          <section class="score-panel">
            <div class="score-grid">
              <div>
                <div class="score-label">Overall score</div>
                <div class="score">${checkedCount}<small>/${activeTotal}</small></div>
              </div>
              <div>
                <p class="score-meta">${pct}% of grade-relevant signs selected. ${escapeHtml(concentrationText)}</p>
                <div class="progress" aria-hidden="true"><span style="width: ${pct}%"></span></div>
              </div>
            </div>
            <div class="callout">
              <strong>${escapeHtml(overall.label)}:</strong> ${escapeHtml(overall.meaning)}
            </div>
            <div class="callout next">
              <strong>Suggested next step:</strong> ${escapeHtml(overall.nextStep)}
            </div>
          </section>
          <div class="actions">
            <button onclick="handleReportDownload()">Download / Save as PDF</button>
          </div>
          <p class="report-feedback report-feedback-top">
            If something in this report does not look correct, please email
            <a href="mailto:${REPORT_FEEDBACK_EMAIL}">${REPORT_FEEDBACK_EMAIL}</a>.
          </p>
          <aside id="report-survey" class="report-survey" hidden aria-live="polite">
            <div class="survey-head">
              <div>
                <h2>Was this helpful?</h2>
                <p>Your rating helps us improve this free resource. No email required.</p>
              </div>
              <button type="button" class="survey-close" aria-label="Dismiss survey" onclick="dismissReportSurvey()">×</button>
            </div>
            <div class="survey-stars" role="radiogroup" aria-label="Rate this report">
              <button type="button" data-rating="1" onclick="rateReportSurvey(1)" aria-label="1 star">★</button>
              <button type="button" data-rating="2" onclick="rateReportSurvey(2)" aria-label="2 stars">★</button>
              <button type="button" data-rating="3" onclick="rateReportSurvey(3)" aria-label="3 stars">★</button>
              <button type="button" data-rating="4" onclick="rateReportSurvey(4)" aria-label="4 stars">★</button>
              <button type="button" data-rating="5" onclick="rateReportSurvey(5)" aria-label="5 stars">★</button>
            </div>
            <div id="survey-response" class="survey-response" hidden></div>
          </aside>
          <hr class="divider" />
          ${sectionRows}
          <p class="disclaimer">
            This report is an educational pattern-finding tool, not a diagnosis. Use it as a discussion aid with a teacher,
            school program lead, aftercare director, or qualified academic support provider.
          </p>
          <p class="report-feedback">
            If something in this report does not look correct, please email
            <a href="mailto:${REPORT_FEEDBACK_EMAIL}">${REPORT_FEEDBACK_EMAIL}</a>.
          </p>
        </div>
        <script>
          const reportSurveyKey = 'growwise_readiness_report_survey_state';
          let reportSurveyTimer = null;

          function hasReportSurveyState() {
            try {
              return Boolean(window.sessionStorage.getItem(reportSurveyKey));
            } catch {
              return false;
            }
          }

          function scheduleReportSurvey() {
            if (hasReportSurveyState()) return;
            if (reportSurveyTimer !== null) window.clearTimeout(reportSurveyTimer);
            reportSurveyTimer = window.setTimeout(() => {
              if (hasReportSurveyState()) return;
              const survey = document.getElementById('report-survey');
              if (survey) survey.hidden = false;
            }, 5000);
          }

          function handleReportDownload() {
            window.print();
            scheduleReportSurvey();
          }

          function dismissReportSurvey() {
            try {
              window.sessionStorage.setItem(reportSurveyKey, 'dismissed');
            } catch {}
            const survey = document.getElementById('report-survey');
            if (survey) survey.hidden = true;
          }

          function rateReportSurvey(rating) {
            try {
              window.sessionStorage.setItem(reportSurveyKey, 'rated:' + rating);
            } catch {}
            document.querySelectorAll('[data-rating]').forEach((button) => {
              button.classList.toggle('is-selected', Number(button.dataset.rating) === rating);
            });
            const response = document.getElementById('survey-response');
            if (!response) return;
            response.hidden = false;
            response.textContent = rating >= 4
              ? 'Thank you. Want to share it with another parent or academic support institution? https://growwiseschool.org/readinesschecklist'
              : 'Thank you. If something in the report does not look correct, email ${REPORT_FEEDBACK_EMAIL}.';
          }

          window.addEventListener('load', () => setTimeout(handleReportDownload, 250));
        </script>
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
