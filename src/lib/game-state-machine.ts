import {
  type GameSession,
  type GameAction,
  type Team,
  type RoundSnapshot,
  DEFAULT_SETTINGS,
  DEFAULT_TEAMS,
  REVEAL_HOLD_MS,
} from "@/types/game";
import { pickRandomWord, isHarderWord } from "@/lib/word-engine";

function createSessionId(): string {
  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function otherTeamId(id: Team["id"]): Team["id"] {
  return id === "A" ? "B" : "A";
}

function updateTeamScore(
  teams: [Team, Team],
  teamId: Team["id"],
  delta: number
): [Team, Team] {
  return teams.map((t) =>
    t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t
  ) as [Team, Team];
}

function pickWordForSession(session: GameSession) {
  return pickRandomWord({
    difficulty: session.settings.difficulty,
    category: session.settings.category,
    excludeIds: new Set(session.usedWordIds),
  });
}

function advanceWord(session: GameSession): GameSession {
  const word = pickWordForSession(session);
  if (!word) {
    return { ...session, phase: "word_bank_exhausted", currentWord: null };
  }
  return {
    ...session,
    currentWord: word,
    usedWordIds: [...session.usedWordIds, word.id],
    hardestWord:
      !session.hardestWord || isHarderWord(word, session.hardestWord)
        ? word
        : session.hardestWord,
    phase: "idle",
    isRevealing: false,
    isWordVisible: false,
    timerRemainingMs: null,
    timerStartedAt: null,
  };
}

function switchTurn(session: GameSession): GameSession {
  const nextTeamId = otherTeamId(session.activeTeamId);
  let next: GameSession = {
    ...session,
    activeTeamId: nextTeamId,
    roundNumber: session.roundNumber + 1,
  };
  next = advanceWord(next);
  return next;
}

function finishRound(
  session: GameSession,
  reason: RoundSnapshot["reason"]
): GameSession {
  if (!session.currentWord) return session;

  const elapsedSeconds = session.settings.timerSeconds;
  const snapshot: RoundSnapshot = {
    roundNumber: session.roundNumber,
    word: session.currentWord,
    drawingTeamId: session.activeTeamId,
    reason,
    elapsedSeconds,
  };

  let next: GameSession = {
    ...session,
    rounds: [...session.rounds, snapshot],
    phase:
      reason === "correct"
        ? "round_end_correct"
        : reason === "skip"
          ? "round_end_skip"
          : "round_end_timeout",
    isWordVisible: false,
    isRevealing: false,
  };

  if (reason === "correct") {
    next.teams = updateTeamScore(next.teams, session.activeTeamId, 1);
  }

  return next;
}

export function createInitialSession(): GameSession {
  return {
    id: createSessionId(),
    createdAt: Date.now(),
    teams: DEFAULT_TEAMS.map((t) => ({ ...t, score: 0 })) as [Team, Team],
    settings: { ...DEFAULT_SETTINGS },
    phase: "setup",
    activeTeamId: "A",
    roundNumber: 1,
    usedWordIds: [],
    currentWord: null,
    timerRemainingMs: null,
    timerStartedAt: null,
    isRevealing: false,
    isWordVisible: false,
    rounds: [],
    hardestWord: null,
    theaterMode: false,
  };
}

/**
 * Pure reducer — all game logic flows through here.
 * UI dispatches GameAction; components render session.phase.
 */
export function gameReducer(
  session: GameSession,
  action: GameAction
): GameSession {
  switch (action.type) {
    case "START_SETUP":
      return { ...createInitialSession(), phase: "setup" };

    case "COMPLETE_SETUP": {
      let next: GameSession = {
        ...session,
        teams: action.teams,
        settings: action.settings,
        phase: "idle",
        activeTeamId: "A",
        roundNumber: 1,
        usedWordIds: [],
        rounds: [],
        hardestWord: null,
      };
      return advanceWord(next);
    }

    case "BEGIN_REVEAL":
      if (session.phase !== "idle" && session.phase !== "timer_running") {
        return session;
      }
      return {
        ...session,
        phase: "revealing",
        isRevealing: true,
      };

    case "REVEAL_COMPLETE": {
      const timerMs = session.settings.timerSeconds * 1000;
      const now = Date.now();
      return {
        ...session,
        phase: "timer_running",
        isRevealing: false,
        isWordVisible: true,
        timerRemainingMs: session.timerRemainingMs ?? timerMs,
        timerStartedAt: session.timerStartedAt ?? now,
      };
    }

    case "END_REVEAL":
      if (session.phase !== "timer_running") return session;
      return {
        ...session,
        isWordVisible: false,
        isRevealing: false,
      };

    case "TICK": {
      if (session.phase !== "timer_running" || session.timerStartedAt == null) {
        return session;
      }
      const elapsed = action.now - session.timerStartedAt;
      const totalMs = session.settings.timerSeconds * 1000;
      const remaining = Math.max(0, totalMs - elapsed);

      if (remaining === 0) {
        return finishRound(
          { ...session, timerRemainingMs: 0 },
          "timeout"
        );
      }

      return { ...session, timerRemainingMs: remaining };
    }

    case "CORRECT_GUESS":
      if (session.phase !== "timer_running") return session;
      return finishRound(session, "correct");

    case "SKIP_WORD":
      if (session.phase !== "idle" && session.phase !== "timer_running") {
        return session;
      }
      return finishRound(session, "skip");

    case "NEW_WORD_SAME_TURN": {
      if (!session.currentWord) return session;
      const usedWithoutCurrent = session.usedWordIds.filter(
        (id) => id !== session.currentWord!.id
      );
      let next: GameSession = {
        ...session,
        usedWordIds: usedWithoutCurrent,
        phase: "idle",
        isWordVisible: false,
        isRevealing: false,
        timerRemainingMs: null,
        timerStartedAt: null,
      };
      return advanceWord(next);
    }

    case "ROUND_END_ANIMATION_DONE": {
      if (
        session.phase !== "round_end_correct" &&
        session.phase !== "round_end_skip" &&
        session.phase !== "round_end_timeout"
      ) {
        return session;
      }
      const win = session.settings.winScore;
      if (session.teams.some((t) => t.score >= win)) {
        return { ...session, phase: "game_over" };
      }
      return switchTurn(session);
    }

    case "TOGGLE_THEATER":
      return { ...session, theaterMode: !session.theaterMode };

    case "UPDATE_SETTINGS":
      return {
        ...session,
        settings: { ...session.settings, ...action.settings },
      };

    case "END_GAME":
      return { ...session, phase: "game_over" };

    case "PLAY_AGAIN": {
      const teams = session.teams.map((t) => ({
        ...t,
        score: 0,
      })) as [Team, Team];
      let next: GameSession = {
        ...createInitialSession(),
        id: createSessionId(),
        createdAt: Date.now(),
        teams,
        settings: { ...session.settings },
        phase: "idle",
        theaterMode: false,
      };
      return advanceWord(next);
    }

    case "RESHUFFLE_WORDS": {
      let next: GameSession = {
        ...session,
        usedWordIds: [],
        phase: "idle",
      };
      return advanceWord(next);
    }

    default:
      return session;
  }
}

/** Hook helper: call when user has held reveal for REVEAL_HOLD_MS */
export function shouldCompleteReveal(
  revealStartedAt: number,
  now: number
): boolean {
  return now - revealStartedAt >= REVEAL_HOLD_MS;
}

export function formatTimer(ms: number | null): string {
  if (ms == null) return "—:——";
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function getActiveTeam(session: GameSession): Team {
  return session.teams.find((t) => t.id === session.activeTeamId)!;
}

export function getWinner(session: GameSession): Team | null {
  if (session.phase !== "game_over") return null;
  const [a, b] = session.teams;
  if (a.score === b.score) return null;
  return a.score > b.score ? a : b;
}
