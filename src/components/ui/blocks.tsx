import Link from "next/link";
import { Check } from "lucide-react";
import type { ProcessStep, TechGroup, TitledText } from "@/types/content";
import { BrandGlyph } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";

/** Numbered challenge cards on a dark band. */
export function ChallengeGrid({ items, dark = true }: { items: TitledText[]; dark?: boolean }) {
  return (
    <ol data-reveal-stagger className="grid gap-4 sm:grid-cols-2">
      {items.map((c, i) => (
        <li key={c.title} className={cn("relative overflow-hidden rounded-[22px] p-6 sm:p-8", dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-ink/[0.07]")}>
          <span className={cn("font-display text-5xl font-semibold tracking-[-0.03em]", dark ? "text-white/10" : "text-ink/10")}>0{i + 1}</span>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{c.title}</h3>
          <p className={cn("mt-2 leading-relaxed", dark ? "text-slate" : "text-muted")}>{c.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Benefits as a bordered editorial grid with check marks. */
export function BenefitGrid({ items }: { items: TitledText[] }) {
  return (
    <ul data-reveal-stagger className="grid gap-px overflow-hidden rounded-[24px] bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-4">
      {items.map((b) => (
        <li key={b.title} className="bg-white p-7">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-electric to-violet text-white">
            <Check aria-hidden="true" className="size-5" />
          </span>
          <h3 className="mt-6 text-lg font-semibold">{b.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Grouped technology stack with brand glyphs where licensed. */
export function TechGroups({ groups, dark = false }: { groups: TechGroup[]; dark?: boolean }) {
  return (
    <div data-reveal-stagger className="grid gap-4 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.label} className={cn("rounded-[22px] p-6", dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-ink/[0.07]")}>
          <h3 className={cn("text-[12px] font-semibold tracking-[0.16em] uppercase", dark ? "text-cyan" : "text-electric")}>{g.label}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map((t) => (
              <li key={t} className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium", dark ? "bg-white/[0.06] text-white/85" : "bg-cloud text-ink/80 ring-1 ring-ink/[0.06]")}>
                <BrandGlyph name={t} className="size-3.5 opacity-70" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Horizontal numbered steps (used for solution approaches). */
export function StepRow({ steps }: { steps: (TitledText | ProcessStep)[] }) {
  return (
    <ol data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-[22px] bg-white p-6 ring-1 ring-ink/[0.07]">
          <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
          <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function LinkPills({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white">
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
