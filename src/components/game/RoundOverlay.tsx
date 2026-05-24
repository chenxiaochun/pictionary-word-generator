"use client";

import type { GamePhase } from "@/types/game";
import { randomCelebrationLine } from "@/lib/word-engine";

interface RoundOverlayProps {
  phase: GamePhase;
  teamName: string;
}

export function RoundOverlay({ phase, teamName }: RoundOverlayProps) {
  if (
    phase !== "round_end_correct" &&
    phase !== "round_end_skip" &&
    phase !== "round_end_timeout"
  ) {
    return null;
  }

  const config = {
    round_end_correct: {
      title: "They got it!",
      sub: randomCelebrationLine(teamName),
      className: "success",
    },
    round_end_skip: {
      title: "Skipped!",
      sub: "No points this round",
      className: "skip",
    },
    round_end_timeout: {
      title: "TIME'S UP! ⏰",
      sub: "No points · Next team's turn",
      className: "timeout flash",
    },
  }[phase];

  return (
    <div className={`overlay ${config.className}`} role="status">
      <h2>{config.title}</h2>
      <p>{config.sub}</p>
      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(15, 14, 23, 0.85);
          z-index: 50;
          pointer-events: none;
        }
        .overlay h2 {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 6vw, 2.5rem);
          margin-bottom: 0.5rem;
        }
        .overlay p {
          color: var(--text-muted);
          font-size: 1.125rem;
        }
        .success h2 {
          color: var(--team-b);
        }
        .timeout h2 {
          color: var(--timer-red);
        }
        .flash {
          animation: flash-red 0.4s ease 2;
        }
      `}</style>
    </div>
  );
}
