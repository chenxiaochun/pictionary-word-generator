"use client";

import type { GamePhase } from "@/types/game";

interface WordRevealZoneProps {
  word: string | null;
  visible: boolean;
  phase: GamePhase;
  onRevealStart: () => void;
  onRevealEnd: () => void;
}

export function WordRevealZone({
  word,
  visible,
  phase,
  onRevealStart,
  onRevealEnd,
}: WordRevealZoneProps) {
  const showWord = visible && word;
  const isRevealing = phase === "revealing";

  return (
    <div
      className="reveal-zone"
      onPointerDown={onRevealStart}
      onPointerUp={onRevealEnd}
      onPointerLeave={onRevealEnd}
      onContextMenu={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      aria-label={showWord ? word ?? "Hidden word" : "Hold to reveal word"}
    >
      {showWord ? (
        <p className="word-shown">{word}</p>
      ) : (
        <>
          <p className="word-hidden">{isRevealing ? "Hold..." : "???"}</p>
          {!isRevealing && phase === "idle" && (
            <p className="instruction">Hold to Reveal</p>
          )}
        </>
      )}
      <style jsx>{`
        .reveal-zone {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          margin: 1rem 0;
          background: var(--bg-card);
          border-radius: var(--radius);
          border: 2px dashed rgba(255, 255, 255, 0.12);
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .instruction {
          margin-top: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
