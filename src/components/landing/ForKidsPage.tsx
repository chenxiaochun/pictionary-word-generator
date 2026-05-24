"use client";

import { SeoLandingShell, SeoSection } from "@/components/landing/SeoLandingShell";
import { WordListSection } from "@/components/seo/WordListSection";
import {
  getKidFriendlyWordListGroups,
  countWordsInGroups,
} from "@/lib/word-lists";

const KID_WORD_GROUPS = getKidFriendlyWordListGroups();
const KID_WORD_COUNT = countWordsInGroups(KID_WORD_GROUPS);

export function ForKidsPage() {
  return (
    <SeoLandingShell
      title="Pictionary Words for Kids – Free Generator"
      lead="Kid-friendly Pictionary word generator with easy words, longer timers, and peek-proof reveal. Perfect for family game night, classrooms, and ages 5–12."
      ctaLabel="Start Kids Game"
      footerCtaLabel="Play Free with Kids"
      initialSettings={{
        difficulty: "easy",
        timerSeconds: 90,
        winScore: 5,
        category: "animals",
      }}
    >
      <SeoSection title="Why parents and teachers use this">
        <ul>
          <li>Easy words only — cat, pizza, beach, not abstract concepts</li>
          <li>90-second timer default so little artists have time to draw</li>
          <li>Pick Animals, Food, or Objects categories for familiar prompts</li>
          <li>No repeats in one game — fresh words every round</li>
        </ul>
      </SeoSection>

      <SeoSection title="How to play with kids">
        <ol>
          <li>
            <strong>Keep teams small</strong> — 2 vs 2 works great for ages 5–8.
          </li>
          <li>
            <strong>Use Easy difficulty</strong> — concrete nouns kids recognize
            instantly.
          </li>
          <li>
            <strong>Let the host hold to reveal</strong> — only the drawer peeks
            at the word.
          </li>
          <li>
            <strong>Celebrate every guess</strong> — tap Got it! and keep energy
            high.
          </li>
        </ol>
      </SeoSection>

      <WordListSection
        title="Full kid-friendly Pictionary word list"
        intro="Every word below is Easy difficulty, highly drawable, and safe for children. Use category filters in setup to focus on Animals, Food, or Objects."
        groups={KID_WORD_GROUPS}
        totalCount={KID_WORD_COUNT}
      />

      <SeoSection title="FAQ">
        <details>
          <summary>What age is this Pictionary generator for?</summary>
          <p>
            Best for ages 5–12 with Easy mode. Younger kids may need an adult
            to read the word aloud after peeking.
          </p>
        </details>
        <details>
          <summary>Can I use this in a classroom?</summary>
          <p>
            Yes. Project Theater Mode on a screen, use 90-second rounds, and
            lock categories to Animals or Food for vocabulary practice.
          </p>
        </details>
        <details>
          <summary>Are the words safe for children?</summary>
          <p>
            Easy mode uses kid-friendly concrete nouns and simple actions — no
            adult-themed prompts.
          </p>
        </details>
      </SeoSection>
    </SeoLandingShell>
  );
}
