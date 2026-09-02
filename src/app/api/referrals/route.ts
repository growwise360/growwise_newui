import { NextResponse } from 'next/server'

import { createBrevoReferralDeal } from '@/lib/brevoReferral'
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit'
import { CONTACT_INFO } from '@/lib/constants'
import { isBrevoTransactionalReady, sendBrevoTransactionalEmail } from '@/lib/brevo'
import { sendEmail } from '@/lib/email'
import { FIELD_MAX, exceedsMax, isAcceptableLeadEmail } from '@/lib/inputLimits'
import { honeypotTriggered, isOriginAllowed } from '@/lib/requestGuard'
import { createReferralId, normalizeReferralEmail, referralEmailFingerprint } from '@/lib/referrals'
import { validatePhoneSimple } from '@/lib/phoneValidation'

export const maxDuration = 60

const MAX_BODY_BYTES = 32 * 1024

type ReferralBody = {
  referrerName?: unknown
  referrerEmail?: unknown
  referrerPhone?: unknown
  currentStudentName?: unknown
  referredParentName?: unknown
  referredEmail?: unknown
  referredStudentName?: unknown
  newStudentStartDate?: unknown
  programInterest?: unknown
  permissionConfirmed?: unknown
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendReferralConfirmation(input: {
  to: string
  referrerName: string
  referredParentName: string
  referralId: string
  newStudentStartDate: string
  creditDueDate?: string
}) {
  const subject = `GrowWise referral received — ${input.referralId}`
  const textContent = [
    `Hi ${input.referrerName},`,
    '',
    `We received your referral for ${input.referredParentName}.`,
    `Referral ID: ${input.referralId}`,
    `New student start date: ${input.newStudentStartDate}`,
    ...(input.creditDueDate ? [`Expected three-month commitment completion: ${input.creditDueDate}`] : []),
    '',
    'Credit is applied after the referred family completes a minimum three-month commitment and remains active and in good standing. Credit applies once per family, not per student.',
    '',
    'We will verify eligibility before applying the credit.',
    '',
    'GrowWise School',
  ].join('\n')
  const html = `<!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#172033">
        <div style="display:none;max-height:0;overflow:hidden">Your GrowWise referral was received. Keep ${escapeHtml(input.referralId)} for your records.</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:24px 12px">
          <tr><td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;border-top:5px solid #F16112;box-shadow:0 8px 24px rgba(31,57,109,.08)">
              <tr><td style="padding:28px 32px 8px">
                <div style="font-size:22px;font-weight:800;color:#1F396D">GrowWise</div>
                <h1 style="margin:24px 0 8px;font-size:28px;line-height:1.25;color:#172033">Thank you for the referral</h1>
                <p style="margin:0;font-size:16px;line-height:1.6">Hi ${escapeHtml(input.referrerName)}, we received your referral for <strong>${escapeHtml(input.referredParentName)}</strong>.</p>
              </td></tr>
              <tr><td style="padding:20px 32px">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f9fc;border:1px solid #dce3ee;border-radius:12px">
                  <tr><td style="padding:16px 18px;border-bottom:1px solid #dce3ee;font-size:14px;color:#526174">Referral ID</td><td style="padding:16px 18px;border-bottom:1px solid #dce3ee;text-align:right;font-size:14px;font-weight:700;color:#1F396D">${escapeHtml(input.referralId)}</td></tr>
                  <tr><td style="padding:16px 18px${input.creditDueDate ? ';border-bottom:1px solid #dce3ee' : ''};font-size:14px;color:#526174">New student start date</td><td style="padding:16px 18px${input.creditDueDate ? ';border-bottom:1px solid #dce3ee' : ''};text-align:right;font-size:14px;font-weight:700">${escapeHtml(input.newStudentStartDate)}</td></tr>
                  ${input.creditDueDate ? `<tr><td style="padding:16px 18px;font-size:14px;color:#526174">Expected credit review</td><td style="padding:16px 18px;text-align:right;font-size:14px;font-weight:700">${escapeHtml(input.creditDueDate)}</td></tr>` : ''}
                </table>
              </td></tr>
              <tr><td style="padding:0 32px 30px;font-size:14px;line-height:1.65;color:#526174">
                <p>Credit is applied after the referred family completes a minimum three-month commitment and remains active and in good standing. Credit applies once per family, not per student.</p>
                <p>We will verify eligibility before applying the credit. Please keep this email for your records.</p>
                <p style="margin-top:24px;color:#172033">Warmly,<br><strong>The GrowWise Team</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`

  if (isBrevoTransactionalReady()) {
    const sent = await sendBrevoTransactionalEmail({
      to: input.to,
      subject,
      text: textContent,
      html,
      replyTo: { email: CONTACT_INFO.email, name: 'GrowWise' },
    })
    if (sent.success) return
  }
  await sendEmail({ to: input.to, subject, text: textContent, html, replyTo: CONTACT_INFO.email })
}

export async function POST(request: Request) {
  if (!isAllowed('referral', clientIpFrom(request))) {
    return NextResponse.json({ success: false, error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }
  if (!isOriginAllowed(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 403 })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Request too large' }, { status: 413 })
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }
  if (honeypotTriggered(parsed)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  const body = parsed as ReferralBody
  const referrerName = text(body.referrerName)
  const referrerEmail = normalizeReferralEmail(text(body.referrerEmail))
  const referrerPhone = text(body.referrerPhone)
  const currentStudentName = text(body.currentStudentName)
  const referredParentName = text(body.referredParentName)
  const referredEmail = normalizeReferralEmail(text(body.referredEmail))
  const referredStudentName = text(body.referredStudentName)
  const newStudentStartDateRaw = text(body.newStudentStartDate)
  const newStudentStartDate = new Date(`${newStudentStartDateRaw}T12:00:00Z`)
  const programInterest = text(body.programInterest)

  if (!referrerName || !referrerEmail || !referrerPhone || !currentStudentName || !referredParentName || !referredEmail || !referredStudentName || !newStudentStartDateRaw) {
    return NextResponse.json({ success: false, error: 'Please complete all required fields.' }, { status: 400 })
  }
  if (body.permissionConfirmed !== true) {
    return NextResponse.json({ success: false, error: 'Permission confirmation is required.' }, { status: 400 })
  }
  if (
    exceedsMax(referrerName, FIELD_MAX.name) ||
    exceedsMax(referrerEmail, FIELD_MAX.email) ||
    exceedsMax(referrerPhone, FIELD_MAX.phone) ||
    exceedsMax(currentStudentName, FIELD_MAX.name) ||
    exceedsMax(referredParentName, FIELD_MAX.name) ||
    exceedsMax(referredEmail, FIELD_MAX.email) ||
    exceedsMax(referredStudentName, FIELD_MAX.name) ||
    exceedsMax(newStudentStartDateRaw, 10) ||
    exceedsMax(programInterest, FIELD_MAX.shortText)
  ) {
    return NextResponse.json({ success: false, error: 'One or more fields are too long.' }, { status: 400 })
  }
  if (!isAcceptableLeadEmail(referrerEmail) || !isAcceptableLeadEmail(referredEmail)) {
    return NextResponse.json({ success: false, error: 'Please enter valid family email addresses.' }, { status: 400 })
  }
  const phone = validatePhoneSimple(referrerPhone)
  if (!phone.isValid) {
    return NextResponse.json({ success: false, error: phone.errorMessage }, { status: 400 })
  }
  if (referrerEmail === referredEmail) {
    return NextResponse.json({ success: false, error: 'The referring and referred family emails must be different.' }, { status: 400 })
  }
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(newStudentStartDateRaw) ||
    Number.isNaN(newStudentStartDate.getTime()) ||
    newStudentStartDate.toISOString().slice(0, 10) !== newStudentStartDateRaw
  ) {
    return NextResponse.json({ success: false, error: 'Please enter a valid new-student start date.' }, { status: 400 })
  }

  const referralId = createReferralId()
  const submittedAt = new Date().toISOString()
  const crm = await createBrevoReferralDeal({
    referralId,
    submittedAt,
    newStudentStartDate,
    referrer: { email: referrerEmail, fullName: referrerName, phone: referrerPhone, studentName: currentStudentName },
    referred: {
      email: referredEmail,
      fullName: referredParentName,
      studentName: referredStudentName,
      programInterest: programInterest || undefined,
    },
  })
  if (!crm.ok) {
    console.error('[referral] Brevo deal creation failed', { error: crm.error, status: crm.status })
    return NextResponse.json(
      { success: false, error: 'We could not save the referral right now. Please try again or contact GrowWise.' },
      { status: 503 },
    )
  }
  if (crm.data.duplicate) {
    return NextResponse.json(
      { success: false, duplicate: true, error: 'A referral for this family is already on file.' },
      { status: 409 },
    )
  }

  await sendReferralConfirmation({
    to: referrerEmail,
    referrerName,
    referredParentName,
    referralId,
    newStudentStartDate: newStudentStartDateRaw,
    creditDueDate: crm.data.creditDueDate?.slice(0, 10),
  })
  console.log('[referral] submission ok', {
    referralId,
    dealId: crm.data.dealId,
    referredFingerprint: referralEmailFingerprint(referredEmail),
    reminderCreated: crm.data.reminderCreated ?? false,
  })

  return NextResponse.json({
    success: true,
    referralId,
    creditDueDate: crm.data.creditDueDate,
    reminderCreated: crm.data.reminderCreated ?? false,
  })
}
