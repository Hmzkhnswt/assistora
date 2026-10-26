"use client";

import { useEffect } from "react";
import gsap from "gsap";

const EXPO = "expo.out";

/** Cinematic first-load entrance for the homepage hero (masked lines, staggered copy, rising columns). */
export function HeroIntro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("hero-intro")) return;
    const lines = gsap.utils.toArray<HTMLElement>('[data-intro="line"] > span');
    const fades = gsap.utils.toArray<HTMLElement>('[data-intro="fade"]');
    const cols = gsap.utils.toArray<HTMLElement>('[data-intro="col"]');

    // Hand the hidden state from CSS to GSAP in the same tick (no paint in between).
    root.classList.remove("hero-intro");
    const tl = gsap.timeline({ defaults: { ease: EXPO } });
    tl.fromTo(lines, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.35)
      .fromTo(fades, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, clearProps: "transform" }, 0.7)
      .fromTo(cols, { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 1.8, stagger: 0.12, ease: "power4.out" }, 0.2);

    return () => {
      tl.kill();
      gsap.set([...lines, ...fades, ...cols], { clearProps: "all" });
    };
  }, []);

  return null;
}
