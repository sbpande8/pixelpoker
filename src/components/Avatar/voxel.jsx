import { Children, cloneElement } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// VOXELIZE
// Turns a flat pixel-art SVG (made of <rect>/<polygon>) into a chunky,
// Crossy Road–style "block" character. Every rect gets a lighter top face and
// a darker right side face, extruded toward the upper-right. Flat polygons get
// a darker extruded copy behind them. Done once per character at module load.
// ─────────────────────────────────────────────────────────────────────────────

const DX = 5   // extrusion depth, horizontal
const DY = 4   // extrusion depth, vertical (upwards)
const TOP_LIGHTEN = 0.28
const SIDE_DARKEN = 0.32
const BACK_DARKEN = 0.45

function parseHex(hex) {
  if (typeof hex !== 'string' || hex[0] !== '#') return null
  let h = hex.slice(1)
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6) return null
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return null
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function toHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
}

function lighten(color, amt) {
  const rgb = parseHex(color)
  if (!rgb) return color
  return toHex(rgb.map((v) => v + (255 - v) * amt))
}

function darken(color, amt) {
  const rgb = parseHex(color)
  if (!rgb) return color
  return toHex(rgb.map((v) => v * (1 - amt)))
}

function parsePoints(str) {
  const nums = String(str).trim().split(/[\s,]+/).map(Number)
  const pts = []
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]])
  return pts
}

const fmt = (pts) => pts.map(([x, y]) => `${x},${y}`).join(' ')

// The original art fakes depth with thin "top face" parallelograms
// (e.g. "10,12 54,12 58,8 14,8"). Our extrusion replaces them, so drop them.
function isFakeTopFace(pts) {
  if (pts.length !== 4) return false
  const [a, b, c, d] = pts
  return (
    a[1] === b[1] && c[1] === d[1] && c[1] < a[1] &&
    c[0] - b[0] === d[0] - a[0] && c[0] - b[0] > 0
  )
}

export function voxelize(Flat) {
  const tree = Flat()
  const { children, viewBox = '0 0 64 80', ...svgProps } = tree.props
  const [vx, vy, vw, vh] = viewBox.split(/\s+/).map(Number)

  const sides = []
  const tops = []
  const fronts = []

  Children.toArray(children).forEach((el, i) => {
    if (!el || !el.type) return
    const p = el.props

    if (el.type === 'rect' && !p.transform) {
      const x = +p.x || 0, y = +p.y || 0, w = +p.width, h = +p.height
      const fill = p.fill
      if (w > 0 && h > 0 && fill && fill !== 'none') {
        sides.push(
          <polygon key={`s${i}`} fill={darken(fill, SIDE_DARKEN)}
            points={fmt([[x + w, y], [x + w + DX, y - DY], [x + w + DX, y + h - DY], [x + w, y + h]])} />
        )
        tops.push(
          <polygon key={`t${i}`} fill={lighten(fill, TOP_LIGHTEN)}
            points={fmt([[x, y], [x + w, y], [x + w + DX, y - DY], [x + DX, y - DY]])} />
        )
      }
      fronts.push(cloneElement(el, { key: `f${i}` }))
      return
    }

    if (el.type === 'polygon') {
      const pts = parsePoints(p.points)
      if (isFakeTopFace(pts)) return
      if (p.fill && p.fill !== 'none') {
        sides.push(
          <polygon key={`s${i}`} fill={darken(p.fill, BACK_DARKEN)}
            points={fmt(pts.map(([x, y]) => [x + DX, y - DY]))} />
        )
      }
      fronts.push(cloneElement(el, { key: `f${i}` }))
      return
    }

    fronts.push(cloneElement(el, { key: `f${i}` }))
  })

  const content = (
    <svg
      {...svgProps}
      viewBox={`${vx} ${vy - DY} ${vw + DX} ${vh + DY}`}
      overflow="visible"
      shapeRendering="crispEdges"
    >
      {sides}
      {tops}
      {fronts}
    </svg>
  )

  function Voxel() { return content }
  Voxel.displayName = `Voxel(${Flat.name || 'Avatar'})`
  return Voxel
}
