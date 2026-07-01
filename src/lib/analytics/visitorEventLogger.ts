import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

export const VISITOR_EVENT_NAMES = [
  'assessment_page_view',
  'assessment_option_selected',
  'assessment_form_start',
  'assessment_form_submit',
  'orientation_form_click',
  'phone_click',
  'email_click',
] as const;

export type VisitorEventName = (typeof VISITOR_EVENT_NAMES)[number];

export type VisitorEventPayload = {
  event_name: VisitorEventName;
  page_path?: string | null;
  selected_assessment_type?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  session_id?: string | null;
  visitor_id?: string | null;
  is_zero_engagement_event?: boolean | null;
  metadata?: Record<string, unknown> | null;
};

const BOT_USER_AGENT_KEYWORDS = [
  'bot',
  'crawler',
  'spider',
  'headless',
  'selenium',
  'playwright',
  'puppeteer',
  'python',
  'curl',
  'wget',
];

let warnedMissingSupabase = false;
let warnedMissingSalt = false;

function firstIp(value: string | null): string | null {
  if (!value) return null;
  const [first] = value.split(',');
  return first?.trim() || null;
}

export function extractClientIpForVisitorLog(request: Request): string | null {
  const headers = request.headers;
  return (
    firstIp(headers.get('x-vercel-forwarded-for')) ||
    firstIp(headers.get('x-forwarded-for')) ||
    firstIp(headers.get('x-real-ip'))
  );
}

function decodeHeaderValue(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT;
  if (!salt) {
    if (process.env.NODE_ENV !== 'production' && !warnedMissingSalt) {
      warnedMissingSalt = true;
      console.warn('[visitor-events] IP_HASH_SALT is not configured; ip_hash will be null');
    }
    return null;
  }
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const normalized = userAgent.toLowerCase();
  return BOT_USER_AGENT_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function cleanString(value: string | null | undefined, max = 500): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV !== 'production' && !warnedMissingSupabase) {
      warnedMissingSupabase = true;
      console.warn('[visitor-events] Supabase env vars missing; visitor event logging skipped');
    }
    return null;
  }
  return createClient(supabaseUrl, supabaseKey);
}

function pagePathFromRequest(request: Request): string {
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.pathname}${url.search}`;
    } catch {
      return referer.slice(0, 500);
    }
  }
  try {
    const url = new URL(request.url);
    return url.pathname;
  } catch {
    return '';
  }
}

export async function logVisitorEvent(
  request: Request,
  payload: VisitorEventPayload,
): Promise<{ logged: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { logged: false, error: 'supabase_not_configured' };

  const userAgent = cleanString(request.headers.get('user-agent'), 1000);
  const country = cleanString(request.headers.get('x-vercel-ip-country'), 80);
  const city = cleanString(decodeHeaderValue(request.headers.get('x-vercel-ip-city')), 120);
  const region = cleanString(request.headers.get('x-vercel-ip-country-region'), 120);
  const isMissingUserAgent = !userAgent;
  const isBot = isBotUserAgent(userAgent);
  const isNonUs = Boolean(country && country.toUpperCase() !== 'US');
  const suspiciousReason = [
    isMissingUserAgent ? 'missing_user_agent' : '',
    isBot ? 'bot_user_agent' : '',
    isNonUs ? 'non_us' : '',
    payload.is_zero_engagement_event ? 'zero_engagement_event' : '',
  ].filter(Boolean);

  const { error } = await supabase.from('visitor_event_logs').insert({
    event_name: payload.event_name,
    page_path: cleanString(payload.page_path, 500) || pagePathFromRequest(request),
    selected_assessment_type: cleanString(payload.selected_assessment_type, 200),
    referrer: cleanString(payload.referrer || request.headers.get('referer'), 1000),
    utm_source: cleanString(payload.utm_source, 120),
    utm_medium: cleanString(payload.utm_medium, 120),
    utm_campaign: cleanString(payload.utm_campaign, 200),
    user_agent: userAgent,
    country,
    city,
    region,
    session_id: cleanString(payload.session_id, 120),
    visitor_id: cleanString(payload.visitor_id, 120),
    ip_hash: hashIp(extractClientIpForVisitorLog(request)),
    is_missing_user_agent: isMissingUserAgent,
    is_bot_user_agent: isBot,
    is_non_us: isNonUs,
    is_zero_engagement_event: payload.is_zero_engagement_event ?? null,
    suspicious_reason: suspiciousReason,
    metadata: payload.metadata && typeof payload.metadata === 'object' ? payload.metadata : {},
  });

  if (error) {
    console.error('[visitor-events] insert failed', { code: error.code, message: error.message });
    return { logged: false, error: error.message };
  }

  return { logged: true };
}
