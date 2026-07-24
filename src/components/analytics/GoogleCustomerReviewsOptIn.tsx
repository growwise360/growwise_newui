'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { GCR_MERCHANT_ID } from '@/lib/googleCustomerReviews';
import {
  getStoredCookieConsent,
  isAutomatedAuditEnvironment,
  type CookieConsentState,
} from '@/lib/consent';

const GCR_PLATFORM_SCRIPT = 'https://apis.google.com/js/platform.js';

export interface GoogleCustomerReviewsOptInProps {
  orderId: string;
  email: string;
  /** YYYY-MM-DD */
  estimatedDeliveryDate: string;
  deliveryCountry?: string;
}

type GcrRenderPayload = {
  orderId: string;
  email: string;
  estimatedDeliveryDate: string;
  deliveryCountry: string;
};

declare global {
  interface Window {
    gapi?: {
      load: (module: string, callback: () => void) => void;
      surveyoptin?: {
        render: (options: Record<string, string | number>) => void;
      };
    };
    renderOptIn?: () => void;
  }
}

function gcrSessionKey(orderId: string): string {
  return `gw_gcr_rendered_${orderId}`;
}

function hasAlreadyRendered(orderId: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(gcrSessionKey(orderId)) === '1';
  } catch {
    return false;
  }
}

function markRendered(orderId: string): void {
  try {
    window.sessionStorage.setItem(gcrSessionKey(orderId), '1');
  } catch {
    // ignore storage failures
  }
}

function renderSurveyOptIn(payload: GcrRenderPayload): void {
  if (hasAlreadyRendered(payload.orderId)) return;
  if (!window.gapi?.load) return;

  window.gapi.load('surveyoptin', () => {
    if (!window.gapi?.surveyoptin) return;
    markRendered(payload.orderId);
    window.gapi.surveyoptin.render({
      merchant_id: GCR_MERCHANT_ID,
      order_id: payload.orderId,
      email: payload.email,
      delivery_country: payload.deliveryCountry,
      estimated_delivery_date: payload.estimatedDeliveryDate,
    });
  });
}

/**
 * Google Customer Reviews post-purchase opt-in. Loads only after cookie consent
 * and when order id, email, and estimated delivery date are provided.
 */
export function GoogleCustomerReviewsOptIn({
  orderId,
  email,
  estimatedDeliveryDate,
  deliveryCountry = 'US',
}: GoogleCustomerReviewsOptInProps) {
  const payloadRef = useRef<GcrRenderPayload>({
    orderId,
    email,
    estimatedDeliveryDate,
    deliveryCountry,
  });

  useEffect(() => {
    payloadRef.current = { orderId, email, estimatedDeliveryDate, deliveryCountry };
  }, [orderId, email, estimatedDeliveryDate, deliveryCountry]);

  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [consentReady, setConsentReady] = useState(false);
  const [loadScript, setLoadScript] = useState(false);

  const tryRender = useCallback(() => {
    const payload = payloadRef.current;
    if (!payload.orderId || !payload.email || !payload.estimatedDeliveryDate) return;
    renderSurveyOptIn(payload);
  }, []);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    setConsentReady(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as unknown;
      if (detail === 'accepted' || detail === 'rejected') setConsent(detail);
    };
    window.addEventListener('gw:cookie-consent', onChange);
    return () => window.removeEventListener('gw:cookie-consent', onChange);
  }, []);

  useEffect(() => {
    window.renderOptIn = () => tryRender();
    return () => {
      delete window.renderOptIn;
    };
  }, [tryRender]);

  const hasRequiredFields =
    orderId.trim().length > 0 &&
    email.trim().length > 0 &&
    estimatedDeliveryDate.trim().length > 0;

  const shouldLoad =
    consentReady &&
    consent === 'accepted' &&
    !isAutomatedAuditEnvironment() &&
    hasRequiredFields;

  useEffect(() => {
    if (shouldLoad) setLoadScript(true);
  }, [shouldLoad]);

  if (!shouldLoad || !loadScript) return null;

  return (
    <Script
      id="google-customer-reviews-platform"
      src={`${GCR_PLATFORM_SCRIPT}?onload=renderOptIn`}
      strategy="afterInteractive"
      onLoad={() => {
        tryRender();
      }}
    />
  );
}
