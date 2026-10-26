import { useSvgId } from "@/lib/use-svg-id";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const travel = (d: string, dur: number, delay = 0, color = "#35E5F5", r = 4) => (
  <circle r={r} fill={color} style={{ offsetPath: `path("${d}")`, animation: `travel ${dur}s linear ${delay}s infinite` } as CSSProperties} />
);

function Card({ x, y, w, h, title, sub, color, mono }: { x: number; y: number; w: number; h: number; title: string; sub?: string; color: string; mono?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="12" fill="#0f1832" stroke={color} strokeOpacity=".55" />
      <rect x="10" y="10" width="8" height={h - 20} rx="4" fill={color} />
      <text x="28" y={sub ? h / 2 - 3 : h / 2 + 4} fill="#fff" fontSize="12.5" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
        {title}
      </text>
      {sub && (
        <text x="28" y={h / 2 + 13} fill="#A9B4CC" fontSize="9.5" fontFamily={mono ? "ui-monospace, monospace" : "var(--font-inter), sans-serif"}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Sources → ingestion → warehouse/lakehouse → consumption. */
export function DataPipelineVisual({ className }: { className?: string }) {
  const gDpCore = useSvgId("dp-core");
  const sources = ["CRM", "ERP", "Product events", "SaaS apps"];
  const outs = ["BI dashboards", "ML features", "AI retrieval"];
  return (
    <svg viewBox="0 0 520 380" className={cn("h-auto w-full", className)} role="img" aria-label="Data pipeline from business sources through ingestion and a cloud warehouse to analytics and AI">
      {sources.map((s, i) => {
        const y = 40 + i * 82;
        const d = `M126 ${y + 22} C170 ${y + 22} 170 190 206 190`;
        return (
          <g key={s}>
            <path d={d} fill="none" stroke="#35E5F5" strokeOpacity=".25" strokeWidth="2" />
            {travel(d, 2.4, i * -0.6)}
            <Card x={10} y={y} w={116} h={44} title={s} color="#35E5F5" />
          </g>
        );
      })}
      <g transform="translate(206 140)">
        <rect width="110" height="100" rx="18" fill={`url(#${gDpCore})`} />
        <defs>
          <linearGradient id={gDpCore} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4776FF" />
            <stop offset="1" stopColor="#35E5F5" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx="55" cy={34 + i * 16} rx="26" ry="7" fill="none" stroke="#fff" strokeWidth="2.5" />
        ))}
        <path d="M29 34v32M81 34v32" stroke="#fff" strokeWidth="2.5" />
        <text x="55" y="122" textAnchor="middle" fill="#A9B4CC" fontSize="10" letterSpacing="1.5" fontFamily="var(--font-inter), sans-serif">
          WAREHOUSE / LAKEHOUSE
        </text>
      </g>
      {outs.map((o, i) => {
        const y = 70 + i * 100;
        const d = `M316 190 C350 190 352 ${y + 22} 394 ${y + 22}`;
        return (
          <g key={o}>
            <path d={d} fill="none" stroke="#865DFF" strokeOpacity=".3" strokeWidth="2" />
            {travel(d, 2, i * -0.5, "#865DFF")}
            <Card x={394} y={y} w={116} h={44} title={o} color="#865DFF" />
          </g>
        );
      })}
    </svg>
  );
}

/** Layered software architecture: clients → gateway → services → data & events. */
export function ArchitectureVisual({ className }: { className?: string }) {
  const services = ["Orders", "Identity", "Billing", "Search"];
  return (
    <svg viewBox="0 0 520 400" className={cn("h-auto w-full", className)} role="img" aria-label="Software architecture with clients, API gateway, domain services and data layer">
      {["Web app", "Mobile app", "Partner API"].map((c, i) => (
        <g key={c}>
          <path d={`M${100 + i * 160} 66 V120 H260`} fill="none" stroke="#865DFF" strokeOpacity=".35" strokeWidth="2" />
          {travel(`M${100 + i * 160} 66 V120 H260 V142`, 2.2, i * -0.7, "#865DFF")}
          <Card x={40 + i * 160} y={20} w={120} h={46} title={c} color="#865DFF" />
        </g>
      ))}
      <g transform="translate(150 142)">
        <rect width="220" height="46" rx="14" fill="#865DFF" />
        <text x="110" y="28" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
          API Gateway · Auth · Rate limits
        </text>
      </g>
      {services.map((s, i) => {
        const x = 20 + i * 125;
        const d = `M260 188 V214 H${x + 55} V236`;
        return (
          <g key={s}>
            <path d={d} fill="none" stroke="#4776FF" strokeOpacity=".35" strokeWidth="2" />
            {travel(d, 1.8, i * -0.45, "#4776FF", 3.5)}
            <Card x={x} y={236} w={110} h={50} title={s} sub="service" color="#4776FF" mono />
            <path d={`M${x + 55} 286 V320`} stroke="#35E5F5" strokeOpacity=".4" strokeWidth="2" strokeDasharray="4 5" style={{ animation: "dash 1.2s linear infinite" }} />
          </g>
        );
      })}
      <g transform="translate(20 320)">
        <rect width="480" height="56" rx="14" fill="#0f1832" stroke="#35E5F5" strokeOpacity=".45" />
        <text x="24" y="33" fill="#fff" fontSize="12.5" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
          Event bus
        </text>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={120 + i * 46} y="20" width="34" height="16" rx="5" fill="#35E5F5" fillOpacity={0.25 + (i % 3) * 0.2} style={{ animation: `blink ${1.2 + i * 0.2}s steps(1) infinite` }} />
        ))}
      </g>
    </svg>
  );
}

/** Test suites executing in sequence and feeding a release quality gate. */
export function TestingVisual({ className }: { className?: string }) {
  const suites = [
    ["Unit tests", "1.2s"],
    ["API contract tests", "4.8s"],
    ["End-to-end journeys", "38s"],
    ["Accessibility audit", "6.1s"],
    ["Performance budget", "52s"],
  ];
  return (
    <div className={cn("rounded-[22px] bg-[#0b1430] p-5 font-mono text-[13px] text-white shadow-2xl ring-1 ring-white/10 sm:p-6", className)} role="img" aria-label="Automated test suites passing a release quality gate">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-white/60">$ run quality-pipeline</span>
        <span className="rounded-full bg-mint/15 px-2.5 py-1 text-[11px] text-mint">main · #run</span>
      </div>
      <ul className="space-y-2.5">
        {suites.map(([name, t], i) => (
          <li key={name} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5">
            <span className="relative grid size-5 place-items-center">
              <span className="absolute inset-0 rounded-full border-2 border-white/15 border-t-cyan" style={{ animation: `spin .9s linear infinite, qa-hide .2s ${0.6 + i * 0.8}s forwards` }} />
              <svg viewBox="0 0 20 20" className="size-5 opacity-0" style={{ animation: `qa-check .4s ${0.6 + i * 0.8}s forwards` }} aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#65F2C6" />
                <path d="M6 10.4l2.6 2.6L14 7.5" fill="none" stroke="#0b1430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="flex-1 text-white/85">{name}</span>
            <span className="text-white/40">{t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-mint/20 to-cyan/10 px-4 py-3 opacity-0" style={{ animation: "qa-check .6s 4.8s forwards" }}>
        <span className="font-sans font-semibold text-mint">Quality gate passed</span>
        <span className="text-white/60">ready to release</span>
      </div>
    </div>
  );
}

/** Technology roadmap: strategy lanes with milestones moving from assessment to delivery. */
export function EnterpriseVisual({ className }: { className?: string }) {
  const lanes = [
    { label: "Strategy", color: "#865DFF", items: [[0, 2], [3, 5]] },
    { label: "Architecture", color: "#4776FF", items: [[1, 3], [4, 7]] },
    { label: "Cloud", color: "#35E5F5", items: [[2, 5], [6, 8]] },
    { label: "Security", color: "#65F2C6", items: [[1, 4], [5, 8]] },
    { label: "Delivery", color: "#fcdd71", items: [[3, 6], [7, 8]] },
  ];
  const col = (n: number) => 120 + n * 46;
  return (
    <svg viewBox="0 0 520 330" className={cn("h-auto w-full", className)} role="img" aria-label="Technology roadmap with strategy, architecture, cloud, security and delivery workstreams">
      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
        <g key={q}>
          <line x1={col(i * 2)} y1="30" x2={col(i * 2)} y2="310" stroke="#fff" strokeOpacity=".07" />
          <text x={col(i * 2) + 4} y="22" fill="#A9B4CC" fontSize="11" fontFamily="ui-monospace, monospace">
            {q}
          </text>
        </g>
      ))}
      {lanes.map((lane, li) => {
        const y = 52 + li * 52;
        return (
          <g key={lane.label}>
            <text x="12" y={y + 18} fill="#fff" fontSize="12.5" fontWeight="600" fontFamily="var(--font-sora), sans-serif">
              {lane.label}
            </text>
            {lane.items.map(([a, b], i) => (
              <g key={i}>
                <rect x={col(a)} y={y} width={col(b) - col(a) - 6} height="28" rx="9" fill={lane.color} fillOpacity=".18" stroke={lane.color} strokeOpacity=".55" />
                <rect
                  x={col(a)}
                  y={y}
                  width={col(b) - col(a) - 6}
                  height="28"
                  rx="9"
                  fill={lane.color}
                  fillOpacity=".55"
                  style={{ transformBox: "fill-box", transformOrigin: "left", animation: `roadmap-fill 6s var(--ease-expo) ${li * 0.3 + i * 1.2}s infinite` }}
                />
              </g>
            ))}
          </g>
        );
      })}
      <line x1="120" y1="40" x2="120" y2="312" stroke="#fff" strokeWidth="2" style={{ animation: "roadmap-now 8s linear infinite" }} />
    </svg>
  );
}
