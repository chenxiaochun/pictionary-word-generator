"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import {
  hasSeenSoundPrompt,
  markSoundPromptSeen,
  playBuzzer,
} from "@/lib/sounds";

/** Ask once after first TIME'S UP if sounds are off */
export function SoundPrompt() {
  const phase = useGameStore((s) => s.session.phase);
  const soundEnabled = useGameStore((s) => s.session.settings.soundEnabled);
  const dispatch = useGameStore((s) => s.dispatch);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      phase === "round_end_timeout" &&
      !soundEnabled &&
      !hasSeenSoundPrompt()
    ) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [phase, soundEnabled]);

  if (!visible) return null;

  const dismiss = () => {
    markSoundPromptSeen();
    setVisible(false);
  };

  const enable = async () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      settings: { soundEnabled: true },
    });
    await playBuzzer();
    dismiss();
  };

  return (
    <div className="sound-prompt" role="dialog" aria-labelledby="sound-prompt-title">
      <p id="sound-prompt-title">Enable sound effects?</p>
      <p className="sub">Buzzer, cheers &amp; timer ticks for the full party vibe.</p>
      <div className="actions">
        <button type="button" className="btn-primary" onClick={enable}>
          Enable sounds
        </button>
        <button type="button" className="btn-secondary" onClick={dismiss}>
          Not now
        </button>
      </div>
      <style jsx>{`
        .sound-prompt {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          background: var(--bg-card);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 1.25rem;
          width: min(360px, calc(100vw - 2rem));
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        .sound-prompt p {
          font-weight: 600;
          margin-bottom: 0.35rem;
        }
        .sub {
          font-weight: 400 !important;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem !important;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .actions .btn-primary,
        .actions .btn-secondary {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
