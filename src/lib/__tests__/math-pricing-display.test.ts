import {
  MATH_TRIAL_SESSION_FEE_USD,
  buildHighSchoolMetaDescription,
  formatTrialSessionFeeLabel,
  getMathHubMinMonthlyUsd,
  getMathHubSchemaOfferPrice,
  parseMonthlyUsdFromLabel,
} from '@/lib/math-pricing-display';

describe('math-pricing-display', () => {
  it('parses monthly USD from hub price labels', () => {
    expect(parseMonthlyUsdFromLabel('$189/mo')).toBe(189);
    expect(parseMonthlyUsdFromLabel('From $289/month · 150 minutes')).toBe(289);
  });

  it('derives min monthly and schema offer price from MATH_HUB_COPY', () => {
    expect(getMathHubMinMonthlyUsd('high-school')).toBe(369);
    expect(getMathHubSchemaOfferPrice('high-school')).toBe('369');
    expect(getMathHubMinMonthlyUsd('middle-school')).toBe(289);
  });

  it('trial fee label matches constant', () => {
    expect(formatTrialSessionFeeLabel()).toBe(`$${MATH_TRIAL_SESSION_FEE_USD}`);
  });

  it('meta description reflects high school course coverage', () => {
    expect(buildHighSchoolMetaDescription()).toContain('Algebra 1');
    expect(buildHighSchoolMetaDescription()).toContain('AP Precalculus');
    expect(buildHighSchoolMetaDescription()).toContain('Calculus');
  });
});
