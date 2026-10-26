import { useSvgId } from "@/lib/use-svg-id";
import { cn } from "@/lib/utils";

/** Stylised, animated web application interface (abstract UI — no fabricated data). */
export function BrowserMockup({ className }: { className?: string }) {
  const gBmArea = useSvgId("bm-area");
  return (
    <div className={cn("overflow-hidden rounded-[20px] bg-white shadow-[0_50px_100px_-40px_rgb(8_13_31/0.55)] ring-1 ring-ink/10", className)} role="img" aria-label="Animated web application interface">
      <div className="flex items-center gap-3 border-b border-ink/[0.06] bg-cloud px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff6159]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c941]" />
        </div>
        <div className="mx-auto flex h-7 w-1/2 items-center justify-center gap-2 rounded-lg bg-white text-[11px] text-muted ring-1 ring-ink/[0.06]">
          <span className="size-2 rounded-full bg-mint" />
          app.your-product.com
        </div>
      </div>
      <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[150px_1fr]">
        <aside className="space-y-2 border-r border-ink/[0.06] p-3">
          <div className="mb-4 h-6 w-full rounded-md bg-gradient-to-r from-electric to-violet" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("flex items-center gap-2 rounded-lg p-1.5", i === 1 && "bg-electric/10")}>
              <span className={cn("size-4 shrink-0 rounded", i === 1 ? "bg-electric" : "bg-ink/10")} />
              <span className="hidden h-2 flex-1 rounded bg-ink/10 sm:block" />
            </div>
          ))}
        </aside>
        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="h-3 w-32 rounded bg-ink/80" />
              <div className="h-2 w-20 rounded bg-ink/15" />
            </div>
            <div className="h-7 w-20 rounded-full bg-electric" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["#4776FF", "#865DFF", "#35E5F5"].map((c, i) => (
              <div key={c} className="rounded-xl bg-cloud p-3 ring-1 ring-ink/[0.05]">
                <div className="mb-3 size-6 rounded-lg motion-safe:animate-pulse-soft" style={{ background: c, animationDelay: `${i * 0.4}s` }} />
                <div className="h-2.5 w-3/4 rounded bg-ink/70" />
                <div className="mt-1.5 h-2 w-1/2 rounded bg-ink/15" />
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-cloud p-3 ring-1 ring-ink/[0.05]">
            <svg viewBox="0 0 300 90" className="h-24 w-full" aria-hidden="true">
              <defs>
                <linearGradient id={gBmArea} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4776FF" stopOpacity=".3" />
                  <stop offset="1" stopColor="#4776FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 45, 70].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#0b1124" strokeOpacity=".06" />
              ))}
              <path d="M0 70C30 64 45 40 75 44s45 22 75 10 40-34 75-30 50 18 75 4V90H0z" fill={`url(#${gBmArea})`} />
              <path
                d="M0 70C30 64 45 40 75 44s45 22 75 10 40-34 75-30 50 18 75 4"
                fill="none"
                stroke="#4776FF"
                strokeWidth="2.5"
                strokeDasharray="420"
                style={{ animation: "draw-line 4s var(--ease-expo) infinite" }}
              />
              <path d="M0 80C40 78 60 62 100 66s60 2 100-8 60-12 100-18" fill="none" stroke="#865DFF" strokeWidth="2" strokeDasharray="4 5" />
            </svg>
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-1.5">
                <span className="size-6 rounded-full bg-gradient-to-br from-cyan to-electric" />
                <span className="h-2 w-1/3 rounded bg-ink/20" />
                <span className="ml-auto h-5 w-14 rounded-full bg-mint/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
