import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#7c3aed', '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4']
const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55]

function nearestFibonacci(avg) {
  const n = parseFloat(avg)
  if (isNaN(n)) return null
  return FIBONACCI.reduce((best, f) =>
    Math.abs(f - n) <= Math.abs(best - n) ? f : best
  , FIBONACCI[0])
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { value, count } = payload[0].payload
  return (
    <div style={{ background: '#0f0f23', border: '1px solid #3b3b6b', padding: '6px 10px' }}>
      <p style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: '#a78bfa' }}>{value} pts</p>
      <p style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: '#9ca3af' }}>
        {count} vote{count !== 1 ? 's' : ''}
      </p>
    </div>
  )
}

export default function ResultsChart({ votes }) {
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
  const numericVotes = votes.map(v => parseFloat(v.vote)).filter(n => !isNaN(n))
  const avg = numericVotes.length
    ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1)
    : null
  const nearest = avg !== null ? nearestFibonacci(avg) : null

  return (
    <div className="card-pixel flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-pixel text-pixel-accent">RESULTS</h3>
        <span className="text-xs font-pixel text-gray-400">{total} vote{total !== 1 ? 's' : ''}</span>
      </div>

      {/* Donut chart with nearest estimate in center */}
      <div style={{ position: 'relative', width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={78}
              dataKey="count"
              paddingAngle={data.length > 1 ? 3 : 0}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
          width: 90,
        }}>
          {nearest !== null && (
            <>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 24, color: '#a78bfa', lineHeight: 1 }}>
                {nearest}
              </div>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 5, color: '#6b7280', marginTop: 5, lineHeight: 1.8, letterSpacing: '0.05em' }}>
                NEAREST<br />ESTIMATE
              </div>
              {avg && (
                <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: '#4b5563', marginTop: 4 }}>
                  avg {avg}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', justifyContent: 'center' }}>
        {data.map((d, i) => (
          <div key={d.value} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, background: COLORS[i % COLORS.length], borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: '#9ca3af' }}>
              {d.value} <span style={{ color: '#e5e7eb' }}>×{d.count}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Per-player vote breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {votes.map(v => (
          <div key={v.user_id} className="flex items-center gap-2 bg-pixel-bg border border-pixel-border px-2 py-1">
            <span className="text-xs font-pixel text-pixel-accent">{v.vote}</span>
            <span className="text-xs text-gray-300 truncate">{v.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
