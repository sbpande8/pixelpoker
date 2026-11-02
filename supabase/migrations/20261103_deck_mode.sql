-- ============================================================
-- Deck mode: Story Points (default) or T-shirt sizes, per room.
--
-- set_deck() switches the room's deck and starts a clean round:
-- it clears the current votes (which the client cannot delete
-- itself while votes are hidden by RLS) and resets has_voted.
--
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- ============================================================

alter table public.sessions
  add column if not exists deck text not null default 'points';

alter table public.sessions
  drop constraint if exists sessions_deck_check;
alter table public.sessions
  add constraint sessions_deck_check check (deck in ('points', 'tshirt'));

create or replace function public.set_deck(
  p_session_id uuid,
  p_deck       text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_deck not in ('points', 'tshirt') then
    raise exception 'Unknown deck %', p_deck;
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

revoke all on function public.set_deck(uuid, text) from public;
grant execute on function public.set_deck(uuid, text) to anon, authenticated;
