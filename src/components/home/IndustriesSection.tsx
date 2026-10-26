import Link from "next/link";
import { industries } from "@/data/industries";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, ArrowCircle } from "@/components/ui/Button";

export function IndustryGrid() {
  return (
    <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((ind) => (
        <li key={ind.slug}>
          <Link
            href={`/industries/${ind.slug}`}
            className="group relative flex h-full sm:min-h-[240px] flex-col overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-ink/[0.07] transition-all duration-500 ease-expo hover:-translate-y-1 hover:text-white hover:shadow-[0_30px_60px_-30px_rgb(8_13_31/0.5)]"
            style={{ ["--accent" as string]: ind.accent }}
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(150deg,var(--accent),#080D1F_85%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon name={ind.icon} aria-hidden="true" className="absolute -right-6 -bottom-6 size-36 text-ink/[0.04] transition-all duration-700 ease-expo group-hover:-translate-y-2 group-hover:text-white/10" />
            <span className="relative grid size-12 place-items-center rounded-2xl bg-cloud ring-1 ring-ink/[0.06] transition-colors group-hover:bg-white/15 group-hover:ring-white/20" style={{ color: ind.accent }}>
              <Icon name={ind.icon} className="size-6 group-hover:text-white" />
            </span>
            <h3 className="relative mt-6 text-xl sm:mt-auto sm:pt-10 font-semibold tracking-[-0.02em]">{ind.title}</h3>
            <p className="relative mt-2 line-clamp-2 text-sm text-muted transition-colors group-hover:text-white/75">{ind.summary}</p>
            <ArrowCircle className="absolute top-6 right-6 text-ink group-hover:text-white" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function IndustriesSection() {
  return (
    <section aria-labelledby="industries-title" className="relative bg-[#f1f2f9] section-y">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="industries-title"
            eyebrow="Industries"
            title="Technology Built for Every Ambition."
            description="Engineering approaches shaped around the regulatory, operational and customer realities of each sector."
          />
          <div data-reveal>
            <ButtonLink href="/industries" variant="secondary" track="industries-explore">
              Explore Industries
            </ButtonLink>
          </div>
        </div>
        <IndustryGrid />
      </div>
    </section>
  );
}
