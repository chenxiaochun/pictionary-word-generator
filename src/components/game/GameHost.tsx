"use client";

import { useGameStore } from "@/store/game-store";
import { useGameLoop } from "@/lib/use-game-loop";
import { Scoreboard } from "@/components/game/Scoreboard";
import { WordRevealZone } from "@/components/game/WordRevealZone";
import { TimerDisplay } from "@/components/game/TimerDisplay";
import { RoundOverlay } from "@/components/game/RoundOverlay";
import { Confetti } from "@/components/game/Confetti";
import { SoundPrompt } from "@/components/game/SoundPrompt";
import { useGameSounds } from "@/lib/use-game-sounds";
import { getCategoryLabel, getDifficultyLabel } from "@/lib/word-engine";

export function GameHost() {
  const session = useGameStore((s) => s.session);
  const dispatch = useGameStore((s) => s.dispatch);
  const personalityLine = useGameStore((s) => s.personalityLine);
  const { onRevealStart, onRevealEnd, timerLabel, activeTeam } = useGameLoop();
  useGameSounds();

  const canGuess =
    session.phase === "timer_running" && session.timerRemainingMs != null;
  const meta = session.currentWord
    ? `Round ${session.roundNumber} · ${getCategoryLabel(session.settings.category)} · ${getDifficultyLabel(session.settings.difficulty)}`
    : "";

  return (
    <div className={`host ${session.theaterMode ? "theater" : ""}`}>
      <Scoreboard />

      <p className="turn">{activeTeam.emoji} {activeTeam.name}&apos;s turn to draw</p>

      <WordRevealZone
        word={session.currentWord?.text ?? null}
        visible={session.isWordVisible}
        phase={session.phase}
        onRevealStart={onRevealStart}
        onRevealEnd={onRevealEnd}
      />

      {personalityLine && session.isWordVisible && (
        <p className="personality">{personalityLine}</p>
      )}

      <p className="meta">{meta}</p>

      <TimerDisplay
        label={timerLabel}
        remainingMs={session.timerRemainingMs}
        totalSeconds={session.settings.timerSeconds}
        running={session.phase === "timer_running"}
      />

      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          disabled={!canGuess}
          onClick={() => dispatch({ type: "CORRECT_GUESS" })}
        >
          Got it! +1 {activeTeam.name}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => dispatch({ type: "SKIP_WORD" })}
        >
          Skip word
        </button>
      </div>

      <p className="hint">Release to hide · Timer keeps running</p>

      <div className="toolbar">
        <button
          type="button"
          className="tool-btn"
          onClick={() =>
            dispatch({
              type: "UPDATE_SETTINGS",
              settings: { soundEnabled: !session.settings.soundEnabled },
            })
          }
        >
          {session.settings.soundEnabled ? "🔊 Sound on" : "🔇 Sound off"}
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => dispatch({ type: "TOGGLE_THEATER" })}
        >
          ⛶ Theater
        </button>
        <button
          type="button"
          className="tool-btn danger"
          onClick={() => dispatch({ type: "END_GAME" })}
        >
          End game
        </button>
      </div>

      <RoundOverlay phase={session.phase} teamName={activeTeam.name} />
      <Confetti active={session.phase === "round_end_correct"} />
      <SoundPrompt />

      <style jsx>{`
        .host {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          padding: 1rem 1rem 2rem;
          max-width: 520px;
          margin: 0 auto;
        }
        .host.theater {
          max-width: none;
          background: #000;
        }
        .turn {
          text-align: center;
          font-weight: 600;
          margin: 0.75rem 0;
          color: var(--accent);
        }
        .personality {
          text-align: center;
          font-size: 0.9375rem;
          color: var(--text-muted);
          font-style: italic;
          margin: 0.5rem 0;
        }
        .meta {
          text-align: center;
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: auto;
          padding-top: 1.5rem;
        }
        .actions .btn-primary,
        .actions .btn-secondary {
          width: 100%;
          text-align: center;
        }
        .hint {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
        }
        .toolbar {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .tool-btn {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .tool-btn.danger:hover {
          color: var(--timer-red);
        }
      `}</style>
    </div>
  );
}
