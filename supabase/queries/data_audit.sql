-- ============================================================
-- PixelPoker data audit — READ ONLY. Returns counts, not content.
-- Run in Supabase: SQL Editor → New query → paste → Run.
-- ============================================================

-- 1. What the app stores today
select 'rooms (sessions)'                       as item, count(*)::text as value from public.sessions
union all
select 'rooms with a story/ticket title saved',  count(*)::text from public.sessions where coalesce(story, '') <> ''
union all
select 'rooms whose name contains a person''s name', count(*)::text from public.sessions where name like '%''s Session'
union all
select 'oldest room created',                    min(created_at)::text from public.sessions
union all
select 'rooms older than 24 hours',              count(*)::text from public.sessions where created_at < now() - interval '24 hours'
union all
select 'participant rows (name + avatar)',       count(*)::text from public.participants
union all
select 'distinct player names',                  count(distinct username)::text from public.participants
union all
select 'saved votes (name + vote)',              count(*)::text from public.votes;

-- 2. Leftovers from the first version (Google login). Should be 0 / empty.
select 'auth users (emails from old Google login)' as item, count(*)::text as value from auth.users
union all
select 'old profiles table exists', (to_regclass('public.profiles') is not null)::text;

-- 3. Every table in the public schema, in case anything else was added by hand
select table_name from information_schema.tables
where table_schema = 'public' order by table_name;
