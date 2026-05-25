# Pictionary Host

Free **Pictionary word generator with timer** — host peek-proof drawing game nights in the browser.

## Quick start

```bash
cd pictionary-word-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
pictionary-word-generator/
├── data/words.json              # 535-word bank (regenerate: npm run generate-words)
├── docs/wireframes-ui-copy.md   # All screen copy & wireframe spec (English)
├── scripts/generate-words.mjs   # Word bank generator
└── src/
    ├── app/                     # Next.js App Router
    ├── components/
    │   ├── landing/             # SEO landing page
    │   ├── setup/               # Quick setup modal
    │   ├── game/                # Host UI, timer, reveal
    │   └── session-end/         # Victory / stats screen
    ├── lib/
    │   ├── game-state-machine.ts  # Pure reducer (all game logic)
    │   ├── word-engine.ts         # Word pick / filter / no-repeat pool
    │   └── use-game-loop.ts       # Timer tick + reveal hold hooks
    ├── store/game-store.ts      # Zustand + localStorage persist
    └── types/game.ts            # Types, constants, personality lines
```

## Core product loop

1. **Setup** — teams, difficulty, timer (≤3 taps)
2. **Hold to Reveal** — peek-proof word for drawer; timer auto-starts
3. **Release to hide** — word hidden; timer keeps running
4. **Got it / Skip / Timeout** — score, celebrate, next turn
5. **Session end** — stats, share, play again

## State machine phases

| Phase | UI |
|-------|-----|
| `setup` | Landing + setup modal |
| `idle` | `???` — Hold to Reveal |
| `revealing` | Hold progress |
| `timer_running` | Word shown (while holding) / hidden (after release) + timer |
| `round_end_*` | Overlay animation → auto next turn |
| `game_over` | Session end screen |
| `word_bank_exhausted` | Reshuffle prompt |

Dispatch actions via `useGameStore().dispatch({ type: '...' })`.  
All transitions live in `src/lib/game-state-machine.ts`.

## SEO targets

- **Primary:** `pictionary word generator`
- **Breakthrough long-tail:** `pictionary word generator with timer`
- **Landing pages:** `/for-zoom`, `/for-kids`, `/easy-pictionary-words`

## Launch (获客)

1. Copy `.env.example` → set `NEXT_PUBLIC_SITE_URL` on Vercel (Production).
2. Deploy via [Vercel](https://vercel.com/new) (import this GitHub repo).
3. Redeploy after env vars change so sitemap / JSON-LD use the real domain.
4. Follow **[docs/launch.md](docs/launch.md)** for Google Search Console and post-deploy checks.

OG image: auto-generated at `/opengraph-image` (see `src/app/opengraph-image.tsx`).

## MVP checklist

- [x] 535-word bank with categories & difficulty
- [x] Session no-repeat
- [x] Hold-to-reveal + timer auto-start
- [x] Scoreboard + round overlays
- [x] Theater mode toggle
- [x] Landing FAQ for SEO
- [x] Sound effects (Web Audio — ding, buzzer, cheer, tick)
- [x] `/for-zoom` SEO landing page
- [x] sitemap.xml + robots.txt + OG image + `metadataBase`
- [ ] Deploy to Vercel + set `NEXT_PUBLIC_SITE_URL`
- [ ] Google Search Console sitemap + indexing

## Docs

Full UI copy for every screen: [`docs/wireframes-ui-copy.md`](docs/wireframes-ui-copy.md)  
Launch checklist (中文): [`docs/launch.md`](docs/launch.md)
