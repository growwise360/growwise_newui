import { NextResponse } from 'next/server'

import { sendBrevoTransactionalEmail, isBrevoTransactionalReady } from '@/lib/brevo'
import { CONTACT_INFO } from '@/lib/constants'
import { sendEmail, type SendEmailResult } from '@/lib/email'
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit'
import { isOriginAllowed } from '@/lib/requestGuard'

const MAX_BODY_BYTES = 4096
const ACTIVITY_EMAIL = 'connect@thegrowwsie.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function cleanText(value: unknown, max = 160) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

async function sendActivityEmail(opts: {
  rating: number
  gradeBand: string
  checkedCount: number
  activeTotal: number
  scoreRate: number
  source: string
  pageUrl: string
}): Promise<SendEmailResult> {
  const subject = `Readiness report activity: ${opts.rating} star${opts.rating === 1 ? '' : 's'}`
  const text = [
    'Readiness report survey activity',
    '',
    `Rating: ${opts.rating}/5`,
    `Grade band: ${opts.gradeBand || 'Unknown'}`,
    `Score: ${opts.checkedCount}/${opts.activeTotal} (${opts.scoreRate}%)`,
    `Source: ${opts.source || 'report_tab'}`,
    `Page URL: ${opts.pageUrl || 'Unknown'}`,
  ].join('\n')

  const html = `
    <h2>Readiness report survey activity</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><th align="left">Rating</th><td>${opts.rating}/5</td></tr>
      <tr><th align="left">Grade band</th><td>${escapeHtml(opts.gradeBand || 'Unknown')}</td></tr>
      <tr><th align="left">Score</th><td>${opts.checkedCount}/${opts.activeTotal} (${opts.scoreRate}%)</td></tr>
      <tr><th align="left">Source</th><td>${escapeHtml(opts.source || 'report_tab')}</td></tr>
      <tr><th align="left">Page URL</th><td>${escapeHtml(opts.pageUrl || 'Unknown')}</td></tr>
    </table>
  `

  if (isBrevoTransactionalReady()) {
    const brevo = await sendBrevoTransactionalEmail({
      to: ACTIVITY_EMAIL,
      subject,
      html,
      text,
      replyTo: { email: CONTACT_INFO.email, name: 'GrowWise' },
    })
    if (brevo.success) return brevo
    console.error('[readiness-report-activity] Brevo transactional failed; SMTP fallback.', brevo.error)
  }

  return sendEmail({
    to: ACTIVITY_EMAIL,
    subject,
    html,
    text,
    replyTo: CONTACT_INFO.email,
  })
}

export async function POST(req: Request) {
  if (!isAllowed('contact', clientIpFrom(req))) {
    return NextResponse.json({ success: false, error: 'Too many submissions' }, { status: 429 })
  }
  if (!isOriginAllowed(req)) {
    return NextResponse.json({ success: false, error: 'Origin not allowed' }, { status: 403 })
  }

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Request too large' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const rating = Number(body.rating)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ success: false, error: 'Invalid rating' }, { status: 400 })
  }

  const checkedCount = Math.max(0, Math.min(99, Number(body.checkedCount) || 0))
  const activeTotal = Math.max(0, Math.min(99, Number(body.activeTotal) || 0))
  const scoreRate = activeTotal > 0 ? Math.round((checkedCount / activeTotal) * 100) : 0

  const result = await sendActivityEmail({
    rating,
    gradeBand: cleanText(body.gradeBand, 80),
    checkedCount,
    activeTotal,
    scoreRate,
    source: cleanText(body.source, 60) || 'report_tab',
    pageUrl: cleanText(body.pageUrl, 300),
  })

  if (!result.success) {
    console.error('[readiness-report-activity] Email send failed:', result.error)
    return NextResponse.json({ success: false, error: 'Email not sent' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
