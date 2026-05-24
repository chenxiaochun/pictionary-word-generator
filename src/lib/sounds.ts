/** Web Audio API — no mp3 files needed */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

async function resumeCtx() {
  const ctx = getCtx();
  if (ctx?.state === "suspended") {
    await ctx.resume();
  }
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15
) {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export async function playRevealDing() {
  await resumeCtx();
  tone(880, 0.12, "sine", 0.12);
  setTimeout(() => tone(1174, 0.15, "sine", 0.1), 80);
}

export async function playBuzzer() {
  await resumeCtx();
  const ctx = getCtx();
  if (!ctx) return;

  for (let i = 0; i < 3; i++) {
    setTimeout(() => tone(220, 0.15, "square", 0.08), i * 180);
  }
}

export async function playCheer() {
  await resumeCtx();
  tone(523, 0.1, "triangle", 0.12);
  setTimeout(() => tone(659, 0.1, "triangle", 0.12), 100);
  setTimeout(() => tone(784, 0.2, "triangle", 0.14), 200);
}

export async function playTick() {
  await resumeCtx();
  tone(1200, 0.04, "sine", 0.04);
}

export const SOUND_PROMPT_KEY = "pictionary-sound-prompt-seen";

export function hasSeenSoundPrompt(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(SOUND_PROMPT_KEY) === "1";
}

export function markSoundPromptSeen() {
  localStorage.setItem(SOUND_PROMPT_KEY, "1");
}
