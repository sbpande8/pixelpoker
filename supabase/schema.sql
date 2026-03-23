-- ============================================================
-- PixelPoker — Schema (no auth required, username-based)
-- Run in Supabase SQL Editor → New Query
-- ============================================================

-- Drop existing tables if re-running
drop table if exists public.votes cascade;
drop table if exists public.participants cascade;
drop table if exists public.sessions cascade;
drop table if exists public.profiles cascade;
drop function if exists public.handle_new_user() cascade;

-- ── sessions ─────────────────────────────────────────────────
create table public.sessions (
  id         uuid primary key default gen_random_uuid(),
  code       text unique not null,
  name       text not null default 'Planning Session',
  status     text not null default 'voting',  -- voting | revealed
  story      text default '',
  created_at timestamptz default now()
);

-- ── participants ──────────────────────────────────────────────
create table public.participants (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  user_id    text not null,
  username   text not null,
  avatar_id  text default 'chicken',   -- matches avatar id in AvatarSelector.jsx
  last_seen  timestamptz default now(),
  unique(session_id, user_id)
);

-- ── votes ─────────────────────────────────────────────────────
create table public.votes (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  user_id    text not null,
  username   text not null,
  vote       text not null,
  created_at timestamptz default now(),
  unique(session_id, user_id)
);

-- ── Open access (no auth needed) ─────────────────────────────
alter table public.sessions    disable row level security;
alter table public.participants disable row level security;
alter table public.votes       disable row level security;

-- ── Realtime ─────────────────────────────────────────────────
alter publication supabase_realtime add table public.sessions;
alter publication supabase_realtime add table public.participants;
alter publication supabase_realtime add table public.votes;
