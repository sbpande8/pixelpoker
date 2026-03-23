# PixelPoker 🃏

Real-time 8-bit planning poker — React + Vite + Tailwind + Supabase.

## Features
- Google OAuth sign-in via Supabase Auth
- 16×16 pixel avatar editor saved to your profile
- Create or join sessions with a 6-character code
- Fibonacci card voting (`0 1 2 3 5 8 13 21 34 55 ? ∞`)
- Live participants panel (voted / not voted indicators)
- Host reveals votes → animated bar chart + consensus detection
- Host starts a new round; vote history kept per round

---

## 1 — Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- A free [Supabase](https://supabase.com) account

---

## 2 — Supabase setup

### 2a. Create a project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a new project.
2. Note your **Project URL** and **anon/public API key** (Settings → API).

### 2b. Run the schema
1. Open **SQL Editor** in the Supabase Dashboard.
2. Paste and run the contents of `supabase/schema.sql`.

### 2c. Enable Google OAuth
1. Go to **Authentication → Providers → Google**.
2. Enable Google, then follow the link to create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/).
3. Set the **Authorised redirect URI** to:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
4. Paste the **Client ID** and **Client Secret** back into Supabase.
5. Add your local dev URL to **Authentication → URL Configuration → Redirect URLs**:
   ```
   http://localhost:5173
   ```

---

## 3 — Local development

```bash
# 1. Clone / open the project
cd pixelpoker

# 2. Install dependencies
npm install

# 3. Create your .env
cp .env.example .env
# Edit .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 4. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Project structure

```
src/
  lib/
    supabase.js          ← Supabase client
  contexts/
    AuthContext.jsx      ← Session, profile, sign-in/out
  pages/
    Login.jsx            ← Google OAuth button
    Lobby.jsx            ← Create / join session
    VotingRoom.jsx       ← Real-time voting room
  components/
    Avatar/
      PixelAvatarEditor.jsx  ← 16×16 pixel paint editor
    Voting/
      CardDeck.jsx           ← Fibonacci card buttons
      ResultsChart.jsx       ← Recharts bar chart
supabase/
  schema.sql            ← All tables, RLS policies, triggers
```

---

## Tech stack

| Layer | Library |
|-------|---------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + Press Start 2P font |
| Auth | Supabase Auth (Google OAuth) |
| Database | Supabase (Postgres) |
| Realtime | Supabase Realtime (postgres_changes) |
| Charts | Recharts |
