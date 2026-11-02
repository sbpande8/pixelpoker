-- ============================================================
-- Only the room creator can switch the voting mode.
--
-- Adds sessions.creator_id (set by the app when a room is
-- created) and makes set_deck() check it. Rooms created before
-- this change have no creator_id and keep the old behaviour.
--
-- Note: the app has no login, so user ids come from the browser.
-- This blocks normal players, not a determined tamperer.
--
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- ============================================================

alter table public.sessions
  add column if not exists creator_id text;

drop function if exists public.set_deck(uuid, text);

create or replace function public.set_deck(
  p_session_id uuid,
  p_deck       text,
  p_user_id    text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_creator text;
begin
  if p_deck not in ('points', 'tshirt') then
    raise exception 'Unknown deck %', p_deck;
  end if;

  select creator_id into v_creator from public.sessions where id = p_session_id;
  if v_creator is not null and v_creator is distinct from p_user_id then
    raise exception 'Only the room creator can change the mode';
  end if;

  delete from public.votes where session_id = p_session_id;

  update public.participants
  set has_voted = false
  where session_id = p_session_id;

  update public.sessions
  set deck = p_deck, status = 'voting'
  where id = p_session_id;
end;
$$;

revoke all on function public.set_deck(uuid, text, text) from public;
grant execute on function public.set_deck(uuid, text, text) to anon, authenticated;
