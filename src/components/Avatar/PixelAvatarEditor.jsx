import { useState, useRef, useEffect, useCallback } from 'react'

const GRID = 16
const CELL = 20
const PALETTE = [
  '#0f0f23', '#ffffff', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#06b6d4', '#3b82f6',
  '#8b5cf6', '#ec4899', '#6b7280', '#d1d5db',
  '#7c3aed', '#a78bfa', '#fbbf24', '#34d399',
]

function emptyGrid() {
  return Array.from({ length: GRID }, () => Array(GRID).fill('#0f0f23'))
}

export default function PixelAvatarEditor({ initialGrid, onSave, onSkip }) {
  const [grid, setGrid] = useState(() => initialGrid || emptyGrid())
  const [color, setColor] = useState('#a78bfa')
  const [drawing, setDrawing] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    grid.forEach((row, y) =>
      row.forEach((cellColor, x) => {
        ctx.fillStyle = cellColor
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'
        ctx.strokeRect(x * CELL, y * CELL, CELL, CELL)
      })
    )
  }, [grid])

  const paint = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / CELL)
    const y = Math.floor((e.clientY - rect.top) / CELL)
    if (x < 0 || x >= GRID || y < 0 || y >= GRID) return
    setGrid((prev) => {
      const next = prev.map((r) => [...r])
      next[y][x] = color
      return next
    })
  }, [color])

  function handleMouseDown(e) { setDrawing(true); paint(e) }
  function handleMouseMove(e) { if (drawing) paint(e) }
  function handleMouseUp() { setDrawing(false) }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-10">
      <h1 className="text-sm font-pixel text-pixel-accent">CREATE YOUR AVATAR</h1>
      <p className="text-[10px] text-gray-500">Draw your 16×16 pixel character</p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Canvas */}
        <div className="card-pixel flex flex-col items-center gap-3">
          <canvas
            ref={canvasRef}
            width={GRID * CELL}
            height={GRID * CELL}
            className="cursor-crosshair border-2 border-pixel-border"
            style={{ imageRendering: 'pixelated' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <div className="flex gap-2">
            <button onClick={() => setGrid(emptyGrid())} className="btn-pixel-outline text-xs py-2 px-3">CLEAR</button>
            <button onClick={() => setGrid(Array.from({ length: GRID }, () => Array(GRID).fill(color)))} className="btn-pixel-outline text-xs py-2 px-3">FILL</button>
          </div>
        </div>

        {/* Controls */}
        <div className="card-pixel flex flex-col gap-4 min-w-[200px]">
          <p className="text-xs font-pixel text-gray-400">PALETTE</p>
          <div className="grid grid-cols-4 gap-1">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-8 h-8 border-2 transition-transform"
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? '#fff' : '#3b3b6b',
                  transform: color === c ? 'scale(1.2)' : undefined,
                }}
              />
            ))}
          </div>

          <div>
            <p className="text-xs font-pixel text-gray-400 mb-2">CUSTOM COLOR</p>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-8 cursor-pointer border-2 border-pixel-border bg-transparent"
            />
          </div>

          <div>
            <p className="text-xs font-pixel text-gray-400 mb-2">PREVIEW</p>
            <AvatarPreview grid={grid} size={64} />
          </div>

          <button onClick={() => onSave(grid)} className="btn-pixel w-full">
            SAVE & CONTINUE
          </button>
          {onSkip && (
            <button onClick={onSkip} className="text-[10px] font-pixel text-gray-500 hover:text-gray-300 text-center">
              SKIP FOR NOW
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function AvatarPreview({ grid, size = 32 }) {
  const canvasRef = useRef(null)
  const cellSize = size / GRID

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !grid) return
    const ctx = canvas.getContext('2d')
    grid.forEach((row, y) =>
      row.forEach((color, x) => {
        ctx.fillStyle = color
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      })
    )
  }, [grid, cellSize])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ imageRendering: 'pixelated', width: size, height: size }}
      className="border border-pixel-border"
    />
  )
}
