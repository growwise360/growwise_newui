'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClientOnly } from '@/hooks/useClientOnly';

const MAX_PARTICLES = 40;
const SPAWN_INTERVAL_MS = 32;
const DPR_CAP = 2;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  blur: number;
  hue: number;
  sat: number;
}

function useSmokeCursorEnabled(): boolean {
  const isClient = useClientOnly();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 768px)');
    const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(
        desktopMq.matches && pointerMq.matches && !motionMq.matches,
      );
    };

    update();
    desktopMq.addEventListener('change', update);
    pointerMq.addEventListener('change', update);
    motionMq.addEventListener('change', update);

    return () => {
      desktopMq.removeEventListener('change', update);
      pointerMq.removeEventListener('change', update);
      motionMq.removeEventListener('change', update);
    };
  }, []);

  return isClient && enabled;
}

function createParticle(x: number, y: number): Particle {
  const hue = 205 + Math.random() * 15;
  const sat = 22 + Math.random() * 10;

  return {
    x: x + (Math.random() - 0.5) * 8,
    y: y + (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8 - 0.2,
    radius: 12 + Math.random() * 16,
    alpha: 0.08 + Math.random() * 0.1,
    decay: 0.006 + Math.random() * 0.004,
    blur: 8 + Math.random() * 10,
    hue,
    sat,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle): void {
  const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
  gradient.addColorStop(0, `hsla(${p.hue},${p.sat}%,72%,${p.alpha})`);
  gradient.addColorStop(0.45, `hsla(${p.hue},${p.sat}%,58%,${p.alpha * 0.5})`);
  gradient.addColorStop(1, `hsla(${p.hue},${p.sat}%,48%,0)`);

  ctx.save();
  ctx.filter = `blur(${p.blur}px)`;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

export default function SmokeCursor() {
  const enabled = useSmokeCursorEnabled();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let rafId: number | null = null;
    let lastSpawn = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const spawn = (x: number, y: number) => {
      const spawnCount = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < spawnCount; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        particles.push(createParticle(x, y));
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 1.008;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawParticle(ctx, p);
      }

      if (particles.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = null;
      }
    };

    const ensureLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(draw);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn >= SPAWN_INTERVAL_MS) {
        lastSpawn = now;
        spawn(e.clientX, e.clientY);
      }

      ensureLoop();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      particles.length = 0;
      rafId = null;
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="smoke-cursor-layer pointer-events-none fixed inset-0 z-30 max-md:hidden"
      aria-hidden
    />
  );
}
