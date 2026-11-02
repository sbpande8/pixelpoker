// Voting decks. The room's deck is stored in sessions.deck ('points' | 'tshirt').

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55]
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const DECKS = {
  points: {
    id: 'points',
    label: 'STORY POINTS',
    cards: ['?', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '∞'],
    unit: 'pts',
    colors: {
      '?':  { bg: '#6b7280', border: '#9ca3af' },
      '0':  { bg: '#1e3a5f', border: '#3b82f6' },
      '1':  { bg: '#1a3c34', border: '#22c55e' },
      '2':  { bg: '#1a3c34', border: '#22c55e' },
      '3':  { bg: '#3b2a1a', border: '#f97316' },
      '5':  { bg: '#3b2a1a', border: '#f97316' },
      '8':  { bg: '#3b1a1a', border: '#ef4444' },
      '13': { bg: '#3b1a1a', border: '#ef4444' },
      '21': { bg: '#2d1a3b', border: '#8b5cf6' },
      '34': { bg: '#2d1a3b', border: '#8b5cf6' },
      '55': { bg: '#3b1a2e', border: '#ec4899' },
      '∞':  { bg: '#1a1a1a', border: '#ffffff' },
    },
  },
  tshirt: {
    id: 'tshirt',
    label: 'T-SHIRT',
    cards: ['?', ...SIZES],
    unit: '',
    colors: {
      '?':   { bg: '#6b7280', border: '#9ca3af' },
      XS:    { bg: '#1e3a5f', border: '#3b82f6' },
      S:     { bg: '#1a3c34', border: '#22c55e' },
      M:     { bg: '#3b2a1a', border: '#f97316' },
      L:     { bg: '#3b1a1a', border: '#ef4444' },
      XL:    { bg: '#2d1a3b', border: '#8b5cf6' },
      XXL:   { bg: '#3b1a2e', border: '#ec4899' },
    },
  },
}

export function getDeck(id) {
  return DECKS[id] || DECKS.points
}

// Summary shown after reveal.
//   primaryLabel / primaryValue: AVG 4.3 (points) or MOST VOTED M (t-shirt)
//   estimate: nearest Fibonacci (points) or size closest to the average (t-shirt)
//   epic: someone voted 13+ or XL+
export function summarizeVotes(votes, deckId) {
  const deck = getDeck(deckId)
  if (!votes?.length) return null

  if (deck.id === 'tshirt') {
    const idx = votes.map(v => SIZES.indexOf(v.vote)).filter(i => i >= 0)
    const counts = {}
    votes.forEach(v => { if (SIZES.includes(v.vote)) counts[v.vote] = (counts[v.vote] || 0) + 1 })
    const max = Math.max(0, ...Object.values(counts))
    const top = SIZES.filter(s => counts[s] === max && max > 0)
    const mean = idx.length ? idx.reduce((a, b) => a + b, 0) / idx.length : null
    return {
      primaryLabel: 'MOST VOTED',
      primaryValue: top.length ? top.join('/') : '?',
      estimate: mean === null ? null : SIZES[Math.round(mean)],
      epic: idx.some(i => i >= SIZES.indexOf('XL')),
    }
  }

  const nums = votes.map(v => parseFloat(v.vote)).filter(n => !isNaN(n))
  const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null
  return {
    primaryLabel: 'AVG',
    primaryValue: avg === null ? '?' : avg.toFixed(1),
    estimate: avg === null ? null : String(
      FIBONACCI.reduce((best, f) => (Math.abs(f - avg) <= Math.abs(best - avg) ? f : best), FIBONACCI[0])
    ),
    epic: nums.some(n => n > 8),
  }
}

export function isEpicVote(vote, deckId) {
  if (!vote) return false
  if (getDeck(deckId).id === 'tshirt') return SIZES.indexOf(vote) >= SIZES.indexOf('XL')
  const n = parseInt(vote)
  return !isNaN(n) && n > 8
}
