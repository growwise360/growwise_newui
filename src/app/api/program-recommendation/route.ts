import { NextRequest, NextResponse } from 'next/server'
import { CONTACT_INFO } from '@/lib/constants'
import { isBrevoTransactionalReady, sendBrevoTransactionalEmail } from '@/lib/brevo'
import { sendEmail, type SendEmailResult } from '@/lib/email'
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit'
import { clip, exceedsMax, FIELD_MAX, isValidEmailShape } from '@/lib/inputLimits'
import { honeypotTriggered, isOriginAllowed } from '@/lib/requestGuard'
import { isHubSpotFormsConfigured, submitHubSpotForm } from '@/lib/hubspot/submitForm'
import { validatePhoneSimple } from '@/lib/phoneValidation'

const MAX_BODY_BYTES = 8 * 1024
const SUBJECTS = new Set(['Math', 'English', 'SAT Prep', 'Not sure'])
const GRADES = new Set(['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

async function deliver(message: { to: string; subject: string; html: string; text: string; replyTo: string }): Promise<SendEmailResult> {
  if (isBrevoTransactionalReady()) {
    const brevo = await sendBrevoTransactionalEmail({
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: { email: message.replyTo, name: 'GrowWise School' },
    })
    if (brevo.success) return brevo
  }
  return sendEmail(message)
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowed('contact', clientIpFrom(request))) {
      return NextResponse.json({ success: false, message: 'Too many submissions. Please try again later.' }, { status: 429 })
    }
    if (!isOriginAllowed(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 403 })
    }
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, message: 'Request too large.' }, { status: 413 })
    }
    let body: Record<string, unknown>
    try {
      body = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 })
    }
    if (honeypotTriggered(body)) {
      return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 })
    }

    const email = clip(body.email, FIELD_MAX.email).toLowerCase()
    const phone = clip(body.phone, FIELD_MAX.phone)
    const parentName = clip(body.parentName, FIELD_MAX.name)
    const grade = clip(body.grade, FIELD_MAX.shortText)
    const subject = clip(body.subject, FIELD_MAX.shortText)
    const sourcePage = clip(body.sourcePage, FIELD_MAX.shortText)
    const locale = clip(body.locale, FIELD_MAX.shortText)
    const landingUrl = clip(body.landingUrl, FIELD_MAX.longText)

    const phoneValidation = validatePhoneSimple(phone)
    if (!parentName || !isValidEmailShape(email) || !phoneValidation.isValid || !GRADES.has(grade) || !SUBJECTS.has(subject) || !sourcePage) {
      return NextResponse.json({ success: false, message: 'Please complete all required fields.' }, { status: 400 })
    }
    if (exceedsMax(body.email, FIELD_MAX.email) || exceedsMax(body.phone, FIELD_MAX.phone) || exceedsMax(body.parentName, FIELD_MAX.name) || [body.grade, body.subject, body.sourcePage, body.locale].some((value) => exceedsMax(value, FIELD_MAX.shortText)) || exceedsMax(body.landingUrl, FIELD_MAX.longText)) {
      return NextResponse.json({ success: false, message: 'One or more fields are too long.' }, { status: 400 })
    }

    const safe = { email: escapeHtml(email), phone: escapeHtml(phone), parentName: escapeHtml(parentName), grade: escapeHtml(grade), subject: escapeHtml(subject), sourcePage: escapeHtml(sourcePage), landingUrl: escapeHtml(landingUrl) }
    const adminText = `New program information request\n\nParent: ${parentName}\nEmail: ${email}\nPhone: ${phone}\nGrade: ${grade}\nSubject: ${subject}\nSource: ${sourcePage}\nPage: ${landingUrl}`
    let crmCaptured = false
    if (isHubSpotFormsConfigured()) {
      const hubspot = await submitHubSpotForm([
        { name: 'firstname', value: parentName },
        { name: 'lastname', value: 'Information request' },
        { name: 'email', value: email },
        { name: 'phone', value: phone },
        { name: 'message', value: `${adminText}\nLocale: ${locale || 'unknown'}` },
      ],
      { pageUri: landingUrl, pageName: `Program information — ${sourcePage}` })
      crmCaptured = hubspot.ok
      if (!hubspot.ok) console.error('[program-recommendation] HubSpot capture failed', hubspot.message, hubspot.status ?? '')
    }

    let notificationMessageId: string | undefined
    let notificationDelivered = false
    try {
      const admin = await deliver({
        to: CONTACT_INFO.email,
        subject: `Program information request: Grade ${grade} ${subject}`.slice(0, 998),
        text: adminText,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px"><h2 style="color:#1F396D">New program information request</h2><p><strong>Parent:</strong> ${safe.parentName}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Grade:</strong> ${safe.grade}</p><p><strong>Subject:</strong> ${safe.subject}</p><p><strong>Source:</strong> ${safe.sourcePage}</p><p><strong>Page:</strong> ${safe.landingUrl}</p></div>`,
        replyTo: email,
      })
      notificationMessageId = admin.messageId
      notificationDelivered = admin.success
      if (!admin.success) console.error('[program-recommendation] notification failed', admin.error)
    } catch (notificationError) {
      console.error('[program-recommendation] notification threw', notificationError)
    }

    if (!crmCaptured && !notificationDelivered) {
      return NextResponse.json({ success: false, message: 'We could not save your request. Please try again or call (925) 456-4606.' }, { status: 502 })
    }

    void deliver({
      to: email,
      subject: 'We received your GrowWise information request',
      text: `Thanks for telling us what your child needs. We’ll email relevant Grade ${grade} ${subject} program details and current pricing within one business day.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:620px"><h2 style="color:#1F396D">Your GrowWise information request is in</h2><p>Thanks for telling us what your child needs.</p><p>We’ll email relevant Grade ${safe.grade} ${safe.subject} program details and current pricing within one business day.</p><p>There is no commitment. You can also reply to this email with questions.</p></div>`,
      replyTo: CONTACT_INFO.email,
    }).catch((confirmationError) => {
      console.error('[program-recommendation] confirmation failed', confirmationError)
    })

    console.log('[program-recommendation] accepted', { emailDomain: email.split('@')[1], grade, subject, sourcePage, messageId: notificationMessageId })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[program-recommendation] failed', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
