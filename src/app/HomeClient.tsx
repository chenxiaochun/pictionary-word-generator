"use client";

import { Suspense } from "react";
import { LandingPage } from "@/components/landing/LandingPage";
import { GameApp } from "@/components/game/GameApp";
import { useGameStore } from "@/store/game-store";

export function HomeClient() {
  const phase = useGameStore((s) => s.session.phase);
  const inGame = phase !== "setup";

  if (inGame) return <GameApp />;

  return (
    <Suspense fallback={<div className="landing-loading">Loading…</div>}>
      <LandingPage />
    </Suspense>
  );
}
