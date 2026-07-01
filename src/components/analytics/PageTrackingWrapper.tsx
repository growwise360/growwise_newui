/**
 * Page Tracking Wrapper
 * Automatically tracks page views with Google Analytics 4
 */

'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logVisitorEventClient } from '@/lib/analytics/visitorEventsClient';

interface PageTrackingWrapperProps {
  children: React.ReactNode;
}

export function PageTrackingWrapper({ children }: PageTrackingWrapperProps) {
  const pathname = usePathname();
  
  // Track page views with GTM (dataLayer) or Google Analytics (gtag) fallback
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as any;
    const isDev = process.env.NODE_ENV !== 'production';
    const search = window.location.search.replace(/^\?/, '');
    const params = new URLSearchParams(search);
    const community = params.get('community') || undefined;
    const isDoorHangerAssessment = pathname.endsWith('/book-assessment') && Boolean(community);
    const utmSource = params.get('utm_source') || (isDoorHangerAssessment ? 'door-hanger' : undefined);
    const utmMedium = params.get('utm_medium') || (isDoorHangerAssessment ? 'physical-drop' : undefined);
    const utmCampaign = params.get('utm_campaign') || community;
    const pagePathWithQuery = search ? `${pathname}?${search}` : pathname;

    const gtmConfigured = Boolean(process.env.NEXT_PUBLIC_GTM_ID?.trim());
    const pageViewParams: Record<string, any> = {
      page_path: pagePathWithQuery,
      page_title: document.title,
      page_location: window.location.href,
      ...(community ? { community } : {}),
      ...(utmSource ? { utm_source: utmSource } : {}),
      ...(utmMedium ? { utm_medium: utmMedium } : {}),
      ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
      ...(isDev ? { debug_mode: true } : {}),
    };
    const dataLayerPayload: Record<string, any> = {
      event: 'virtual_page_view',
      ...pageViewParams,
    };
    const doorHangerParams: Record<string, any> | null = isDoorHangerAssessment
      ? {
          page_path: pagePathWithQuery,
          page_title: document.title,
          page_location: window.location.href,
          community,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          ...(isDev ? { debug_mode: true } : {}),
        }
      : null;
    const doorHangerDataLayerPayload = doorHangerParams
      ? {
          event: 'door_hanger_assessment_page_view',
          ...doorHangerParams,
        }
      : null;

    // If Google Tag Manager is configured, queue the event immediately. GTM will consume it
    // once the container loads, which avoids missing initial page views during script startup.
    if (gtmConfigured || Array.isArray(w.dataLayer)) {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push(dataLayerPayload);
      if (doorHangerDataLayerPayload) w.dataLayer.push(doorHangerDataLayerPayload);
      if (isDev) console.debug('[Analytics][dataLayer] pushed', dataLayerPayload);
      return;
    }

    // fallback to gtag if available (include debug_mode in dev)
    if (w.gtag) {
      w.gtag('event', 'page_view', pageViewParams);
      if (doorHangerParams) w.gtag('event', 'door_hanger_assessment_page_view', doorHangerParams);
      if (isDev) console.debug('[Analytics][gtag] event', 'page_view', pageViewParams);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const clickable = target?.closest('a,button');
      if (!clickable) return;

      const href = clickable instanceof HTMLAnchorElement ? clickable.getAttribute('href') || '' : '';
      const text = clickable.textContent?.trim().toLowerCase() || '';
      const metadata = {
        href: href.slice(0, 300),
        label: text.slice(0, 120),
      };

      if (href.startsWith('tel:')) {
        logVisitorEventClient('phone_click', { metadata });
        return;
      }
      if (href.startsWith('mailto:')) {
        logVisitorEventClient('email_click', { metadata });
        return;
      }
      if (`${href} ${text}`.toLowerCase().includes('orientation')) {
        logVisitorEventClient('orientation_form_click', { metadata });
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return <>{children}</>;
}
