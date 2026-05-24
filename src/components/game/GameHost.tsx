"use client";

import { useEffect, useState } from "react";
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
  const [showControls, setShowControls] = useState(false);

  const theater = session.theaterMode;
  const canGuess =
    session.phase === "timer_running" && session.timerRemainingMs != null;
  const meta = session.currentWord
    ? `Round ${session.roundNumber} · ${getCategoryLabel(session.settings.category)} · ${getDifficultyLabel(session.settings.difficulty)}`
    : "";

  useEffect(() => {
    if (!theater) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch({ type: "TOGGLE_THEATER" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [theater, dispatch]);

  return (
    <div
      className={`host ${theater ? "theater" : ""}`}
      onMouseMove={() => theater && setShowControls(true)}
    >
      {theater ? (
        <>
          <div className="theater-top">
            <Scoreboard compact />
            <p className="turn theater-turn">
              {activeTeam.emoji} {activeTeam.name}&apos;s turn
            </p>
          </div>

          <div className="theater-main">
            <WordRevealZone
              word={session.currentWord?.text ?? null}
              visible={session.isWordVisible}
              phase={session.phase}
              onRevealStart={onRevealStart}
              onRevealEnd={onRevealEnd}
              theater
            />
            <TimerDisplay
              label={timerLabel}
              remainingMs={session.timerRemainingMs}
              totalSeconds={session.settings.timerSeconds}
              running={session.phase === "timer_running"}
              theater
            />
          </div>

          <p className="theater-esc">Press Esc to exit Theater Mode</p>

          <div
            className={`theater-dock ${showControls ? "visible" : ""}`}
            onMouseLeave={() => setShowControls(false)}
          >
            <div className="actions theater-actions">
              <button
                type="button"
                className="btn-primary"
                disabled={!canGuess}
                onClick={() => dispatch({ type: "CORRECT_GUESS" })}
              >
                Got it! +1
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => dispatch({ type: "SKIP_WORD" })}
              >
                Skip
              </button>
            </div>
            <div className="toolbar theater-toolbar">
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
                {session.settings.soundEnabled ? "🔊" : "🔇"}
              </button>
              <button
                type="button"
                className="tool-btn"
                onClick={() => dispatch({ type: "TOGGLE_THEATER" })}
              >
                Exit Theater
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Scoreboard />

          <p className="turn">
            {activeTeam.emoji} {activeTeam.name}&apos;s turn to draw
          </p>

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
        </>
      )}

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
          position: fixed;
          inset: 0;
          z-index: 50;
          max-width: none;
          margin: 0;
          padding: 1.5rem 1rem;
          background: #000;
          justify-content: space-between;
        }
        .theater-top {
          text-align: center;
        }
        .theater-turn {
          font-size: 0.9375rem;
          color: var(--accent);
          margin-top: 0.25rem;
        }
        .theater-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
        }
        .theater-esc {
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 4rem;
        }
        .theater-dock {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.92));
          opacity: 0;
          transform: translateY(0.5rem);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
        }
        .theater-dock.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .theater-actions {
          flex-direction: row;
          gap: 0.75rem;
          max-width: 480px;
          margin: 0 auto;
        }
        .theater-actions :global(.btn-primary),
        .theater-actions :global(.btn-secondary) {
          flex: 1;
        }
        .theater-toolbar {
          margin-top: 0.5rem;
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
        .actions :global(.btn-primary),
        .actions :global(.btn-secondary) {
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
