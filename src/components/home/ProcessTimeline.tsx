"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Vertical process timeline with a scroll-linked progress line and sequentially illuminated stages. */
export function ProcessTimeline({ steps, dark = false }: { steps: ProcessStep[]; dark?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelector("[data-line]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 65%", scrub: 0.4 } },
      );
      el.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
        ScrollTrigger.create({ trigger: step, start: "top 65%", end: "bottom top", toggleClass: { targets: step, className: "is-lit" } });
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => s.classList.add("is-lit"));
    });
    return () => mm.revert();
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className={cn("absolute top-2 bottom-2 left-[27px] w-0.5", dark ? "bg-white/10" : "bg-ink/10")} />
      <span aria-hidden="true" data-line className="absolute top-2 bottom-2 left-[27px] w-0.5 origin-top bg-gradient-to-b from-cyan via-electric to-violet" />
      {steps.map((s, i) => (
        <li key={s.title} data-step className="group relative grid grid-cols-[56px_1fr] gap-6 pb-12 last:pb-0">
          <span
            className={cn(
              "relative z-10 grid size-14 place-items-center rounded-full border font-display text-lg font-semibold transition-all duration-700 ease-expo",
              dark ? "border-white/15 bg-midnight text-white/50" : "border-ink/10 bg-white text-ink/40",
              "group-[.is-lit]:border-transparent group-[.is-lit]:bg-gradient-to-br group-[.is-lit]:from-electric group-[.is-lit]:to-violet group-[.is-lit]:text-white group-[.is-lit]:shadow-[0_0_0_8px_rgb(71_118_255/0.12),0_0_40px_-4px_#4776FF]",
            )}
          >
            0{i + 1}
          </span>
          <div className="pt-2 opacity-50 transition-opacity duration-700 group-[.is-lit]:opacity-100">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{s.title}</h3>
            {s.duration && <p className={cn("mt-1 text-sm font-medium", dark ? "text-cyan" : "text-electric")}>{s.duration}</p>}
            <p className={cn("mt-3 max-w-xl leading-relaxed", dark ? "text-slate" : "text-muted")}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
