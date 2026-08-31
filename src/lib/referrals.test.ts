import { createReferralId, normalizeReferralEmail, referralEmailFingerprint, thirdBillingCycleDate } from './referrals'

describe('referral workflow helpers', () => {
  test('normalizes email used for referral matching', () => {
    expect(normalizeReferralEmail('  Parent@Example.COM ')).toBe('parent@example.com')
  })

  test('creates a non-PII referral id with the submission date', () => {
    expect(createReferralId(new Date('2026-09-12T08:00:00Z'))).toMatch(/^REF-20260912-[A-F0-9]{8}$/)
  })

  test('fingerprints emails consistently without returning the address', () => {
    const result = referralEmailFingerprint(' Parent@Example.com ')
    expect(result).toBe(referralEmailFingerprint('parent@example.com'))
    expect(result).not.toContain('parent')
  })

  test.each([
    ['2026-09-12T08:00:00Z', '2026-11-12'],
    ['2026-01-31T08:00:00Z', '2026-03-31'],
    ['2026-12-31T08:00:00Z', '2027-02-28'],
    ['2028-12-31T08:00:00Z', '2029-02-28'],
  ])('calculates cycle three for %s', (enrollment, expected) => {
    expect(thirdBillingCycleDate(new Date(enrollment)).toISOString().slice(0, 10)).toBe(expected)
  })

  test('rejects invalid enrollment dates', () => {
    expect(() => thirdBillingCycleDate(new Date('invalid'))).toThrow('Invalid enrollment date')
  })
})
