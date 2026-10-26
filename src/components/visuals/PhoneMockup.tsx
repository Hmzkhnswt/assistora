import { cn } from "@/lib/utils";

function ScreenOnboard() {
  return (
    <div className="flex h-full w-full shrink-0 flex-col justify-between bg-gradient-to-b from-violet to-electric p-5 text-white">
      <div className="mt-6 size-14 rounded-2xl bg-white/20 backdrop-blur" />
      <div>
        <div className="h-4 w-4/5 rounded bg-white" />
        <div className="mt-2 h-4 w-3/5 rounded bg-white" />
        <div className="mt-4 h-2 w-full rounded bg-white/40" />
        <div className="mt-1.5 h-2 w-2/3 rounded bg-white/40" />
        <div className="mt-6 h-10 w-full rounded-xl bg-white" />
      </div>
    </div>
  );
}
function ScreenList() {
  return (
    <div className="h-full w-full shrink-0 bg-cloud p-4">
      <div className="mt-6 mb-4 h-3.5 w-1/2 rounded bg-ink/80" />
      {["#35E5F5", "#865DFF", "#65F2C6", "#4776FF", "#fcdd71"].map((c) => (
        <div key={c} className="mb-2.5 flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm">
          <span className="size-8 rounded-lg" style={{ background: c }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-ink/60" />
            <div className="h-1.5 w-1/2 rounded bg-ink/15" />
          </div>
        </div>
      ))}
    </div>
  );
}
function ScreenStats() {
  return (
    <div className="h-full w-full shrink-0 bg-midnight p-4 text-white">
      <div className="mt-6 h-3.5 w-1/2 rounded bg-white/80" />
      <div className="mt-5 grid h-28 grid-cols-6 items-end gap-1.5 rounded-xl bg-white/5 p-3">
        {[40, 70, 55, 90, 65, 80].map((h, i) => (
          <span key={i} className="rounded-t bg-gradient-to-t from-electric to-cyan" style={{ height: `${h}%`, transformOrigin: "bottom", animation: `bar-grow 2.4s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-xl bg-white/5 p-3">
            <div className="size-5 rounded-md bg-mint" />
            <div className="mt-3 h-2 w-3/4 rounded bg-white/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Premium smartphone with auto-cycling app screens. Add `data-tilt` on a wrapper for scroll-linked rotation. */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[9/19] w-[240px] [transform-style:preserve-3d]", className)} role="img" aria-label="Animated mobile application screens">
      <div className="absolute inset-0 rounded-[44px] bg-gradient-to-br from-[#2a3350] to-[#0b1124] p-[9px] shadow-[0_60px_100px_-40px_rgb(8_13_31/0.75),inset_0_0_0_1.5px_rgb(255_255_255/0.12)]">
        <div className="relative h-full overflow-hidden rounded-[36px] bg-black">
          <div className="flex h-full w-full motion-safe:animate-[screen-cycle_12s_var(--ease-expo)_infinite]">
            <ScreenOnboard />
            <ScreenList />
            <ScreenStats />
          </div>
          <div className="absolute top-2.5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60 mix-blend-difference" />
        </div>
      </div>
      <div className="absolute top-24 -left-[3px] h-10 w-[3px] rounded-l bg-[#2a3350]" />
      <div className="absolute top-28 -right-[3px] h-16 w-[3px] rounded-r bg-[#2a3350]" />
    </div>
  );
}
