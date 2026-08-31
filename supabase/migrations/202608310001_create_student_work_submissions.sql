create extension if not exists pgcrypto;

create table if not exists public.student_work_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_type text not null check (submission_type in ('article', 'story')),
  title text not null check (char_length(title) between 2 and 160),
  student_name text not null check (char_length(student_name) between 2 and 100),
  grade text not null check (grade in ('3', '4', '5', '6', '7', '8', '9', '10', '11', '12')),
  guardian_name text not null check (char_length(guardian_name) between 2 and 100),
  guardian_email text not null check (char_length(guardian_email) between 3 and 254),
  notes text check (notes is null or char_length(notes) <= 2000),
  original_filename text not null,
  storage_path text not null unique,
  mime_type text not null,
  file_size integer not null check (file_size > 0 and file_size <= 8388608),
  status text not null default 'pending_review' check (
    status in ('pending_review', 'changes_requested', 'approved', 'published', 'declined')
  ),
  guardian_consent_confirmed boolean not null check (guardian_consent_confirmed = true),
  original_work_confirmed boolean not null check (original_work_confirmed = true),
  review_notification_sent_at timestamptz,
  notification_error text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  published_url text
);

create index if not exists student_work_submissions_status_submitted_idx
  on public.student_work_submissions (status, submitted_at desc);

create index if not exists student_work_submissions_guardian_email_idx
  on public.student_work_submissions (lower(guardian_email));

alter table public.student_work_submissions enable row level security;
revoke all on public.student_work_submissions from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'student-submissions',
  'student-submissions',
  false,
  8388608,
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
