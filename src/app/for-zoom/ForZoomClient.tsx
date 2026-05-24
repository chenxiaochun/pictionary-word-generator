"use client";

import { ForZoomPage } from "@/components/landing/ForZoomPage";
import { GameApp } from "@/components/game/GameApp";
import { useGameStore } from "@/store/game-store";

export function ForZoomClient() {
  const phase = useGameStore((s) => s.session.phase);
  const inGame = phase !== "setup";

  return inGame ? <GameApp /> : <ForZoomPage />;
}
