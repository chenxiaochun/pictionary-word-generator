"use client";

import { useCallback, useState } from "react";
import type { DifficultyPreset, GameSettings, WordCategory } from "@/types/game";
import {
  CATEGORY_OPTIONS,
  pickRandomWord,
  randomPersonalityLine,
  countAvailableWords,
  getWordBankMeta,
} from "@/lib/word-engine";
import type { Word } from "@/types/game";

interface QuickWordPlaygroundProps {
  onHostGame: (settings: Partial<GameSettings>) => void;
}

export function QuickWordPlayground({ onHostGame }: QuickWordPlaygroundProps) {
  const [difficulty, setDifficulty] = useState<DifficultyPreset>("mixed");
  const [category, setCategory] = useState<WordCategory | "all">("all");
  const [word, setWord] = useState<Word | null>(null);
  const [personality, setPersonality] = useState<string | null>(null);
  const [usedIds, setUsedIds] = useState<Set<string>>(() => new Set());
  const [copied, setCopied] = useState(false);
  const [pop, setPop] = useState(false);

  const poolLeft = countAvailableWords({
    difficulty,
    category,
    excludeIds: usedIds,
  });
  const { total } = getWordBankMeta();

  const generate = useCallback(() => {
    let exclude = usedIds;
    let picked = pickRandomWord({ difficulty, category, excludeIds: exclude });
    if (!picked) {
      exclude = new Set();
      picked = pickRandomWord({ difficulty, category, excludeIds: exclude });
      setUsedIds(new Set());
    }
    if (!picked) return;
    setUsedIds((prev) => new Set([...prev, picked!.id]));
    setWord(picked);
    setPersonality(randomPersonalityLine(picked.difficulty));
    setPop(true);
    requestAnimationFrame(() => setPop(false));
  }, [difficulty, category, usedIds]);

  const copyWord = async () => {
    if (!word) return;
    try {
      await navigator.clipboard.writeText(word.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="quick-play" aria-labelledby="quick-play-heading">
      <h2 id="quick-play-heading">Try a word — right now</h2>
      <p className="quick-play-lead">
        No signup. Tap generate, then host a full game when your group is ready.
      </p>

      <div className="quick-filters">
        <div className="filter-row" role="group" aria-label="Difficulty">
          {(["easy", "mixed", "hard"] as DifficultyPreset[]).map((d) => (
            <button
              key={d}
              type="button"
              className={difficulty === d ? "pill active" : "pill"}
              onClick={() => setDifficulty(d)}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <div className="filter-row category-row" role="group" aria-label="Category">
          {CATEGORY_OPTIONS.slice(0, 5).map(({ value, label, emoji }) => (
            <button
              key={value}
              type="button"
              className={category === value ? "pill active" : "pill"}
              onClick={() => setCategory(value)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      <div className={`quick-stage ${pop ? "pop" : ""}`}>
        {word ? (
          <>
            <p className="quick-word word-shown">{word.text}</p>
            {personality && <p className="quick-personality">{personality}</p>}
          </>
        ) : (
          <p className="quick-placeholder">🎨 Tap Generate — surprise your group</p>
        )}
      </div>

      <div className="quick-actions">
        <button type="button" className="btn-primary" onClick={generate}>
          {word ? "Another word" : "Generate word"}
        </button>
        {word && (
          <button type="button" className="btn-secondary" onClick={copyWord}>
            {copied ? "Copied!" : "Copy word"}
          </button>
        )}
      </div>

      <p className="quick-meta">
        {poolLeft} words left in this preview · {total}+ in a full game (zero
        repeats)
      </p>

      <button
        type="button"
        className="quick-host-link"
        onClick={() =>
          onHostGame({
            difficulty,
            category,
            timerSeconds: difficulty === "easy" ? 90 : 60,
          })
        }
      >
        Host full game with timer &amp; teams →
      </button>

      <style jsx>{`
        .quick-play {
          margin-bottom: 3rem;
          padding: 1.75rem;
          background: var(--bg-card);
          border-radius: calc(var(--radius) + 4px);
          border: 1px solid rgba(255, 137, 6, 0.2);
          box-shadow: 0 0 48px rgba(127, 90, 240, 0.12);
        }
        h2 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          margin-bottom: 0.35rem;
          text-align: center;
        }
        .quick-play-lead {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9375rem;
          margin-bottom: 1.25rem;
        }
        .quick-filters {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .pill {
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          background: var(--bg-elevated);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.15s, background 0.15s;
        }
        .pill.active {
          border-color: var(--accent);
          background: rgba(255, 137, 6, 0.15);
          color: var(--text);
        }
        .quick-stage {
          min-height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          margin-bottom: 1rem;
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius);
          transition: transform 0.2s ease;
        }
        .quick-stage.pop {
          transform: scale(1.02);
        }
        .quick-word {
          margin: 0;
        }
        .quick-placeholder {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--text-muted);
          text-align: center;
        }
        .quick-personality {
          margin-top: 0.75rem;
          color: var(--accent);
          font-size: 0.9375rem;
          text-align: center;
        }
        .quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .quick-meta {
          text-align: center;
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .quick-host-link {
          display: block;
          width: 100%;
          text-align: center;
          font-weight: 600;
          color: var(--accent);
          padding: 0.5rem;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .quick-host-link:hover {
          color: var(--text);
        }
      `}</style>
    </section>
  );
}
