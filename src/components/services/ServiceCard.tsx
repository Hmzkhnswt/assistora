import Link from "next/link";
import type { Service } from "@/types/content";
import { heroTiles, serviceTile } from "@/components/hero/tiles";
import { serviceCategories } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { ArrowCircle } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Framed illustration panel: the service's portrait tile floats, slightly tilted, on an
 * accent-lit navy stage. Framing (rather than cropping) keeps every illustration intact
 * at any card aspect ratio.
 */
function ServiceArt({ service, index, wide, className }: { service: Service; index?: number; wide?: boolean; className?: string }) {
  const { Cmp } = heroTiles[serviceTile[service.slug] ?? "brand"];
  return (
    <div
      aria-hidden="true"
      className={cn("relative isolate overflow-hidden rounded-[20px] bg-midnight", className)}
      style={{ backgroundImage: `radial-gradient(120% 90% at 70% 10%, ${service.accent}55, transparent 60%), radial-gradient(80% 70% at 10% 100%, #865DFF33, transparent 70%)` }}
    >
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
      <div className={cn("absolute top-1/2 left-1/2 aspect-[4/5] -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] overflow-hidden rounded-[18px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-expo group-hover:rotate-0 group-hover:scale-[1.05]", wide ? "h-[82%] lg:h-auto lg:w-[74%]" : "h-[82%]")}>
        <Cmp />
      </div>
      <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md">
        <Icon name={service.icon} className="size-5" />
      </span>
      {index !== undefined && <span className="absolute top-4 right-5 font-display text-sm font-medium text-white/50">{String(index + 1).padStart(2, "0")}</span>}
    </div>
  );
}

/** Featured service card. `layout="wide"` places the art beside the copy and previews capabilities. */
export function ServiceCard({
  service,
  layout = "stack",
  index,
  className,
}: {
  service: Service;
  layout?: "stack" | "wide";
  index?: number;
  className?: string;
}) {
  const category = serviceCategories.find((c) => c.id === service.category);
  const techs = service.technologies[0]?.items.slice(0, 3) ?? [];
  const wide = layout === "wide";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "card-surface group relative flex overflow-hidden rounded-[28px] p-2.5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--accent),0_32px_64px_-32px_rgb(8_13_31/0.45)]",
        wide ? "flex-col lg:flex-row" : "flex-col",
        className,
      )}
      style={{ ["--accent" as string]: service.accent }}
    >
      <ServiceArt service={service} index={index} wide={wide} className={wide ? "aspect-[16/11] lg:aspect-auto lg:min-h-[300px] lg:w-[44%] lg:shrink-0" : "aspect-[16/11]"} />
      <div className={cn("flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-6 sm:pb-5", wide && "lg:pt-5")}>
        {category && <p className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: service.accent === "#65F2C6" ? "#0e9f72" : service.accent === "#35E5F5" ? "#0891b2" : service.accent }}>{category.title}</p>}
        <h3 className="mt-2 text-h3 font-semibold text-balance">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{service.shortDescription}</p>
        {wide && (
          <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm text-ink/75 sm:grid-cols-2">
            {service.capabilities.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full" style={{ background: service.accent }} />
                {c.title}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Key technologies">
            {techs.map((t) => (
              <li key={t} className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-ink/70 ring-1 ring-ink/[0.06]">
                {t}
              </li>
            ))}
          </ul>
          <ArrowCircle className="text-ink" />
        </div>
      </div>
    </Link>
  );
}
