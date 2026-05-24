"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/game-store";

export function Scoreboard() {
  const teams = useGameStore((s) => s.session.teams);
  const phase = useGameStore((s) => s.session.phase);
  const scoreARef = useRef<HTMLSpanElement>(null);
  const scoreBRef = useRef<HTMLSpanElement>(null);
  const prevScores = useRef({ a: teams[0].score, b: teams[1].score });

  useEffect(() => {
    const prev = prevScores.current;
    if (teams[0].score > prev.a && scoreARef.current) {
      scoreARef.current.classList.remove("pop");
      void scoreARef.current.offsetWidth;
      scoreARef.current.classList.add("pop");
    }
    if (teams[1].score > prev.b && scoreBRef.current) {
      scoreBRef.current.classList.remove("pop");
      void scoreBRef.current.offsetWidth;
      scoreBRef.current.classList.add("pop");
    }
    prevScores.current = { a: teams[0].score, b: teams[1].score };
  }, [teams, phase]);

  return (
    <div className="scoreboard">
      <div className="team team-a">
        <span className="emoji">{teams[0].emoji}</span>
        <span className="name">{teams[0].name}</span>
        <span ref={scoreARef} className="score">
          {teams[0].score}
        </span>
      </div>
      <span className="vs">VS</span>
      <div className="team team-b">
        <span ref={scoreBRef} className="score">
          {teams[1].score}
        </span>
        <span className="name">{teams[1].name}</span>
        <span className="emoji">{teams[1].emoji}</span>
      </div>
      <style jsx>{`
        .scoreboard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          background: var(--bg-card);
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .team {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex: 1;
          min-width: 0;
        }
        .team-b {
          justify-content: flex-end;
        }
        .name {
          font-size: 0.8125rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .score {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          display: inline-block;
        }
        :global(.score.pop) {
          animation: bounce-score 0.45s ease;
        }
        .team-a .score {
          color: var(--team-a);
        }
        .team-b .score {
          color: var(--team-b);
        }
        .vs {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--text-muted);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
