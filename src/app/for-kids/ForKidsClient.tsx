"use client";

import { ForKidsPage } from "@/components/landing/ForKidsPage";
import { GameApp } from "@/components/game/GameApp";
import { useGameStore } from "@/store/game-store";

export function ForKidsClient() {
  const phase = useGameStore((s) => s.session.phase);
  const inGame = phase !== "setup";

  return inGame ? <GameApp /> : <ForKidsPage />;
}
