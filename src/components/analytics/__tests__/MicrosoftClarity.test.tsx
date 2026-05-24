import React from 'react';
import { render } from '@/test-utils';
import { MicrosoftClarity } from '../MicrosoftClarity';

const mockConsentV2 = jest.fn();
const mockInit = jest.fn();
const mockClarityStop = jest.fn();

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
    mockClarityStop.mockClear();
    isAutomatedAuditEnvironment.mockReturnValue(false);
    mockInit.mockImplementation(() => {
      (window as Window & { clarity?: (...args: unknown[]) => void }).clarity = mockClarityStop;
    });
  });

  afterEach(() => {
    delete (window as Window & { clarity?: (...args: unknown[]) => void }).clarity;
  });

  it('initializes Clarity on allowed public paths', () => {
    render(<MicrosoftClarity projectId="abc123" pathname="/en/camps/summer" />);

    expect(mockInit).toHaveBeenCalledWith('abc123');
    expect(mockConsentV2).toHaveBeenCalledWith({
      ad_Storage: 'denied',
      analytics_Storage: 'granted',
    });
    expect(mockInit.mock.invocationCallOrder[0]).toBeLessThan(
      mockConsentV2.mock.invocationCallOrder[0],
    );
  });

  it('skips init on excluded checkout paths', () => {
    render(<MicrosoftClarity projectId="abc123" pathname="/en/checkout" />);

    expect(mockConsentV2).not.toHaveBeenCalled();
    expect(mockInit).not.toHaveBeenCalled();
  });

  it('stops recording when navigating to an excluded route', () => {
    const { rerender } = render(
      <MicrosoftClarity projectId="abc123" pathname="/en/camps/summer" />,
    );

    expect(mockInit).toHaveBeenCalledTimes(1);

    rerender(<MicrosoftClarity projectId="abc123" pathname="/en/checkout" />);

    expect(mockClarityStop).toHaveBeenCalledWith('stop');
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

  it('skips init when project id format is invalid', () => {
    render(<MicrosoftClarity projectId="bad id!" pathname="/en/camps/summer" />);

    expect(mockConsentV2).not.toHaveBeenCalled();
    expect(mockInit).not.toHaveBeenCalled();
  });

  it('does not throw when window.clarity is unavailable after init', () => {
    mockInit.mockImplementation(() => {
      delete (window as Window & { clarity?: (...args: unknown[]) => void }).clarity;
    });

    expect(() => {
      render(<MicrosoftClarity projectId="abc123" pathname="/en/camps/summer" />);
    }).not.toThrow();

    expect(mockInit).toHaveBeenCalledWith('abc123');
    expect(mockConsentV2).not.toHaveBeenCalled();
  });
});
