"use client";

import { useEffect, useState } from "react";
import type { GamePhase } from "@/types/game";
import { REVEAL_HOLD_MS } from "@/types/game";
import { useGameStore } from "@/store/game-store";

interface WordRevealZoneProps {
  word: string | null;
  visible: boolean;
  phase: GamePhase;
  onRevealStart: () => void;
  onRevealEnd: () => void;
  theater?: boolean;
}

export function WordRevealZone({
  word,
  visible,
  phase,
  onRevealStart,
  onRevealEnd,
  theater = false,
}: WordRevealZoneProps) {
  const revealStartedAt = useGameStore((s) => s.revealStartedAt);
  const [holdProgress, setHoldProgress] = useState(0);
  const showWord = visible && word;
  const isRevealing = phase === "revealing";

  useEffect(() => {
    if (!isRevealing || revealStartedAt == null) {
      setHoldProgress(0);
      return;
    }

    let frame = 0;
    const tick = () => {
      const progress = Math.min(
        1,
        (Date.now() - revealStartedAt) / REVEAL_HOLD_MS
      );
      setHoldProgress(progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isRevealing, revealStartedAt]);

  const ringRadius = theater ? 88 : 56;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - holdProgress);

  return (
    <div
      className={`reveal-zone ${theater ? "theater" : ""}`}
      onPointerDown={onRevealStart}
      onPointerUp={onRevealEnd}
      onPointerLeave={onRevealEnd}
      onContextMenu={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      aria-label={showWord ? word ?? "Hidden word" : "Hold to reveal word"}
    >
      {isRevealing && !showWord && (
        <svg
          className="hold-ring"
          viewBox={`0 0 ${(ringRadius + 8) * 2} ${(ringRadius + 8) * 2}`}
          aria-hidden
        >
          <circle
            cx={ringRadius + 8}
            cy={ringRadius + 8}
            r={ringRadius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={theater ? 6 : 4}
          />
          <circle
            cx={ringRadius + 8}
            cy={ringRadius + 8}
            r={ringRadius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={theater ? 6 : 4}
            strokeLinecap="round"
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringOffset}
            transform={`rotate(-90 ${ringRadius + 8} ${ringRadius + 8})`}
          />
        </svg>
      )}

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
          position: relative;
        }
        .reveal-zone.theater {
          min-height: 280px;
          margin: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }
        .hold-ring {
          position: absolute;
          width: ${theater ? "200px" : "128px"};
          height: ${theater ? "200px" : "128px"};
          pointer-events: none;
        }
        .word-shown {
          font-family: var(--font-display);
          font-size: ${theater ? "clamp(2.5rem, 8vw, 4.5rem)" : "clamp(1.75rem, 6vw, 2.5rem)"};
          font-weight: 800;
          text-align: center;
          padding: 0 1rem;
          z-index: 1;
        }
        .word-hidden {
          font-family: var(--font-display);
          font-size: ${theater ? "3rem" : "2rem"};
          font-weight: 800;
          color: var(--text-muted);
          z-index: 1;
        }
        .instruction {
          margin-top: 0.75rem;
          font-size: ${theater ? "1.125rem" : "1rem"};
          font-weight: 600;
          color: var(--accent);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
