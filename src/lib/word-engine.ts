import type {
  Word,
  WordBank,
  WordDifficulty,
  WordFilter,
  DifficultyPreset,
} from "@/types/game";
import {
  PERSONALITY_LINES,
  CELEBRATION_LINES,
} from "@/types/game";
import wordBankData from "../../data/words.json";

const bank = wordBankData as WordBank;

export function getAllWords(): Word[] {
  return bank.words;
}

export function getWordBankMeta() {
  return { version: bank.version, total: bank.total };
}

function difficultyMatches(
  wordDifficulty: WordDifficulty,
  preset: DifficultyPreset
): boolean {
  if (preset === "mixed") return true;
  return wordDifficulty === preset;
}

export function filterWords(filter: WordFilter): Word[] {
  return bank.words.filter((w) => {
    if (filter.excludeIds.has(w.id)) return false;
    if (filter.category !== "all" && w.category !== filter.category) return false;
    if (!difficultyMatches(w.difficulty, filter.difficulty)) return false;
    return true;
  });
}

export function pickRandomWord(filter: WordFilter): Word | null {
  const pool = filterWords(filter);
  if (pool.length === 0) return null;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? null;
}

export function countAvailableWords(filter: WordFilter): number {
  return filterWords(filter).length;
}

/** For session recap — lower drawable = harder */
export function isHarderWord(a: Word, b: Word): boolean {
  if (a.drawable !== b.drawable) return a.drawable < b.drawable;
  return a.difficulty === "hard" && b.difficulty !== "hard";
}

export function getCategoryLabel(category: Word["category"] | "all"): string {
  const labels: Record<Word["category"] | "all", string> = {
    all: "All",
    animals: "Animals",
    food: "Food",
    actions: "Actions",
    objects: "Objects",
    places: "Places",
    abstract: "Abstract",
  };
  return labels[category];
}

export function getDifficultyLabel(preset: DifficultyPreset): string {
  return preset.charAt(0).toUpperCase() + preset.slice(1);
}

export function randomPersonalityLine(difficulty: WordDifficulty): string {
  const lines = PERSONALITY_LINES[difficulty];
  return lines[Math.floor(Math.random() * lines.length)] ?? "";
}

export function randomCelebrationLine(teamName: string): string {
  const line =
    CELEBRATION_LINES[Math.floor(Math.random() * CELEBRATION_LINES.length)] ??
    "Nice!";
  if (line.includes("{team}")) return line.replace("{team}", teamName);
  return line;
}
