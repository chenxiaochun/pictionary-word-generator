"use client";

import { useGameStore } from "@/store/game-store";

export function WordBankExhausted() {
  const session = useGameStore((s) => s.session);
  const dispatch = useGameStore((s) => s.dispatch);

  return (
    <div className="exhausted">
      <h1>You&apos;ve used every word!</h1>
      <p>
        That&apos;s {session.usedWordIds.length} words with zero repeats.
        Impressive game night.
      </p>
      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => dispatch({ type: "RESHUFFLE_WORDS" })}
        >
          Reshuffle &amp; keep playing
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => dispatch({ type: "END_GAME" })}
        >
          End game
        </button>
      </div>
      <style jsx>{`
        .exhausted {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }
        h1 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }
        p {
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 320px;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 280px;
        }
      `}</style>
    </div>
  );
}
