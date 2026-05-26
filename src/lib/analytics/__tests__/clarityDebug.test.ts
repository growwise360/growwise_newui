import { getClaritySkipReasons } from '@/lib/analytics/clarityDebug';

jest.mock('@/lib/consent', () => ({
  isAutomatedAuditEnvironment: jest.fn(() => false),
}));

const { isAutomatedAuditEnvironment } = require('@/lib/consent') as {
  isAutomatedAuditEnvironment: jest.Mock;
};

describe('getClaritySkipReasons', () => {
  beforeEach(() => {
    isAutomatedAuditEnvironment.mockReturnValue(false);
  });

  it('returns no_cookie_consent when consent not accepted', () => {
    expect(
      getClaritySkipReasons({
        projectId: 'abc123',
        pathname: '/en/camps/summer',
        consentAccepted: false,
      }),
    ).toContain('no_cookie_consent');
  });

  it('returns no_project_id when env id is empty', () => {
    expect(
      getClaritySkipReasons({
        projectId: '',
        pathname: '/en/camps/summer',
        consentAccepted: true,
      }),
    ).toContain('no_project_id');
  });

  it('returns excluded_path on checkout routes', () => {
    expect(
      getClaritySkipReasons({
        projectId: 'abc123',
        pathname: '/en/checkout/success',
        consentAccepted: true,
      }),
    ).toContain('excluded_path');
  });

  it('returns empty when all gates pass', () => {
    expect(
      getClaritySkipReasons({
        projectId: 'abc123',
        pathname: '/en/camps/summer',
        consentAccepted: true,
      }),
    ).toEqual([]);
  });
});
