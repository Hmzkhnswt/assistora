"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Renders a marquee track once on the server and duplicates its items on the client, so the
 * HTML and RSC payload carry each (SVG-heavy) item only once. The track gets
 * `data-cloned` afterwards; CSS keeps its loop animation paused until then, so the −50%
 * translate never jumps when the track length doubles.
 */
export function LoopClone({ as: Tag = "div", className, style, children }: { as?: "div" | "ul"; className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.cloned) return;
    for (const child of Array.from(el.children)) {
      const copy = child.cloneNode(true) as HTMLElement;
      copy.setAttribute("aria-hidden", "true");
      copy.querySelectorAll("a, button").forEach((n) => n.setAttribute("tabindex", "-1"));
      el.appendChild(copy);
    }
    el.dataset.cloned = "true";
  }, []);

  return (
    <Tag ref={ref} data-loop className={className} style={style}>
      {children}
    </Tag>
  );
}
