"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameAction, GameSession, Team, GameSettings } from "@/types/game";
import {
  createInitialSession,
  gameReducer,
} from "@/lib/game-state-machine";

interface GameStore {
  session: GameSession;
  dispatch: (action: GameAction) => void;
  /** UI-only: when user started holding reveal */
  revealStartedAt: number | null;
  setRevealStartedAt: (ts: number | null) => void;
  /** UI-only: personality line for current word */
  personalityLine: string | null;
  setPersonalityLine: (line: string | null) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      session: createInitialSession(),
      revealStartedAt: null,
      personalityLine: null,

      setRevealStartedAt: (ts) => set({ revealStartedAt: ts }),
      setPersonalityLine: (line) => set({ personalityLine: line }),

      dispatch: (action) => {
        set((state) => ({
          session: gameReducer(state.session, action),
        }));
      },
    }),
    {
      name: "pictionary-word-generator-session",
      partialize: (state) => ({ session: state.session }),
    }
  )
);

/** Convenience selectors */
export function useGamePhase() {
  return useGameStore((s) => s.session.phase);
}

export function useTeams(): [Team, Team] {
  return useGameStore((s) => s.session.teams);
}

export function useSettings(): GameSettings {
  return useGameStore((s) => s.session.settings);
}
