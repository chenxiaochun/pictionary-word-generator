"use client";

import { EasyPictionaryWordsPage } from "@/components/landing/EasyPictionaryWordsPage";
import { GameApp } from "@/components/game/GameApp";
import { useGameStore } from "@/store/game-store";

export function EasyClient() {
  const phase = useGameStore((s) => s.session.phase);
  const inGame = phase !== "setup";

  return inGame ? <GameApp /> : <EasyPictionaryWordsPage />;
}
