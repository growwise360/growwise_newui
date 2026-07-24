create extension if not exists pgcrypto;

create table if not exists public.visitor_event_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null,
  page_path text,
  selected_assessment_type text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  country text,
  city text,
  region text,
  session_id text,
  visitor_id text,
  ip_hash text,
  is_missing_user_agent boolean not null default false,
  is_bot_user_agent boolean not null default false,
  is_non_us boolean not null default false,
  is_zero_engagement_event boolean,
  suspicious_reason text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists visitor_event_logs_created_at_idx
  on public.visitor_event_logs (created_at desc);

create index if not exists visitor_event_logs_event_name_idx
  on public.visitor_event_logs (event_name);

create index if not exists visitor_event_logs_page_path_idx
  on public.visitor_event_logs (page_path);

create index if not exists visitor_event_logs_ip_hash_idx
  on public.visitor_event_logs (ip_hash);

create index if not exists visitor_event_logs_session_id_idx
  on public.visitor_event_logs (session_id);

create index if not exists visitor_event_logs_country_idx
  on public.visitor_event_logs (country);
