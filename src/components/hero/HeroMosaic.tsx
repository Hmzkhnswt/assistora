import { cn } from "@/lib/utils";
import { heroTiles, type HeroTileKey } from "./tiles";

const columns: { tiles: HeroTileKey[]; dir: "down" | "up"; offset: string; speed: string }[] = [
  { tiles: ["neural", "cloud", "web", "security", "data"], dir: "down", offset: "-18%", speed: "46s" },
  { tiles: ["brand", "devops", "mobile", "architecture", "kubernetes"], dir: "up", offset: "-4%", speed: "52s" },
  { tiles: ["kubernetes", "data", "security", "cloud", "neural"], dir: "down", offset: "-30%", speed: "44s" },
];

function Tile({ k, hidden }: { k: HeroTileKey; hidden?: boolean }) {
  const { label, Cmp } = heroTiles[k];
  return (
    <div
      aria-hidden={hidden || undefined}
      className="group/tile relative mb-[var(--gap)] aspect-[4/5] overflow-hidden rounded-[var(--r)] shadow-[0_24px_50px_-28px_rgb(0_0_0/0.8)] ring-1 ring-white/10"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-expo group-hover/tile:scale-[1.06]">
        <Cmp />
      </div>
      {k !== "brand" && <span className="pointer-events-none absolute bottom-[7%] left-[7%] hidden max-w-[86%] items-center gap-1.5 rounded-full bg-midnight/85 px-2.5 py-1 text-[10px] leading-tight font-semibold tracking-[0.08em] text-white uppercase opacity-80 transition-all duration-500 ease-expo group-hover/tile:opacity-100 sm:inline-flex sm:text-[11px]">
        <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
        {label}
      </span>}
    </div>
  );
}

/** Three staggered, infinitely scrolling columns. Each column's tiles are rendered twice so a −50% translate loops seamlessly. */
export function HeroMosaic({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-[var(--gap)] [--gap:10px] [--r:18px] sm:[--gap:14px] sm:[--r:22px]", className)}>
      {columns.map((col, ci) => (
        <div key={ci} data-intro="col" className="relative" style={{ marginTop: col.offset }}>
          <div
            className={cn("mosaic-col", col.dir === "down" ? "animate-col-down" : "animate-col-up")}
            style={{ ["--col-speed" as string]: col.speed }}
          >
            {col.tiles.map((k, i) => (
              <Tile key={`a${i}`} k={k} />
            ))}
            {col.tiles.map((k, i) => (
              <Tile key={`b${i}`} k={k} hidden />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
