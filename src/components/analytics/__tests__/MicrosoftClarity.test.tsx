import React from 'react';
import { render } from '@/test-utils';
import { MicrosoftClarity } from '../MicrosoftClarity';

const mockConsentV2 = jest.fn();
const mockInit = jest.fn();

jest.mock('@microsoft/clarity', () => ({
  __esModule: true,
  default: {
    consentV2: (...args: unknown[]) => mockConsentV2(...args),
    init: (...args: unknown[]) => mockInit(...args),
  },
}));

jest.mock('@/lib/consent', () => ({
  isAutomatedAuditEnvironment: jest.fn(() => false),
}));

const { isAutomatedAuditEnvironment } = require('@/lib/consent') as {
  isAutomatedAuditEnvironment: jest.Mock;
};

describe('MicrosoftClarity', () => {
  beforeEach(() => {
    mockConsentV2.mockClear();
    mockInit.mockClear();
    isAutomatedAuditEnvironment.mockReturnValue(false);
  });

  it('initializes Clarity on allowed public paths', () => {
    render(<MicrosoftClarity projectId="abc123" pathname="/en/camps/summer" />);

    expect(mockConsentV2).toHaveBeenCalledWith({
      ad_Storage: 'denied',
      analytics_Storage: 'granted',
    });
    expect(mockInit).toHaveBeenCalledWith('abc123');
  });

  it('skips init on excluded checkout paths', () => {
    render(<MicrosoftClarity projectId="abc123" pathname="/en/checkout" />);

    expect(mockConsentV2).not.toHaveBeenCalled();
    expect(mockInit).not.toHaveBeenCalled();
  });

  it('skips init in automated audit environments', () => {
    isAutomatedAuditEnvironment.mockReturnValue(true);

    render(<MicrosoftClarity projectId="abc123" pathname="/en/camps/summer" />);

    expect(mockConsentV2).not.toHaveBeenCalled();
    expect(mockInit).not.toHaveBeenCalled();
  });

  it('skips init when project id is missing', () => {
    render(<MicrosoftClarity projectId="" pathname="/en/camps/summer" />);

    expect(mockConsentV2).not.toHaveBeenCalled();
    expect(mockInit).not.toHaveBeenCalled();
  });
});
