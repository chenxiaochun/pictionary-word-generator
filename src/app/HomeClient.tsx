"use client";

import { LandingPage } from "@/components/landing/LandingPage";
import { GameApp } from "@/components/game/GameApp";
import { useGameStore } from "@/store/game-store";

export function HomeClient() {
  const phase = useGameStore((s) => s.session.phase);
  const inGame = phase !== "setup";

  return inGame ? <GameApp /> : <LandingPage />;
}
