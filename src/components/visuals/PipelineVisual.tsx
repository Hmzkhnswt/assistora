"use client";

import { useEffect, useRef, useState } from "react";
import { Box, CheckCircle2, CircleDot, FlaskConical, GitBranch, Hammer, Rocket, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: "code", label: "Code Repository", icon: GitBranch, detail: "Trunk-based development, pull-request checks and signed commits trigger every pipeline run." },
  { id: "build", label: "Build", icon: Hammer, detail: "Cached, reproducible builds produce versioned artefacts in minutes rather than hours." },
  { id: "test", label: "Test", icon: FlaskConical, detail: "Unit, contract and end-to-end tests plus security scans run in parallel as quality gates." },
  { id: "container", label: "Containerize", icon: Box, detail: "Minimal, scanned and signed container images are pushed to a governed registry." },
  { id: "deploy", label: "Deploy", icon: Rocket, detail: "GitOps promotion with canary or blue-green releases and automatic rollback on failure." },
  { id: "monitor", label: "Monitor", icon: Activity, detail: "Metrics, logs, traces and SLO alerts close the loop and feed the next iteration." },
];

/** Interactive CI/CD pipeline: stages light up sequentially; selecting a stage explains it. */
export function PipelineVisual({ dark = true, className }: { dark?: boolean; className?: string }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => setStep((s) => (s + 1) % (stages.length + 2)), 1100);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const shown = selected ?? Math.min(step, stages.length - 1);
  const reduceFull = step >= stages.length;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <ol className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-0">
        <span aria-hidden="true" className={cn("absolute top-9 right-[8%] left-[8%] hidden h-0.5 lg:block", dark ? "bg-white/10" : "bg-ink/10")} />
        <span
          aria-hidden="true"
          className="absolute top-9 left-[8%] hidden h-0.5 bg-gradient-to-r from-cyan via-electric to-violet shadow-[0_0_14px_#35E5F5] transition-[width] duration-700 ease-expo lg:block"
          style={{ width: `${(Math.min(step, stages.length - 1) / (stages.length - 1)) * 84}%` }}
        />
        {stages.map((s, i) => {
          const Icon = s.icon;
          const done = reduceFull || i < step;
          const running = !reduceFull && i === step;
          const isSel = selected === i;
          return (
            <li key={s.id} className="relative lg:flex lg:justify-center">
              <button
                type="button"
                onClick={() => setSelected(isSel ? null : i)}
                aria-pressed={isSel}
                className={cn(
                  "group flex w-full flex-col items-start gap-3 rounded-2xl p-3 text-left transition-colors sm:flex-row sm:items-center sm:gap-4 lg:w-auto lg:flex-col lg:gap-3 lg:p-2 lg:text-center",
                  dark ? "hover:bg-white/[0.04]" : "hover:bg-ink/[0.03]",
                  isSel && (dark ? "bg-white/[0.06]" : "bg-ink/[0.04]"),
                )}
              >
                <span
                  className={cn(
                    "relative grid size-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500 ease-expo",
                    done
                      ? "border-transparent bg-gradient-to-br from-electric to-violet text-white shadow-[0_0_30px_-6px_#4776FF]"
                      : running
                        ? "border-cyan bg-cyan/10 text-cyan shadow-[0_0_30px_-6px_#35E5F5]"
                        : dark
                          ? "border-white/10 bg-white/[0.03] text-white/50"
                          : "border-ink/10 bg-white text-ink/40",
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                  <span className="absolute -right-1.5 -bottom-1.5">
                    {done ? (
                      <CheckCircle2 aria-hidden="true" className={cn("size-5 rounded-full text-mint", dark ? "bg-midnight" : "bg-white")} />
                    ) : running ? (
                      <CircleDot aria-hidden="true" className={cn("size-5 animate-pulse rounded-full text-cyan", dark ? "bg-midnight" : "bg-white")} />
                    ) : null}
                  </span>
                </span>
                <span>
                  <span className={cn("block text-[11px] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/40" : "text-ink/40")}>
                    0{i + 1}
                  </span>
                  <span className={cn("block font-display text-[15px] font-semibold", dark ? "text-white" : "text-ink")}>{s.label}</span>
                  <span className={cn("block text-xs", done ? "text-mint" : running ? "text-cyan" : dark ? "text-white/40" : "text-ink/40")}>
                    {done ? "Passed" : running ? "Running…" : "Queued"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div aria-live="polite" className={cn("mt-8 rounded-2xl border p-5 sm:p-6", dark ? "border-white/10 bg-white/[0.03]" : "border-ink/10 bg-white")}>
        <p className={cn("text-[11px] font-semibold tracking-[0.16em] uppercase", dark ? "text-cyan" : "text-electric")}>
          Stage 0{shown + 1} · {stages[shown].label}
        </p>
        <p className={cn("mt-2 leading-relaxed", dark ? "text-slate" : "text-muted")}>{stages[shown].detail}</p>
        <p className={cn("mt-3 text-xs", dark ? "text-white/40" : "text-ink/40")}>Select any stage to explore it.</p>
      </div>
    </div>
  );
}
