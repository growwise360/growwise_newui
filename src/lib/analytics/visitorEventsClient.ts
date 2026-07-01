'use client';

import { getStoredUtm } from '@/lib/analytics/utm';

export type VisitorEventClientName =
  | 'assessment_page_view'
  | 'assessment_option_selected'
  | 'assessment_form_start'
  | 'assessment_form_submit'
  | 'orientation_form_click'
  | 'phone_click'
  | 'email_click';

const VISITOR_ID_KEY = 'gw_visitor_id';
const SESSION_ID_KEY = 'gw_session_id';

function createId(prefix: string): string {
  const randomId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${randomId}`;
}

function readOrCreateStorageId(storage: Storage, key: string, prefix: string): string {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const next = createId(prefix);
  storage.setItem(key, next);
  return next;
}

export function getVisitorEventIdentity(): { visitor_id: string | null; session_id: string | null } {
  if (typeof window === 'undefined') return { visitor_id: null, session_id: null };
  try {
    return {
      visitor_id: readOrCreateStorageId(window.localStorage, VISITOR_ID_KEY, 'visitor'),
      session_id: readOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY, 'session'),
    };
  } catch {
    return { visitor_id: null, session_id: null };
  }
}

function currentPagePath(): string | null {
  if (typeof window === 'undefined') return null;
  return `${window.location.pathname}${window.location.search}`;
}

function currentUtms() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const stored = getStoredUtm();
  return {
    utm_source: params.get('utm_source') || stored?.utm_source || undefined,
    utm_medium: params.get('utm_medium') || stored?.utm_medium || undefined,
    utm_campaign: params.get('utm_campaign') || stored?.utm_campaign || undefined,
  };
}

export function logVisitorEventClient(
  eventName: VisitorEventClientName,
  options: {
    selected_assessment_type?: string | null;
    page_path?: string | null;
    is_zero_engagement_event?: boolean | null;
    metadata?: Record<string, unknown>;
  } = {},
): void {
  if (typeof window === 'undefined') return;
  const identity = getVisitorEventIdentity();
  const body = {
    event_name: eventName,
    page_path: options.page_path || currentPagePath(),
    selected_assessment_type: options.selected_assessment_type,
    referrer: document.referrer || undefined,
    ...currentUtms(),
    ...identity,
    is_zero_engagement_event: options.is_zero_engagement_event,
    metadata: options.metadata,
  };

  try {
    fetch('/api/visitor-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* Visitor quality logging must never interrupt the user flow. */
  }
}
