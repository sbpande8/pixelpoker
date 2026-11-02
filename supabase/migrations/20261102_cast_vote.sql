-- ============================================================
-- cast_vote: save or CHANGE a player's vote before reveal.
--
-- Why: votes are hidden by RLS until the session is revealed.
-- Postgres only lets a client DELETE/UPDATE rows it can SELECT,
-- so the old client-side "delete then insert" silently deleted
-- nothing and the insert then failed on the unique constraint.
-- Result: a player's first vote could never be changed.
--
-- This function runs with the owner's rights (security definer),
-- so it can replace the hidden row. It only works while the
-- session is still in 'voting' status.
--
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- ============================================================

create or replace function public.cast_vote(
  p_session_id uuid,
  p_user_id    text,
  p_username   text,
  p_vote       text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.sessions
    where id = p_session_id and status = 'voting'
  ) then
    raise exception 'Voting is closed for this round';
  end if;

  delete from public.votes
  where session_id = p_session_id and user_id = p_user_id;

  insert into public.votes (session_id, user_id, username, vote)
  values (p_session_id, p_user_id, p_username, p_vote);

  update public.participants
  set has_voted = true
  where session_id = p_session_id and user_id = p_user_id;
end;
$$;

revoke all on function public.cast_vote(uuid, text, text, text) from public;
grant execute on function public.cast_vote(uuid, text, text, text) to anon, authenticated;
