import Link from "next/link";
import { additionalServices, getService } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ArrowUpRight } from "lucide-react";

const layout: { slug: string; cls: string; wide?: boolean }[] = [
  { slug: "cloud-computing", cls: "lg:col-span-7", wide: true },
  { slug: "artificial-intelligence", cls: "lg:col-span-5" },
  { slug: "devops-platform-engineering", cls: "lg:col-span-5" },
  { slug: "cybersecurity", cls: "lg:col-span-7", wide: true },
  { slug: "web-development", cls: "lg:col-span-6" },
  { slug: "mobile-app-development", cls: "lg:col-span-6" },
];

export function ServicesOverview() {
  return (
    <section aria-labelledby="expertise-title" className="relative bg-cloud section-y">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="expertise-title"
            eyebrow="Our Expertise"
            title="One Partner. Every Technology Challenge."
            description="From infrastructure to intelligence, we deliver the engineering capabilities businesses need to build, modernize, and scale."
          />
          <div data-reveal>
            <ButtonLink href="/services" variant="secondary" track="services-overview-all">
              View All Services
            </ButtonLink>
          </div>
        </div>

        <div data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {layout.map(({ slug, cls, wide }, i) => {
            const s = getService(slug)!;
            return <ServiceCard key={slug} service={s} index={i} layout={wide ? "wide" : "stack"} className={cls} />;
          })}
        </div>

        <div className="mt-5 grid gap-4 rounded-[26px] bg-white p-3 ring-1 ring-ink/[0.07] md:grid-cols-[220px_1fr]">
          <div className="rounded-[18px] bg-midnight p-6 text-white">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-cyan uppercase">Also delivering</p>
            <p className="mt-3 font-display text-xl leading-tight font-semibold">Complete engineering capability</p>
          </div>
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex h-full items-start gap-3 rounded-[18px] p-4 transition-colors hover:bg-cloud">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cloud text-electric ring-1 ring-ink/[0.06] transition-colors group-hover:bg-electric group-hover:text-white">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1 font-semibold">
                      {s.shortTitle === "Software" ? "Custom Software" : s.title}
                      <ArrowUpRight aria-hidden="true" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">{s.shortDescription}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
