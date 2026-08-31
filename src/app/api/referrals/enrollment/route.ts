import { NextResponse } from 'next/server'

import { markBrevoReferralEnrolled } from '@/lib/brevoReferral'
import { isValidEmailShape } from '@/lib/inputLimits'
import { normalizeReferralEmail, referralEmailFingerprint } from '@/lib/referrals'

function authorized(request: Request): boolean {
  const secret = process.env.REFERRAL_AUTOMATION_SECRET?.trim()
  if (!secret) return false
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const referredEmail = normalizeReferralEmail(typeof body.referredEmail === 'string' ? body.referredEmail : '')
  const enrollmentDate = new Date(typeof body.enrollmentDate === 'string' ? body.enrollmentDate : '')
  const enrollmentId = typeof body.enrollmentId === 'string' ? body.enrollmentId.trim().slice(0, 200) : undefined
  const creditAmount = typeof body.creditAmount === 'number' && Number.isFinite(body.creditAmount) && body.creditAmount >= 0
    ? body.creditAmount
    : undefined

  if (!isValidEmailShape(referredEmail) || Number.isNaN(enrollmentDate.getTime())) {
    return NextResponse.json({ success: false, error: 'Valid referredEmail and enrollmentDate are required.' }, { status: 400 })
  }

  const result = await markBrevoReferralEnrolled({ referredEmail, enrollmentDate, enrollmentId, creditAmount })
  if (!result.ok) {
    console.error('[referral-enrollment] automation failed', {
      error: result.error,
      status: result.status,
      referredFingerprint: referralEmailFingerprint(referredEmail),
    })
    return NextResponse.json(
      { success: false, error: result.status === 404 ? result.error : 'Referral automation failed.' },
      { status: result.status === 404 ? 404 : 502 },
    )
  }

  return NextResponse.json({ success: true, ...result.data })
}
