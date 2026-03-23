import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getUser, setUser } from '../lib/user'
import AvatarSelector, { getAvatar } from '../components/Avatar/AvatarSelector'
import Footer from '../components/Footer'

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const existing = getUser()
  // If user already has a name and avatar, go straight to lobby
  const [step, setStep] = useState(existing?.username && existing?.avatarId ? 'lobby' : 'setup')
  const [user, setLocalUser] = useState(existing)
  const [joinCode, setJoinCode] = useState(searchParams.get('join') || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSetupComplete(username, avatarId) {
    const u = setUser({ username, avatarId })
    setLocalUser(u)
    setStep('lobby')
  }

  async function handleCreate() {
    setLoading(true)
    setError('')
    const code = randomCode()
    const { error: err } = await supabase
      .from('sessions')
      .insert({ code, name: `${user.username}'s Session`, status: 'voting' })

    if (err) { setError(err.message); setLoading(false); return }
    localStorage.setItem('pixelpoker_creator', JSON.stringify({ code, userId: user.id }))
    navigate(`/room/${code}`)
  }

  async function handleJoin() {
    if (!joinCode.trim()) { setError('Enter a room code.'); return }
    setLoading(true)
    setError('')
    const { data: sess } = await supabase
      .from('sessions')
      .select('code')
      .eq('code', joinCode.trim().toUpperCase())
      .single()

    if (!sess) { setError('Room not found. Check the code and try again.'); setLoading(false); return }
    navigate(`/room/${sess.code}`)
  }

  if (step === 'setup') {
    return <AvatarSelector onComplete={handleSetupComplete} />
  }

  const avatar = getAvatar(user?.avatarId)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 py-10">
      {/* Logo */}
      <div className="text-center">
        <div style={{ animation: 'pixelTitleBob 2.8s ease-in-out infinite' }}>
          <h1
            className="font-pixel leading-snug"
            style={{
              fontSize: 'clamp(36px, 9vw, 64px)',
              letterSpacing: '0.06em',
              animation: 'pixelTitlePulse 3.5s ease-in-out infinite, pixelTitleGlitch 9s steps(1) infinite',
            }}
          >
            PIXEL<br />POKER
          </h1>
        </div>
        <p className="font-pixel mt-6" style={{ fontSize: 10, color: '#4b5563' }}>
          Planning poker for dev teams
          <span style={{ animation: 'cursorBlink 1s step-end infinite' }}>_</span>
        </p>
      </div>

      {/* User badge */}
      <div className="flex flex-col items-center gap-1">
        {/* Bouncing character — outside the border box so bounce isn't clipped */}
        <div style={{
          animation: 'avatarBounce 0.9s ease-in-out infinite',
          transformOrigin: 'bottom center',
        }}>
          <div className="avatar-mini" style={{ width: 52, height: 65 }}>
            <avatar.SVG />
          </div>
        </div>
        <div style={{
          width: 34, height: 5, borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)',
          animation: 'shadowPulse 0.9s ease-in-out infinite',
          marginBottom: 4,
        }} />
        <div className="flex items-center gap-3 px-3 py-2 border border-pixel-border rounded-xl">
          <div>
            <p className="text-xs font-pixel text-white">{user?.username}</p>
            <p className="text-[8px] font-pixel text-gray-500">{avatar.name}</p>
          </div>
        </div>
        <button
          onClick={() => setStep('setup')}
          className="text-[9px] font-pixel text-gray-500 hover:text-gray-300 mt-1"
        >
          CHANGE
        </button>
      </div>

      {/* Create / Join */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <div className="card-pixel flex-1 flex flex-col gap-4">
          <h2 className="text-xs font-pixel text-pixel-green text-center">CREATE ROOM</h2>
          <p className="text-[10px] text-gray-500 text-center leading-5">
            Start a new planning session and invite your team.
          </p>
          <button onClick={handleCreate} disabled={loading} className="btn-pixel w-full disabled:opacity-50">
            {loading ? 'CREATING...' : '+ NEW ROOM'}
          </button>
        </div>

        <div className="flex md:flex-col items-center justify-center gap-2">
          <div className="flex-1 h-px md:h-full md:w-px bg-pixel-border" />
          <span className="text-xs text-gray-500 font-pixel">OR</span>
          <div className="flex-1 h-px md:h-full md:w-px bg-pixel-border" />
        </div>

        <div className="card-pixel flex-1 flex flex-col gap-4">
          <h2 className="text-xs font-pixel text-pixel-cyan text-center">JOIN ROOM</h2>
          <input
            type="text"
            placeholder="ABC123"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="input-pixel text-center tracking-widest"
            maxLength={6}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          />
          <button
            onClick={handleJoin}
            disabled={loading || !joinCode.trim()}
            className="btn-pixel w-full disabled:opacity-50"
          >
            {loading ? 'JOINING...' : 'JOIN →'}
          </button>
        </div>
      </div>

      {error && <p className="text-xs font-pixel text-pixel-red">{error}</p>}

      <Footer />
    </div>
  )
}
