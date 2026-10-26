"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/types/content";
import { cn } from "@/lib/utils";

export function FAQAccordion({ faqs, dark = false }: { faqs: FAQ[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className={cn("divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-ink/10 border-ink/10")}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={f.question}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold tracking-[-0.01em] sm:text-lg"
              >
                <span>{f.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-expo",
                    dark ? "border-white/15" : "border-ink/15",
                    isOpen && "border-transparent bg-electric text-white",
                  )}
                >
                  <Plus className={cn("size-4 transition-transform duration-300 ease-expo", isOpen && "rotate-45")} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-500 ease-expo", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className={cn("max-w-3xl pb-7 leading-relaxed", dark ? "text-slate" : "text-muted")}>{f.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
