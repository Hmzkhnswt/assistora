import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow, RevealWords } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  visual,
  accent = "#4776FF",
  children,
  compact = false,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  accent?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-midnight text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_30%_30%,#000,transparent_75%)]" />
        <div className="absolute -top-48 -left-32 size-[760px] rounded-full opacity-45" style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }} />
        <div className="absolute top-[22rem] right-0 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(134_93_255/0.31),transparent)]" />
      </div>
      <div className={cn("container-x relative grid grid-cols-1 items-center gap-12 pt-32 pb-16 sm:pt-36 lg:gap-16", visual ? "lg:grid-cols-[1.05fr_1fr] lg:pb-24" : "lg:pb-24", compact && "lg:pb-16")}>
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} className="mb-8" />
          {eyebrow && (
            <div className="intro-rise mb-5" style={{ ["--d" as string]: "0.05s" }}>
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="intro-words text-h1 font-semibold text-balance">
            <RevealWords text={title} />
          </h1>
          {description && (
            <div className="intro-rise-solid text-lead mt-6 max-w-2xl text-slate" style={{ ["--d" as string]: "0.3s" }}>
              {description}
            </div>
          )}
          {actions && (
            <div className="intro-rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "0.42s" }}>
              {actions}
            </div>
          )}
          {children}
        </div>
        {visual && (
          <div className="hero-visual intro-rise relative mx-auto w-full max-w-[480px] lg:max-w-none" style={{ ["--d" as string]: "0.35s" }}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
