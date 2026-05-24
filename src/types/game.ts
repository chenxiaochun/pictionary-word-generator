/** Word bank entry — see data/words.json */
export type WordCategory =
  | "animals"
  | "food"
  | "actions"
  | "objects"
  | "places"
  | "abstract";

export type WordDifficulty = "easy" | "medium" | "hard";

export type WordTag = "phrase" | "holiday" | "funny";

export interface Word {
  id: string;
  text: string;
  category: WordCategory;
  difficulty: WordDifficulty;
  /** 1 = abstract/hard to draw, 3 = very drawable */
  drawable: 1 | 2 | 3;
  tags?: WordTag[];
}

export interface WordBank {
  version: number;
  total: number;
  words: Word[];
}

/** Setup presets shown in Quick Setup modal */
export type DifficultyPreset = "easy" | "mixed" | "hard";

export type TimerSeconds = 30 | 60 | 90;

export type WinScore = 5 | 10 | 15;

export interface Team {
  id: "A" | "B";
  name: string;
  emoji: string;
  score: number;
}

export interface GameSettings {
  difficulty: DifficultyPreset;
  category: WordCategory | "all";
  timerSeconds: TimerSeconds;
  winScore: WinScore;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

/** Host screen state machine */
export type GamePhase =
  | "setup"
  | "idle"
  | "revealing"
  | "word_shown"
  | "timer_running"
  | "round_end_correct"
  | "round_end_skip"
  | "round_end_timeout"
  | "game_over"
  | "word_bank_exhausted";

export type RoundEndReason = "correct" | "skip" | "timeout";

export interface RoundSnapshot {
  roundNumber: number;
  word: Word;
  drawingTeamId: Team["id"];
  reason: RoundEndReason;
  elapsedSeconds: number;
}

export interface GameSession {
  id: string;
  createdAt: number;
  teams: [Team, Team];
  settings: GameSettings;
  phase: GamePhase;
  /** Team whose turn it is to draw */
  activeTeamId: Team["id"];
  roundNumber: number;
  usedWordIds: string[];
  currentWord: Word | null;
  /** ms remaining on round timer (null when not running) */
  timerRemainingMs: number | null;
  timerStartedAt: number | null;
  /** True while host finger is holding reveal */
  isRevealing: boolean;
  /** Word visible on screen (during hold or briefly after) */
  isWordVisible: boolean;
  rounds: RoundSnapshot[];
  /** Hardest word by drawable score (lowest = hardest) */
  hardestWord: Word | null;
  theaterMode: boolean;
}

export interface GameStats {
  totalRounds: number;
  wordsUsed: number;
  zeroRepeats: true;
  winnerTeamId: Team["id"] | null;
  isTie: boolean;
}

/** Actions dispatched to state machine */
export type GameAction =
  | { type: "START_SETUP" }
  | { type: "COMPLETE_SETUP"; teams: [Team, Team]; settings: GameSettings }
  | { type: "BEGIN_REVEAL" }
  | { type: "REVEAL_COMPLETE" }
  | { type: "END_REVEAL" }
  | { type: "TICK"; now: number }
  | { type: "CORRECT_GUESS" }
  | { type: "SKIP_WORD" }
  | { type: "NEW_WORD_SAME_TURN" }
  | { type: "ROUND_END_ANIMATION_DONE" }
  | { type: "TOGGLE_THEATER" }
  | { type: "UPDATE_SETTINGS"; settings: Partial<GameSettings> }
  | { type: "END_GAME" }
  | { type: "PLAY_AGAIN" }
  | { type: "RESHUFFLE_WORDS" };

export interface WordFilter {
  difficulty: DifficultyPreset;
  category: WordCategory | "all";
  excludeIds: Set<string>;
}

/** Personality lines keyed by difficulty */
export const PERSONALITY_LINES: Record<WordDifficulty, string[]> = {
  easy: [
    "Easy peasy — even my cat could draw this 🐱",
    "If they can't get this in 10 seconds...",
    "Warm-up round energy ✨",
  ],
  medium: [
    "Good luck fitting this on the paper...",
    "This one's gonna take some creativity",
    "Medium spice 🌶️",
  ],
  hard: [
    "RIP to whoever's drawing this 💀",
    "Abstract concept detected. Good luck.",
    "May the odds be ever in your favor",
    "Someone's about to get artistic",
  ],
};

export const CELEBRATION_LINES = [
  "They got it!",
  "Nice!",
  "Too easy!",
  "How did they guess that?!",
  "Point scored!",
];

export const DEFAULT_TEAMS: [Team, Team] = [
  { id: "A", name: "Team Foxes", emoji: "🦊", score: 0 },
  { id: "B", name: "Team Octos", emoji: "🐙", score: 0 },
];

export const DEFAULT_SETTINGS: GameSettings = {
  difficulty: "mixed",
  category: "all",
  timerSeconds: 60,
  winScore: 10,
  soundEnabled: false,
  hapticEnabled: true,
};

export const REVEAL_HOLD_MS = 1200;
