import { useSvgId } from "@/lib/use-svg-id";
import type { CSSProperties, ReactNode } from "react";
import { LogoMark } from "@/components/layout/Logo";

/**
 * Original technology illustrations for the hero mosaic.
 * Each tile is a self-contained SVG composition (viewBox 200×250) with CSS-driven motion
 * that is automatically disabled under prefers-reduced-motion.
 */

const spin = (dur: number, reverse = false): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: "center",
  animation: `${reverse ? "spin-rev" : "spin"} ${dur}s linear infinite`,
});
const pulse = (delay: number, dur = 2.4): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: "center",
  animation: `pulse-soft ${dur}s ease-in-out ${delay}s infinite`,
});
const dash = (dur = 1.6): CSSProperties => ({ animation: `dash ${dur}s linear infinite` });
const travel = (path: string, dur: number, delay = 0): CSSProperties =>
  ({
    offsetPath: `path("${path}")`,
    offsetRotate: "0deg",
    animation: `travel ${dur}s linear ${delay}s infinite`,
  }) as CSSProperties;
const bar = (delay: number, dur = 2.2): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: "bottom",
  animation: `bar-grow ${dur}s ease-in-out ${delay}s infinite`,
});

function Svg({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden={label ? undefined : true}>
      {children}
    </svg>
  );
}

export function CloudTile() {
  const gTCloud = useSvgId("t-cloud");
  return (
    <Svg>
      <defs>
        <linearGradient id={gTCloud} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5d86ff" />
          <stop offset="1" stopColor="#2c4fd8" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#${gTCloud})`} />
      <g opacity=".18" stroke="#fff">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="250" />
        ))}
      </g>
      <path
        d="M58 98a26 26 0 0 1 4-51.7A34 34 0 0 1 127 40a28 28 0 0 1 22 52.6"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M58 98h88" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${72 + i * 28} 104v34`} stroke="#35E5F5" strokeWidth="2.5" strokeDasharray="5 7" style={dash(1.2 + i * 0.2)} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(52 ${142 + i * 30})`}>
          <rect width="96" height="22" rx="6" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".5" />
          <circle cx="12" cy="11" r="3.2" fill="#65F2C6" style={pulse(i * 0.5)} />
          <circle cx="22" cy="11" r="3.2" fill="#fff" fillOpacity=".5" />
          <rect x="54" y="8" width="32" height="6" rx="3" fill="#fff" fillOpacity=".35" />
        </g>
      ))}
    </Svg>
  );
}

export function NeuralTile() {
  const gTNeural = useSvgId("t-neural");
  const layers = [
    [60, 110, 160],
    [45, 85, 125, 165],
    [70, 125],
    [100],
  ];
  const xs = [36, 84, 132, 170];
  const nodes = layers.flatMap((ys, li) => ys.map((y) => ({ x: xs[li], y: y + 20, li })));
  const links: [number, number, number, number][] = [];
  layers.forEach((ys, li) => {
    if (li === layers.length - 1) return;
    ys.forEach((y) => layers[li + 1].forEach((y2) => links.push([xs[li], y + 20, xs[li + 1], y2 + 20])));
  });
  return (
    <Svg>
      <defs>
        <radialGradient id={gTNeural} cx=".3" cy=".2" r="1.1">
          <stop offset="0" stopColor="#a283ff" />
          <stop offset="1" stopColor="#4f2bc8" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#${gTNeural})`} />
      {links.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity=".28" strokeWidth="1.2" />
      ))}
      {links
        .filter((_, i) => i % 3 === 0)
        .map(([x1, y1, x2, y2], i) => (
          <circle key={`s${i}`} r="2.4" fill="#35E5F5" style={travel(`M${x1} ${y1}L${x2} ${y2}`, 1.8 + (i % 4) * 0.35, i * 0.25)} />
        ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="9" fill="#fff" fillOpacity=".14" style={pulse(i * 0.18, 2.8)} />
          <circle cx={n.x} cy={n.y} r="4.5" fill={n.li === 3 ? "#35E5F5" : "#fff"} />
        </g>
      ))}
    </Svg>
  );
}

export function SecurityTile() {
  const gTScan = useSvgId("t-scan");
  return (
    <Svg>
      <rect width="200" height="250" fill="#0b1430" />
      <circle cx="100" cy="122" r="86" fill="none" stroke="#65F2C6" strokeOpacity=".25" strokeDasharray="2 8" style={spin(30)} />
      <circle cx="100" cy="122" r="66" fill="none" stroke="#4776FF" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="40 14" style={spin(18, true)} />
      <path
        d="M100 62l42 16v34c0 28-18 50-42 60-24-10-42-32-42-60V78z"
        fill="#65F2C6"
        fillOpacity=".1"
        stroke="#65F2C6"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="84" y="112" width="32" height="26" rx="5" fill="#65F2C6" />
      <path d="M90 112v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#65F2C6" strokeWidth="3.5" />
      <circle cx="100" cy="124" r="3.5" fill="#0b1430" />
      <rect x="0" y="0" width="200" height="40" fill={`url(#${gTScan})`} style={{ animation: "scan 3.6s ease-in-out infinite" }} />
      <defs>
        <linearGradient id={gTScan} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#65F2C6" stopOpacity="0" />
          <stop offset="1" stopColor="#65F2C6" stopOpacity=".18" />
        </linearGradient>
      </defs>
    </Svg>
  );
}

export function MobileTile() {
  return (
    <Svg>
      <rect width="200" height="250" fill="#65F2C6" />
      <circle cx="160" cy="40" r="70" fill="#fff" fillOpacity=".25" />
      <g style={{ animation: "float 6s ease-in-out infinite" }}>
        <rect x="52" y="34" width="96" height="190" rx="18" fill="#0b1124" />
        <rect x="58" y="40" width="84" height="178" rx="13" fill="#f7f9ff" />
        <rect x="86" y="45" width="28" height="7" rx="3.5" fill="#0b1124" />
        <rect x="66" y="62" width="44" height="7" rx="3.5" fill="#0b1124" fillOpacity=".75" />
        <rect x="66" y="74" width="30" height="5" rx="2.5" fill="#0b1124" fillOpacity=".3" />
        <rect x="66" y="88" width="68" height="54" rx="9" fill="#4776FF" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={73 + i * 12} y={104} width="7" height="30" rx="2" fill="#fff" fillOpacity=".85" style={bar(i * 0.25)} />
        ))}
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(66 ${150 + i * 26})`}>
            <rect width="68" height="20" rx="7" fill="#fff" stroke="#0b1124" strokeOpacity=".08" />
            <circle cx="10" cy="10" r="5" fill={i ? "#865DFF" : "#35E5F5"} />
            <rect x="20" y="7" width="34" height="6" rx="3" fill="#0b1124" fillOpacity=".25" />
          </g>
        ))}
        <rect x="84" y="205" width="32" height="4" rx="2" fill="#0b1124" fillOpacity=".7" />
      </g>
    </Svg>
  );
}

export function WebTile() {
  return (
    <Svg>
      <rect width="200" height="250" fill="#f7f9ff" />
      <g transform="translate(20 46)">
        <rect width="160" height="158" rx="12" fill="#fff" stroke="#0b1124" strokeOpacity=".12" />
        <path d="M0 12a12 12 0 0 1 12-12h136a12 12 0 0 1 12 12v12H0z" fill="#0b1124" fillOpacity=".05" />
        {["#ef5d44", "#fcdd71", "#65F2C6"].map((c, i) => (
          <circle key={c} cx={12 + i * 10} cy="12" r="3.2" fill={c} />
        ))}
        <rect x="44" y="8" width="96" height="8" rx="4" fill="#0b1124" fillOpacity=".07" />
        <rect x="12" y="36" width="80" height="10" rx="4" fill="#0b1124" />
        <rect x="12" y="52" width="58" height="6" rx="3" fill="#0b1124" fillOpacity=".3" />
        <rect x="12" y="66" width="40" height="14" rx="7" fill="#4776FF" />
        <rect x="100" y="34" width="48" height="48" rx="10" fill="#865DFF" fillOpacity=".9" />
        <circle cx="124" cy="58" r="12" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="50 30" style={spin(4)} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${12 + i * 47} 94)`}>
            <rect width="42" height="52" rx="8" fill="#0b1124" fillOpacity=".04" stroke="#0b1124" strokeOpacity=".08" />
            <rect x="7" y="8" width="18" height="18" rx="5" fill={["#35E5F5", "#4776FF", "#65F2C6"][i]} style={pulse(i * 0.4, 3)} />
            <rect x="7" y="34" width="28" height="5" rx="2.5" fill="#0b1124" fillOpacity=".25" />
          </g>
        ))}
        <rect x="70" y="69" width="2" height="10" fill="#0b1124" style={{ animation: "blink 1.1s steps(1) infinite" }} />
      </g>
    </Svg>
  );
}

export function DevOpsTile() {
  const loop = "M100 125C78 98 40 98 40 125s38 27 60 0 60-27 60 0-38 27-60 0Z";
  return (
    <Svg>
      <rect width="200" height="250" fill="#101a35" />
      <path d={loop} fill="none" stroke="#35E5F5" strokeOpacity=".2" strokeWidth="14" strokeLinecap="round" />
      <path d={loop} fill="none" stroke="#35E5F5" strokeWidth="2.5" strokeDasharray="6 8" style={dash(1.4)} />
      <circle r="6" fill="#65F2C6" style={travel(loop, 4)} />
      <circle r="4" fill="#4776FF" style={travel(loop, 4, -2)} />
      {["PLAN", "CODE", "BUILD", "TEST", "RELEASE", "DEPLOY", "OPERATE", "MONITOR"].map((t, i) => (
        <text
          key={t}
          x={i < 4 ? 20 : 112}
          y={176 + (i % 4) * 14}
          fill="#fff"
          fillOpacity={0.35 + (i % 3) * 0.15}
          fontSize="8.5"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1"
        >
          {i + 1 < 10 ? `0${i + 1}` : i + 1} {t}
        </text>
      ))}
      <g transform="translate(20 34)">
        <rect width="160" height="30" rx="8" fill="#fff" fillOpacity=".06" />
        <circle cx="14" cy="15" r="4" fill="#65F2C6" style={pulse(0)} />
        <text x="26" y="19" fill="#fff" fontSize="9" fontFamily="ui-monospace, monospace">
          pipeline · passed
        </text>
      </g>
    </Svg>
  );
}

export function KubernetesTile() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const cells: [number, number][] = [
    [100, 125], [100, 85], [100, 165], [65, 105], [135, 105], [65, 145], [135, 145],
    [30, 125], [170, 125], [65, 65], [135, 65], [65, 185], [135, 185],
  ];
  return (
    <Svg>
      <rect width="200" height="250" fill="#4776FF" />
      {cells.map(([x, y], i) => (
        <polygon
          key={i}
          points={hex(x, y, 21)}
          fill={i === 0 ? "#fff" : i % 4 === 1 ? "#35E5F5" : "#fff"}
          fillOpacity={i === 0 ? 1 : i % 4 === 1 ? 0.9 : 0.16}
          stroke="#fff"
          strokeOpacity=".35"
          style={i % 4 === 1 ? pulse(i * 0.3, 3) : undefined}
        />
      ))}
      <g style={spin(12)}>
        <circle cx="100" cy="125" r="11" fill="none" stroke="#4776FF" strokeWidth="3" />
        {Array.from({ length: 7 }, (_, i) => {
          const a = ((Math.PI * 2) / 7) * i;
          return <line key={i} x1="100" y1="125" x2={(100 + 15 * Math.cos(a)).toFixed(1)} y2={(125 + 15 * Math.sin(a)).toFixed(1)} stroke="#4776FF" strokeWidth="2.5" strokeLinecap="round" />;
        })}
      </g>
    </Svg>
  );
}

export function DataTile() {
  return (
    <Svg>
      <rect width="200" height="250" fill="#35E5F5" />
      <path d="M0 210C40 200 60 150 100 160s70-60 100-70" fill="none" stroke="#0b1124" strokeOpacity=".15" strokeWidth="26" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={22 + i * 23} y={70} width="14" height="110" rx="4" fill="#0b1124" fillOpacity={0.18 + (i % 3) * 0.22} style={bar(i * 0.18, 2.6)} />
      ))}
      <path d="M18 196C50 176 70 120 100 130s60-40 84-60" fill="none" stroke="#0b1124" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 196C50 176 70 120 100 130s60-40 84-60" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 10" style={dash(1)} />
      <circle cx="184" cy="70" r="6" fill="#fff" stroke="#0b1124" strokeWidth="3" />
      <g transform="translate(20 28)" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0b1124">
        <text>ingest → transform → serve</text>
      </g>
    </Svg>
  );
}

export function ArchitectureTile() {
  const boxes: [number, number, string][] = [
    [74, 30, "#4776FF"], [24, 100, "#865DFF"], [124, 100, "#865DFF"], [24, 172, "#0b1124"], [74, 172, "#0b1124"], [124, 172, "#0b1124"],
  ];
  return (
    <Svg>
      <rect width="200" height="250" fill="#ECE8FF" />
      <g fill="none" stroke="#865DFF" strokeWidth="2">
        <path d="M100 74v14H50v12M100 88h50v12" />
        <path d="M50 144v14h0v14M150 144v14h0v14M50 158h100M100 158v14" />
      </g>
      <g fill="none" stroke="#4776FF" strokeWidth="2" strokeDasharray="4 6" style={dash(1.2)}>
        <path d="M100 74v14H50v12M100 88h50v12" />
        <path d="M50 158h100M100 158v14" />
      </g>
      {boxes.map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect width="52" height="44" rx="10" fill={c} />
          <rect x="9" y="11" width="22" height="5" rx="2.5" fill="#fff" fillOpacity=".85" />
          <rect x="9" y="22" width="34" height="4" rx="2" fill="#fff" fillOpacity=".4" />
          <circle cx="41" cy="13" r="3" fill="#65F2C6" style={pulse(i * 0.3)} />
        </g>
      ))}
    </Svg>
  );
}

export function BrandTile() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(140deg,#4776FF,#865DFF_70%,#b07cff)] p-[9%] text-white">
      <div aria-hidden="true" className="absolute -right-10 -bottom-10 size-48 rounded-full border-[18px] border-white/10" />
      <div aria-hidden="true" className="absolute top-1/3 -right-6 size-24 rounded-full border-[10px] border-cyan/40 motion-safe:animate-[spin_20s_linear_infinite]" style={{ borderStyle: "dashed" }} />
      <LogoMark className="relative aspect-square h-auto w-[30%] min-w-11 shadow-xl" />
      <p className="relative font-display text-[clamp(0.95rem,1.5vw,1.4rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
        We engineer
        <br />
        what&apos;s next.
      </p>
    </div>
  );
}


export function QualityTile() {
  const rows = ["auth.spec", "checkout.spec", "api.contract", "perf.budget", "a11y.audit"];
  return (
    <Svg>
      <rect width="200" height="250" fill="#0e1a3a" />
      <rect x="20" y="30" width="160" height="10" rx="5" fill="#fff" fillOpacity=".08" />
      <rect x="20" y="30" width="160" height="10" rx="5" fill="#65F2C6" style={{ transformBox: "fill-box", transformOrigin: "left", animation: "bar-grow 3s ease-in-out infinite" }} />
      {rows.map((r, i) => (
        <g key={r} transform={`translate(20 ${60 + i * 32})`}>
          <rect width="160" height="24" rx="7" fill="#fff" fillOpacity=".05" />
          <circle cx="13" cy="12" r="7" fill="#65F2C6" style={pulse(i * 0.35, 2.8)} />
          <path d="M9.5 12.2l2.4 2.4 4.6-5" fill="none" stroke="#0e1a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="28" y="16" fill="#fff" fillOpacity=".75" fontSize="9" fontFamily="ui-monospace, monospace">{r}</text>
          <text x="150" y="16" fill="#65F2C6" fontSize="8" textAnchor="end" fontFamily="ui-monospace, monospace">pass</text>
        </g>
      ))}
      <rect x="20" y="222" width="70" height="14" rx="7" fill="#4776FF" />
      <text x="55" y="232" fill="#fff" fontSize="7.5" textAnchor="middle" fontFamily="ui-monospace, monospace">QUALITY GATE</text>
    </Svg>
  );
}

export function ConsultingTile() {
  return (
    <Svg>
      <rect width="200" height="250" fill="#f7f9ff" />
      <g fill="none" stroke="#0b1124" strokeOpacity=".08">
        {[60, 100, 140, 180].map((y) => (
          <line key={y} x1="20" y1={y} x2="180" y2={y} />
        ))}
      </g>
      <path d="M24 196C60 190 70 150 100 140s50-46 76-70" fill="none" stroke="#4776FF" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 7" style={dash(1.4)} />
      {[[24, 196, "#865DFF"], [100, 140, "#4776FF"], [176, 70, "#35E5F5"]].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="13" fill={c as string} fillOpacity=".18" style={pulse(i * 0.5, 2.6)} />
          <circle cx={x as number} cy={y as number} r="6" fill={c as string} />
        </g>
      ))}
      <g transform="translate(140 170)" style={spin(16)}>
        <circle r="26" fill="none" stroke="#0b1124" strokeOpacity=".15" strokeWidth="2" />
        <path d="M0-20 6 0 0 20-6 0Z" fill="#0b1124" />
        <path d="M0-20 6 0H-6Z" fill="#ef5d44" />
      </g>
      <text x="24" y="40" fill="#0b1124" fontSize="9" fontFamily="ui-monospace, monospace">ROADMAP · Q1 → Q4</text>
    </Svg>
  );
}

export const heroTiles = {
  cloud: { label: "Cloud Infrastructure", Cmp: CloudTile },
  neural: { label: "AI Neural Networks", Cmp: NeuralTile },
  security: { label: "Cybersecurity", Cmp: SecurityTile },
  mobile: { label: "Mobile Applications", Cmp: MobileTile },
  web: { label: "Web Engineering", Cmp: WebTile },
  devops: { label: "DevOps Pipelines", Cmp: DevOpsTile },
  kubernetes: { label: "Kubernetes", Cmp: KubernetesTile },
  data: { label: "Data Engineering", Cmp: DataTile },
  architecture: { label: "Software Architecture", Cmp: ArchitectureTile },
  brand: { label: "Assistora", Cmp: BrandTile },
  quality: { label: "Quality Engineering", Cmp: QualityTile },
  consulting: { label: "Technology Strategy", Cmp: ConsultingTile },
} as const;

/** Illustration used for each service on cards and listings. */
export const serviceTile: Record<string, keyof typeof heroTiles> = {
  "cloud-computing": "cloud",
  "devops-platform-engineering": "devops",
  "artificial-intelligence": "neural",
  cybersecurity: "security",
  "web-development": "web",
  "mobile-app-development": "mobile",
  "data-engineering": "data",
  "software-engineering": "architecture",
  "quality-engineering": "quality",
  "it-consulting": "consulting",
};

export type HeroTileKey = keyof typeof heroTiles;
