# Pictionary Host — Wireframes & UI Copy (English)

All user-facing strings for MVP. Use verbatim unless A/B testing.

---

## Screen 0: Landing Page

### Hero

| Element | Copy |
|---------|------|
| **H1** | Pictionary Word Generator with Timer |
| **Subtitle** | Host the perfect drawing game. Peek-proof words, auto timer, zero repeats — free, no signup. |
| **Primary CTA** | Start a Game |
| **Secondary CTA** | How to Play |
| **Trust line** | Free forever · Works on phone & TV · 500+ words |

### Below fold — Value props (3 cards)

| Card | Title | Body |
|------|-------|------|
| 1 | Hold to Reveal | Only the host sees the word. No peeking, no cheating. |
| 2 | Auto Timer | Timer starts when the word appears. Buzzer when time's up. |
| 3 | Never Repeats | Every word is fresh for the whole game night. |

### How to Play (3 steps)

| Step | Title | Body |
|------|-------|------|
| 1 | Set up teams | Name your teams, pick difficulty and timer. Takes 10 seconds. |
| 2 | Hold to reveal | The host holds the button to show the word to the drawer — then hides it. |
| 3 | Draw & score | Draw, guess, score. The tool handles turns and tracks the winner. |

### FAQ (SEO + support)

| Question | Answer |
|----------|--------|
| What is a Pictionary word generator? | A Pictionary word generator picks random words for drawing and guessing games. Ours goes further — it's a full game host with timer, teams, and peek-proof word reveal. |
| Does this Pictionary generator have a timer? | Yes. Choose 30, 60, or 90 seconds. The timer starts automatically when the word is revealed. |
| Can I use this for Zoom or virtual game nights? | Absolutely. Use Theater Mode to share your screen, or hold your phone so only the drawer sees the word. |
| Will words repeat during a game? | No. Our session engine tracks every word used. You won't see duplicates until you start a new game. |
| Is this Pictionary word generator free? | 100% free. No account, no download, no limits for game night. |
| How many players do I need? | Pictionary works best with 4–12 players in 2 teams. You can adapt the rules for smaller or larger groups. |

### Footer CTA

| Element | Copy |
|---------|------|
| **Heading** | Ready to host? |
| **Button** | Start a Game — It's Free |

---

## Screen 1: Quick Setup (Modal / Sheet)

**Header:** New Game  
**Subheader:** 10-second setup. You can change settings anytime.

### Step 1 — Teams

| Element | Copy |
|---------|------|
| Label | Team names |
| Team A placeholder | Team Foxes |
| Team B placeholder | Team Octos |
| Emoji hint | Tap emoji to change |
| Helper | 2 teams · 4+ players recommended |

### Step 2 — Game settings

| Element | Copy |
|---------|------|
| Difficulty label | Difficulty |
| Easy | Easy — great for kids & warm-ups |
| Mixed (default) | Mixed — balanced game night |
| Hard | Hard — for competitive groups |
| Category label | Category |
| All (default) | All categories |
| Individual cats | Animals · Food · Actions · Objects · Places · Abstract |
| Timer label | Round timer |
| Options | 30 sec · **60 sec** · 90 sec |
| Win score label | Play to |
| Options | 5 · **10** · 15 points |

### Step 3 — Confirm

| Element | Copy |
|---------|------|
| Summary line | {Team A} vs {Team B} · {Difficulty} · {Timer}s · First to {Score} |
| Primary CTA | Let's Go! |
| Back | Back |

---

## Screen 2: Game Host — IDLE (word hidden)

### Top bar — Scoreboard

| Element | Copy |
|---------|------|
| Team A | {emoji} {name} · {score} |
| VS | VS |
| Team B | {score} · {name} {emoji} |
| Turn indicator | {Team name}'s turn to draw |

### Word zone

| Element | Copy |
|---------|------|
| Hidden state | ??? |
| Instruction | Hold to Reveal |
| Sub-instruction | Release to hide · Timer keeps running |
| Round meta | Round {n} · {Category} · {Difficulty} |

### Timer (idle)

| Element | Copy |
|---------|------|
| Display | —:—— |
| Hint | Reveal the word to start |

### Bottom actions

| Button | Copy | State |
|--------|------|-------|
| Primary (disabled) | Got it! +1 | Disabled until timer running |
| Secondary | Skip word | Enabled |
| Tertiary (text) | Settings ⚙ | Always |

### Corner controls

| Control | Copy / aria |
|---------|-------------|
| Theater | ⛶ Theater Mode |
| Menu | ☰ End game |

---

## Screen 3: Game Host — REVEALING (hold in progress)

| Element | Copy |
|---------|------|
| Progress ring | (visual only) |
| Center | Hold... |
| Haptic | (vibrate 50ms at start) |

---

## Screen 4: Game Host — WORD SHOWN + TIMER RUNNING

### Word zone

| Element | Copy |
|---------|------|
| Word | {WORD IN LARGE TYPE} |
| On release | ??? (word hidden again) |
| Personality line (random) | See table below |

**Personality lines (random, 0.5s after reveal):**

| Difficulty | Lines |
|------------|-------|
| Easy | Easy peasy — even my cat could draw this 🐱 |
| Easy | If they can't get this in 10 seconds... |
| Easy | Warm-up round energy ✨ |
| Medium | Good luck fitting this on the paper... |
| Medium | This one's gonna take some creativity |
| Medium | Medium spice 🌶️ |
| Hard | RIP to whoever's drawing this 💀 |
| Hard | Abstract concept detected. Good luck. |
| Hard | May the odds be ever in your favor |
| Hard | Someone's about to get artistic |

### Timer states

| Remaining | Label | Color |
|-----------|-------|-------|
| > 30s | {0:47} | Green |
| 15–30s | {0:22} | Yellow |
| < 15s | {0:08} | Red + pulse |
| 0 | TIME'S UP! | Full flash + buzzer |

### Bottom actions (enabled)

| Button | Copy |
|--------|------|
| Primary | Got it! +1 {current team} |
| Secondary | Skip word |
| Tertiary | New word (same turn) |

---

## Screen 5: ROUND END — Correct guess

| Element | Copy |
|---------|------|
| Overlay title | They got it! |
| Celebration lines (random) | Nice! · Too easy! · How did they guess that?! · Point goes to {team}! |
| Score animation | +1 bounce + confetti 1.5s |
| Auto transition | {Other team}'s turn! (after 1.5s) |

---

## Screen 6: ROUND END — Skipped

| Element | Copy |
|---------|------|
| Overlay | Skipped! |
| Sub | No points this round |
| Auto transition | {Other team}'s turn! (after 0.8s) |

---

## Screen 7: ROUND END — Time's up

| Element | Copy |
|---------|------|
| Overlay | TIME'S UP! ⏰ |
| Buzzer | (sound if enabled) |
| Sub | No points · Next team's turn |
| Phase 2 teaser | (Steal round button — Phase 2) |

---

## Screen 8: Theater Mode

| Element | Copy |
|---------|------|
| Word hidden | ??? · Hold to Reveal |
| Word shown | {WORD} |
| Timer | Large center ring |
| Score (minimal) | {A} {score} — {score} {B} |
| Exit hint | Press Esc or tap edge to exit |
| Turn | {Team}'s turn |

---

## Screen 9: Settings (slide-over)

| Element | Copy |
|---------|------|
| Title | Game Settings |
| Sound effects | Sound effects · Buzzer & reveals |
| Haptic | Vibration (mobile) |
| Timer | Change timer: 30 / 60 / 90 |
| Difficulty | Change difficulty |
| Category | Change category |
| New game | Start new game |
| End game | End game early |
| Danger confirm | End game? Current scores will be lost. · Cancel / End Game |

---

## Screen 10: Word bank exhausted

| Element | Copy |
|---------|------|
| Title | You've used every word! |
| Body | That's {n} words with zero repeats. Impressive game night. |
| Primary | Reshuffle & keep playing |
| Secondary | End game |

---

## Screen 11: Session End — Victory

| Element | Copy |
|---------|------|
| Title | 🏆 {Winner Team} Wins! |
| Score | {score} — {score} |
| Stats | {rounds} rounds · {wordsUsed} words · 0 repeats |
| Hardest word | Hardest word: "{word}" |
| Primary | Play Again |
| Secondary | Share result 📋 |
| Share text template | We just played Pictionary Host! {Winner} won {score}-{score} in {rounds} rounds. Can you beat us? {url} |

---

## Screen 12: Session End — Tie (edge case)

| Element | Copy |
|---------|------|
| Title | It's a tie! |
| Body | {score} — {score} after {rounds} rounds |
| Primary | Sudden Death Round |
| Secondary | Play Again |

---

## Sound copy (aria / first-run prompt)

| Event | Sound | First-run prompt |
|-------|-------|------------------|
| Reveal complete | soft-ding.mp3 | — |
| Timer tick (< 15s) | tick.mp3 (optional) | — |
| Time's up | buzzer.mp3 | Enable sound effects for the full party experience? · Not now / Enable |
| Score | cheer.mp3 | — |

---

## Error & empty states

| State | Copy |
|-------|------|
| No words match filters | No words match these filters. Try Mixed difficulty or All categories. |
| localStorage blocked | Can't save game progress in this browser. Game will still work this session. |
| Wake lock failed | (silent — no user message) |

---

## Meta / SEO (not on-screen but paired)

| Field | Copy |
|-------|------|
| **Title** | Pictionary Word Generator with Timer – Free Game Host Tool |
| **Meta description** | Host Pictionary with a free word generator, built-in timer, peek-proof reveal, and zero repeats. Perfect for parties, Zoom, and family game night. |
| **OG title** | Pictionary Host — Word Generator with Timer |
| **OG description** | The fun way to host Pictionary. Free, no signup. |

---

## Microcopy tone guide

- **Voice:** Friendly party host, not corporate SaaS
- **Length:** Buttons ≤ 4 words; overlays ≤ 2 lines
- **Emoji:** Sparingly in celebrations, never in errors
- **Avoid:** "Generate words" as primary CTA (use "Start a Game", "Got it!", "Let's Go!")
