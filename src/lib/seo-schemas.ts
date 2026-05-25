import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

type FaqItem = { question: string; answer: string };

function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function howToSchema(name: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

const HOME_FAQ: FaqItem[] = [
  {
    question: "What is a Pictionary word generator?",
    answer:
      "A tool that picks random words for drawing games. Ours is a full game host with timer, teams, and peek-proof word reveal.",
  },
  {
    question: "Does this have a built-in timer?",
    answer:
      "Yes. Choose 30, 60, or 90 seconds. The timer starts when the word is revealed.",
  },
  {
    question: "Can I use this on Zoom?",
    answer:
      "Yes. Use Theater Mode to share your screen, or hold your phone so only the drawer sees the word.",
  },
  {
    question: "Is this good for kids?",
    answer:
      "Yes. Use Easy mode for kid-friendly words and a longer timer on our dedicated kids page.",
  },
  {
    question: "Where can I get easy words only?",
    answer:
      "Use Easy difficulty in setup or visit our easy Pictionary words page for a full list of simple prompts.",
  },
  {
    question: "Will words repeat?",
    answer:
      "No. Our session engine tracks every word. Zero repeats until you start a new game.",
  },
];

export const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pictionary Word Generator with Timer",
    url: SITE_URL,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free Pictionary word generator with built-in timer, peek-proof hold-to-reveal, team scoring, and session deduplication.",
  },
  faqPageSchema(HOME_FAQ),
];

export const forZoomSchemas = [
  howToSchema("How to Play Pictionary on Zoom", [
    "Share your screen and open Theater Mode so everyone sees the timer.",
    "Hold to reveal so only the drawer sees the word on their phone.",
    "Draw on a virtual whiteboard such as Zoom whiteboard or Excalidraw while the timer runs.",
    "Tap Got it when the team guesses correctly to score.",
  ]),
  faqPageSchema([
    {
      question: "Do I need to download anything for Zoom Pictionary?",
      answer:
        "No. This runs in your browser. Share the screen or pass the host phone to the drawer each round.",
    },
    {
      question: "What whiteboard works best with Zoom?",
      answer:
        "Zoom built-in whiteboard, Excalidraw, or Whiteboard.fi all work well. Keep the word generator on a second device if you are screen-sharing the board.",
    },
    {
      question: "How many players work on Zoom?",
      answer:
        "4–12 players in two teams is ideal. Larger groups can use breakout rooms with one host per room.",
    },
  ]),
];

export const forKidsSchemas = [
  faqPageSchema([
    {
      question: "What age is this Pictionary generator for?",
      answer:
        "Best for ages 5–12 with Easy mode. Younger kids may need an adult to read the word aloud after peeking.",
    },
    {
      question: "Can I use this in a classroom?",
      answer:
        "Yes. Project Theater Mode on a screen, use 90-second rounds, and lock categories to Animals or Food for vocabulary practice.",
    },
    {
      question: "Are the words safe for children?",
      answer:
        "Easy mode uses kid-friendly concrete nouns and simple actions — no adult-themed prompts.",
    },
  ]),
];

export const easyWordsSchemas = [
  faqPageSchema([
    {
      question: "How is Easy different from Mixed?",
      answer:
        "Easy pulls only simple, highly drawable words. Mixed blends easy, medium, and hard for balanced game nights.",
    },
    {
      question: "Can I filter by category?",
      answer:
        "Yes. Choose Animals, Food, Actions, or any category in setup — great for themed rounds like only food words.",
    },
    {
      question: "Do easy words repeat?",
      answer:
        "Not in one session. Our engine tracks every word used until you reshuffle or start a new game.",
    },
  ]),
];
