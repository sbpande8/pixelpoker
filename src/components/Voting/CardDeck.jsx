const FIBONACCI = ['?', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '∞']

const CARD_COLORS = {
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
}

export default function CardDeck({ selected, onSelect, disabled }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {FIBONACCI.map((value) => {
        const isSelected = selected === value
        const colors = CARD_COLORS[value]
        return (
          <button
            key={value}
            onClick={() => !disabled && onSelect(value)}
            disabled={disabled}
            className="relative flex flex-col items-center justify-center font-pixel
                       transition-all duration-100 select-none"
            style={{
              width: 56,
              height: 80,
              backgroundColor: colors.bg,
              border: `3px solid ${isSelected ? '#ffffff' : colors.border}`,
              boxShadow: isSelected
                ? `0 0 0 2px #fff, 4px 4px 0 ${colors.border}`
                : `4px 4px 0 ${colors.border}`,
              transform: isSelected ? 'translateY(-8px)' : 'none',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.7 : 1,
            }}
          >
            <span className="absolute top-1 left-1 text-[8px] font-pixel leading-none"
              style={{ color: colors.border }}>{value}</span>
            <span className="text-lg font-pixel leading-none"
              style={{ color: isSelected ? '#ffffff' : colors.border }}>{value}</span>
            <span className="absolute bottom-1 right-1 text-[8px] font-pixel leading-none rotate-180"
              style={{ color: colors.border }}>{value}</span>
          </button>
        )
      })}
    </div>
  )
}
