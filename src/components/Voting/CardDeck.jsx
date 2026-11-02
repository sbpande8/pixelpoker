import { getDeck } from '../../lib/decks'

export default function CardDeck({ selected, onSelect, disabled, deck = 'points' }) {
  const { cards, colors: CARD_COLORS } = getDeck(deck)
  return (
    <div className="flex flex-wrap justify-center gap-3" style={{ paddingTop: 12 }}>
      {cards.map((value) => {
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
              // Stacked offsets give each card a chunky, block-like edge
              boxShadow: [
                isSelected ? '0 0 0 2px #fff' : null,
                'inset 0 3px 0 rgba(255,255,255,0.18)',
                'inset 0 -3px 0 rgba(0,0,0,0.25)',
                `2px 2px 0 ${colors.border}`,
                `4px 4px 0 ${colors.border}`,
                `5px 5px 0 rgba(0,0,0,0.35)`,
                isSelected ? `6px 14px 0 rgba(0,0,0,0.35)` : `7px 7px 0 rgba(0,0,0,0.2)`,
              ].filter(Boolean).join(', '),
              transform: isSelected ? 'translateY(-10px)' : 'none',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.7 : 1,
            }}
          >
            <span className="absolute top-1 left-1 text-[8px] font-pixel leading-none"
              style={{ color: colors.border }}>{value}</span>
            <span className="font-pixel leading-none"
              style={{ fontSize: value.length > 2 ? 13 : 18, color: isSelected ? '#ffffff' : colors.border }}>{value}</span>
            <span className="absolute bottom-1 right-1 text-[8px] font-pixel leading-none rotate-180"
              style={{ color: colors.border }}>{value}</span>
          </button>
        )
      })}
    </div>
  )
}
