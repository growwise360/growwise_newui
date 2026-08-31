import { randomUUID } from 'node:crypto'

import { NextResponse } from 'next/server'

import { isBrevoTransactionalReady, sendBrevoTransactionalEmail } from '@/lib/brevo'
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit'
import { CONTACT_INFO } from '@/lib/constants'
import { sendEmail, type SendEmailResult } from '@/lib/email'
import { FIELD_MAX, exceedsMax, isAcceptableLeadEmail } from '@/lib/inputLimits'
import { honeypotTriggered, isOriginAllowed } from '@/lib/requestGuard'
import {
  createStudentSubmissionsClient,
  isStudentSubmissionType,
  safeStudentSubmissionFilename,
  STUDENT_SUBMISSION_BUCKET,
  validateStudentSubmissionBytes,
  validateStudentSubmissionFile,
} from '@/lib/studentSubmissions'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_REQUEST_BYTES = 9 * 1024 * 1024
const SIGNED_URL_SECONDS = 7 * 24 * 60 * 60
const VALID_GRADES = new Set(['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])

function field(form: FormData, name: string): string {
  const value = form.get(name)
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

async function deliverEmail(options: {
  to: string
  subject: string
  html: string
  text: string
}): Promise<SendEmailResult> {
  if (isBrevoTransactionalReady()) {
    const brevo = await sendBrevoTransactionalEmail({
      ...options,
      replyTo: { email: CONTACT_INFO.email, name: 'GrowWise' },
    })
    if (brevo.success) return brevo
  }
  return sendEmail({ ...options, replyTo: CONTACT_INFO.email })
}

export async function POST(request: Request) {
  if (!isAllowed('studentSubmission', clientIpFrom(request))) {
    return NextResponse.json({ success: false, error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }
  if (!isOriginAllowed(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 403 })
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ success: false, error: 'The upload is too large.' }, { status: 413 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid upload form.' }, { status: 400 })
  }
  const rawFields = Object.fromEntries(form.entries()) as Record<string, unknown>
  if (honeypotTriggered(rawFields)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  const submissionType = field(form, 'submissionType')
  const title = field(form, 'title')
  const studentName = field(form, 'studentName')
  const grade = field(form, 'grade')
  const guardianName = field(form, 'guardianName')
  const guardianEmail = field(form, 'guardianEmail').toLowerCase()
  const notes = field(form, 'notes')
  const guardianConsent = field(form, 'guardianConsent') === 'true'
  const originalWork = field(form, 'originalWork') === 'true'
  const uploaded = form.get('workFile')

  if (!isStudentSubmissionType(submissionType)) {
    return NextResponse.json({ success: false, error: 'Choose Article or Short Story.' }, { status: 400 })
  }
  if (!title || !studentName || !grade || !guardianName || !guardianEmail) {
    return NextResponse.json({ success: false, error: 'Please complete all required fields.' }, { status: 400 })
  }
  if (!VALID_GRADES.has(grade)) {
    return NextResponse.json({ success: false, error: 'Choose a valid grade.' }, { status: 400 })
  }
  if (
    title.length < 2 ||
    guardianName.length < 2 ||
    studentName.length < 2 ||
    exceedsMax(title, 160) ||
    exceedsMax(studentName, FIELD_MAX.name) ||
    exceedsMax(guardianName, FIELD_MAX.name) ||
    exceedsMax(guardianEmail, FIELD_MAX.email) ||
    exceedsMax(notes, FIELD_MAX.longText)
  ) {
    return NextResponse.json({ success: false, error: 'One or more fields are invalid or too long.' }, { status: 400 })
  }
  if (!isAcceptableLeadEmail(guardianEmail)) {
    return NextResponse.json({ success: false, error: 'Enter a valid parent or guardian email.' }, { status: 400 })
  }
  if (!guardianConsent || !originalWork) {
    return NextResponse.json(
      { success: false, error: 'Parent/guardian permission and original-work confirmation are required.' },
      { status: 400 },
    )
  }
  if (!(uploaded instanceof File)) {
    return NextResponse.json({ success: false, error: 'Choose a PDF, DOCX, or TXT file.' }, { status: 400 })
  }

  const fileCheck = validateStudentSubmissionFile(uploaded)
  if (!fileCheck.ok) {
    return NextResponse.json({ success: false, error: fileCheck.error }, { status: 400 })
  }
  const bytes = new Uint8Array(await uploaded.arrayBuffer())
  if (!validateStudentSubmissionBytes(bytes, fileCheck.extension)) {
    return NextResponse.json({ success: false, error: 'The file contents do not match the selected file type.' }, { status: 400 })
  }

  const supabase = createStudentSubmissionsClient()
  if (!supabase) {
    console.error('[student-submission] Supabase service role is not configured')
    return NextResponse.json({ success: false, error: 'Submission storage is temporarily unavailable.' }, { status: 503 })
  }

  const submissionId = randomUUID()
  const safeFilename = safeStudentSubmissionFilename(uploaded.name)
  const storagePath = `${new Date().getUTCFullYear()}/${submissionId}/${safeFilename}`
  const { error: uploadError } = await supabase.storage
    .from(STUDENT_SUBMISSION_BUCKET)
    .upload(storagePath, bytes, { contentType: fileCheck.contentType, upsert: false })
  if (uploadError) {
    console.error('[student-submission] Private upload failed', { submissionId, error: uploadError.message })
    return NextResponse.json({ success: false, error: 'We could not securely store the file. Please try again.' }, { status: 503 })
  }

  const { error: insertError } = await supabase.from('student_work_submissions').insert({
    id: submissionId,
    submission_type: submissionType,
    title,
    student_name: studentName,
    grade,
    guardian_name: guardianName,
    guardian_email: guardianEmail,
    notes: notes || null,
    original_filename: safeFilename,
    storage_path: storagePath,
    mime_type: fileCheck.contentType,
    file_size: uploaded.size,
    guardian_consent_confirmed: true,
    original_work_confirmed: true,
  })
  if (insertError) {
    await supabase.storage.from(STUDENT_SUBMISSION_BUCKET).remove([storagePath])
    console.error('[student-submission] Record insert failed', { submissionId, error: insertError.message })
    return NextResponse.json({ success: false, error: 'We could not save the submission. Please try again.' }, { status: 503 })
  }

  const { data: signed, error: signedError } = await supabase.storage
    .from(STUDENT_SUBMISSION_BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_SECONDS)
  if (signedError || !signed?.signedUrl) {
    console.error('[student-submission] Review link failed', { submissionId, error: signedError?.message })
    await supabase.from('student_work_submissions').update({ notification_error: 'Could not create review URL' }).eq('id', submissionId)
    return NextResponse.json(
      { success: false, stored: true, submissionId, error: 'Your work was saved, but we could not notify the reviewer. Contact GrowWise with your submission ID.' },
      { status: 503 },
    )
  }

  const typeLabel = submissionType === 'article' ? 'Student Article' : 'Short Story'
  const reviewerEmail = process.env.STUDENT_SUBMISSION_REVIEW_EMAIL?.trim() || CONTACT_INFO.email
  const reviewerSubject = `Review student ${submissionType}: ${title}`
  const reviewerText = [
    'A new Student Corner submission is ready for review.',
    '',
    `Submission ID: ${submissionId}`,
    `Type: ${typeLabel}`,
    `Title: ${title}`,
    `Student: ${studentName}`,
    `Grade: ${grade}`,
    `Parent/guardian: ${guardianName} <${guardianEmail}>`,
    `File: ${safeFilename} (${Math.ceil(uploaded.size / 1024)} KB)`,
    notes ? `Notes: ${notes}` : '',
    '',
    `Private review link (expires in 7 days): ${signed.signedUrl}`,
    '',
    'Do not publish automatically. Scan the downloaded file before opening it, then review originality, student privacy, parent permission, formatting, and editorial quality.',
  ].filter(Boolean).join('\n')
  const reviewerHtml = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#172033">
    <div style="border-top:5px solid #F16112;border-radius:14px;background:#f7f9fc;padding:28px">
      <p style="margin:0;font-size:13px;font-weight:700;text-transform:uppercase;color:#F16112">Student Corner review</p>
      <h1 style="margin:10px 0 20px;color:#1F396D;font-size:26px">New ${escapeHtml(typeLabel)} submission</h1>
      <table role="presentation" width="100%" cellpadding="7" cellspacing="0" style="font-size:14px">
        <tr><td><strong>Submission ID</strong></td><td>${escapeHtml(submissionId)}</td></tr>
        <tr><td><strong>Title</strong></td><td>${escapeHtml(title)}</td></tr>
        <tr><td><strong>Student</strong></td><td>${escapeHtml(studentName)}, Grade ${escapeHtml(grade)}</td></tr>
        <tr><td><strong>Parent/guardian</strong></td><td>${escapeHtml(guardianName)} &lt;${escapeHtml(guardianEmail)}&gt;</td></tr>
        <tr><td><strong>File</strong></td><td>${escapeHtml(safeFilename)} (${Math.ceil(uploaded.size / 1024)} KB)</td></tr>
      </table>
      ${notes ? `<p><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ''}
      <p style="margin:24px 0"><a href="${escapeHtml(signed.signedUrl)}" style="display:inline-block;border-radius:9px;background:#1F396D;padding:13px 20px;color:#fff;text-decoration:none;font-weight:700">Download private review copy</a></p>
      <p style="font-size:13px;line-height:1.6;color:#526174">This link expires in 7 days. Do not publish automatically. Scan the downloaded file before opening it, then review originality, student privacy, parent permission, formatting, and editorial quality.</p>
    </div>
  </div>`
  const reviewSent = await deliverEmail({ to: reviewerEmail, subject: reviewerSubject, html: reviewerHtml, text: reviewerText })

  if (!reviewSent.success) {
    await supabase.from('student_work_submissions').update({ notification_error: reviewSent.error || 'Review email failed' }).eq('id', submissionId)
    console.error('[student-submission] Review email failed', { submissionId, error: reviewSent.error })
    return NextResponse.json(
      { success: false, stored: true, submissionId, error: 'Your work was saved, but the review email was delayed. Contact GrowWise with your submission ID.' },
      { status: 503 },
    )
  }

  await supabase
    .from('student_work_submissions')
    .update({ review_notification_sent_at: new Date().toISOString(), notification_error: null })
    .eq('id', submissionId)

  const confirmationSubject = `GrowWise Student Corner submission received — ${submissionId.slice(0, 8).toUpperCase()}`
  const confirmationText = [
    `Hi ${guardianName},`,
    '',
    `We received “${title}” for Student Corner review.`,
    `Submission ID: ${submissionId}`,
    '',
    'Nothing is published automatically. GrowWise will review the work and contact you if edits or additional permission are needed.',
    '',
    'GrowWise School',
  ].join('\n')
  const confirmationHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#172033">
    <h1 style="color:#1F396D">Submission received</h1>
    <p>Hi ${escapeHtml(guardianName)},</p>
    <p>We received <strong>“${escapeHtml(title)}”</strong> for Student Corner review.</p>
    <p><strong>Submission ID:</strong> ${escapeHtml(submissionId)}</p>
    <p>Nothing is published automatically. GrowWise will review the work and contact you if edits or additional permission are needed.</p>
    <p>— GrowWise</p>
  </div>`
  const confirmation = await deliverEmail({
    to: guardianEmail,
    subject: confirmationSubject,
    html: confirmationHtml,
    text: confirmationText,
  })
  if (!confirmation.success) {
    console.warn('[student-submission] Guardian confirmation email failed', { submissionId, error: confirmation.error })
  }

  console.log('[student-submission] pending review', {
    submissionId,
    submissionType,
    fileSize: uploaded.size,
    reviewerNotified: true,
  })
  return NextResponse.json({ success: true, submissionId, status: 'pending_review' }, { status: 201 })
}
