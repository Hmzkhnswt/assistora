"use client";

import { useEffect, useRef } from "react";
import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";

/** Vertical process timeline with a scroll-linked progress line and sequentially illuminated stages. */
export function ProcessTimeline({ steps, dark = false }: { steps: ProcessStep[]; dark?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((s) => s.classList.add("is-lit"));
      el.style.setProperty("--p", "1");
      return;
    }

    // A step lights up once its top passes 65% of the viewport height.
    const lit = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-lit", e.isIntersecting || e.boundingClientRect.top < 0)),
      { rootMargin: "0px 0px -35% 0px" },
    );
    steps.forEach((s) => lit.observe(s));

    // Progress line: one layout read per frame, only while the timeline is on screen.
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * 0.65;
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const visible = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else window.removeEventListener("scroll", onScroll);
    });
    visible.observe(el);

    return () => {
      lit.disconnect();
      visible.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className={cn("absolute top-2 bottom-2 left-[27px] w-0.5", dark ? "bg-white/10" : "bg-ink/10")} />
      <span aria-hidden="true" data-line className="absolute top-2 bottom-2 left-[27px] w-0.5 origin-top scale-y-[var(--p,0)] bg-gradient-to-b from-cyan via-electric to-violet transition-transform duration-150 ease-out" />
      {steps.map((s, i) => (
        <li key={s.title} data-step className="group relative grid grid-cols-[56px_1fr] gap-6 pb-12 last:pb-0">
          <span
            className={cn(
              "relative z-10 grid size-14 place-items-center rounded-full border font-display text-lg font-semibold transition-all duration-700 ease-expo",
              dark ? "border-white/20 bg-midnight text-white/70" : "border-ink/15 bg-white text-ink/60",
              "group-[.is-lit]:border-transparent group-[.is-lit]:bg-gradient-to-br group-[.is-lit]:from-electric group-[.is-lit]:to-violet group-[.is-lit]:text-white group-[.is-lit]:shadow-[0_0_0_8px_rgb(71_118_255/0.12),0_0_40px_-4px_#4776FF]",
            )}
          >
            0{i + 1}
          </span>
          <div className="pt-2 opacity-90 transition-opacity duration-700 group-[.is-lit]:opacity-100">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{s.title}</h3>
            {s.duration && <p className={cn("mt-1 text-sm font-medium", dark ? "text-cyan" : "text-electric")}>{s.duration}</p>}
            <p className={cn("mt-3 max-w-xl leading-relaxed", dark ? "text-slate" : "text-muted")}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
