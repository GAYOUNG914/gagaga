'use client';

import { useEffect, useRef } from 'react';

export type ParticleType = 'flower' | 'snow' | 'heart' | 'bokeh';

// ── Palettes ──────────────────────────────────────────────
const FLOWER_COLORS = [
  'rgba(255, 236, 232, 0.82)',
  'rgba(255, 235, 228, 0.75)',
  'rgba(245, 200, 195, 0.70)',
  'rgba(255, 245, 240, 0.88)',
];
const SNOW_COLORS = [
  'rgba(255, 255, 255, 0.90)',
  'rgba(230, 240, 255, 0.85)',
  'rgba(210, 230, 255, 0.80)',
  'rgba(255, 255, 255, 0.70)',
];
const HEART_COLORS = [
  'rgba(255, 150, 170, 0.80)',
  'rgba(255, 105, 135, 0.75)',
  'rgba(255, 180, 190, 0.85)',
  'rgba(230, 80, 110, 0.70)',
];
const BOKEH_COLORS: [number, number, number][] = [
  [255, 200, 200],
  [200, 220, 255],
  [255, 220, 180],
  [200, 255, 210],
  [255, 180, 240],
];

// ── Particle ───────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  driftAmp: number;
  driftOffset: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  colorIdx: number;
}

function makeParticle(w: number, h: number, initial: boolean, type: ParticleType): Particle {
  const startY = initial ? Math.random() * h : -20 - Math.random() * 60;

  switch (type) {
    case 'flower':
      return {
        x: Math.random() * w,
        y: startY,
        size: Math.random() * 4 + 6,
        speedY: Math.random() * 1.0 + 0.005,
        drift: Math.random() * 0.025 + 0.001,
        driftAmp: Math.random() * 18 + 6,
        driftOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.045,
        opacity: Math.random() * 0.45 + 0.40,
        colorIdx: Math.floor(Math.random() * FLOWER_COLORS.length),
      };
    case 'snow':
      return {
        x: Math.random() * w,
        y: startY,
        size: Math.random() * 3 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 0.02 + 0.005,
        driftAmp: Math.random() * 10 + 3,
        driftOffset: Math.random() * Math.PI * 2,
        rotation: 0,
        rotSpeed: 0,
        opacity: Math.random() * 0.4 + 0.5,
        colorIdx: Math.floor(Math.random() * SNOW_COLORS.length),
      };
    case 'heart':
      return {
        x: Math.random() * w,
        y: startY,
        size: Math.random() * 6 + 5,
        speedY: Math.random() * 0.7 + 0.3,
        drift: Math.random() * 0.02 + 0.005,
        driftAmp: Math.random() * 15 + 5,
        driftOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.4 + 0.45,
        colorIdx: Math.floor(Math.random() * HEART_COLORS.length),
      };
    case 'bokeh':
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : Math.random() * h,
        size: Math.random() * 40 + 20,
        speedY: (Math.random() - 0.5) * 0.2,
        drift: Math.random() * 0.008 + 0.002,
        driftAmp: Math.random() * 25 + 10,
        driftOffset: Math.random() * Math.PI * 2,
        rotation: 0,
        rotSpeed: 0,
        opacity: Math.random() * 0.25 + 0.10,
        colorIdx: Math.floor(Math.random() * BOKEH_COLORS.length),
      };
  }
}

// ── Draw functions ────────────────────────────────────────
function drawFlower(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  ctx.save();
  const swayX = Math.sin(frame * p.drift + p.driftOffset) * p.driftAmp;
  ctx.translate(p.x + swayX, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  const s = p.size;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo( s*1.0, -s*0.1,  s*0.6, s*0.7,  0,  s);
  ctx.bezierCurveTo(-s*0.6,  s*0.7, -s*1.0, -s*0.1,  0, -s);
  ctx.fillStyle = FLOWER_COLORS[p.colorIdx];
  ctx.fill();
  ctx.restore();
}

function drawSnow(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  ctx.save();
  const swayX = Math.sin(frame * p.drift + p.driftOffset) * p.driftAmp;
  ctx.translate(p.x + swayX, p.y);
  ctx.globalAlpha = p.opacity;
  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fillStyle = SNOW_COLORS[p.colorIdx];
  ctx.fill();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  ctx.save();
  const swayX = Math.sin(frame * p.drift + p.driftOffset) * p.driftAmp;
  ctx.translate(p.x + swayX, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  const s = p.size;
  // Symmetric heart: indent at top (0, -s*0.2), bottom point at (0, s*0.8)
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.2);
  ctx.bezierCurveTo(s * 0.5, -s, s * 1.1, -s * 0.1, 0, s * 0.8);
  ctx.bezierCurveTo(-s * 1.1, -s * 0.1, -s * 0.5, -s, 0, -s * 0.2);
  ctx.closePath();
  ctx.fillStyle = HEART_COLORS[p.colorIdx];
  ctx.fill();
  ctx.restore();
}

function drawBokeh(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  ctx.save();
  const swayX = Math.sin(frame * p.drift + p.driftOffset) * p.driftAmp;
  ctx.translate(p.x + swayX, p.y);
  const [r, g, b] = BOKEH_COLORS[p.colorIdx];
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
  grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.5})`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

// ── Component ─────────────────────────────────────────────
interface PetalCanvasProps {
  count?: number;
  type?: ParticleType;
  style?: React.CSSProperties;
}

export function PetalCanvas({ count = 30, type = 'flower', style }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    let particles: Particle[] = Array.from({ length: count }, () =>
      makeParticle(canvas.width, canvas.height, true, type)
    );

    const draw = type === 'flower' ? drawFlower
      : type === 'snow' ? drawSnow
      : type === 'heart' ? drawHeart
      : drawBokeh;

    let frame = 0;
    let rafId: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles = particles.map((p) => {
        const next = { ...p, y: p.y + p.speedY, rotation: p.rotation + p.rotSpeed };

        if (type === 'bokeh') {
          // Wrap vertically so bokeh orbs are always visible
          if (next.y > canvas.height + p.size) next.y = -p.size;
          else if (next.y < -p.size) next.y = canvas.height + p.size;
          return next;
        }

        if (next.y > canvas.height + 24) {
          return makeParticle(canvas.width, canvas.height, false, type);
        }
        return next;
      });

      particles.forEach((p) => draw(ctx, p, frame));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [count, type]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        ...style,
      }}
    />
  );
}
