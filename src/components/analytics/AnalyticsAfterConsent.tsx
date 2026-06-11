'use client';

import { useEffect, useMemo, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { GTMHead, GTMNoScript } from '@/components/analytics/GTM';
import MetaPixel from '@/components/analytics/MetaPixel';
import HubSpotSpaTracker from '@/components/analytics/HubSpotSpaTracker';
import { MicrosoftClarity } from '@/components/analytics/MicrosoftClarity';
import { isClarityExcludedPath } from '@/lib/analytics/clarityPaths';
import { getClaritySkipReasons, logClarityDebug } from '@/lib/analytics/clarityDebug';
import {
  getStoredCookieConsent,
  isAutomatedAuditEnvironment,
  type CookieConsentState,
} from '@/lib/consent';
import { isAppMetaPixelScriptDisabled } from '@/lib/metaPixelEnv';

function buildGtagInline(gaId: string) {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });
`.trim();
}

export function AnalyticsAfterConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    setReady(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as unknown;
      if (detail === 'accepted' || detail === 'rejected') setConsent(detail);
    };
    window.addEventListener('gw:cookie-consent', onChange);
    return () => window.removeEventListener('gw:cookie-consent', onChange);
  }, []);

  const env = useMemo(() => {
    return {
      gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || null,
      pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || null,
      gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || null,
      hubspotHubId: process.env.NEXT_PUBLIC_HUBSPOT_HUB_ID?.trim() || null,
      clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || null,
    };
  }, []);

  useEffect(() => {
    if (!ready || isAutomatedAuditEnvironment()) return;

    const clarityId = env.clarityProjectId ?? '';
    const reasons = getClaritySkipReasons({
      projectId: clarityId,
      pathname: pathname ?? '/',
      consentAccepted: consent === 'accepted',
    }).filter(
      (reason) =>
        reason === 'no_cookie_consent' ||
        reason === 'no_project_id' ||
        reason === 'invalid_project_id',
    );

    if (reasons.length > 0) {
      logClarityDebug('skipped', reasons, {
        pathname: pathname ?? '/',
        projectId: clarityId || undefined,
      });
    }
  }, [ready, consent, env.clarityProjectId, pathname]);

  if (!ready) return null;

  const isAudit = isAutomatedAuditEnvironment();
  const consentAccepted = consent === 'accepted';

  return (
    <>
      {/* Standalone app Meta Pixel stays consent-gated. If Pixel is configured in GTM,
          block that GTM tag with a consent trigger and set NEXT_PUBLIC_META_PIXEL_DISABLE_APP=true. */}
      {consentAccepted && !isAudit && !isAppMetaPixelScriptDisabled() && env.pixelId ? (
        <MetaPixel pixelId={env.pixelId} />
      ) : null}

      {/* GTM loads for all real users. Consent-sensitive tags must be blocked inside GTM. */}
      {!isAudit && env.gtmId ? (
        <>
          <GTMHead gtmId={env.gtmId} strategy="afterInteractive" />
          <GTMNoScript gtmId={env.gtmId} />
        </>
      ) : null}

      {/* GA fallback only when GTM isn't configured; it follows the same all-users measurement policy. */}
      {!isAudit && !env.gtmId && env.gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.gaId}`} strategy="lazyOnload" />
          <Script id="gtag-inline" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: buildGtagInline(env.gaId) }} />
        </>
      ) : null}

      {/* Consent-sensitive non-GTM tools remain behind the cookie consent gate. */}
      {consentAccepted && !isAudit ? (
        <>
          {env.hubspotHubId ? <HubSpotSpaTracker hubId={env.hubspotHubId} /> : null}
          {env.clarityProjectId && !isClarityExcludedPath(pathname) ? (
            <MicrosoftClarity projectId={env.clarityProjectId} pathname={pathname} />
          ) : null}
        </>
      ) : null}
    </>
  );
}
