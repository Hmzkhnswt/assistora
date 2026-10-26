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
        <div className="absolute -top-48 -left-32 size-[620px] rounded-full opacity-40 blur-[140px]" style={{ background: accent }} />
        <div className="absolute right-0 bottom-0 size-[460px] rounded-full bg-violet/25 blur-[140px]" />
      </div>
      <div className={cn("container-x relative grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:gap-16", visual ? "lg:grid-cols-[1.05fr_1fr] lg:pb-24" : "lg:pb-24", compact && "lg:pb-16")}>
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} className="mb-8" />
          {eyebrow && (
            <div data-reveal className="mb-5">
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 data-reveal-words className="text-h1 font-semibold text-balance">
            <RevealWords text={title} />
          </h1>
          {description && (
            <div data-reveal className="text-lead mt-6 max-w-2xl text-slate">
              {description}
            </div>
          )}
          {actions && (
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              {actions}
            </div>
          )}
          {children}
        </div>
        {visual && (
          <div data-reveal className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
