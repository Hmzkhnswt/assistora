"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  bx: number;
  by: number;
  layer: number;
  phase: number;
}
interface Signal {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LAYERS = [4, 7, 8, 7, 3];

/**
 * Canvas neural network with flowing signals and pointer response.
 * Pauses when off-screen and renders a single static frame under reduced motion.
 */
export function NeuralNetwork({ className, dense = false }: { className?: string; dense?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = dense ? LAYERS.map((n) => n + 2) : LAYERS;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const signals: Signal[] = [];
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = false;
    let edgeGradient: CanvasGradient | null = null;
    let last = performance.now();

    function build() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      edgeGradient = ctx!.createLinearGradient(0, 0, w, 0);
      edgeGradient.addColorStop(0, "rgba(71,118,255,0.24)");
      edgeGradient.addColorStop(1, "rgba(134,93,255,0.24)");
      nodes = [];
      edges = [];
      const padX = w * 0.08;
      const padY = h * 0.1;
      layers.forEach((count, li) => {
        const x = padX + ((w - padX * 2) * li) / (layers.length - 1);
        for (let i = 0; i < count; i++) {
          const y = padY + ((h - padY * 2) * (i + 0.5)) / count;
          nodes.push({ x, y, bx: x, by: y, layer: li, phase: Math.random() * Math.PI * 2 });
        }
      });
      nodes.forEach((a, ai) =>
        nodes.forEach((b, bi) => {
          if (b.layer === a.layer + 1 && Math.random() > 0.35) edges.push([ai, bi]);
        }),
      );
    }

    function spawn() {
      const starts = nodes.map((n, i) => (n.layer === 0 ? i : -1)).filter((i) => i >= 0);
      const from = starts[Math.floor(Math.random() * starts.length)];
      const outs = edges.filter((e) => e[0] === from);
      if (!outs.length) return;
      const e = outs[Math.floor(Math.random() * outs.length)];
      signals.push({ from: e[0], to: e[1], t: 0, speed: 0.6 + Math.random() * 0.6 });
    }

    function draw(time: number, dt: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        const dx = pointer.x - n.bx;
        const dy = pointer.y - n.by;
        const dist = Math.hypot(dx, dy);
        const pull = dist < 140 ? (1 - dist / 140) * 14 : 0;
        n.x = n.bx + (dist ? (dx / dist) * pull : 0) + Math.sin(time / 1400 + n.phase) * 2;
        n.y = n.by + (dist ? (dy / dist) * pull : 0) + Math.cos(time / 1600 + n.phase) * 2;
      }
      // All edges in a single path with one canvas-wide gradient (one stroke call per frame).
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = edgeGradient!;
      ctx!.beginPath();
      for (const [a, b] of edges) {
        ctx!.moveTo(nodes[a].x, nodes[a].y);
        ctx!.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx!.stroke();
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += dt * s.speed;
        const a = nodes[s.from];
        const b = nodes[s.to];
        if (s.t >= 1) {
          signals.splice(i, 1);
          const next = edges.filter((e) => e[0] === s.to);
          if (next.length && Math.random() > 0.1) {
            const e = next[Math.floor(Math.random() * next.length)];
            signals.push({ from: e[0], to: e[1], t: 0, speed: s.speed });
          }
          continue;
        }
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        ctx!.strokeStyle = "rgba(53,229,245,0.85)";
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(a.x + (b.x - a.x) * Math.max(0, s.t - 0.18), a.y + (b.y - a.y) * Math.max(0, s.t - 0.18));
        ctx!.lineTo(x, y);
        ctx!.stroke();
        ctx!.fillStyle = "#35E5F5";
        ctx!.beginPath();
        ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx!.fill();
      }
      for (const n of nodes) {
        const dist = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        const glow = dist < 120 ? 1 - dist / 120 : 0;
        const pulse = 0.5 + 0.5 * Math.sin(time / 700 + n.phase);
        ctx!.fillStyle = `rgba(134,93,255,${0.12 + pulse * 0.12 + glow * 0.4})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 11 + glow * 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = n.layer === layers.length - 1 ? "#35E5F5" : glow > 0.2 ? "#ffffff" : "#c9bbff";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 4.2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let spawnAcc = 0;
    function loop(time: number) {
      const dt = Math.min(0.05, (time - last) / 1000);
      last = time;
      spawnAcc += dt;
      if (spawnAcc > 0.16) {
        spawnAcc = 0;
        if (signals.length < 40) spawn();
      }
      draw(time, dt);
      if (visible) raf = requestAnimationFrame(loop);
    }

    build();
    if (reduce) {
      draw(0, 0);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0, 0);
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [dense]);

  return <canvas ref={ref} className={cn("block size-full touch-pan-y", className)} role="img" aria-label="Animated neural network with signals flowing between layers" />;
}
