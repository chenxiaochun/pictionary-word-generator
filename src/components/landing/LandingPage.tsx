"use client";

import { useState } from "react";
import { useGameStore } from "@/store/game-store";
import { SetupModal } from "@/components/setup/SetupModal";

export function LandingPage() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <article className="landing">
        <header className="landing-hero">
          <h1>Pictionary Word Generator with Timer</h1>
          <p className="subtitle">
            Host the perfect drawing game. Peek-proof words, auto timer, zero
            repeats — free, no signup.
          </p>
          <div className="cta-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowSetup(true)}
            >
              Start a Game
            </button>
            <a href="#how-to-play" className="btn-secondary">
              How to Play
            </a>
          </div>
          <p className="trust">Free forever · Works on phone &amp; TV · 500+ words</p>
        </header>

        <section className="value-props" aria-label="Features">
          {[
            {
              title: "Hold to Reveal",
              body: "Only the host sees the word. No peeking, no cheating.",
            },
            {
              title: "Auto Timer",
              body: "Timer starts when the word appears. Buzzer when time's up.",
            },
            {
              title: "Never Repeats",
              body: "Every word is fresh for the whole game night.",
            },
          ].map((card) => (
            <div key={card.title} className="value-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </section>

        <section className="guides" aria-labelledby="guides-heading">
          <h2 id="guides-heading">Guides &amp; Game Modes</h2>
          <div className="guide-grid">
            <a href="/for-zoom" className="guide-card">
              <span className="guide-emoji">📹</span>
              <h3>Pictionary for Zoom</h3>
              <p>
                Screen-share Theater Mode, virtual whiteboard tips, and remote
                team setup.
              </p>
            </a>
            <a href="/for-kids" className="guide-card">
              <span className="guide-emoji">🧒</span>
              <h3>Words for Kids</h3>
              <p>
                Kid-safe easy words, 90-second rounds, and classroom-friendly
                categories.
              </p>
            </a>
            <a href="/easy-pictionary-words" className="guide-card">
              <span className="guide-emoji">✏️</span>
              <h3>Easy Word List</h3>
              <p>
                Browse 150+ simple, drawable prompts — great for warm-ups and
                beginners.
              </p>
            </a>
          </div>
        </section>

        <section className="hosting-tips">
          <h2>How to Host a Pictionary Game Night</h2>
          <p>
            Pictionary works best when one person acts as the <strong>host</strong>{" "}
            and everyone else splits into two teams. The host runs this generator,
            holds to reveal each word to the drawer, and keeps the timer fair. You
            do not need the official board game — paper, a whiteboard, or a tablet
            drawing app is enough.
          </p>
          <p>
            For mixed skill groups, start with{" "}
            <a href="/easy-pictionary-words">Easy mode</a> for the first few
            rounds, then switch to Mixed. Playing remotely? Open our{" "}
            <a href="/for-zoom">Zoom guide</a> and share Theater Mode so the whole
            group sees the countdown. With kids, use the{" "}
            <a href="/for-kids">kids word list</a> and a 90-second timer so
            younger artists have time to finish their drawing.
          </p>
          <p>
            Pick a category — Animals, Food, or Actions — for themed rounds at
            parties. Our session engine ensures no word repeats until you start a
            fresh game, so marathon game nights stay fun without repeats.
          </p>
        </section>

        <section id="how-to-play" className="how-to">
          <h2>How to Play</h2>
          <ol>
            <li>
              <strong>Set up teams</strong> — Name your teams, pick difficulty
              and timer. Takes 10 seconds.
            </li>
            <li>
              <strong>Hold to reveal</strong> — The host holds to show the word
              to the drawer, then hides it.
            </li>
            <li>
              <strong>Draw &amp; score</strong> — Draw, guess, score. We handle
              turns and track the winner.
            </li>
          </ol>
        </section>

        <section className="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">FAQ</h2>
          <details>
            <summary>What is a Pictionary word generator?</summary>
            <p>
              A tool that picks random words for drawing games. Ours is a full
              game host with timer, teams, and peek-proof word reveal.
            </p>
          </details>
          <details>
            <summary>Does this have a built-in timer?</summary>
            <p>
              Yes. Choose 30, 60, or 90 seconds. The timer starts when the word
              is revealed.
            </p>
          </details>
          <details>
            <summary>Can I use this on Zoom?</summary>
            <p>
              Yes. Use Theater Mode to share your screen, or hold your phone so
              only the drawer sees the word. See our{" "}
              <a href="/for-zoom">Pictionary for Zoom guide</a>.
            </p>
          </details>
          <details>
            <summary>Is this good for kids?</summary>
            <p>
              Yes. Use Easy mode and our{" "}
              <a href="/for-kids">Pictionary for kids page</a> for kid-friendly
              words and a longer timer.
            </p>
          </details>
          <details>
            <summary>Where can I get easy words only?</summary>
            <p>
              Try our{" "}
              <a href="/easy-pictionary-words">easy Pictionary words generator</a>{" "}
              — simple, drawable prompts with no repeats per session.
            </p>
          </details>
          <details>
            <summary>Will words repeat?</summary>
            <p>
              No. Our session engine tracks every word. Zero repeats until you
              start a new game.
            </p>
          </details>
        </section>

        <footer className="landing-footer">
          <h2>Ready to host?</h2>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowSetup(true)}
          >
            Start a Game — It&apos;s Free
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
        .landing {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.25rem 4rem;
        }
        .landing-hero {
          text-align: center;
          padding: 2rem 0 3rem;
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1rem;
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .trust {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .value-props {
          display: grid;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .value-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          padding: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .value-card h3 {
          font-family: var(--font-display);
          margin-bottom: 0.5rem;
        }
        .value-card p {
          color: var(--text-muted);
          font-size: 0.9375rem;
        }
        .guides,
        .hosting-tips {
          margin-bottom: 3rem;
        }
        .guides h2,
        .hosting-tips h2 {
          font-family: var(--font-display);
          margin-bottom: 1rem;
        }
        .guide-grid {
          display: grid;
          gap: 1rem;
        }
        .guide-card {
          display: block;
          background: var(--bg-card);
          border-radius: var(--radius);
          padding: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s;
        }
        .guide-card:hover {
          border-color: var(--accent);
        }
        .guide-emoji {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .guide-card h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          margin-bottom: 0.35rem;
        }
        .guide-card p {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .hosting-tips p {
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 1rem;
          font-size: 0.9375rem;
        }
        .hosting-tips strong,
        .hosting-tips a {
          color: var(--text);
        }
        .hosting-tips a {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .hosting-tips a:hover {
          color: var(--accent);
        }
        .how-to,
        .faq {
          margin-bottom: 3rem;
        }
        .how-to h2,
        .faq h2 {
          font-family: var(--font-display);
          margin-bottom: 1rem;
        }
        .how-to ol {
          padding-left: 1.25rem;
          color: var(--text-muted);
          line-height: 1.8;
        }
        .how-to strong {
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
        .landing-footer {
          text-align: center;
          padding: 2rem 0;
        }
        .landing-footer h2 {
          font-family: var(--font-display);
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .value-props {
            grid-template-columns: repeat(3, 1fr);
          }
          .guide-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </>
  );
}
