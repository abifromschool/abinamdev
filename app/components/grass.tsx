"use client";

import { useEffect, useRef } from "react";

// grass settings
const FONT_PX = 13;
const CELL_H = 15;
const BAND = 0.28;
const MIN_BLADE = 4;
const TIP = [33, 78, 75];
const BASE = [92, 150, 142];
const STEP = 1 / 60;

// wind settings
const WIND_BASE = 0.12;
const GUST_STRENGTH = 0.9;
const GUST_SPEED = 160;
const GUST_PERIOD = 900;
const GUST_GAP = 0.16;
const GUST_WIDTH = 0.06;

// pointer settings
const PUSH_RADIUS = 34;
const PUSH_STRENGTH = 1.6;
const POINTER_REACH = 40;
const SPRING = 120;
const DAMPING = 9;

const palette: string[] = [];
for (let i = 0; i < 16; i++) {
  const f = i / 15;
  const c = BASE.map((b, k) => Math.round(b + (TIP[k] - b) * f));
  palette.push(`rgba(${c[0]}, ${c[1]}, ${c[2]}, ${0.75 + 0.25 * f})`);
}

export default function GrassField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cellW = 5.4;
    let cols = 0;
    let heights: number[] = [];
    let stiff: number[] = [];
    let push = new Float32Array(0);
    let vel = new Float32Array(0);
    let time = 0;
    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };

    // a gust IS BUMP
    const bump = (u: number, centre: number) => {
      let d = u - centre;
      d -= Math.round(d); // wrap around so the pattern repeats
      return Math.exp(-(d * d) / (2 * GUST_WIDTH * GUST_WIDTH));
    };
    const wind = (x: number) => {
      const u = (x - GUST_SPEED * time) / GUST_PERIOD; // moves right as time grows
      const gusts = bump(u, 0.2) + 0.8 * bump(u, 0.2 + GUST_GAP);
      const flutter = 0.05 * Math.sin(x * 0.045 - time * 5); // small ripple so it isn't too smooth
      return WIND_BASE + GUST_STRENGTH * gusts + flutter;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < cols; i++) {
        const h = heights[i];
        const x0 = (i + 0.5) * cellW;
        const bend = Math.max(
          -1.7,
          Math.min(1.7, wind(x0) * stiff[i] + push[i]),
        );
        for (let r = 0; r < h; r++) {
          const up = (r + 1) / h; // 0..1 up the blade; tips move the most
          const lean = bend * up;
          const glyph = Math.abs(lean) < 0.2 ? "|" : lean > 0 ? "/" : "\\";
          const dx = bend * Math.pow(up, 1.6) * cellW * 3.5;
          ctx.fillStyle = palette[Math.round((h > 1 ? r / (h - 1) : 0) * 15)];
          ctx.fillText(glyph, x0 + dx, height - r * CELL_H);
        }
      }
    };

    const step = (dt: number) => {
      time += dt;
      for (let i = 0; i < cols; i++) {
        // make blade afraid of pointer
        let target = 0;
        if (pointer.active) {
          const u = ((i + 0.5) * cellW - pointer.x) / PUSH_RADIUS;
          const topY = height - heights[i] * CELL_H;
          const above = Math.max(0, topY - pointer.y); // pointer is above the blade tip
          const reach = Math.max(0, 1 - above / POINTER_REACH);
          target = (PUSH_STRENGTH / 0.607) * u * Math.exp(-0.5 * u * u) * reach;
        }
        vel[i] += ((target - push[i]) * SPRING - vel[i] * DAMPING) * dt;
        push[i] += vel[i] * dt;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_PX}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      cellW = ctx.measureText("M").width || 5.4;
      cols = Math.ceil(width / cellW);
      const maxRows = Math.max(MIN_BLADE, Math.floor((height * BAND) / CELL_H));

      heights = Array.from({ length: cols }, (_, i) => {
        const n =
          0.6 * Math.random() +
          0.4 * (0.5 + 0.5 * Math.sin(i * 0.21 + Math.sin(i * 0.05) * 3));
        return Math.min(
          maxRows,
          MIN_BLADE + Math.floor(n * (maxRows - MIN_BLADE + 1)),
        );
      });
      stiff = Array.from({ length: cols }, () => 0.85 + Math.random() * 0.3);
      push = new Float32Array(cols);
      vel = new Float32Array(cols);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      acc += dt;
      let n = 0;
      while (acc >= STEP && n < 4) {
        step(STEP);
        acc -= STEP;
        n++;
      }
      if (n === 4) acc = 0;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      if (!visible) return;
      if (reduced) {
        draw(); // one still frame, no animation
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= rect.width &&
        pointer.y >= 0 &&
        pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    resize();
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
