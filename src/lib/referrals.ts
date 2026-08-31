import { createHash, randomUUID } from 'node:crypto'

export function normalizeReferralEmail(value: string): string {
  return value.trim().toLowerCase()
}

export function createReferralId(now = new Date()): string {
  const day = now.toISOString().slice(0, 10).replaceAll('-', '')
  return `REF-${day}-${randomUUID().slice(0, 8).toUpperCase()}`
}

/** Stable log-safe identifier; never log a family's raw email address. */
export function referralEmailFingerprint(email: string): string {
  return createHash('sha256').update(normalizeReferralEmail(email)).digest('hex').slice(0, 12)
}

/**
 * Month one is the enrollment billing cycle, so credit becomes due two calendar
 * months later. Days that do not exist in the target month clamp to month-end.
 */
export function thirdBillingCycleDate(enrollmentDate: Date): Date {
  if (Number.isNaN(enrollmentDate.getTime())) throw new Error('Invalid enrollment date')

  const year = enrollmentDate.getUTCFullYear()
  const month = enrollmentDate.getUTCMonth()
  const day = enrollmentDate.getUTCDate()
  const targetMonthStart = new Date(Date.UTC(year, month + 2, 1, 17, 0, 0))
  const lastDay = new Date(Date.UTC(
    targetMonthStart.getUTCFullYear(),
    targetMonthStart.getUTCMonth() + 1,
    0,
    17,
    0,
    0,
  )).getUTCDate()

  targetMonthStart.setUTCDate(Math.min(day, lastDay))
  return targetMonthStart
}
