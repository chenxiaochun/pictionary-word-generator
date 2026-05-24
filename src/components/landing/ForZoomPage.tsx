"use client";

import { useState } from "react";
import Link from "next/link";
import { SetupModal } from "@/components/setup/SetupModal";

export function ForZoomPage() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <article className="page">
        <nav className="breadcrumb">
          <Link href="/">← Pictionary Word Generator</Link>
        </nav>

        <header>
          <h1>Pictionary Word Generator for Zoom</h1>
          <p className="lead">
            Host virtual Pictionary on Zoom, Google Meet, or Discord — free word
            generator with built-in timer, peek-proof reveal, and zero repeats.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowSetup(true)}
          >
            Start Zoom Game Night
          </button>
        </header>

        <section>
          <h2>How to Play Pictionary on Zoom</h2>
          <ol>
            <li>
              <strong>Share your screen</strong> — Open this tool and click
              Theater Mode (⛶) so everyone sees the timer.
            </li>
            <li>
              <strong>Hold to reveal</strong> — Only the drawer sees the word
              on their phone, or share screen briefly to the drawer only.
            </li>
            <li>
              <strong>Draw on a virtual whiteboard</strong> — Use Zoom
              whiteboard, Excalidraw, or Jamboard while the timer runs.
            </li>
            <li>
              <strong>Score with one tap</strong> — Hit &ldquo;Got it! +1&rdquo;
              when the team guesses correctly.
            </li>
          </ol>
        </section>

        <section>
          <h2>Why this beats a plain word list on Zoom</h2>
          <ul>
            <li>Auto 30 / 60 / 90 second timer — no separate countdown app</li>
            <li>Words never repeat during one game night</li>
            <li>Peek-proof hold-to-reveal keeps the game fair remotely</li>
            <li>Works on phone, tablet, and shared screen</li>
          </ul>
        </section>

        <section className="faq">
          <h2>FAQ</h2>
          <details>
            <summary>Do I need to download anything for Zoom Pictionary?</summary>
            <p>
              No. This runs in your browser. Share the screen or pass the host
              phone to the drawer each round.
            </p>
          </details>
          <details>
            <summary>What whiteboard works best with Zoom?</summary>
            <p>
              Zoom built-in whiteboard, Excalidraw, or Whiteboard.fi all work
              well. Keep the word generator on a second device if you are
              screen-sharing the board.
            </p>
          </details>
          <details>
            <summary>How many players work on Zoom?</summary>
            <p>
              4–12 players in two teams is ideal. Larger groups can use
              breakout rooms with one host per room.
            </p>
          </details>
        </section>

        <footer>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowSetup(true)}
          >
            Start a Free Zoom Game
          </button>
        </footer>
      </article>

      {showSetup && (
        <SetupModal
          onClose={() => setShowSetup(false)}
          onComplete={() => setShowSetup(false)}
        />
      )}

      <style jsx>{`
        .page {
          max-width: 680px;
          margin: 0 auto;
          padding: 2rem 1.25rem 4rem;
        }
        .breadcrumb {
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
        .breadcrumb a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .breadcrumb a:hover {
          color: var(--accent);
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .lead {
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }
        section {
          margin-top: 2.5rem;
        }
        h2 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        ol,
        ul {
          color: var(--text-muted);
          line-height: 1.75;
          padding-left: 1.25rem;
        }
        ol strong,
        ul li {
          color: var(--text);
        }
        .faq details {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .faq summary {
          font-weight: 600;
          cursor: pointer;
        }
        .faq p {
          margin-top: 0.75rem;
          color: var(--text-muted);
          font-size: 0.9375rem;
        }
        footer {
          margin-top: 3rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
