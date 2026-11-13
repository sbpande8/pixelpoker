-- ============================================================
-- Data retention: keep only what a live session needs.
--
-- 1. Rooms with no activity for 24 hours are deleted automatically,
--    every hour. Deleting a room also deletes its players and votes
--    (foreign keys cascade), including any story / ticket title.
--    "Activity" = room created, a player joined, or a vote was cast.
-- 2. Room names no longer contain the creator's name.
--
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- If the first line fails, enable "pg_cron" under
-- Database → Extensions, then run the script again.
-- ============================================================

create extension if not exists pg_cron with schema pg_catalog;

-- Change the interval here to keep rooms longer or shorter.
create or replace function public.cleanup_inactive_rooms()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  with activity as (
    select s.id,
           greatest(
             s.created_at,
             (select max(p.last_seen)  from public.participants p where p.session_id = s.id),
             (select max(v.created_at) from public.votes v        where v.session_id = s.id)
           ) as last_active
    from public.sessions s
  )
  delete from public.sessions s
  using activity a
  where a.id = s.id
    and a.last_active < now() - interval '24 hours';

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

-- Nobody outside the database may call it.
revoke all on function public.cleanup_inactive_rooms() from public, anon, authenticated;

-- Run every hour (replace the job if it already exists).
select cron.unschedule(jobid) from cron.job where jobname = 'pixelpoker-cleanup';
select cron.schedule('pixelpoker-cleanup', '17 * * * *', $$select public.cleanup_inactive_rooms()$$);

-- Remove creator names from existing room names.
update public.sessions set name = 'Planning Session' where name <> 'Planning Session';

-- Clean up now instead of waiting for the first hourly run.
select public.cleanup_inactive_rooms() as rooms_deleted_now;
