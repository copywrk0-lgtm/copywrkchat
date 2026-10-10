-- Run in your project's Supabase SQL editor. Tables are not public to browsers.
create extension if not exists pgcrypto;

create table if not exists public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site_id text not null default 'copywrk',
  visitor_id text,
  name text not null,
  contact text not null,
  project_type text not null,
  timeline text,
  budget text,
  message text,
  consent boolean not null check (consent = true),
  source text not null default 'website-chat'
);

alter table public.chat_leads enable row level security;
-- No anon/authenticated policies: only server with service-role secret can access.
revoke all on public.chat_leads from anon, authenticated;

create table if not exists public.chat_rate_limits (
  fingerprint text not null,
  window_bucket bigint not null,
  used integer not null default 1,
  primary key (fingerprint, window_bucket)
);
alter table public.chat_rate_limits enable row level security;
revoke all on public.chat_rate_limits from anon, authenticated;

-- Called only from the server with service-role credentials.
create or replace function public.allow_chat_request(
  p_fingerprint text, p_window_bucket bigint, p_limit integer default 25
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare new_used integer;
begin
  insert into public.chat_rate_limits (fingerprint, window_bucket, used)
  values (p_fingerprint, p_window_bucket, 1)
  on conflict (fingerprint, window_bucket)
  do update set used = public.chat_rate_limits.used + 1
  returning used into new_used;
  return new_used <= least(greatest(p_limit, 1), 100);
end;
$$;
revoke execute on function public.allow_chat_request(text, bigint, integer) from public, anon, authenticated;
grant execute on function public.allow_chat_request(text, bigint, integer) to service_role;
-- Optionally prune old buckets with a scheduled database job.
