import type { DifficultyPreset, GameSettings, TimerSeconds, WordCategory } from "@/types/game";
import { DEFAULT_SETTINGS } from "@/types/game";
import { absoluteUrl } from "@/lib/site";

const DIFFICULTIES: DifficultyPreset[] = ["easy", "mixed", "hard"];
const TIMERS: TimerSeconds[] = [30, 60, 90];
const CATEGORIES: (WordCategory | "all")[] = [
  "all",
  "animals",
  "food",
  "actions",
  "objects",
  "places",
  "abstract",
];

export function settingsFromSearchParams(
  params: URLSearchParams
): Partial<GameSettings> {
  const next: Partial<GameSettings> = {};
  const d = params.get("d") ?? params.get("difficulty");
  if (d && DIFFICULTIES.includes(d as DifficultyPreset)) {
    next.difficulty = d as DifficultyPreset;
  }
  const t = params.get("t") ?? params.get("timer");
  if (t) {
    const n = Number(t) as TimerSeconds;
    if (TIMERS.includes(n)) next.timerSeconds = n;
  }
  const c = params.get("c") ?? params.get("category");
  if (c && CATEGORIES.includes(c as WordCategory | "all")) {
    next.category = c as WordCategory | "all";
  }
  return next;
}

export function buildPlayUrl(settings: Partial<GameSettings> = {}): string {
  const merged = { ...DEFAULT_SETTINGS, ...settings };
  const params = new URLSearchParams();
  params.set("d", merged.difficulty);
  params.set("t", String(merged.timerSeconds));
  params.set("c", merged.category);
  return absoluteUrl(`/?${params.toString()}`);
}
