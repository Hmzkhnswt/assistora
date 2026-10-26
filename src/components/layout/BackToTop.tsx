"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-3 text-sm font-medium text-slate transition-colors hover:text-white"
    >
      Back to top
      <span className="grid size-11 place-items-center rounded-full border border-white/15 transition-all duration-300 ease-expo group-hover:-translate-y-1 group-hover:border-transparent group-hover:bg-electric group-hover:text-white">
        <ArrowUp aria-hidden="true" className="size-4" />
      </span>
    </button>
  );
}
