import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

type VisitorEventRow = {
  event_name: string | null;
  page_path: string | null;
  country: string | null;
  ip_hash: string | null;
  suspicious_reason: string[] | null;
};

function increment(map: Map<string, number>, key: string | null | undefined) {
  const normalized = key?.trim() || 'unknown';
  map.set(normalized, (map.get(normalized) || 0) + 1);
}

function mapToSortedObject(map: Map<string, number>, limit = 50) {
  return Object.fromEntries(
    [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit),
  );
}

function ratio(numerator: number, denominator: number): number | null {
  if (!denominator) return null;
  return Number((numerator / denominator).toFixed(4));
}

export async function GET(request: Request) {
  const expectedToken = process.env.VISITOR_EVENT_ADMIN_TOKEN;
  const url = new URL(request.url);
  const suppliedToken = request.headers.get('x-admin-token') || url.searchParams.get('token');

  if (!expectedToken || suppliedToken !== expectedToken) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
  }

  const days = Math.min(Math.max(Number(url.searchParams.get('days') || 30), 1), 180);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('visitor_event_logs')
    .select('event_name,page_path,country,ip_hash,suspicious_reason')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(10000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data || []) as VisitorEventRow[];
  const byCountry = new Map<string, number>();
  const byPage = new Map<string, number>();
  const byEvent = new Map<string, number>();
  const byIpHash = new Map<string, number>();

  let suspiciousCount = 0;
  for (const row of rows) {
    increment(byCountry, row.country);
    increment(byPage, row.page_path);
    increment(byEvent, row.event_name);
    if (row.ip_hash) increment(byIpHash, row.ip_hash);
    if (row.suspicious_reason?.length) suspiciousCount += 1;
  }

  const eventCounts = mapToSortedObject(byEvent);
  const pageViews = eventCounts.assessment_page_view || 0;
  const formStarts = eventCounts.assessment_form_start || 0;
  const formSubmits = eventCounts.assessment_form_submit || 0;
  const repeatedIpHashes = new Map([...byIpHash.entries()].filter(([, count]) => count > 1));

  return NextResponse.json({
    since,
    total_events: rows.length,
    events_by_country: mapToSortedObject(byCountry),
    events_by_page: mapToSortedObject(byPage),
    events_by_name: eventCounts,
    repeated_ip_hash_counts: mapToSortedObject(repeatedIpHashes, 100),
    assessment_page_view_to_form_start_ratio: ratio(formStarts, pageViews),
    assessment_form_start_to_submit_ratio: ratio(formSubmits, formStarts),
    suspicious_traffic_percentage: rows.length
      ? Number(((suspiciousCount / rows.length) * 100).toFixed(2))
      : 0,
  });
}
