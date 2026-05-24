"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  spin: number;
}

const COLORS = ["#ff8906", "#f25f4c", "#7f5af0", "#2cb67d", "#fffffe"];

export function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -10 - 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: Math.random() * 6 + 4,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
    }));

    let frame = 0;
    const maxFrames = 90;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.rotation += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      frame++;
      if (frame < maxFrames) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 60,
      }}
    />
  );
}
