import { useSvgId } from "@/lib/use-svg-id";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type CloudPlatform = "aws" | "gcp" | "azure";

const nodes: { id: CloudPlatform; label: string; x: number; y: number; color: string }[] = [
  { id: "aws", label: "AWS", x: 96, y: 104, color: "#FFB547" },
  { id: "gcp", label: "Google Cloud", x: 424, y: 104, color: "#35E5F5" },
  { id: "azure", label: "Microsoft Azure", x: 260, y: 372, color: "#4776FF" },
];
const HUB = { x: 260, y: 214 };

const flowPath = (x: number, y: number) => {
  const mx = (x + HUB.x) / 2;
  const my = (y + HUB.y) / 2 - (y < HUB.y ? 30 : -10);
  return `M${HUB.x} ${HUB.y} Q${mx} ${my} ${x} ${y}`;
};

/** Multi-cloud architecture illustration: three provider environments joined by a central architecture hub. */
export function CloudVisual({ active, className }: { active?: CloudPlatform | null; className?: string }) {
  const gCvCore = useSvgId("cv-core");
  const gCvHub = useSvgId("cv-hub");
  return (
    <svg viewBox="0 0 520 440" className={cn("h-auto w-full", className)} role="img" aria-label="Multi-cloud architecture connecting AWS, Google Cloud and Microsoft Azure through a central platform">
      <defs>
        <radialGradient id={gCvHub} cx=".5" cy=".5" r=".6">
          <stop offset="0" stopColor="#865DFF" stopOpacity=".55" />
          <stop offset="1" stopColor="#865DFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gCvCore} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4776FF" />
          <stop offset="1" stopColor="#865DFF" />
        </linearGradient>
      </defs>

      <g stroke="#fff" strokeOpacity=".05">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="440" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 46} x2="520" y2={i * 46} />
        ))}
      </g>

      <circle cx={HUB.x} cy={HUB.y} r="150" fill={`url(#${gCvHub})`} />
      <circle cx={HUB.x} cy={HUB.y} r="118" fill="none" stroke="#fff" strokeOpacity=".08" strokeDasharray="3 9" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "spin 60s linear infinite" }} />

      {nodes.map((n) => {
        const on = !active || active === n.id;
        const d = flowPath(n.x, n.y);
        return (
          <g key={n.id} style={{ opacity: on ? 1 : 0.28, transition: "opacity .6s var(--ease-expo)" }}>
            <path d={d} fill="none" stroke={n.color} strokeOpacity=".25" strokeWidth="8" strokeLinecap="round" />
            <path d={d} fill="none" stroke={n.color} strokeWidth="2" strokeDasharray="6 8" style={{ animation: "dash 1.2s linear infinite" }} />
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                r="4"
                fill={n.color}
                style={{ offsetPath: `path("${d}")`, animation: `travel 2.6s linear ${i * -0.87}s infinite` } as CSSProperties}
              />
            ))}
          </g>
        );
      })}

      {nodes.map((n) => {
        const on = !active || active === n.id;
        const focused = active === n.id;
        return (
          <g key={`n-${n.id}`} transform={`translate(${n.x} ${n.y})`} style={{ opacity: on ? 1 : 0.35, transition: "opacity .6s var(--ease-expo)" }}>
            {focused && <circle r="62" fill={n.color} fillOpacity=".12" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "pulse-soft 2.6s ease-in-out infinite" }} />}
            <path
              d="M-30 14a17 17 0 0 1 2-33.8A24 24 0 0 1 18-22a19 19 0 0 1 14 36z"
              fill="#0f1832"
              stroke={n.color}
              strokeWidth={focused ? 3 : 2}
              strokeLinejoin="round"
              transform="scale(1.35)"
            />
            {[-18, 0, 18].map((x, i) => (
              <g key={x} transform={`translate(${x - 7} ${-6})`}>
                <rect width="14" height="20" rx="3" fill={n.color} fillOpacity=".2" stroke={n.color} strokeOpacity=".7" />
                <circle cx="7" cy="6" r="1.8" fill={n.color} style={{ animation: `blink ${1.4 + i * 0.3}s steps(1) infinite` }} />
              </g>
            ))}
            <text y="48" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
              {n.label}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${HUB.x} ${HUB.y})`}>
        <rect x="-58" y="-40" width="116" height="80" rx="20" fill={`url(#${gCvCore})`} />
        <rect x="-58" y="-40" width="116" height="80" rx="20" fill="none" stroke="#fff" strokeOpacity=".35" />
        <path d="M-17 14 0-20 17 14M-10 4h22" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="0" cy="-20" r="4" fill="#35E5F5" />
        <text y="62" textAnchor="middle" fill="#A9B4CC" fontSize="11" letterSpacing="2" fontFamily="var(--font-inter), sans-serif">
          UNIFIED ARCHITECTURE
        </text>
      </g>
    </svg>
  );
}
