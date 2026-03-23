import { useState, useRef, useEffect } from 'react'
import { getAvatar } from './Avatar/AvatarSelector'

const THROW_OBJECTS = [
  { emoji: '🧻', label: 'PAPER BALL', isPositive: false, rotate: '-30deg' },
  { emoji: '👻', label: 'BOO',        isPositive: false, rotate: '0deg'   },
  { emoji: '💸', label: 'MONEY',      isPositive: true,  rotate: '0deg'   },
  { emoji: '🍺', label: 'BEER',       isPositive: true,  rotate: '0deg'   },
]

function ThoughtBubble({ emoji }) {
  return (
    <div style={{
      position: 'absolute', bottom: '100%', left: '50%',
      transform: 'translateX(-50%)',
      background: '#fff', borderRadius: 10, padding: '4px 8px',
      fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      whiteSpace: 'nowrap', zIndex: 300,
      animation: 'thoughtBubbleIn 0.2s ease-out',
      marginBottom: 6,
    }}>
      {emoji}
      <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, background: '#fff', borderRadius: '50%', display: 'block' }} />
      <span style={{ position: 'absolute', bottom: -11, left: '50%', transform: 'translateX(-30%)', width: 4, height: 4, background: '#fff', borderRadius: '50%', display: 'block' }} />
    </div>
  )
}

function FlyingProjectile({ emoji, fromX, fromY, toX, toY, onComplete }) {
  const animId = useRef(`fly_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`).current

  useEffect(() => {
    const dx = toX - fromX
    const dy = toY - fromY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2 - dist * 0.38

    const styleEl = document.createElement('style')
    styleEl.textContent = `
      @keyframes ${animId} {
        0%   { left:${fromX}px; top:${fromY}px; transform:translate(-50%,-50%) scale(1) rotate(0deg); opacity:1; }
        50%  { left:${midX}px;  top:${midY}px;  transform:translate(-50%,-50%) scale(1.5) rotate(200deg); opacity:1; }
        85%  { left:${toX}px;   top:${toY}px;   transform:translate(-50%,-50%) scale(1.2) rotate(360deg); opacity:1; }
        100% { left:${toX}px;   top:${toY}px;   transform:translate(-50%,-50%) scale(0) rotate(360deg); opacity:0; }
      }
    `
    document.head.appendChild(styleEl)
    const timer = setTimeout(() => {
      onComplete()
      if (document.head.contains(styleEl)) document.head.removeChild(styleEl)
    }, 760)
    return () => {
      clearTimeout(timer)
      if (document.head.contains(styleEl)) document.head.removeChild(styleEl)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed', fontSize: 26, zIndex: 9999,
      pointerEvents: 'none',
      animation: `${animId} 0.76s ease-in-out forwards`,
    }}>
      {emoji}
    </div>
  )
}

export default function RoundTable({
  participants, votes, user, revealed, votedIds,
  isCreator, onKick, onBroadcastThrow, incomingThrow,
}) {
  const [hoveredPlayer, setHoveredPlayer] = useState(null)
  const [throwQueue, setThrowQueue]       = useState([])
  const [activeThrow, setActiveThrow]     = useState(null)
  const [bubbles, setBubbles]             = useState({})
  const playerRefs = useRef({})
  const leaveTimer = useRef(null)

  const N = participants.length

  // Dynamic sizing for up to 15 players
  const W = N > 10 ? 700 : 640
  const H = N > 10 ? 450 : 400
  const CX = W / 2, CY = H / 2
  const TABLE_RX = N > 10 ? 200 : 185
  const TABLE_RY = N > 10 ? 120 : 110
  const PLAYER_RX = N > 10 ? 278 : N > 6 ? 262 : 255
  const PLAYER_RY = N > 10 ? 178 : N > 6 ? 165 : 160
  const charW      = N > 10 ? 34 : N > 6 ? 40 : 44
  const charH      = Math.round(charW * (55 / 44))
  const cardW      = N > 10 ? 28 : N > 6 ? 32 : 36
  const cardH      = N > 10 ? 40 : N > 6 ? 45 : 50
  const nameFontSz = N > 8 ? 6 : 7

  function getPos(i) {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2
    return { x: CX + PLAYER_RX * Math.cos(angle), y: CY + PLAYER_RY * Math.sin(angle) }
  }

  // Process incoming broadcast throws (from all clients including self)
  useEffect(() => {
    if (!incomingThrow) return
    const fromEl = playerRefs.current[incomingThrow.fromUserId]
    const toEl   = playerRefs.current[incomingThrow.toUserId]
    if (fromEl && toEl) {
      const fr = fromEl.getBoundingClientRect()
      const tr = toEl.getBoundingClientRect()
      setThrowQueue(prev => [...prev, {
        toUserId:   incomingThrow.toUserId,
        emoji:      incomingThrow.emoji,
        isPositive: incomingThrow.isPositive,
        fromX: fr.left + fr.width / 2,
        fromY: fr.top  + fr.height / 2,
        toX:   tr.left + tr.width / 2,
        toY:   tr.top  + tr.height / 2,
      }])
    }
  }, [incomingThrow])

  // Process throw queue one at a time
  useEffect(() => {
    if (throwQueue.length === 0 || activeThrow) return
    setActiveThrow(throwQueue[0])
    setThrowQueue(prev => prev.slice(1))
  }, [throwQueue, activeThrow])

  function handleThrowComplete() {
    if (!activeThrow) return
    const { toUserId, isPositive } = activeThrow
    setActiveThrow(null)
    const id = Date.now()
    setBubbles(prev => ({ ...prev, [toUserId]: { emoji: isPositive ? '😊' : '😡', id } }))
    setTimeout(() => {
      setBubbles(prev => {
        if (prev[toUserId]?.id === id) { const n = { ...prev }; delete n[toUserId]; return n }
        return prev
      })
    }, 2200)
  }

  function handleMouseEnter(uid) {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    setHoveredPlayer(uid)
  }
  function handleMouseLeave() {
    leaveTimer.current = setTimeout(() => { setHoveredPlayer(null); leaveTimer.current = null }, 220)
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: W, margin: '0 auto' }}>
      {/* SVG Table */}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        <ellipse cx={CX + 8} cy={CY + 10} rx={TABLE_RX} ry={TABLE_RY} fill="rgba(0,0,0,0.28)" />
        <ellipse cx={CX} cy={CY} rx={TABLE_RX} ry={TABLE_RY} fill="#1a4a2a" />
        <ellipse cx={CX} cy={CY} rx={TABLE_RX} ry={TABLE_RY} fill="none" stroke="#2d6b3d" strokeWidth="12" />
        <ellipse cx={CX} cy={CY} rx={TABLE_RX} ry={TABLE_RY} fill="none" stroke="#4a9a5a" strokeWidth="3" />
        <ellipse cx={CX} cy={CY} rx={TABLE_RX - 22} ry={TABLE_RY - 18} fill="none" stroke="#164030" strokeWidth="2" strokeDasharray="10 6" />
        <text x={CX} y={CY - 8}  textAnchor="middle" fill="#164030" fontSize="11" fontFamily="'Press Start 2P', cursive">PIXEL</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="#164030" fontSize="11" fontFamily="'Press Start 2P', cursive">POKER</text>
      </svg>

      {/* Players */}
      {participants.map((p, i) => {
        const { x, y } = getPos(i)
        const av = getAvatar(p.avatar_id)
        const isMe    = p.user_id === user.id
        const hasVoted = votedIds.has(p.user_id)
        const pVote   = revealed ? votes.find(v => v.user_id === p.user_id)?.vote : null
        const bubble  = bubbles[p.user_id]

        return (
          <div
            key={p.user_id}
            ref={el => { playerRefs.current[p.user_id] = el }}
            onMouseEnter={() => { if (!isMe) handleMouseEnter(p.user_id) }}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'absolute',
              left: `${(x / W) * 100}%`,
              top:  `${(y / H) * 100}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              zIndex: 10,
              cursor: isMe ? 'default' : 'pointer',
            }}
          >
            {/* Thought bubble */}
            {bubble && <ThoughtBubble emoji={bubble.emoji} />}

            {/* Hover menu */}
            {hoveredPlayer === p.user_id && !revealed && (
              <div
                onMouseEnter={() => handleMouseEnter(p.user_id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute', bottom: '105%', left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex', gap: 3,
                  background: 'rgba(10,10,30,0.96)',
                  border: '1px solid #3b3b6b',
                  borderRadius: 8, padding: '4px 6px',
                  zIndex: 200, whiteSpace: 'nowrap',
                }}
              >
                {THROW_OBJECTS.map(obj => (
                  <button
                    key={obj.label}
                    onClick={e => {
                      e.stopPropagation()
                      onBroadcastThrow && onBroadcastThrow(p.user_id, obj)
                    }}
                    title={obj.label}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 18, padding: '2px 3px', borderRadius: 4,
                      transition: 'transform 0.1s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.35)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    <span style={{ display: 'inline-block', transform: `rotate(${obj.rotate})` }}>{obj.emoji}</span>
                  </button>
                ))}
                {isCreator && (
                  <button
                    onClick={e => { e.stopPropagation(); onKick && onKick(p.user_id) }}
                    title="KICK"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 18, padding: '2px 3px', borderRadius: 4,
                      borderLeft: '1px solid #3b3b6b', marginLeft: 2,
                      transition: 'transform 0.1s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.35)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                  >🚫</button>
                )}
              </div>
            )}

            {/* Bouncing character */}
            <div style={{
              animation: 'avatarBounce 0.9s ease-in-out infinite',
              animationDelay: `${i * 0.13}s`,
              transformOrigin: 'bottom center',
            }}>
              <div className="avatar-mini" style={{ width: charW, height: charH }}>
                <av.SVG />
              </div>
            </div>

            {/* Shadow */}
            <div style={{
              width: charW * 0.68, height: 5, borderRadius: '50%',
              background: 'rgba(0,0,0,0.3)',
              animation: 'shadowPulse 0.9s ease-in-out infinite',
              animationDelay: `${i * 0.13}s`,
              marginBottom: 2,
            }} />

            {/* Name */}
            <span style={{
              fontSize: nameFontSz,
              fontFamily: "'Press Start 2P', cursive",
              color: isMe ? '#a78bfa' : '#9ca3af',
              maxWidth: 72, textAlign: 'center',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {p.username}{isMe ? ' ★' : ''}
            </span>

            {/* Vote card */}
            <div style={{
              width: cardW, height: cardH, marginTop: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${pVote ? '#7c3aed' : hasVoted ? '#22c55e' : '#3b3b6b'}`,
              background: pVote ? '#2d1a3b' : hasVoted ? '#1a3c34' : '#1a1a3e',
              color: pVote ? '#a78bfa' : hasVoted ? '#22c55e' : '#6b7280',
              borderRadius: 4,
              fontSize: pVote && pVote.length > 2 ? 7 : (N > 10 ? 9 : 11),
              fontFamily: "'Press Start 2P', cursive",
            }}>
              {pVote || (hasVoted ? '✓' : '…')}
            </div>
          </div>
        )
      })}

      {/* Flying projectile */}
      {activeThrow && (
        <FlyingProjectile
          emoji={activeThrow.emoji}
          fromX={activeThrow.fromX}
          fromY={activeThrow.fromY}
          toX={activeThrow.toX}
          toY={activeThrow.toY}
          onComplete={handleThrowComplete}
        />
      )}
    </div>
  )
}
