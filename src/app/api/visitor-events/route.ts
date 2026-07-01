import { NextResponse } from 'next/server';
import {
  logVisitorEvent,
  VISITOR_EVENT_NAMES,
  type VisitorEventName,
} from '@/lib/analytics/visitorEventLogger';
import { clip, FIELD_MAX } from '@/lib/inputLimits';
import { isOriginAllowed } from '@/lib/requestGuard';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024;
const EVENT_NAMES = new Set<string>(VISITOR_EVENT_NAMES);

function readString(body: Record<string, unknown>, key: string, max = FIELD_MAX.longText): string | null {
  const value = body[key];
  return typeof value === 'string' ? clip(value, max) : null;
}

export async function POST(request: Request) {
  if (!isOriginAllowed(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 403 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Request too large' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const eventName = readString(body, 'event_name', FIELD_MAX.shortText);
  if (!eventName || !EVENT_NAMES.has(eventName)) {
    return NextResponse.json({ success: false, error: 'Invalid event name' }, { status: 400 });
  }

  await logVisitorEvent(request, {
    event_name: eventName as VisitorEventName,
    page_path: readString(body, 'page_path', 500),
    selected_assessment_type: readString(body, 'selected_assessment_type', 200),
    referrer: readString(body, 'referrer', 1000),
    utm_source: readString(body, 'utm_source', FIELD_MAX.shortText),
    utm_medium: readString(body, 'utm_medium', FIELD_MAX.shortText),
    utm_campaign: readString(body, 'utm_campaign', FIELD_MAX.shortText),
    session_id: readString(body, 'session_id', FIELD_MAX.shortText),
    visitor_id: readString(body, 'visitor_id', FIELD_MAX.shortText),
    is_zero_engagement_event:
      typeof body.is_zero_engagement_event === 'boolean' ? body.is_zero_engagement_event : null,
    metadata:
      body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? (body.metadata as Record<string, unknown>)
        : {},
  });

  return NextResponse.json({ success: true });
}
