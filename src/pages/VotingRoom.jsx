import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import CardDeck from '../components/Voting/CardDeck'
import ResultsChart from '../components/Voting/ResultsChart'
import { AvatarPreview } from '../components/Avatar/PixelAvatarEditor'

export default function VotingRoom() {
  const { code } = useParams()
  const { session, profile } = useAuth()
  const navigate = useNavigate()

  const [sess, setSess] = useState(null)
  const [participants, setParticipants] = useState([])
  const [votes, setVotes] = useState([])
  const [myVote, setMyVote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [storyInput, setStoryInput] = useState('')
  const [isHost, setIsHost] = useState(false)
  const [copied, setCopied] = useState(false)

  const displayName =
    profile?.display_name || session?.user?.email?.split('@')[0]

  // ── Fetch initial data ──────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const { data: sessData } = await supabase
        .from('sessions')
        .select('*')
        .eq('code', code)
        .single()

      if (!sessData) { navigate('/'); return }

      setSess(sessData)
      setIsHost(sessData.created_by === session.user.id)

      const { data: parts } = await supabase
        .from('participants')
        .select('*')
        .eq('session_id', sessData.id)

      setParticipants(parts || [])

      const { data: voteData } = await supabase
        .from('votes')
        .select('*')
        .eq('session_id', sessData.id)
        .eq('round', sessData.current_round)

      setVotes(voteData || [])
      const mine = voteData?.find((v) => v.user_id === session.user.id)
      setMyVote(mine?.vote || null)

      setLoading(false)
    }
    load()
  }, [code, session.user.id, navigate])

  // ── Realtime subscriptions ──────────────────────────────────────────────────
  useEffect(() => {
    if (!sess) return

    const channel = supabase
      .channel(`session:${sess.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sessions', filter: `id=eq.${sess.id}` },
        (payload) => setSess(payload.new)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'participants', filter: `session_id=eq.${sess.id}` },
        async () => {
          const { data } = await supabase
            .from('participants')
            .select('*')
            .eq('session_id', sess.id)
          setParticipants(data || [])
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'votes', filter: `session_id=eq.${sess.id}` },
        async () => {
          const { data } = await supabase
            .from('votes')
            .select('*')
            .eq('session_id', sess.id)
            .eq('round', sess.current_round)
          setVotes(data || [])
          const mine = data?.find((v) => v.user_id === session.user.id)
          setMyVote(mine?.vote || null)
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [sess?.id, sess?.current_round, session.user.id])

  // ── Actions ─────────────────────────────────────────────────────────────────
  const castVote = useCallback(
    async (value) => {
      if (!sess || sess.status === 'revealed') return
      setMyVote(value)
      await supabase.from('votes').upsert({
        session_id: sess.id,
        user_id: session.user.id,
        display_name: displayName,
        round: sess.current_round,
        vote: value,
      })
    },
    [sess, session.user.id, displayName]
  )

  async function handleReveal() {
    await supabase
      .from('sessions')
      .update({ status: 'revealed' })
      .eq('id', sess.id)
  }

  async function handleNewRound() {
    await supabase
      .from('sessions')
      .update({ status: 'voting', current_round: (sess.current_round || 1) + 1, current_story: '' })
      .eq('id', sess.id)
    setMyVote(null)
  }

  async function handleSetStory() {
    if (!storyInput.trim()) return
    await supabase
      .from('sessions')
      .update({ current_story: storyInput.trim() })
      .eq('id', sess.id)
    setStoryInput('')
  }

  function copyCode() {
    navigator.clipboard.writeText(sess.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xs font-pixel text-pixel-accent animate-pulse">LOADING...</p>
      </div>
    )
  }

  const revealed = sess?.status === 'revealed'
  const votedIds = new Set(votes.map((v) => v.user_id))

  return (
    <div className="min-h-screen flex flex-col gap-6 px-4 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xs font-pixel text-pixel-accent">{sess?.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400 font-pixel">{sess?.code}</span>
            <button
              onClick={copyCode}
              className="text-xs text-pixel-cyan font-pixel hover:underline"
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-pixel px-2 py-1 border"
            style={{
              borderColor: revealed ? '#ef4444' : '#22c55e',
              color: revealed ? '#ef4444' : '#22c55e',
            }}
          >
            {revealed ? 'REVEALED' : 'VOTING'}
          </span>
          <button
            onClick={() => navigate('/')}
            className="btn-pixel-outline text-xs py-1 px-2"
          >
            LEAVE
          </button>
        </div>
      </div>

      {/* Story */}
      <div className="card-pixel">
        <p className="text-xs text-gray-400 font-pixel mb-2">STORY</p>
        {sess?.current_story ? (
          <p className="text-sm text-white font-pixel leading-6">{sess.current_story}</p>
        ) : (
          <p className="text-xs text-gray-600 font-pixel italic">No story set yet.</p>
        )}
        {isHost && !revealed && (
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={storyInput}
              onChange={(e) => setStoryInput(e.target.value)}
              placeholder="Enter story title or ticket ID..."
              className="input-pixel flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSetStory()}
            />
            <button onClick={handleSetStory} className="btn-pixel text-xs px-3">
              SET
            </button>
          </div>
        )}
      </div>

      {/* Participants */}
      <div className="card-pixel">
        <p className="text-xs text-gray-400 font-pixel mb-3">
          PLAYERS ({participants.length})
        </p>
        <div className="flex flex-wrap gap-3">
          {participants.map((p) => {
            const hasVoted = votedIds.has(p.user_id)
            const theirVote = revealed ? votes.find((v) => v.user_id === p.user_id) : null
            const avatarGrid = p.avatar_grid ? JSON.parse(p.avatar_grid) : null
            return (
              <div
                key={p.user_id}
                className="flex flex-col items-center gap-1 relative"
              >
                {/* Vote card or status */}
                <div
                  className="w-10 h-14 flex items-center justify-center border-2 text-xs font-pixel"
                  style={{
                    borderColor: theirVote
                      ? '#7c3aed'
                      : hasVoted
                      ? '#22c55e'
                      : '#3b3b6b',
                    backgroundColor: theirVote
                      ? '#2d1a3b'
                      : hasVoted
                      ? '#1a3c34'
                      : '#1a1a3e',
                    color: theirVote ? '#a78bfa' : hasVoted ? '#22c55e' : '#6b7280',
                  }}
                >
                  {theirVote ? theirVote.vote : hasVoted ? '✓' : '…'}
                </div>
                {/* Avatar or initial */}
                {avatarGrid ? (
                  <AvatarPreview grid={avatarGrid} size={24} />
                ) : (
                  <div className="w-6 h-6 bg-pixel-accent flex items-center justify-center text-xs font-pixel">
                    {p.display_name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                <span className="text-[8px] font-pixel text-gray-400 max-w-[48px] truncate text-center">
                  {p.display_name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Card deck */}
      {!revealed && (
        <div className="card-pixel">
          <p className="text-xs text-gray-400 font-pixel mb-4">
            YOUR VOTE {myVote && <span className="text-pixel-green ml-2">→ {myVote}</span>}
          </p>
          <CardDeck selected={myVote} onSelect={castVote} />
        </div>
      )}

      {/* Results */}
      {revealed && votes.length > 0 && <ResultsChart votes={votes} />}

      {/* Host controls */}
      {isHost && (
        <div className="flex gap-3 justify-center">
          {!revealed && (
            <button
              onClick={handleReveal}
              disabled={votes.length === 0}
              className="btn-pixel disabled:opacity-50"
            >
              REVEAL VOTES
            </button>
          )}
          {revealed && (
            <button onClick={handleNewRound} className="btn-pixel">
              NEW ROUND
            </button>
          )}
        </div>
      )}
    </div>
  )
}
