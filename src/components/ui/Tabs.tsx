"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: ReactNode;
}

/** Accessible tablist with roving focus and arrow-key navigation. Panels are rendered by the caller. */
export function TabList({
  items,
  value,
  onChange,
  dark = false,
  label,
  className,
  idBase,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  dark?: boolean;
  label: string;
  className?: string;
  idBase?: string;
}) {
  const fallback = useId();
  const base = idBase ?? fallback;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent, index: number) {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % items.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      onChange(items[next].id);
      refs.current[next]?.focus();
    }
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-ink/[0.04] ring-1 ring-ink/10", className)}
    >
      {items.map((item, i) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${base}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "relative inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-expo",
              selected
                ? dark
                  ? "bg-white text-ink shadow-lg"
                  : "bg-ink text-white shadow-lg"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-ink/60 hover:text-ink",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
