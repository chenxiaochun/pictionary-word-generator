"use client";

interface TimerDisplayProps {
  label: string;
  remainingMs: number | null;
  totalSeconds: number;
  running: boolean;
  theater?: boolean;
}

export function TimerDisplay({
  label,
  remainingMs,
  totalSeconds,
  running,
  theater = false,
}: TimerDisplayProps) {
  const totalMs = totalSeconds * 1000;
  const pct =
    remainingMs != null && running ? (remainingMs / totalMs) * 100 : 0;

  let color = "var(--timer-green)";
  const sec = remainingMs != null && running ? remainingMs / 1000 : null;
  const urgent = sec != null && sec <= 15;

  if (sec != null && running) {
    if (sec <= 15) color = "var(--timer-red)";
    else if (sec <= 30) color = "var(--timer-yellow)";
  }

  const size = theater ? 220 : 140;
  const dash = (pct / 100) * 327;

  return (
    <div
      className={`timer-wrap ${theater ? "theater" : ""} ${urgent ? "urgent" : ""}`}
    >
      <svg viewBox="0 0 120 120" className="ring" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} 327`}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dasharray 0.2s linear, stroke 0.3s" }}
        />
      </svg>
      <span className="label" style={{ color: running ? color : undefined }}>
        {running ? label : "—:——"}
      </span>
      {!running && !theater && (
        <span className="hint">Reveal the word to start</span>
      )}
      <style jsx>{`
        .timer-wrap {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          margin: 0 auto 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .timer-wrap.theater {
          margin-bottom: 0.5rem;
        }
        .timer-wrap.urgent .label {
          animation: timer-pulse 0.8s ease-in-out infinite;
        }
        .timer-wrap.urgent .ring :global(circle:last-child) {
          animation: timer-pulse 0.8s ease-in-out infinite;
        }
        .ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .label {
          font-family: var(--font-display);
          font-size: ${theater ? "3rem" : "2rem"};
          font-weight: 800;
          z-index: 1;
        }
        .hint {
          position: absolute;
          bottom: -1.25rem;
          font-size: 0.6875rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        @keyframes timer-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
