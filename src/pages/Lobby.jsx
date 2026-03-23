import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { AvatarPreview } from '../components/Avatar/PixelAvatarEditor'

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function Lobby() {
  const { session, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [joinCode, setJoinCode] = useState('')
  const [sessionName, setSessionName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const avatarGrid = profile?.avatar_grid ? JSON.parse(profile.avatar_grid) : null
  const displayName = profile?.display_name || session?.user?.email?.split('@')[0]

  async function handleCreate() {
    if (!sessionName.trim()) return
    setLoading(true)
    setError('')
    const code = randomCode()
    const { data, error: err } = await supabase
      .from('sessions')
      .insert({
        code,
        name: sessionName.trim(),
        created_by: session.user.id,
        status: 'waiting',
      })
      .select()
      .single()

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    // Auto-join as participant
    await supabase.from('participants').upsert({
      session_id: data.id,
      user_id: session.user.id,
      display_name: displayName,
      avatar_url: profile?.avatar_url || null,
    })

    navigate(`/session/${data.code}`)
  }

  async function handleJoin() {
    if (!joinCode.trim()) return
    setLoading(true)
    setError('')
    const { data: sess, error: err } = await supabase
      .from('sessions')
      .select('*')
      .eq('code', joinCode.trim().toUpperCase())
      .single()

    if (err || !sess) {
      setError('Session not found. Check the code and try again.')
      setLoading(false)
      return
    }

    await supabase.from('participants').upsert({
      session_id: sess.id,
      user_id: session.user.id,
      display_name: displayName,
      avatar_url: profile?.avatar_url || null,
    })

    navigate(`/session/${sess.code}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 w-full max-w-2xl justify-between">
        <h1 className="text-xs font-pixel text-pixel-accent">PIXELPOKER</h1>
        <div className="flex items-center gap-3">
          {avatarGrid && <AvatarPreview grid={avatarGrid} size={32} />}
          <span className="text-xs text-gray-300">{displayName}</span>
          <button onClick={signOut} className="btn-pixel-outline text-xs py-1 px-2">
            OUT
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        {/* Create */}
        <div className="card-pixel flex-1 flex flex-col gap-4">
          <div className="text-2xl text-center">🎮</div>
          <h2 className="text-xs font-pixel text-pixel-green text-center">CREATE SESSION</h2>
          <input
            type="text"
            placeholder="Sprint 42 Planning"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="input-pixel"
            maxLength={50}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <button
            onClick={handleCreate}
            disabled={loading || !sessionName.trim()}
            className="btn-pixel w-full disabled:opacity-50"
          >
            {loading ? 'CREATING...' : 'CREATE'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex md:flex-col items-center justify-center gap-2">
          <div className="flex-1 h-px md:h-full md:w-px bg-pixel-border" />
          <span className="text-xs text-gray-500 font-pixel">OR</span>
          <div className="flex-1 h-px md:h-full md:w-px bg-pixel-border" />
        </div>

        {/* Join */}
        <div className="card-pixel flex-1 flex flex-col gap-4">
          <div className="text-2xl text-center">🔑</div>
          <h2 className="text-xs font-pixel text-pixel-cyan text-center">JOIN SESSION</h2>
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
            {loading ? 'JOINING...' : 'JOIN'}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs font-pixel text-pixel-red">{error}</p>
      )}

      <button
        onClick={() => navigate('/avatar')}
        className="btn-pixel-outline text-xs"
      >
        EDIT AVATAR
      </button>
    </div>
  )
}
