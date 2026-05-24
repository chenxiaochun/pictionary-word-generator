"use client";

import { SeoLandingShell, SeoSection } from "@/components/landing/SeoLandingShell";
import { WordListSection } from "@/components/seo/WordListSection";
import {
  getEasyWordListGroups,
  countWordsInGroups,
} from "@/lib/word-lists";

const EASY_WORD_GROUPS = getEasyWordListGroups();
const EASY_WORD_COUNT = countWordsInGroups(EASY_WORD_GROUPS);

export function EasyPictionaryWordsPage() {
  return (
    <SeoLandingShell
      title="Easy Pictionary Words Generator – Free Online Tool"
      lead="Generate easy Pictionary words instantly. Simple, drawable prompts with a built-in timer — perfect for warm-ups, kids, and casual game nights."
      ctaLabel="Generate Easy Words"
      footerCtaLabel="Start Easy Mode Game"
      initialSettings={{
        difficulty: "easy",
        timerSeconds: 60,
      }}
    >
      <SeoSection title="What makes a good easy Pictionary word?">
        <ul>
          <li>Concrete nouns you can sketch in a few strokes</li>
          <li>Familiar objects — no obscure vocabulary</li>
          <li>Single words, not phrases (in Easy mode)</li>
          <li>Fun for mixed-age groups and first-time players</li>
        </ul>
      </SeoSection>

      <WordListSection
        title="Complete easy Pictionary word list"
        intro="Browse all easy words in our generator, grouped by category. Start a game to shuffle them with zero repeats per session."
        groups={EASY_WORD_GROUPS}
        totalCount={EASY_WORD_COUNT}
      />

      <SeoSection title="When to use Easy mode">
        <ol>
          <li>
            <strong>Game night warm-up</strong> — first 3 rounds on Easy before
            switching to Mixed.
          </li>
          <li>
            <strong>Mixed skill groups</strong> — let weaker drawers stay on Easy
            while others take Medium.
          </li>
          <li>
            <strong>Short timers</strong> — pair Easy words with 30–60 second
            rounds for fast-paced fun.
          </li>
        </ol>
      </SeoSection>

      <SeoSection title="FAQ">
        <details>
          <summary>How is Easy different from Mixed?</summary>
          <p>
            Easy pulls only simple, highly drawable words. Mixed blends easy,
            medium, and hard for balanced game nights.
          </p>
        </details>
        <details>
          <summary>Can I filter by category?</summary>
          <p>
            Yes. Choose Animals, Food, Actions, or any category in setup — great
            for themed rounds like &ldquo;only food words.&rdquo;
          </p>
        </details>
        <details>
          <summary>Do easy words repeat?</summary>
          <p>
            Not in one session. Our engine tracks every word used until you
            reshuffle or start a new game.
          </p>
        </details>
      </SeoSection>
    </SeoLandingShell>
  );
}
