# PixelPoker — Project Brief for Content Generation

Use this document as context to write articles, LinkedIn posts, or Substack pieces about PixelPoker.

---

## What is PixelPoker?

PixelPoker is a free, real-time planning poker app built for software development teams. Planning poker (also called scrum poker) is an agile estimation technique where team members vote simultaneously on how complex a user story is — preventing anchoring bias where one person's answer influences everyone else's.

Most planning poker tools are boring, clunky enterprise software. PixelPoker is the opposite: it's a pixel-art, Crossy Road-inspired experience where your team sits around a virtual felt poker table, throws beer and crumpled paper at each other, and votes on story points using Fibonacci cards.

**Live URL:** https://pixelpoker.vercel.app
**GitHub:** https://github.com/sbpande8/pixelpoker
**Built by:** Srijan Pandey (2026)

---

## The Problem It Solves

Agile estimation sessions are often dry and disengaging — especially for remote teams. Existing tools like PlanningPokerOnline and Pointing Poker get the job done but offer zero personality. Teams stop looking forward to refinement sessions.

PixelPoker makes estimation feel like a game. The pixel art aesthetic, bouncing characters, flying objects, and result overlays turn a mundane ritual into something people actually want to open.

---

## Key Features

### 1. Pixel Art Avatar System
- 16 unique pixel art characters to choose from (Crossy Road–inspired voxel style)
- Each character bounces with a subtle hop animation — idle, at the table, everywhere
- Characters are hand-crafted SVGs with flat-shaded voxel aesthetics
- Users pick a username and avatar before entering any room

### 2. Real-Time Round Poker Table
- Players appear as their chosen pixel character arranged around an oval felt poker table
- The table is rendered in SVG with a green felt texture, rail border, and "PIXEL POKER" branded center
- Up to 15 players supported — table, character sizes, and fonts dynamically scale based on player count

### 3. Fibonacci Voting Cards
- Cards use the Fibonacci sequence: ?, 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ∞
- Dark pixel-art card design with color-coded groups (blue for low, green for safe, orange for medium, red for high, purple for large, white for infinite)
- Selecting a card lifts it with a pixel shadow — visually satisfying
- If any player votes higher than 8, a warning appears: "⚠ This is an epic, not a story."

### 4. Object Throwing Between Players
- Hover over any teammate and a throw menu appears
- Throwable objects: 🧻 Paper Ball, 👻 BOO, 💸 Money, 🍺 Beer
- Each object animates along a parabolic arc from thrower to target
- On landing: negative objects trigger an angry thought bubble (😡), positive ones trigger a happy bubble (😊)
- Throws are synchronized in real-time — everyone in the room sees the same animation simultaneously

### 5. Vote Reveal & Result Overlays
When the room creator reveals votes, a 5-second full-screen overlay appears with a custom pixel character and message:
- **"Great Success!"** — all players voted the same (Borat-inspired character celebrates)
- **"Spot the odd one out"** — one player voted differently (confused Puzzled Pete scratches his head)
- **"We have found ourselves at an impasse"** — wildly disparate votes (Stressed Stan panics in red)

### 6. Sidebar with Round History
- Right sidebar shows the current story title
- After reveal: shows each player's vote and the calculated average
- After starting a new round: the completed round's story + average moves to a HISTORY section
- History persists for the entire session, giving teams a running log of estimates

### 7. Room Creator Controls
- Only the person who created the room can: reveal votes, kick players, start a new round
- Kick is accessible via the same hover menu used for throwing objects
- Creator status is tracked via localStorage — no login required

### 8. No Login Required
- Entirely anonymous — users just pick a name and avatar
- Identity stored in browser localStorage with a UUID
- No accounts, no Google OAuth, no email — just open the link and play

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 + custom inline styles |
| Database | Supabase (PostgreSQL) |
| Real-time | Supabase Realtime (postgres_changes + Broadcast) |
| Charts | Recharts |
| Routing | React Router v6 |
| Hosting | Vercel (free tier) |
| Fonts | Press Start 2P (Google Fonts) |

---

## Interesting Technical Decisions

### Real-Time Architecture: Two Layers
PixelPoker uses two different Supabase real-time mechanisms for different purposes:

- **postgres_changes** — for persistent state (participants joining, votes being cast, session status changing). These write to the database and all clients get notified.
- **Broadcast** — for ephemeral events (throw animations, round-end summaries). These never touch the database — they're fire-and-forget UDP-style messages sent to everyone currently connected. This keeps throw animations snappy with no DB overhead.

### Flying Projectile Animation
Each throw animation injects a unique `@keyframes` CSS rule directly into `document.head` at runtime. The arc is calculated mathematically: start position, a parabolic midpoint raised by 38% of the distance, and the target. The animation runs for 760ms then cleans up its own style element. This avoids any animation library dependency.

### Synchronized Animations Across Clients
When you throw an object, two things happen simultaneously:
1. Your browser triggers the animation locally (immediate feedback)
2. A broadcast message fires to all other connected clients

Each client independently calculates the screen coordinates for the throw using its own DOM (`getBoundingClientRect()`). This means the animation looks correct on every screen size without sending any pixel coordinates over the wire.

### React Rules of Hooks — A Critical Lesson
Early in development, clicking "CHANGE" (to edit your avatar) crashed the app. The cause: React hooks (`useEffect`, `useMemo`) were declared *after* a conditional early return. When the `editingProfile` flag toggled, React rendered with a different number of hooks — a fatal violation. The fix was to move every single hook declaration to *before* any conditional return, then handle conditional rendering as JSX logic after all hooks are established.

### No Auth — Intentional
The app started with Google OAuth via Supabase. After spending significant time on OAuth configuration, the decision was made to abandon it entirely. Planning poker sessions are ephemeral — teams don't need accounts. localStorage UUIDs with chosen usernames are sufficient. This also removed all RLS (Row Level Security) complexity from the database.

### Dynamic Table Sizing
The poker table and all its elements scale dynamically based on player count using three tiers:
- **≤6 players**: large characters (44px), wide ellipse, big cards
- **7–10 players**: medium sizing
- **11–15 players**: compact mode — smaller everything, wider table

All player positions use trigonometry: `angle = (i/N) × 2π − π/2`, placing characters evenly on an ellipse around the table center.

---

## Database Schema (Supabase)

```sql
-- Sessions: one per room
sessions (id, code, name, status, story, created_at)

-- Participants: one row per user per session
participants (id, session_id, user_id, username, avatar_id, joined_at)

-- Votes: one row per user per session (upserted on change)
votes (id, session_id, user_id, username, vote, created_at)
```

All tables have RLS disabled — the app is intentionally open and trust-based, appropriate for internal team tooling.

---

## The User Experience Flow

1. User visits pixelpoker.vercel.app or receives an invite link
2. Picks a username and chooses one of 16 pixel characters
3. Lands directly at the voting table — no lobby, no waiting room
4. The round table shows all connected players as bouncing pixel characters
5. Creator sets a story title (ticket ID, feature name, etc.)
6. All players select a Fibonacci card simultaneously — others see a green checkmark but not the value
7. Creator reveals — all votes flip face-up simultaneously
8. Result overlay appears (5 seconds or dismiss): Great Success / Odd One Out / Impasse
9. Average is displayed in the sidebar alongside the story name
10. Creator starts a new round — old round moves to HISTORY, table resets

---

## What Makes It Different

- **No login friction** — share a link, pick a name, you're in
- **Personality** — pixel art, animations, and throwing objects make refinement fun
- **Honest voting** — all votes hidden until reveal prevents anchoring
- **Result archetypes** — the three result overlays surface patterns teams actually care about (consensus, outlier, deadlock)
- **Round history** — teams see estimates accumulate in real-time without needing a separate tool
- **Free and open source** — runs entirely on Supabase and Vercel free tiers

---

## Potential Angles for Articles

### For LinkedIn (professional/technical audience):
- "I built a planning poker tool in a weekend — here's what I learned about real-time React architecture"
- "Why we abandoned Google OAuth and made our app better by removing authentication entirely"
- "React Rules of Hooks: the bug that taught me the most about how React actually works"
- "How Supabase Broadcast vs postgres_changes shaped our real-time UX"

### For Substack (builder/indie hacker audience):
- "Building PixelPoker: when agile tooling meets pixel art nostalgia"
- "The case for no-auth apps: why your users don't need accounts"
- "Making remote team rituals fun again: the story behind PixelPoker"
- "Ship fast with Supabase + Vercel: from idea to production in a single session"

---

## Tone Notes

- This is a side project built for fun and genuine usefulness — not a startup pitch
- The pixel art aesthetic was a deliberate choice to evoke Crossy Road / retro game nostalgia
- The throwing mechanic was inspired by the idea that remote teams lose the informal social texture of in-person meetings — a crumpled paper ball thrown at a colleague who voted 21 on a 2-point story captures something real
- Keep the tone playful but technically credible
