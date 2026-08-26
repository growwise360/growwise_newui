create table if not exists public.free_resource_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint free_resource_leads_normalized_email
    check (email = lower(trim(email)))
);

create table if not exists public.resource_downloads (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.free_resource_leads(id) on delete cascade,
  resource_id text not null,
  resource_category text not null,
  created_at timestamptz not null default now(),
  constraint resource_downloads_lead_resource_unique
    unique (lead_id, resource_id)
);

alter table public.free_resource_leads enable row level security;
alter table public.resource_downloads enable row level security;

comment on table public.free_resource_leads is
  'Server-only lead records for the free resources email flow.';
comment on table public.resource_downloads is
  'One row per lead and resource; the unique constraint makes retries idempotent.';
