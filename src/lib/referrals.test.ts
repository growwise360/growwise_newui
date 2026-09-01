import { createReferralId, minimumCommitmentCompletionDate, normalizeReferralEmail, referralEmailFingerprint } from './referrals'

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
    ['2026-09-12T08:00:00Z', '2026-12-12'],
    ['2026-01-31T08:00:00Z', '2026-04-30'],
    ['2026-12-31T08:00:00Z', '2027-03-31'],
    ['2028-12-31T08:00:00Z', '2029-03-31'],
  ])('calculates three-month commitment completion for %s', (enrollment, expected) => {
    expect(minimumCommitmentCompletionDate(new Date(enrollment)).toISOString().slice(0, 10)).toBe(expected)
  })

  test('rejects invalid enrollment dates', () => {
    expect(() => minimumCommitmentCompletionDate(new Date('invalid'))).toThrow('Invalid enrollment date')
  })
})
