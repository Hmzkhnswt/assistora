import { useSvgId } from "@/lib/use-svg-id";
import { cn } from "@/lib/utils";

/** Layered 3D security shield with orbiting protective rings and secure connections (CSS 3D, no WebGL). */
export function ShieldVisual({ className }: { className?: string }) {
  const gSvEdge = useSvgId("sv-edge");
  const gSvFace = useSvgId("sv-face");
  const satellites = [
    { label: "IAM", angle: -150 },
    { label: "Cloud", angle: -90 },
    { label: "AppSec", angle: -30 },
    { label: "Data", angle: 30 },
    { label: "Network", angle: 90 },
    { label: "SIEM", angle: 150 },
  ];
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[520px] [perspective:1100px]", className)} role="img" aria-label="Security shield protected by layered rings and secure connections">
      <div className="absolute inset-[6%] rounded-full bg-mint/10 blur-3xl" />

      {/* Secure connection lines */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
        {satellites.map((s, i) => {
          const a = (s.angle * Math.PI) / 180;
          const x = 200 + Math.cos(a) * 172;
          const y = 200 + Math.sin(a) * 172;
          return (
            <g key={s.label}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="#65F2C6" strokeOpacity=".18" />
              <line x1="200" y1="200" x2={x} y2={y} stroke="#65F2C6" strokeDasharray="3 9" style={{ animation: `dash ${1.4 + i * 0.15}s linear infinite reverse` }} />
            </g>
          );
        })}
      </svg>

      {/* Orbit rings */}
      <div className="absolute inset-[4%] [transform-style:preserve-3d] [transform:rotateX(68deg)]">
        <div className="absolute inset-0 rounded-full border border-mint/30 motion-safe:animate-spin-slow" style={{ borderStyle: "dashed" }} />
        <div className="absolute inset-[12%] rounded-full border-2 border-electric/50 motion-safe:animate-spin-reverse">
          <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-cyan shadow-[0_0_18px_#35E5F5]" />
        </div>
        <div className="absolute inset-[24%] rounded-full border border-violet/50 motion-safe:animate-[spin_14s_linear_infinite]">
          <span className="absolute top-1/2 -right-1.5 size-2.5 rounded-full bg-mint shadow-[0_0_14px_#65F2C6]" />
        </div>
      </div>
      <div className="absolute inset-[16%] [transform-style:preserve-3d] [transform:rotateY(64deg)_rotateZ(20deg)]">
        <div className="absolute inset-0 rounded-full border border-cyan/30 motion-safe:animate-[spin_26s_linear_infinite]">
          <span className="absolute -bottom-1 left-1/3 size-2 rounded-full bg-cyan" />
        </div>
      </div>

      {/* Shield */}
      <div className="absolute inset-[27%] motion-safe:animate-float [transform-style:preserve-3d]">
        <svg viewBox="0 0 200 230" className="size-full drop-shadow-[0_30px_60px_rgba(101,242,198,0.35)]" aria-hidden="true">
          <defs>
            <linearGradient id={gSvFace} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1d2c5c" />
              <stop offset="1" stopColor="#0a1229" />
            </linearGradient>
            <linearGradient id={gSvEdge} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#65F2C6" />
              <stop offset=".5" stopColor="#35E5F5" />
              <stop offset="1" stopColor="#4776FF" />
            </linearGradient>
          </defs>
          <path d="M100 8l82 30v64c0 56-36 98-82 118C54 200 18 158 18 102V38z" fill="#65F2C6" fillOpacity=".12" transform="translate(6 8)" />
          <path d="M100 8l82 30v64c0 56-36 98-82 118C54 200 18 158 18 102V38z" fill={`url(#${gSvFace})`} stroke={`url(#${gSvEdge})`} strokeWidth="5" strokeLinejoin="round" />
          <path d="M100 30l60 22v50c0 42-26 74-60 90" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="10" />
          <rect x="72" y="98" width="56" height="46" rx="9" fill={`url(#${gSvEdge})`} />
          <path d="M83 98V84a17 17 0 0 1 34 0v14" fill="none" stroke={`url(#${gSvEdge})`} strokeWidth="7" strokeLinecap="round" />
          <circle cx="100" cy="117" r="6" fill="#0a1229" />
          <rect x="97" y="117" width="6" height="14" rx="3" fill="#0a1229" />
        </svg>
      </div>

      {/* Protected domains */}
      {satellites.map((s, i) => {
        const a = (s.angle * Math.PI) / 180;
        return (
          <span
            key={s.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/30 bg-midnight/95 px-2 py-1 text-[10px] font-semibold tracking-[0.06em] text-mint uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.08em]"
            style={{ left: `${50 + Math.cos(a) * 39}%`, top: `${50 + Math.sin(a) * 41}%`, animation: `float ${5 + i * 0.4}s ease-in-out ${i * -0.7}s infinite` }}
          >
            {s.label}
          </span>
        );
      })}
    </div>
  );
}
