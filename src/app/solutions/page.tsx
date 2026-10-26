import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { getServices } from "@/data/services";
import { contactHref } from "@/data/site-config";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, ArrowCircle } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTABanner } from "@/components/ui/CTABanner";
import { IndustryGrid } from "@/components/home/IndustriesSection";

export const metadata = buildMetadata({
  title: "Solutions — Cloud Migration, Enterprise AI, DevOps & Data Modernisation",
  description: "Outcome-focused technology solutions from Assistora: cloud migration, enterprise AI, DevOps transformation, digital product engineering, cloud security and data modernisation.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", href: "/solutions" }]}
        eyebrow="Solutions"
        title="Outcomes First. Technology Second."
        description="Our solutions combine several Assistora services into proven approaches for the transformations businesses undertake most often — each designed around a clear business outcome."
        actions={
          <ButtonLink href={contactHref(undefined, "solutions-hero")} arrow="up-right" track="solutions-hero">
            Discuss Your Goals
          </ButtonLink>
        }
      />

      <section aria-labelledby="solutions-list" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading id="solutions-list" eyebrow="Our solutions" title="Six ways we create lasting impact." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-5 md:grid-cols-2">
            {solutions.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.07] transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(8_13_31/0.35)] sm:p-9"
                >
                  <span aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: s.accent }} />
                  <div className="relative flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.accent}, #865DFF)` }}>
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <span className="font-display text-sm text-ink/30">0{i + 1}</span>
                  </div>
                  <h2 className="relative mt-10 text-h3 font-semibold">{s.title}</h2>
                  <p className="relative mt-3 leading-relaxed text-muted">{s.summary}</p>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {getServices(s.services).map((svc) => (
                      <li key={svc.slug} className="rounded-full bg-cloud px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-ink/[0.06]">
                        {svc.title}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto flex items-center justify-between pt-8 font-semibold">
                    Explore solution <ArrowCircle />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="by-industry" className="bg-[#f1f2f9] section-y">
        <div className="container-x">
          <SectionHeading id="by-industry" eyebrow="By industry" title="Solutions shaped for your sector." className="mb-12" />
          <IndustryGrid />
        </div>
      </section>

      <CTABanner
        title="Have a transformation in mind?"
        description="Tell us where you are today and where you want to be. We'll outline a practical path to get there."
        primary={{ label: "Start a Conversation", href: contactHref(undefined, "solutions-cta"), track: "solutions-cta" }}
        secondary={{ label: "Browse Services", href: "/services" }}
      />
    </>
  );
}
