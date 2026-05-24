# Architecture — State Machine

```mermaid
stateDiagram-v2
    [*] --> setup
    setup --> idle: COMPLETE_SETUP
    idle --> revealing: BEGIN_REVEAL
    revealing --> timer_running: REVEAL_COMPLETE
    timer_running --> timer_running: END_REVEAL (hide word, timer continues)
    timer_running --> round_end_correct: CORRECT_GUESS
    timer_running --> round_end_skip: SKIP_WORD
    timer_running --> round_end_timeout: TICK (0ms left)
    round_end_correct --> idle: ROUND_END_ANIMATION_DONE (or game_over)
    round_end_skip --> idle: ROUND_END_ANIMATION_DONE
    round_end_timeout --> idle: ROUND_END_ANIMATION_DONE
    idle --> word_bank_exhausted: no words left
    word_bank_exhausted --> idle: RESHUFFLE_WORDS
    timer_running --> game_over: END_GAME
    game_over --> setup: PLAY_AGAIN
```

## Key files

| File | Role |
|------|------|
| `src/types/game.ts` | All TypeScript types + copy constants |
| `src/lib/game-state-machine.ts` | `gameReducer()` — single source of truth |
| `src/lib/word-engine.ts` | Filter pool, pick random, no-repeat |
| `src/lib/use-game-loop.ts` | 200ms timer tick, 1.2s reveal hold, round-end delays |
| `src/store/game-store.ts` | Zustand store wrapping reducer |

## Adding a feature

1. Add action type to `GameAction` in `types/game.ts`
2. Handle in `gameReducer()` 
3. Dispatch from component
4. Render new `phase` in UI if needed

## Word bank

Regenerate after editing `scripts/generate-words.mjs`:

```bash
npm run generate-words
```

JSON schema per word:

```json
{
  "id": "w001",
  "text": "cat",
  "category": "animals",
  "difficulty": "easy",
  "drawable": 3,
  "tags": ["phrase"]
}
```
