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
      {/* Meta Pixel loads without a consent gate so Meta's Event Setup Tool can detect it.
          Custom events (Lead, Purchase, etc.) are fired explicitly from user actions and are
          unaffected by this change. Suppress during automated audits and when explicitly
          disabled (e.g. pixel is already loaded via GTM). */}
      {!isAudit && !isAppMetaPixelScriptDisabled() && env.pixelId ? (
        <MetaPixel pixelId={env.pixelId} />
      ) : null}

      {/* GTM and GA remain behind the consent gate. */}
      {consentAccepted && !isAudit ? (
        <>
          {env.gtmId ? (
            <>
              <GTMHead gtmId={env.gtmId} strategy="afterInteractive" />
              <GTMNoScript gtmId={env.gtmId} />
            </>
          ) : null}

          {/* GA fallback only when GTM isn't configured */}
          {!env.gtmId && env.gaId ? (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.gaId}`} strategy="lazyOnload" />
              <Script id="gtag-inline" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: buildGtagInline(env.gaId) }} />
            </>
          ) : null}

          {env.hubspotHubId ? <HubSpotSpaTracker hubId={env.hubspotHubId} /> : null}
          {env.clarityProjectId && !isClarityExcludedPath(pathname) ? (
            <MicrosoftClarity projectId={env.clarityProjectId} pathname={pathname} />
          ) : null}
        </>
      ) : null}
    </>
  );
}
