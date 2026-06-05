"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Generative "data rivers" field — the Cold Design hero visual.
 * Particles drift along flow-field streams across a near-black plane and
 * converge toward a bright focal node, evoking pribyl' flowing back into one place.
 * Real canvas render (not a fake screenshot). DPR-aware, paused offscreen,
 * collapses to a static frame under prefers-reduced-motion.
 */
export function DataField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; speed: number; hot: number };
    let parts: P[] = [];
    let focal = { x: 0, y: 0 };

    const COUNT = () => {
      const area = w * h;
      // Scale particle count to area, capped for mobile perf.
      return Math.min(Math.round(area / 9000), 220);
    };

    // Flow field: smooth pseudo-noise from layered sines, biased toward focal node.
    function flow(x: number, y: number) {
      const nx = x / w;
      const ny = y / h;
      const a =
        Math.sin(nx * 5.2 + ny * 3.1) * 1.1 +
        Math.cos(ny * 4.4 - nx * 2.2) * 0.9;
      // pull toward focal
      const dx = focal.x - x;
      const dy = focal.y - y;
      const d = Math.hypot(dx, dy) + 0.001;
      const pull = 0.55;
      return {
        ax: Math.cos(a) + (dx / d) * pull,
        ay: Math.sin(a) + (dy / d) * pull,
      };
    }

    function spawn(): P {
      // Spawn around edges so streams travel inward.
      const edge = Math.random();
      let x: number, y: number;
      if (edge < 0.5) {
        x = Math.random() * w;
        y = Math.random() < 0.5 ? -10 : h + 10;
      } else {
        x = Math.random() < 0.5 ? -10 : w + 10;
        y = Math.random() * h;
      }
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        life: 0,
        max: 120 + Math.random() * 220,
        speed: 0.5 + Math.random() * 1.1,
        hot: Math.random(),
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = { x: w * 0.62, y: h * 0.46 };
      parts = Array.from({ length: COUNT() }, spawn);
    }

    function drawFocal() {
      const g = ctx!.createRadialGradient(focal.x, focal.y, 0, focal.x, focal.y, Math.max(w, h) * 0.28);
      g.addColorStop(0, "rgba(255,103,3,0.30)");
      g.addColorStop(0.25, "rgba(255,103,3,0.10)");
      g.addColorStop(1, "rgba(255,103,3,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, w, h);

      ctx!.beginPath();
      ctx!.arc(focal.x, focal.y, 3.2, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,138,61,0.95)";
      ctx!.shadowColor = "rgba(255,103,3,0.9)";
      ctx!.shadowBlur = 26;
      ctx!.fill();
      ctx!.shadowBlur = 0;
    }

    function step() {
      // Fade previous frame for trails (near-black wash).
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(8,8,8,0.16)";
      ctx!.fillRect(0, 0, w, h);

      ctx!.globalCompositeOperation = "lighter";
      for (const p of parts) {
        const f = flow(p.x, p.y);
        p.vx = p.vx * 0.86 + f.ax * 0.16 * p.speed;
        p.vy = p.vy * 0.86 + f.ay * 0.16 * p.speed;
        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const dFocal = Math.hypot(focal.x - p.x, focal.y - p.y);
        const heat = Math.max(0, 1 - dFocal / (Math.max(w, h) * 0.5));
        // Cool grey-white streams that warm to orange near the focal node.
        const warm = Math.min(1, p.hot * 0.4 + heat);
        const r = 255;
        const g = Math.round(255 - warm * 152); // -> 103
        const b = Math.round(255 - warm * 252); // -> 3
        const alpha = 0.10 + heat * 0.28;

        ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.lineWidth = 0.6 + heat * 1.1;
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();

        if (p.life > p.max || dFocal < 6 || p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) {
          Object.assign(p, spawn());
        }
      }
      ctx!.globalCompositeOperation = "source-over";
      drawFocal();

      if (running) raf = requestAnimationFrame(step);
    }

    function staticFrame() {
      ctx!.fillStyle = "#080808";
      ctx!.fillRect(0, 0, w, h);
      // Draw a calm single still of streams for reduced-motion users.
      ctx!.globalCompositeOperation = "lighter";
      for (let i = 0; i < 1400; i++) {
        const p = spawn();
        for (let s = 0; s < 60; s++) {
          const f = flow(p.x, p.y);
          p.vx = p.vx * 0.86 + f.ax * 0.16 * p.speed;
          p.vy = p.vy * 0.86 + f.ay * 0.16 * p.speed;
          const px = p.x, py = p.y;
          p.x += p.vx; p.y += p.vy;
          const dFocal = Math.hypot(focal.x - p.x, focal.y - p.y);
          const heat = Math.max(0, 1 - dFocal / (Math.max(w, h) * 0.5));
          const warm = Math.min(1, p.hot * 0.4 + heat);
          ctx!.strokeStyle = `rgba(255,${Math.round(255 - warm * 152)},${Math.round(255 - warm * 252)},${0.05 + heat * 0.16})`;
          ctx!.lineWidth = 0.6 + heat;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
          if (dFocal < 8) break;
        }
      }
      ctx!.globalCompositeOperation = "source-over";
      drawFocal();
    }

    resize();
    if (reduce) {
      staticFrame();
    } else {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      if (reduce) staticFrame();
    };
    window.addEventListener("resize", onResize);

    // Pause when scrolled out of view (perf).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
