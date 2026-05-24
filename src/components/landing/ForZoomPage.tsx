"use client";

import { useState } from "react";
import Link from "next/link";
import { SetupModal } from "@/components/setup/SetupModal";

export function ForZoomPage() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <article className="seo-page">
        <nav className="seo-breadcrumb">
          <Link href="/">← Pictionary Word Generator</Link>
        </nav>

        <header>
          <h1>Pictionary Word Generator for Zoom</h1>
          <p className="seo-lead">
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

        <section className="seo-faq">
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

        <footer className="seo-footer">
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
    </>
  );
}
