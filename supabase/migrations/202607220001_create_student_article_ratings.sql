create extension if not exists pgcrypto;

create table if not exists public.student_article_ratings (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null check (
    article_slug in ('books-beyond-personality', 'how-recycling-helps-the-environment')
  ),
  visitor_hash text not null check (char_length(visitor_hash) = 64),
  rating smallint not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (article_slug, visitor_hash)
);

create index if not exists student_article_ratings_article_slug_idx
  on public.student_article_ratings (article_slug);

alter table public.student_article_ratings enable row level security;

revoke all on public.student_article_ratings from anon, authenticated;
