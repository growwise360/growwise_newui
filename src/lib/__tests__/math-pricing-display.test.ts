import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
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
    expect(getMathHubMinMonthlyUsd('high-school')).toBe(189);
    expect(getMathHubSchemaOfferPrice('high-school')).toBe('189');
    expect(getMathHubMinMonthlyUsd('middle-school')).toBe(289);
  });

  it('trial fee label matches constant', () => {
    expect(formatTrialSessionFeeLabel()).toBe(`$${MATH_TRIAL_SESSION_FEE_USD}`);
  });

  it('meta description includes hub min monthly price', () => {
    const highSchoolMin = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school')
      ?.options[0]?.price;
    const amount = highSchoolMin ? parseMonthlyUsdFromLabel(highSchoolMin) : null;
    expect(buildHighSchoolMetaDescription()).toContain(`from $${amount}/month`);
    expect(buildHighSchoolMetaDescription()).toContain(formatTrialSessionFeeLabel());
  });
});
