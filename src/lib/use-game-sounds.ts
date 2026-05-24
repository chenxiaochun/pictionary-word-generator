"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/game-store";
import {
  playRevealDing,
  playBuzzer,
  playCheer,
  playTick,
} from "@/lib/sounds";

/** Play sfx when game events fire */
export function useGameSounds() {
  const phase = useGameStore((s) => s.session.phase);
  const soundEnabled = useGameStore((s) => s.session.settings.soundEnabled);
  const timerRemainingMs = useGameStore((s) => s.session.timerRemainingMs);
  const prevPhase = useRef(phase);
  const prevTimerSec = useRef<number | null>(null);
  const tickedUnder15 = useRef(false);

  useEffect(() => {
    if (!soundEnabled) return;

    const prev = prevPhase.current;

    if (phase === "timer_running" && prev === "revealing") {
      playRevealDing();
    }

    if (phase === "round_end_correct" && prev !== "round_end_correct") {
      playCheer();
    }

    if (phase === "round_end_timeout" && prev !== "round_end_timeout") {
      playBuzzer();
    }

    prevPhase.current = phase;
  }, [phase, soundEnabled]);

  useEffect(() => {
    if (!soundEnabled || phase !== "timer_running" || timerRemainingMs == null) {
      if (phase !== "timer_running") {
        tickedUnder15.current = false;
        prevTimerSec.current = null;
      }
      return;
    }

    const sec = Math.ceil(timerRemainingMs / 1000);

    if (sec <= 15 && !tickedUnder15.current) {
      tickedUnder15.current = true;
    }

    if (sec <= 15 && sec !== prevTimerSec.current) {
      playTick();
    }

    prevTimerSec.current = sec;
  }, [timerRemainingMs, phase, soundEnabled]);
}
