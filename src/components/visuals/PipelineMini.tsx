import type { CSSProperties } from "react";

/** Compact animated delivery loop used as the DevOps hero illustration. */
export function PipelineMini() {
  const loop = "M260 200C200 120 90 120 90 200s110 80 170 0 170-80 170 0-110 80-170 0Z";
  const labels = [
    ["Plan", 70, 112], ["Code", 30, 210], ["Build", 70, 300], ["Test", 200, 236],
    ["Release", 300, 112], ["Deploy", 450, 132], ["Operate", 470, 280], ["Monitor", 300, 300],
  ] as const;
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" role="img" aria-label="Continuous delivery loop: plan, code, build, test, release, deploy, operate and monitor">
      <defs>
        <linearGradient id="pm-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#35E5F5" />
          <stop offset=".5" stopColor="#4776FF" />
          <stop offset="1" stopColor="#865DFF" />
        </linearGradient>
      </defs>
      <path d={loop} fill="none" stroke="url(#pm-g)" strokeOpacity=".2" strokeWidth="34" strokeLinecap="round" />
      <path d={loop} fill="none" stroke="url(#pm-g)" strokeWidth="3" strokeDasharray="8 10" style={{ animation: "dash 1.2s linear infinite" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} r={i === 0 ? 8 : 5} fill={i % 2 ? "#865DFF" : "#35E5F5"} style={{ offsetPath: `path("${loop}")`, animation: `travel 7s linear ${i * -1.4}s infinite` } as CSSProperties} />
      ))}
      {labels.map(([t, x, y]) => (
        <g key={t} transform={`translate(${x} ${y})`}>
          <rect x="-4" y="-17" width={t.length * 9.2 + 28} height="26" rx="13" fill="#0f1832" stroke="#fff" strokeOpacity=".15" />
          <circle cx="9" cy="-4" r="3.5" fill="#65F2C6" />
          <text x="18" y="0" fill="#fff" fontSize="12" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}
