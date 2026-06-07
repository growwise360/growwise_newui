'use client';

import { AnalyticsAfterConsent } from '@/components/analytics/AnalyticsAfterConsent';
import { CookieConsentBanner } from '@/components/analytics/CookieConsentBanner';

/**
 * Loads measurement scripts and consent-sensitive marketing tools.
 * GTM / GA4 load for all users; ad pixels and session tools remain consent-gated here or in GTM.
 */
export function ConsentAndAnalytics() {
  return (
    <>
      <AnalyticsAfterConsent />
      <CookieConsentBanner />
    </>
  );
}
