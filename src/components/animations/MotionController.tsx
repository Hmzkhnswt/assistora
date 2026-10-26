"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide scroll storytelling driven by data attributes, so server components can opt in
 * without shipping their own client code:
 *   data-reveal                fade + rise when scrolled into view
 *   data-reveal-stagger        staggered reveal of direct children
 *   data-reveal-words          masked word-by-word headline reveal (use <RevealWords/>)
 *   data-parallax="-12"        scrubbed vertical parallax in percent
 *   data-tilt                  scrubbed 3D tilt (device mockups)
 * Re-initialised on every route change and fully reverted on cleanup.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "ready";
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "expo.out";
      const start = "top 94%";

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: Number(el.dataset.revealY ?? 28) },
          { opacity: 1, y: 0, duration: 1.1, ease, delay: Number(el.dataset.revealDelay ?? 0), scrollTrigger: { trigger: el, start, once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1, ease, stagger: Number(el.dataset.revealStagger || 0.08), scrollTrigger: { trigger: el, start, once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".rw > span"),
          { y: 0, yPercent: 108 },
          { y: 0, yPercent: 0, duration: 1.05, ease, stagger: 0.045, scrollTrigger: { trigger: el, start, once: true } },
        );
      });

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

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      window.clearTimeout(refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
