import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getUser, setUser } from '../lib/user'
import { getAvatar } from '../components/Avatar/AvatarSelector'
import AvatarSelector from '../components/Avatar/AvatarSelector'
import CardDeck from '../components/Voting/CardDeck'
import ResultsChart from '../components/Voting/ResultsChart'
import RoundTable from '../components/RoundTable'
import Footer from '../components/Footer'

// ── Result characters ──────────────────────────────────────────────────────────
const Borat = () => (
  <svg viewBox="0 0 64 80" width="80" height="100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
    <rect x="14" y="2"  width="36" height="14" fill="#1a0a00"/>
    <rect x="10" y="10" width="6"  height="10" fill="#1a0a00"/>
    <rect x="48" y="10" width="6"  height="10" fill="#1a0a00"/>
    <polygon points="14,18 50,18 54,14 18,14" fill="#D4956A"/>
    <rect x="14" y="18" width="36" height="22" fill="#D4956A"/>
    <rect x="18" y="22" width="8"  height="6"  fill="#1A1A1A"/>
    <rect x="38" y="22" width="8"  height="6"  fill="#1A1A1A"/>
    <rect x="19" y="23" width="3"  height="3"  fill="#4a3010"/>
    <rect x="39" y="23" width="3"  height="3"  fill="#4a3010"/>
    <rect x="15" y="30" width="34" height="7"  fill="#1a0a00"/>
    <rect x="18" y="32" width="28" height="4"  fill="#3a1a00"/>
    <polygon points="8,40 56,40 60,36 12,36" fill="#5a5a5a"/>
    <rect x="8"  y="40" width="48" height="28" fill="#4a4a4a"/>
    <polygon points="22,40 32,52 8,40"  fill="#5a5a5a"/>
    <polygon points="42,40 32,52 56,40" fill="#5a5a5a"/>
    <rect x="28" y="40" width="8"  height="20" fill="#FFFFFF"/>
    <polygon points="30,40 34,40 33,57 31,57" fill="#228B22"/>
    <rect x="0"  y="40" width="10" height="24" fill="#4a4a4a"/>
    <rect x="54" y="40" width="10" height="24" fill="#4a4a4a"/>
    <rect x="54" y="54" width="10" height="8"  fill="#D4956A"/>
    <rect x="58" y="44" width="6"  height="14" fill="#D4956A"/>
    <rect x="10" y="66" width="16" height="12" fill="#1a1a1a"/>
    <rect x="38" y="66" width="16" height="12" fill="#1a1a1a"/>
  </svg>
)

// Confused character for "Spot the odd one out"
const Puzzled = () => (
  <svg viewBox="0 0 64 80" width="72" height="90" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
    <text x="2"  y="18" fontSize="14" fill="#f59e0b" fontFamily="monospace">?</text>
    <text x="48" y="14" fontSize="10" fill="#f59e0b" fontFamily="monospace">?</text>
    <polygon points="14,20 50,20 54,16 18,16" fill="#FCD34D"/>
    <rect x="14" y="20" width="36" height="22" fill="#FCD34D"/>
    <rect x="18" y="24" width="8" height="6" fill="#1A1A1A"/>
    <rect x="38" y="22" width="8" height="8" fill="#1A1A1A"/>
    <rect x="20" y="26" width="2" height="2" fill="#fff"/>
    <rect x="40" y="24" width="2" height="2" fill="#fff"/>
    <rect x="18" y="34" width="4" height="3" fill="#1A1A1A"/>
    <rect x="24" y="37" width="4" height="3" fill="#1A1A1A"/>
    <rect x="30" y="34" width="4" height="3" fill="#1A1A1A"/>
    <rect x="36" y="37" width="4" height="3" fill="#1A1A1A"/>
    <polygon points="8,42 56,42 60,38 12,38" fill="#fb923c"/>
    <rect x="8"  y="42" width="48" height="26" fill="#ea580c"/>
    <rect x="56" y="38" width="8"  height="6"  fill="#FCD34D"/>
    <rect x="58" y="32" width="6"  height="8"  fill="#FCD34D"/>
    <rect x="0"  y="42" width="10" height="18" fill="#ea580c"/>
    <rect x="12" y="66" width="14" height="12" fill="#1d4ed8"/>
    <rect x="38" y="66" width="14" height="12" fill="#1d4ed8"/>
  </svg>
)

// Stressed character for "Impasse"
const Stressed = () => (
  <svg viewBox="0 0 64 80" width="72" height="90" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
    <rect x="6"  y="14" width="4" height="6" fill="#60a5fa" rx="2"/>
    <rect x="52" y="10" width="3" height="5" fill="#60a5fa" rx="2"/>
    <rect x="14" y="6"  width="36" height="10" fill="#7f1d1d"/>
    <rect x="10" y="8"  width="6"  height="8"  fill="#7f1d1d"/>
    <rect x="48" y="8"  width="6"  height="8"  fill="#7f1d1d"/>
    <rect x="18" y="2"  width="6"  height="8"  fill="#7f1d1d"/>
    <rect x="34" y="4"  width="6"  height="6"  fill="#7f1d1d"/>
    <polygon points="14,18 50,18 54,14 18,14" fill="#fca5a5"/>
    <rect x="14" y="18" width="36" height="22" fill="#fca5a5"/>
    <rect x="16" y="20" width="12" height="3" fill="#7f1d1d"/>
    <rect x="36" y="20" width="12" height="3" fill="#7f1d1d"/>
    <rect x="18" y="24" width="10" height="8" fill="#1A1A1A"/>
    <rect x="36" y="24" width="10" height="8" fill="#1A1A1A"/>
    <rect x="20" y="26" width="3"  height="3" fill="#fff"/>
    <rect x="38" y="26" width="3"  height="3" fill="#fff"/>
    <rect x="22" y="34" width="20" height="5" fill="#7f1d1d"/>
    <rect x="24" y="35" width="16" height="3" fill="#ef4444"/>
    <polygon points="8,40 56,40 60,36 12,36" fill="#dc2626"/>
    <rect x="8"  y="40" width="48" height="28" fill="#b91c1c"/>
    <rect x="0"  y="36" width="10" height="20" fill="#b91c1c"/>
    <rect x="54" y="36" width="10" height="20" fill="#b91c1c"/>
    <rect x="14" y="66" width="14" height="12" fill="#374151"/>
    <rect x="36" y="66" width="14" height="12" fill="#374151"/>
  </svg>
)

// ── Result overlay ─────────────────────────────────────────────────────────────
function ResultOverlay({ resultType, onClose }) {
  const [timeLeft, setTimeLeft] = useState(5)
  useEffect(() => {
    const tick  = setInterval(() => setTimeLeft(t => t - 1), 1000)
    const close = setTimeout(onClose, 5000)
    return () => { clearInterval(tick); clearTimeout(close) }
  }, [onClose])

  const accent = resultType === 'greatSuccess' ? '#22c55e' : resultType === 'oddOneOut' ? '#f59e0b' : '#ef4444'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.78)',
    }}>
      <div style={{
        background: '#0f0f23', border: `2px solid ${accent}`,
        boxShadow: `6px 6px 0 ${accent}40`, borderRadius: 10,
        padding: '28px 36px', textAlign: 'center',
        position: 'relative', maxWidth: 420, width: '90%',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 8, right: 12,
          background: 'none', border: 'none', color: '#6b7280',
          fontSize: 20, cursor: 'pointer', lineHeight: 1,
        }}>✕</button>

        {resultType === 'greatSuccess' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', animation: 'pixelTitleBob 1.4s ease-in-out infinite', marginBottom: 14 }}>
              <Borat />
            </div>
            <p style={{ fontSize: 15, fontFamily: "'Press Start 2P', cursive", color: '#22c55e', textShadow: '2px 2px 0 #14532d', lineHeight: 1.7 }}>
              Great Success!
            </p>
          </>
        )}
        {resultType === 'oddOneOut' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', animation: 'pixelTitleBob 1.2s ease-in-out infinite', marginBottom: 14 }}>
              <Puzzled />
            </div>
            <p style={{ fontSize: 10, fontFamily: "'Press Start 2P', cursive", color: '#f59e0b', lineHeight: 2 }}>
              Spot the<br />odd one out
            </p>
          </>
        )}
        {resultType === 'impasse' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', animation: 'avatarBounce 0.7s ease-in-out infinite', marginBottom: 14 }}>
              <Stressed />
            </div>
            <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', cursive", color: '#ef4444', lineHeight: 2 }}>
              We have found<br />ourselves at<br />an impasse
            </p>
          </>
        )}

        {/* Countdown bar */}
        <div style={{ marginTop: 18, height: 4, background: '#1a1a3e', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2, background: accent,
            width: `${(timeLeft / 5) * 100}%`,
            transition: 'width 1s linear',
          }} />
        </div>
      </div>
    </div>
  )
}

// ── Nearest Fibonacci ─────────────────────────────────────────────────────────
const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55]
function nearestFibonacci(avg) {
  const n = parseFloat(avg)
  if (isNaN(n)) return null
  return FIBONACCI.reduce((best, f) =>
    Math.abs(f - n) <= Math.abs(best - n) ? f : best
  , FIBONACCI[0])
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ story, votes, revealed, averageVote, roundHistory }) {
  const PX = { fontFamily: "'Press Start 2P', cursive" }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 16 }}>
      {/* Story card */}
      <div style={{ background: '#1a1a3e', border: '1px solid #3b3b6b', borderRadius: 6, padding: 12 }}>
        <p style={{ ...PX, fontSize: 7, color: '#6b7280', marginBottom: 8 }}>STORY</p>
        <p style={{ fontSize: 10, color: story ? '#e5e7eb' : '#4b5563', lineHeight: 1.7, wordBreak: 'break-word' }}>
          {story || '—'}
        </p>
      </div>

      {/* Votes table */}
      {revealed && votes.length > 0 && (
        <div style={{ background: '#1a1a3e', border: '1px solid #3b3b6b', borderRadius: 6, padding: 12 }}>
          <p style={{ ...PX, fontSize: 7, color: '#6b7280', marginBottom: 10 }}>VOTES</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {votes.map(v => (
              <div key={v.user_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, color: '#9ca3af', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {v.username}
                </span>
                <span style={{ ...PX, fontSize: 9, color: '#a78bfa' }}>{v.vote}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #3b3b6b', marginTop: 10, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...PX, fontSize: 7, color: '#6b7280' }}>AVG</span>
              <span style={{ ...PX, fontSize: 11, color: '#22c55e' }}>{averageVote}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...PX, fontSize: 6, color: '#6b7280', lineHeight: 1.6 }}>NEAREST<br/>ESTIMATE</span>
              <span style={{ ...PX, fontSize: 14, color: '#a78bfa' }}>{nearestFibonacci(averageVote)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Round history */}
      {roundHistory.length > 0 && (
        <div style={{ background: '#1a1a3e', border: '1px solid #3b3b6b', borderRadius: 6, padding: 12 }}>
          <p style={{ ...PX, fontSize: 7, color: '#6b7280', marginBottom: 10 }}>HISTORY</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {roundHistory.map((r, i) => (
              <div key={i} style={{
                borderBottom: i < roundHistory.length - 1 ? '1px solid #2a2a4e' : 'none',
                paddingBottom: i < roundHistory.length - 1 ? 8 : 0,
              }}>
                <p style={{ fontSize: 8, color: '#9ca3af', marginBottom: 4, lineHeight: 1.6, wordBreak: 'break-word' }}>
                  {r.story}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ ...PX, fontSize: 6, color: '#6b7280' }}>AVG</span>
                  <span style={{ ...PX, fontSize: 9, color: '#22c55e' }}>{r.average ?? '?'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main room ─────────────────────────────────────────────────────────────────
export default function Room() {
  const { code }   = useParams()
  const navigate   = useNavigate()

  const [user, setLocalUser]           = useState(getUser)
  const [sess, setSess]                = useState(null)
  const [participants, setParticipants] = useState([])
  const [votes, setVotes]              = useState([])
  const [myVote, setMyVote]            = useState(null)
  const [loading, setLoading]          = useState(true)
  const [storyInput, setStoryInput]    = useState('')
  const [copied, setCopied]            = useState(false)
  const [error, setError]              = useState('')
  const [editingProfile, setEditingProfile] = useState(false)
  const [showOverlay, setShowOverlay]  = useState(false)
  const [incomingThrow, setIncomingThrow] = useState(null)
  const [roundHistory, setRoundHistory] = useState([])
  const [votedIds, setVotedIds]         = useState(new Set())

  const hasJoinedRef = useRef(false)
  const channelRef   = useRef(null)

  // Derived (all before any conditional return)
  const revealed = sess?.status === 'revealed'
  const myAvatar = getAvatar(user?.avatarId)

  const isCreator = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pixelpoker_creator') || '{}')
      return saved.code === code?.toUpperCase() && saved.userId === user?.id
    } catch { return false }
  }, [code, user?.id])

  const resultType = useMemo(() => {
    if (!revealed || votes.length === 0) return null
    const vals   = votes.map(v => v.vote)
    const unique = [...new Set(vals)]
    if (unique.length === 1) return 'greatSuccess'
    const counts = {}
    vals.forEach(v => { counts[v] = (counts[v] || 0) + 1 })
    const countVals = Object.values(counts)
    if (unique.length === 2 && countVals.some(c => c === 1) && vals.length >= 3) return 'oddOneOut'
    return null
  }, [revealed, votes])

  const averageVote = useMemo(() => {
    if (!revealed || votes.length === 0) return null
    const nums = votes.map(v => parseFloat(v.vote)).filter(n => !isNaN(n))
    if (nums.length === 0) return '?'
    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
  }, [revealed, votes])

  const hasEpicVote = useMemo(() => {
    if (!revealed) return false
    return votes.some(v => { const n = parseInt(v.vote); return !isNaN(n) && n > 8 })
  }, [revealed, votes])

  // ── All hooks before conditional returns ──────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return
    async function load() {
      const { data: sessData } = await supabase
        .from('sessions').select('*').eq('code', code.toUpperCase()).single()
      if (!sessData) { setError('Room not found.'); setLoading(false); return }
      setSess(sessData)
      await supabase.from('participants').upsert(
        { session_id: sessData.id, user_id: user.id, username: user.username, avatar_id: user.avatarId },
        { onConflict: 'session_id,user_id' }
      )
      const [{ data: parts }, { data: voteData }] = await Promise.all([
        supabase.from('participants').select('*').eq('session_id', sessData.id),
        supabase.from('votes').select('*').eq('session_id', sessData.id),
      ])
      setParticipants(parts || [])
      setVotes(voteData || [])
      setMyVote(voteData?.find(v => v.user_id === user.id)?.vote || null)
      setVotedIds(new Set((parts || []).filter(p => p.has_voted).map(p => p.user_id)))
      setLoading(false)
    }
    load()
  }, [user?.id, code])

  useEffect(() => {
    if (!sess) return
    const channel = supabase.channel(`room:${sess.id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'sessions', filter: `id=eq.${sess.id}` },
        async payload => {
          setSess(payload.new)
          if (payload.new.status === 'voting') {
            setVotes([])
            setMyVote(null)
            setVotedIds(new Set())
          }
          if (payload.new.status === 'revealed') {
            const { data } = await supabase.from('votes').select('*').eq('session_id', sess.id)
            setVotes(data || [])
            setMyVote(data?.find(v => v.user_id === user?.id)?.vote || null)
          }
        })
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'participants', filter: `session_id=eq.${sess.id}` },
        async () => {
          const { data } = await supabase.from('participants').select('*').eq('session_id', sess.id)
          setParticipants(data || [])
          setVotedIds(new Set((data || []).filter(p => p.has_voted).map(p => p.user_id)))
        })
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'votes', filter: `session_id=eq.${sess.id}` },
        async () => {
          const { data } = await supabase.from('votes').select('*').eq('session_id', sess.id)
          setVotes(data || [])
          setMyVote(data?.find(v => v.user_id === user?.id)?.vote || null)
        })
      .on('broadcast', { event: 'throw' }, ({ payload }) => {
        setIncomingThrow({ ...payload, _ts: Date.now() })
      })
      .on('broadcast', { event: 'round_end' }, ({ payload }) => {
        setRoundHistory(prev => [...prev, payload])
      })
      .on('broadcast', { event: 'player_voted' }, ({ payload }) => {
        setVotedIds(prev => new Set([...prev, payload.userId]))
      })
      .subscribe()
    channelRef.current = channel
    return () => { channelRef.current = null; supabase.removeChannel(channel) }
  }, [sess?.id, user?.id])

  // Show overlay on reveal
  useEffect(() => {
    if (revealed && resultType && votes.length > 0) setShowOverlay(true)
    else setShowOverlay(false)
  }, [revealed, resultType, votes.length])

  // Detect kick
  useEffect(() => {
    if (!loading && sess && participants.length > 0) {
      if (participants.find(p => p.user_id === user?.id)) hasJoinedRef.current = true
      else if (hasJoinedRef.current) navigate('/')
    }
  }, [participants, loading, sess, user?.id, navigate])

  const castVote = useCallback(async value => {
    if (!sess || sess.status === 'revealed') return
    setMyVote(value)
    setVotedIds(prev => new Set([...prev, user.id]))
    channelRef.current?.send({ type: 'broadcast', event: 'player_voted', payload: { userId: user.id } })
    await supabase.from('votes').delete().eq('session_id', sess.id).eq('user_id', user.id)
    await supabase.from('votes').insert({ session_id: sess.id, user_id: user.id, username: user.username, vote: value })
    await supabase.from('participants').update({ has_voted: true }).eq('session_id', sess.id).eq('user_id', user.id)
  }, [sess, user])

  // ── Handlers ─────────────────────────────────────────────────────────────────
  async function handleReveal() {
    await supabase.from('sessions').update({ status: 'revealed' }).eq('id', sess.id)
  }
  async function handleNewRound() {
    // Update history locally for creator, broadcast to everyone else
    const roundData = { story: sess?.story || '—', average: averageVote }
    setRoundHistory(prev => [...prev, roundData])
    channelRef.current?.send({
      type: 'broadcast', event: 'round_end',
      payload: roundData,
    })
    setMyVote(null)
    setVotes([])
    setVotedIds(new Set())
    await supabase.from('votes').delete().eq('session_id', sess.id)
    await supabase.from('participants').update({ has_voted: false }).eq('session_id', sess.id)
    await supabase.from('sessions').update({ status: 'voting', story: '' }).eq('id', sess.id)
    setStoryInput('')
  }
  async function handleSetStory() {
    if (!storyInput.trim()) return
    await supabase.from('sessions').update({ story: storyInput.trim() }).eq('id', sess.id)
    setStoryInput('')
  }
  async function handleKick(userId) {
    setParticipants(prev => prev.filter(p => p.user_id !== userId))
    await supabase.from('participants').delete().eq('session_id', sess.id).eq('user_id', userId)
  }
  function handleBroadcastThrow(toUserId, obj) {
    if (!user) return
    const payload = {
      fromUserId: user.id, toUserId,
      emoji: obj.emoji, isPositive: obj.isPositive,
      _id: `${Date.now()}_${Math.random()}`,
    }
    // Trigger locally for the sender immediately (broadcast doesn't echo to self)
    setIncomingThrow({ ...payload, _ts: Date.now() })
    // Broadcast to all other clients
    channelRef.current?.send({ type: 'broadcast', event: 'throw', payload })
  }
  function copyRoomLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Conditional renders (after all hooks) ─────────────────────────────────────
  if (!user?.username || !user?.avatarId || editingProfile) {
    return (
      <AvatarSelector
        roomCode={editingProfile ? undefined : code.toUpperCase()}
        initialUsername={editingProfile ? user?.username : ''}
        initialAvatarId={editingProfile ? user?.avatarId : null}
        onComplete={async (username, avatarId) => {
          const u = setUser({ username, avatarId })
          setLocalUser(u)
          setEditingProfile(false)
          if (editingProfile && sess) {
            await supabase.from('participants')
              .update({ username, avatar_id: avatarId })
              .eq('session_id', sess.id).eq('user_id', u.id)
          }
        }}
      />
    )
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xs font-pixel text-pixel-accent animate-pulse">LOADING...</p>
    </div>
  )
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xs font-pixel text-pixel-red">{error}</p>
      <button onClick={() => navigate('/')} className="btn-pixel">GO HOME</button>
    </div>
  )

  const epicWarning = !revealed && myVote && !isNaN(parseInt(myVote)) && parseInt(myVote) > 8

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 1040, margin: '0 auto', padding: '20px 16px', gap: 0, overflowX: 'hidden' }}>

      {showOverlay && resultType && (
        <ResultOverlay resultType={resultType} onClose={() => setShowOverlay(false)} />
      )}

      {/* Header */}
      <div className="room-header" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ animation: 'avatarBounce 0.9s ease-in-out infinite', transformOrigin: 'bottom center' }}>
            <div className="avatar-mini" style={{ width: 36, height: 45 }}>
              <myAvatar.SVG />
            </div>
          </div>
          <div>
            <h1 className="text-[10px] font-pixel text-pixel-accent">PIXELPOKER</h1>
            <p className="text-[8px] font-pixel text-gray-500">{user.username} · {myAvatar.name}</p>
            <button onClick={() => setEditingProfile(true)} style={{
              fontSize: 7, fontFamily: "'Press Start 2P', cursive",
              color: '#6b7280', background: 'none', border: 'none',
              cursor: 'pointer', textDecoration: 'underline',
            }}>CHANGE</button>
          </div>
        </div>
        <div className="room-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={copyRoomLink} className="btn-pixel text-xs py-2 px-3" style={{ fontSize: '9px' }}>
            {copied ? '✓ LINK COPIED!' : '🔗 INVITE LINK'}
          </button>
          <span className="text-[9px] font-pixel px-2 py-1 border"
            style={{ borderColor: revealed ? '#ef4444' : '#22c55e', color: revealed ? '#ef4444' : '#22c55e' }}>
            {revealed ? 'REVEALED' : 'VOTING'}
          </span>
          <button onClick={() => navigate('/')} className="btn-pixel-outline text-xs py-1 px-2">LEAVE</button>
        </div>
      </div>

      {/* Room code */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span className="text-[8px] font-pixel text-gray-600">ROOM CODE:</span>
        <span className="text-xs font-pixel text-pixel-cyan" style={{ letterSpacing: '0.2em' }}>{sess?.code}</span>
      </div>

      {/* Responsive grid — 2-col desktop, 1-col mobile */}
      <div className="room-grid">

        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Story input */}
          <div>
            {!revealed && (
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text" value={storyInput}
                  onChange={e => setStoryInput(e.target.value)}
                  placeholder="Story title or ticket ID…"
                  className="input-pixel flex-1"
                  onKeyDown={e => e.key === 'Enter' && handleSetStory()}
                />
                <button onClick={handleSetStory} className="btn-pixel text-xs px-3">SET</button>
              </div>
            )}
          </div>

          {/* Round table — top margin gives room for characters that bleed above the SVG edge */}
          <div style={{ marginTop: 16 }}>
          <RoundTable
            participants={participants}
            votes={votes}
            user={user}
            revealed={revealed}
            votedIds={votedIds}
            isCreator={isCreator}
            onKick={handleKick}
            onBroadcastThrow={handleBroadcastThrow}
            incomingThrow={incomingThrow}
          />
          </div>

          {/* Card deck */}
          {!revealed && (
            <div>
              <p className="text-xs text-gray-400 font-pixel mb-4">
                YOUR VOTE {myVote && <span className="text-pixel-green ml-2">→ {myVote}</span>}
              </p>
              <CardDeck selected={myVote} onSelect={castVote} />
              {epicWarning && (
                <p style={{ textAlign: 'center', marginTop: 12, fontSize: 9, fontFamily: "'Press Start 2P', cursive", color: '#f59e0b', lineHeight: 1.8 }}>
                  ⚠ This is an epic, not a story.
                </p>
              )}
            </div>
          )}

          {/* Results chart */}
          {revealed && votes.length > 0 && (
            <>
              <ResultsChart votes={votes} />
              {hasEpicVote && (
                <p style={{ textAlign: 'center', fontSize: 9, fontFamily: "'Press Start 2P', cursive", color: '#f59e0b', lineHeight: 1.8 }}>
                  ⚠ This is an epic, not a story.
                </p>
              )}
            </>
          )}

          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingBottom: 24 }}>
            {!revealed && isCreator && (
              <button onClick={handleReveal} disabled={votedIds.size === 0} className="btn-pixel disabled:opacity-50">
                REVEAL VOTES
              </button>
            )}
            {!revealed && !isCreator && (
              <p className="text-[8px] font-pixel text-gray-600">Waiting for host to reveal…</p>
            )}
            {revealed && isCreator && (
              <button onClick={handleNewRound} className="btn-pixel">NEW ROUND</button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar
          story={sess?.story}
          votes={votes}
          revealed={revealed}
          averageVote={averageVote}
          roundHistory={roundHistory}
        />
      </div>

      <Footer />
    </div>
  )
}
