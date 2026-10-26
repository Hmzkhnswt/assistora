import { marqueeTechnologies } from "@/data/technologies";
import { BrandGlyph } from "@/components/ui/TechBadge";
import { RevealWords } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...marqueeTechnologies].reverse() : marqueeTechnologies;
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <ul
        className={cn("flex shrink-0 gap-3 pr-3 motion-safe:animate-marquee hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}
        style={{ animationDuration: reverse ? "54s" : "46s" }}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={`${t.name}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="group flex h-16 items-center gap-3 rounded-2xl border border-ink/[0.07] bg-cloud px-6 text-[17px] font-semibold whitespace-nowrap text-ink/55 transition-colors duration-300 hover:border-electric/30 hover:text-ink"
          >
            {t.icon ? (
              <BrandGlyph name={t.name} className="size-5 text-ink/45 transition-colors group-hover:text-electric" />
            ) : (
              <span aria-hidden="true" className="grid size-5 place-items-center rounded-md bg-ink/10 text-[9px] font-bold text-ink/60">
                {t.name.slice(0, 2).toUpperCase()}
              </span>
            )}
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section aria-labelledby="platforms-title" className="relative bg-white section-y">
      <div className="container-x mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="platforms-title" data-reveal-words className="text-h2 max-w-2xl font-semibold">
          <RevealWords text="Built Across the Platforms You Trust." />
        </h2>
        <p data-reveal className="max-w-sm text-muted">
          Hands-on engineering across the leading cloud, container, data and application technologies. Trademarks belong to their respective owners; listing does not imply a partnership.
        </p>
      </div>
      <div className="space-y-3">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
