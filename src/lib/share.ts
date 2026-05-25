import type { GameSession } from "@/types/game";
import { getWinner } from "@/lib/game-state-machine";
import { buildPlayUrl } from "@/lib/game-url";
import { absoluteUrl } from "@/lib/site";

export function buildResultShareText(session: GameSession): string {
  const [a, b] = session.teams;
  const winner = getWinner(session);
  const rounds = session.rounds.length;
  const url = absoluteUrl("/");

  if (!winner) {
    return `We just played Pictionary Host! It's a tie — ${a.score}-${b.score} after ${rounds} rounds. Can you beat us? ${url}`;
  }

  const loserScore = winner.id === "A" ? b.score : a.score;
  return `We just played Pictionary Host! ${winner.name} won ${winner.score}-${loserScore} in ${rounds} rounds. Peek-proof words + timer — try it: ${url}`;
}

export function buildInviteShareText(
  settings?: Partial<GameSession["settings"]>
): string {
  const url = buildPlayUrl(settings);
  return `Join our Pictionary game night — free host tool with timer, teams & zero repeats: ${url}`;
}

export async function shareText(
  payload: { title: string; text: string; url?: string }
): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      return "shared";
    } catch (err) {
      if ((err as Error).name === "AbortError") return "failed";
    }
  }

  try {
    await navigator.clipboard.writeText(
      payload.url ? `${payload.text}` : payload.text
    );
    return "copied";
  } catch {
    return "failed";
  }
}
