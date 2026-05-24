import type { Word, WordCategory } from "@/types/game";
import { getAllWords, getCategoryLabel, CATEGORY_OPTIONS } from "@/lib/word-engine";

const CATEGORY_ORDER: WordCategory[] = [
  "animals",
  "food",
  "objects",
  "actions",
  "places",
  "abstract",
];

export interface WordListGroup {
  category: WordCategory;
  label: string;
  emoji: string;
  words: string[];
}

function groupWords(words: Word[]): WordListGroup[] {
  const byCategory = new Map<WordCategory, string[]>();

  for (const word of words) {
    const list = byCategory.get(word.category) ?? [];
    list.push(word.text);
    byCategory.set(word.category, list);
  }

  return CATEGORY_ORDER.filter((cat) => byCategory.has(cat)).map((category) => {
    const meta = CATEGORY_OPTIONS.find((c) => c.value === category);
    const wordList = byCategory.get(category) ?? [];
    wordList.sort((a, b) => a.localeCompare(b));
    return {
      category,
      label: getCategoryLabel(category),
      emoji: meta?.emoji ?? "",
      words: wordList,
    };
  });
}

/** All easy-difficulty words, grouped by category */
export function getEasyWordListGroups(): WordListGroup[] {
  const easy = getAllWords().filter((w) => w.difficulty === "easy");
  return groupWords(easy);
}

/** Kid-friendly: easy, drawable, no abstract category */
export function getKidFriendlyWordListGroups(): WordListGroup[] {
  const kidWords = getAllWords().filter(
    (w) =>
      w.difficulty === "easy" &&
      w.category !== "abstract" &&
      w.drawable >= 2
  );
  return groupWords(kidWords);
}

export function countWordsInGroups(groups: WordListGroup[]): number {
  return groups.reduce((sum, g) => sum + g.words.length, 0);
}
