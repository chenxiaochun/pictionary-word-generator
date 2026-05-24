"use client";

import { useGameStore } from "@/store/game-store";
import { useGameLoop, useWakeLock } from "@/lib/use-game-loop";
import { GameHost } from "@/components/game/GameHost";
import { SessionEnd } from "@/components/session-end/SessionEnd";
import { WordBankExhausted } from "@/components/game/WordBankExhausted";

export function GameApp() {
  const phase = useGameStore((s) => s.session.phase);
  const inActiveGame = !["game_over", "word_bank_exhausted"].includes(phase);

  useWakeLock(inActiveGame);

  if (phase === "game_over") {
    return <SessionEnd />;
  }

  if (phase === "word_bank_exhausted") {
    return <WordBankExhausted />;
  }

  return <GameHost />;
}
