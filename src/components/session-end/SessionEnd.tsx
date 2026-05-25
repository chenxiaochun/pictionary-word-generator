"use client";

import { useState } from "react";
import { useGameStore } from "@/store/game-store";
import { getWinner } from "@/lib/game-state-machine";
import {
  buildInviteShareText,
  buildResultShareText,
  shareText,
} from "@/lib/share";
import { buildPlayUrl } from "@/lib/game-url";

export function SessionEnd() {
  const session = useGameStore((s) => s.session);
  const dispatch = useGameStore((s) => s.dispatch);
  const winner = getWinner(session);
  const [a, b] = session.teams;
  const isTie = !winner;
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const shareResult = async () => {
    const text = buildResultShareText(session);
    const result = await shareText({
      title: "Pictionary Host — game result",
      text,
      url: typeof window !== "undefined" ? window.location.origin : undefined,
    });
    if (result === "shared") showFeedback("Thanks for sharing!");
    else if (result === "copied") showFeedback("Result copied — paste in your group chat");
    else showFeedback("Could not share — try again");
  };

  const inviteFriends = async () => {
    const text = buildInviteShareText(session.settings);
    const result = await shareText({
      title: "Join our Pictionary game",
      text,
      url: buildPlayUrl(session.settings),
    });
    if (result === "shared") showFeedback("Invite sent!");
    else if (result === "copied") showFeedback("Invite link copied!");
    else showFeedback("Could not copy — try again");
  };

  return (
    <div className="session-end">
      <p className="eyebrow">Game over</p>
      <h1>{isTie ? "It's a tie!" : `🏆 ${winner!.name} Wins!`}</h1>
      <p className="score">
        {a.emoji} {a.score} — {b.score} {b.emoji}
      </p>
      <ul className="stats">
        <li>{session.rounds.length} rounds</li>
        <li>{session.usedWordIds.length} words</li>
        <li>0 repeats</li>
      </ul>
      {session.hardestWord && (
        <p className="hardest">
          Hardest word tonight: &ldquo;{session.hardestWord.text}&rdquo;
        </p>
      )}
      <p className="share-hint">
        Bragging rights unlocked. Send the score or invite the next crew.
      </p>
      {feedback && <p className="feedback" role="status">{feedback}</p>}
      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => dispatch({ type: "PLAY_AGAIN" })}
        >
          Play again (same teams &amp; rules)
        </button>
        <button type="button" className="btn-secondary" onClick={shareResult}>
          Share result 🎉
        </button>
        <button type="button" className="btn-secondary" onClick={inviteFriends}>
          Invite friends to play →
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
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.5rem;
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
          margin-bottom: 1rem;
          max-width: 320px;
        }
        .share-hint {
          color: var(--text-muted);
          font-size: 0.9375rem;
          margin-bottom: 1rem;
          max-width: 300px;
        }
        .feedback {
          color: var(--team-b);
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 300px;
        }
      `}</style>
    </div>
  );
}
