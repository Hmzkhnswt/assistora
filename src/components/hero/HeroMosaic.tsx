import { cn } from "@/lib/utils";
import { LoopClone } from "@/components/animations/LoopClone";
import { heroTiles, type HeroTileKey } from "./tiles";

const columns: { tiles: HeroTileKey[]; dir: "down" | "up"; offset: string; speed: string }[] = [
  { tiles: ["neural", "cloud", "web", "security", "data"], dir: "down", offset: "-18%", speed: "46s" },
  { tiles: ["brand", "devops", "mobile", "architecture", "kubernetes"], dir: "up", offset: "-4%", speed: "52s" },
  { tiles: ["kubernetes", "data", "security", "cloud", "neural"], dir: "down", offset: "-30%", speed: "44s" },
];

const stripTiles: HeroTileKey[] = ["cloud", "neural", "brand", "security", "devops", "mobile", "kubernetes", "data"];

function Tile({ k, hidden, still, className }: { k: HeroTileKey; hidden?: boolean; still?: boolean; className?: string }) {
  const { label, Cmp } = heroTiles[k];
  return (
    <div
      aria-hidden={hidden || undefined}
      className={cn(
        "group/tile relative aspect-[4/5] overflow-hidden rounded-[var(--r)] shadow-[0_24px_50px_-28px_rgb(0_0_0/0.8)] ring-1 ring-white/10",
        // Static artwork: the tile's own micro-animations are frozen, only its container moves.
        still && "tile-still",
        className,
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-expo group-hover/tile:scale-[1.06]">
        <Cmp />
      </div>
      {k !== "brand" && (
        <span className="pointer-events-none absolute bottom-[7%] left-[7%] hidden max-w-[86%] items-center gap-1.5 rounded-full bg-midnight/85 px-2.5 py-1 text-[11px] leading-tight font-semibold tracking-[0.08em] text-white uppercase opacity-80 transition-opacity duration-500 ease-expo group-hover/tile:opacity-100 lg:inline-flex">
          <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Desktop: three staggered, infinitely scrolling columns. Each column's tiles are duplicated on the
 * client (LoopClone) so a −50% translate loops seamlessly; the CSS entrance runs on the wrapper so it never fights
 * the marquee transform.
 */
export function HeroMosaic({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-[var(--gap)] [--gap:14px] [--r:22px]", className)}>
      {columns.map((col, ci) => (
        <div key={ci} className="intro-col relative" style={{ marginTop: col.offset, ["--d" as string]: `${0.15 + ci * 0.12}s` }}>
          <LoopClone className={cn("mosaic-col", col.dir === "down" ? "animate-col-down" : "animate-col-up")} style={{ ["--col-speed" as string]: col.speed }}>
            {col.tiles.map((k, i) => (
              <Tile key={i} k={k} className="mb-[var(--gap)]" />
            ))}
          </LoopClone>
        </div>
      ))}
    </div>
  );
}

/**
 * Phones & tablets: a single, slowly drifting row of still technology cards. Lighter to render
 * and keeps the headline as the clear focal point on narrow screens.
 */
export function HeroStrip({ className }: { className?: string }) {
  return (
    <div className={cn("mask-fade-x overflow-hidden [--r:18px]", className)}>
      <LoopClone className="mosaic-row flex w-max motion-safe:animate-[marquee_60s_linear_infinite]">
        {stripTiles.map((k, i) => (
          <Tile key={i} k={k} still className="mr-3 w-[132px] shrink-0 sm:mr-4 sm:w-[168px]" />
        ))}
      </LoopClone>
    </div>
  );
}
