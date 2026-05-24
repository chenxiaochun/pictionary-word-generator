"use client";

import { useState } from "react";
import type {
  Team,
  GameSettings,
  DifficultyPreset,
  TimerSeconds,
  WinScore,
} from "@/types/game";
import { DEFAULT_SETTINGS, DEFAULT_TEAMS } from "@/types/game";
import { useGameStore } from "@/store/game-store";

interface SetupModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export function SetupModal({ onClose, onComplete }: SetupModalProps) {
  const dispatch = useGameStore((s) => s.dispatch);
  const [teams, setTeams] = useState<[Team, Team]>(
    DEFAULT_TEAMS.map((t) => ({ ...t })) as [Team, Team]
  );
  const [settings, setSettings] = useState<GameSettings>({ ...DEFAULT_SETTINGS });

  const updateTeam = (id: Team["id"], patch: Partial<Team>) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)) as [Team, Team]
    );
  };

  const handleStart = () => {
    dispatch({ type: "COMPLETE_SETUP", teams, settings });
    onComplete();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <div className="modal">
        <header>
          <h2 id="setup-title">New Game</h2>
          <p>10-second setup. You can change settings anytime.</p>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section>
          <h3>Team names</h3>
          <div className="teams">
            {teams.map((team) => (
              <label key={team.id} className="team-row">
                <input
                  type="text"
                  value={team.emoji}
                  maxLength={2}
                  className="emoji-input"
                  onChange={(e) => updateTeam(team.id, { emoji: e.target.value })}
                  aria-label={`Team ${team.id} emoji`}
                />
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                  placeholder={team.id === "A" ? "Team Foxes" : "Team Octos"}
                />
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3>Difficulty</h3>
          <div className="pill-group">
            {(["easy", "mixed", "hard"] as DifficultyPreset[]).map((d) => (
              <button
                key={d}
                type="button"
                className={settings.difficulty === d ? "pill active" : "pill"}
                onClick={() => setSettings((s) => ({ ...s, difficulty: d }))}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3>Round timer</h3>
          <div className="pill-group">
            {([30, 60, 90] as TimerSeconds[]).map((sec) => (
              <button
                key={sec}
                type="button"
                className={
                  settings.timerSeconds === sec ? "pill active" : "pill"
                }
                onClick={() =>
                  setSettings((s) => ({ ...s, timerSeconds: sec }))
                }
              >
                {sec}s
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3>Play to</h3>
          <div className="pill-group">
            {([5, 10, 15] as WinScore[]).map((score) => (
              <button
                key={score}
                type="button"
                className={settings.winScore === score ? "pill active" : "pill"}
                onClick={() => setSettings((s) => ({ ...s, winScore: score }))}
              >
                {score} pts
              </button>
            ))}
          </div>
        </section>

        <p className="summary">
          {teams[0].emoji} {teams[0].name} vs {teams[1].name} {teams[1].emoji} ·{" "}
          {settings.difficulty} · {settings.timerSeconds}s · First to{" "}
          {settings.winScore}
        </p>

        <button type="button" className="btn-primary full" onClick={handleStart}>
          Let&apos;s Go!
        </button>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .modal {
          background: var(--bg-card);
          border-radius: var(--radius) var(--radius) 0 0;
          width: 100%;
          max-width: 480px;
          max-height: 90dvh;
          overflow-y: auto;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        header {
          position: relative;
          margin-bottom: 1.25rem;
        }
        header h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
        }
        header p {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .close {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 1.75rem;
          line-height: 1;
          color: var(--text-muted);
        }
        section {
          margin-bottom: 1.25rem;
        }
        section h3 {
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .teams {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .team-row {
          display: flex;
          gap: 0.5rem;
        }
        .team-row input[type="text"]:last-child {
          flex: 1;
          padding: 0.75rem 1rem;
          background: var(--bg-elevated);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: var(--text);
        }
        .emoji-input {
          width: 3rem;
          text-align: center;
          padding: 0.75rem;
          background: var(--bg-elevated);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: var(--text);
        }
        .pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pill {
          padding: 0.5rem 1rem;
          border-radius: 999px;
          background: var(--bg-elevated);
          border: 1px solid transparent;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .pill.active {
          background: rgba(255, 137, 6, 0.2);
          border-color: var(--accent);
          color: var(--accent);
        }
        .summary {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 1rem;
        }
        .full {
          width: 100%;
        }
        @media (min-width: 640px) {
          .overlay {
            align-items: center;
          }
          .modal {
            border-radius: var(--radius);
          }
        }
      `}</style>
    </div>
  );
}
