import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const BAR_COLORS = ['#7c3aed', '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="card-pixel text-xs p-2">
      <p className="text-pixel-accent">{payload[0].payload.value} pts</p>
      <p className="text-gray-300">{payload[0].value} vote{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  )
}

export default function ResultsChart({ votes }) {
  // votes: [{ user_id, vote, display_name, avatar_url }]
  const tally = votes.reduce((acc, v) => {
    acc[v.vote] = (acc[v.vote] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(tally)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      const order = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '?', '∞']
      return order.indexOf(a.value) - order.indexOf(b.value)
    })

  const total = votes.length
  const numericVotes = votes
    .map((v) => parseFloat(v.vote))
    .filter((n) => !isNaN(n))
  const avg = numericVotes.length
    ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1)
    : null

  // Consensus: all votes the same
  const allSame = new Set(votes.map((v) => v.vote)).size === 1

  return (
    <div className="card-pixel flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-pixel text-pixel-accent">RESULTS</h3>
        <div className="flex gap-4 text-xs font-pixel">
          {avg && <span className="text-pixel-yellow">AVG: {avg}</span>}
          <span className="text-gray-400">{total} votes</span>
          {allSame && (
            <span className="text-pixel-green animate-pulse">✓ CONSENSUS!</span>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barCategoryGap="30%">
          <XAxis
            dataKey="value"
            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: '"Press Start 2P"' }}
            axisLine={{ stroke: '#3b3b6b' }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#9ca3af', fontSize: 8, fontFamily: '"Press Start 2P"' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.1)' }} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Vote breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {votes.map((v) => (
          <div
            key={v.user_id}
            className="flex items-center gap-2 bg-pixel-bg border border-pixel-border px-2 py-1"
          >
            <span className="text-xs font-pixel text-pixel-accent">{v.vote}</span>
            <span className="text-xs text-gray-300 truncate">{v.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
