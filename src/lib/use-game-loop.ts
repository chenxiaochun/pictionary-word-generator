"use client";

import { useEffect, useRef, useCallback } from "react";
import { useGameStore } from "@/store/game-store";
import {
  shouldCompleteReveal,
  formatTimer,
  getActiveTeam,
} from "@/lib/game-state-machine";
import { REVEAL_HOLD_MS } from "@/types/game";
import { randomPersonalityLine } from "@/lib/word-engine";

/** Drives timer ticks + reveal hold completion */
export function useGameLoop() {
  const session = useGameStore((s) => s.session);
  const dispatch = useGameStore((s) => s.dispatch);
  const revealStartedAt = useGameStore((s) => s.revealStartedAt);
  const setRevealStartedAt = useGameStore((s) => s.setRevealStartedAt);
  const setPersonalityLine = useGameStore((s) => s.setPersonalityLine);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Round timer tick
  useEffect(() => {
    if (session.phase !== "timer_running") return;

    const id = setInterval(() => {
      dispatch({ type: "TICK", now: Date.now() });
    }, 200);

    return () => clearInterval(id);
  }, [session.phase, dispatch]);

  // Reveal hold progress
  useEffect(() => {
    if (session.phase !== "revealing" || revealStartedAt == null) return;

    const check = () => {
      if (shouldCompleteReveal(revealStartedAt, Date.now())) {
        dispatch({ type: "REVEAL_COMPLETE" });
        setRevealStartedAt(null);
        if (session.currentWord) {
          setTimeout(() => {
            setPersonalityLine(
              randomPersonalityLine(session.currentWord!.difficulty)
            );
          }, 500);
        }
      }
    };

    const id = setInterval(check, 50);
    return () => clearInterval(id);
  }, [
    session.phase,
    session.currentWord,
    revealStartedAt,
    dispatch,
    setRevealStartedAt,
    setPersonalityLine,
  ]);

  // Auto-advance after round-end overlays
  useEffect(() => {
    const phase = session.phase;
    if (
      phase !== "round_end_correct" &&
      phase !== "round_end_skip" &&
      phase !== "round_end_timeout"
    ) {
      return;
    }

    const delay =
      phase === "round_end_correct"
        ? 1500
        : phase === "round_end_skip"
          ? 800
          : 1200;

    const id = setTimeout(() => {
      dispatch({ type: "ROUND_END_ANIMATION_DONE" });
      setPersonalityLine(null);
    }, delay);

    return () => clearTimeout(id);
  }, [session.phase, dispatch, setPersonalityLine]);

  const onRevealStart = useCallback(() => {
    if (session.phase !== "idle") return;
    dispatch({ type: "BEGIN_REVEAL" });
    setRevealStartedAt(Date.now());
    if (session.settings.hapticEnabled && typeof navigator !== "undefined") {
      navigator.vibrate?.(30);
    }
  }, [session.phase, session.settings.hapticEnabled, dispatch, setRevealStartedAt]);

  const onRevealEnd = useCallback(() => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    if (session.phase === "timer_running") {
      dispatch({ type: "END_REVEAL" });
    }
  }, [session.phase, dispatch]);

  return {
    onRevealStart,
    onRevealEnd,
    timerLabel: formatTimer(session.timerRemainingMs),
    activeTeam: getActiveTeam(session),
    revealHoldMs: REVEAL_HOLD_MS,
  };
}

/** Request screen wake lock during active game */
export function useWakeLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof navigator === "undefined") return;

    let lock: WakeLockSentinel | null = null;

    (async () => {
      try {
        if ("wakeLock" in navigator) {
          lock = await navigator.wakeLock.request("screen");
        }
      } catch {
        // silently ignore
      }
    })();

    return () => {
      lock?.release().catch(() => {});
    };
  }, [enabled]);
}
