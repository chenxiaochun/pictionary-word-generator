"use client";

import { useGameStore } from "@/store/game-store";
import { getWinner } from "@/lib/game-state-machine";

export function SessionEnd() {
  const session = useGameStore((s) => s.session);
  const dispatch = useGameStore((s) => s.dispatch);
  const winner = getWinner(session);
  const [a, b] = session.teams;
  const isTie = !winner;

  return (
    <div className="session-end">
      <h1>{isTie ? "It's a tie!" : `🏆 ${winner!.name} Wins!`}</h1>
      <p className="score">
        {a.score} — {b.score}
      </p>
      <ul className="stats">
        <li>{session.rounds.length} rounds</li>
        <li>{session.usedWordIds.length} words</li>
        <li>0 repeats</li>
      </ul>
      {session.hardestWord && (
        <p className="hardest">
          Hardest word: &ldquo;{session.hardestWord.text}&rdquo;
        </p>
      )}
      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => dispatch({ type: "PLAY_AGAIN" })}
        >
          Play Again
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            const text = isTie
              ? `Tie game! ${a.score}-${b.score} after ${session.rounds.length} rounds.`
              : `${winner!.name} won ${winner!.score}-${winner!.id === "A" ? b.score : a.score}!`;
            navigator.clipboard?.writeText(
              `We just played Pictionary Host! ${text} ${window.location.href}`
            );
          }}
        >
          Share result 📋
        </button>
      </div>
      <style jsx>{`
        .session-end {
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
          font-size: clamp(1.75rem, 6vw, 2.75rem);
          margin-bottom: 0.5rem;
        }
        .score {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }
        .stats {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .hardest {
          font-style: italic;
          color: var(--text-muted);
          margin-bottom: 2rem;
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
