"use client";

import { useSvgId } from "@/lib/use-svg-id";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

type Mode = "pending" | "webgl" | "static";

/** Decides, per device, whether the WebGL globe is worth running. */
function pickMode(): Mode {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2) return "static";
  try {
    const c = document.createElement("canvas");
    return c.getContext("webgl2") || c.getContext("webgl") ? "webgl" : "static";
  } catch {
    return "static";
  }
}

/** Lightweight SVG globe used when WebGL is unavailable or the device opts for data/power saving. */
function StaticGlobe() {
  const gSgFill = useSvgId("sg-fill");
  const arcs = [
    "M262 236 Q180 120 96 180",
    "M262 236 Q230 110 150 120",
    "M262 236 Q300 120 380 150",
    "M262 236 Q360 210 420 300",
    "M262 236 Q330 330 360 380",
  ];
  return (
    <svg viewBox="0 0 500 500" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <radialGradient id={gSgFill} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#1d2c5c" />
          <stop offset="1" stopColor="#080D1F" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="250" r="200" fill={`url(#${gSgFill})`} stroke="#4776FF" strokeOpacity=".5" />
      {[-60, -30, 0, 30, 60].map((lat) => (
        <ellipse key={lat} cx="250" cy={250 + lat * 2.6} rx={200 * Math.cos((lat * Math.PI) / 180)} ry={16 * Math.cos((lat * Math.PI) / 180)} fill="none" stroke="#4776FF" strokeOpacity=".18" />
      ))}
      {[0.25, 0.55, 0.85].map((k) => (
        <ellipse key={k} cx="250" cy="250" rx={200 * k} ry="200" fill="none" stroke="#865DFF" strokeOpacity=".16" />
      ))}
      {arcs.map((d, i) => (
        <path key={d} d={d} fill="none" stroke={i % 2 ? "#865DFF" : "#35E5F5"} strokeWidth="2" strokeDasharray="5 6" />
      ))}
      <circle cx="262" cy="236" r="16" fill="#65F2C6" fillOpacity=".2" />
      <circle cx="262" cy="236" r="6" fill="#65F2C6" />
    </svg>
  );
}

/** Mounts the WebGL globe only when it approaches the viewport, with a static fallback. */
export function LazyGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode(pickMode());
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full" role="img" aria-label="Globe highlighting Pakistan as Assistora's headquarters, connected to service regions worldwide">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(71,118,255,0.35),rgba(8,13,31,0)_70%)]" />
      {mode === "webgl" && <Globe />}
      {mode === "static" && <StaticGlobe />}
    </div>
  );
}
