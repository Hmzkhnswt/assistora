"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadGsap } from "@/lib/gsap";

/**
 * Site-wide motion, driven by data attributes so server components can opt in without
 * shipping their own client code:
 *   data-reveal                fade + rise when scrolled into view
 *   data-reveal-stagger        staggered reveal of direct children
 *   data-reveal-words          masked word-by-word headline reveal (use <RevealWords/>)
 *   data-parallax="-12"        scrubbed vertical parallax in percent (large screens only)
 *   data-tilt                  scrubbed 3D tilt for device mockups (large screens only)
 *
 * Reveals are one-shot CSS transitions toggled by a single IntersectionObserver (no layout
 * reads, no animation library). GSAP is lazy-loaded only for the scrubbed effects on large
 * screens. Also flags off-screen sections ([data-offscreen]) so their CSS animations pause.
 */
export function MotionController() {
  const pathname = usePathname();

  // One-shot reveals + off-screen animation pausing.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "ready";

    const revealables = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger], [data-reveal-words]");
    revealables.forEach((el) => {
      if (el.dataset.revealDelay) el.style.setProperty("--delay", `${el.dataset.revealDelay}s`);
      if (el.hasAttribute("data-reveal-stagger")) {
        Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
      }
    });
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    revealables.forEach((el) => reveal.observe(el));

    const sections = document.querySelectorAll<HTMLElement>("main section, main > article, footer");
    const pause = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    sections.forEach((s) => pause.observe(s));

    return () => {
      reveal.disconnect();
      pause.disconnect();
      sections.forEach((s) => s.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  // Scrubbed effects: large screens with motion allowed only, and only if the page uses them.
  useEffect(() => {
    const wanted = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    if (!wanted || !document.querySelector("[data-parallax], [data-tilt]")) return;
    let cancelled = false;
    let cleanup = () => {};

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -Number(el.dataset.parallax || 10) },
            { yPercent: Number(el.dataset.parallax || 10), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotateY: -18, rotateX: 8 },
            { rotateY: 14, rotateX: -4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        });
      });

      // Fonts and content-visibility sections settling to their real height change the
      // document length; re-measure trigger positions (debounced) when that happens.
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
      let lastHeight = document.body.scrollHeight;
      let timer = 0;
      const ro = new ResizeObserver(() => {
        const h = document.body.scrollHeight;
        if (Math.abs(h - lastHeight) < 40) return;
        lastHeight = h;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(document.body);

      cleanup = () => {
        ro.disconnect();
        window.clearTimeout(timer);
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
