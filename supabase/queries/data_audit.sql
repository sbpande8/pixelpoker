-- ============================================================
-- PixelPoker data audit — READ ONLY. Returns counts, not content.
-- Run in Supabase: SQL Editor → New query → paste → Run.
-- (One single query, because the SQL Editor only shows the
--  result of the last statement.)
-- ============================================================

select 'rooms (sessions)'                          as item, count(*)::text as value from public.sessions
union all
select 'rooms with a story/ticket title saved',     count(*)::text from public.sessions where coalesce(story, '') <> ''
union all
select 'rooms whose name contains a person''s name', count(*)::text from public.sessions where name like '%''s Session'
union all
select 'oldest room created',                       coalesce(min(created_at)::text, '-') from public.sessions
union all
select 'rooms older than 24 hours',                 count(*)::text from public.sessions where created_at < now() - interval '24 hours'
union all
select 'participant rows (name + avatar)',          count(*)::text from public.participants
union all
select 'distinct player names',                     count(distinct username)::text from public.participants
union all
select 'saved votes (name + vote)',                 count(*)::text from public.votes
union all
select 'auth users (emails from old Google login)', count(*)::text from auth.users
union all
select 'tables in public schema',                   string_agg(table_name, ', ' order by table_name)
  from information_schema.tables where table_schema = 'public';
