import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { megaMenu, serviceCategories, serviceHref } from "@/data/services";
import { technologies } from "@/data/technologies";
import { engagementModels, engineeringProcess, servicesFaqs } from "@/data/company";
import { contactHref } from "@/data/site-config";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceDirectory } from "@/components/services/ServiceDirectory";
import { CloudPlatformTabs } from "@/components/home/CloudSpotlight";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { HeroMosaic, HeroStrip } from "@/components/hero/HeroMosaic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TechBadge } from "@/components/ui/TechBadge";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Technology Services — Cloud, DevOps, AI, Security & Software Engineering",
  description:
    "Explore Assistora's end-to-end technology services: cloud computing, DevOps, artificial intelligence, cybersecurity, data engineering, web, mobile and custom software engineering.",
  path: "/services",
});

const techCategories = [
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps & Platform" },
  { id: "ai-data", label: "AI & Data" },
  { id: "software", label: "Software" },
  { id: "security", label: "Security" },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Technology Services Built Around Your Ambitions."
        description="Assistora is one accountable engineering partner across the full technology lifecycle — from strategy and architecture to cloud platforms, intelligent software, security and ongoing operations."
        actions={
          <>
            <ButtonLink href={contactHref(undefined, "services-hero")} arrow="up-right" track="services-hero-contact">
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="#directory" variant="outline-light">
              Browse Services
            </ButtonLink>
          </>
        }
        visual={
          <>
            <div aria-hidden="true" className="relative hidden h-[520px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] lg:block">
              <HeroMosaic />
            </div>
            <div aria-hidden="true" className="lg:hidden">
              <HeroStrip />
            </div>
          </>
        }
      />

      {/* 2. Directory */}
      <section id="directory" aria-labelledby="directory-title" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading id="directory-title" eyebrow="Service directory" title="Every capability, one engineering team." className="mb-10" />
          <ServiceDirectory />
        </div>
      </section>

      {/* 3. Categories */}
      <section aria-labelledby="categories-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="categories-title" eyebrow="Service categories" title="Organised around the problems you solve." className="mb-14" />
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {serviceCategories.map((cat) => {
              const group = megaMenu.find((g) => g.category === cat.id)!;
              return (
                <div key={cat.id} data-reveal className="grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                  <div className="flex gap-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric to-violet text-white">
                      <Icon name={cat.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em]">{cat.title}</h3>
                      <p className="mt-2 text-muted">{cat.description}</p>
                    </div>
                  </div>
                  <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                    {group.links.map((l) => (
                      <li key={l.label}>
                        <Link href={serviceHref(l.service, l.anchor)} className="group flex items-center justify-between gap-3 border-b border-ink/[0.06] py-3 font-medium transition-colors hover:text-electric">
                          <span className="flex items-center gap-3">
                            <Icon name={l.icon} className="size-4 text-electric" />
                            {l.label}
                          </span>
                          <ArrowUpRight aria-hidden="true" className="size-4 opacity-30 transition-all group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Multi-cloud */}
      <section aria-labelledby="multicloud-title" className="relative overflow-hidden bg-midnight section-y text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative">
          <SectionHeading
            id="multicloud-title"
            dark
            eyebrow="Multi-cloud expertise"
            title="AWS, Google Cloud and Azure — engineered by the same team."
            description="Choose the right platform for each workload without juggling separate vendors."
            className="mb-12"
          />
          <CloudPlatformTabs idBase="svc-cloud" />
        </div>
      </section>

      {/* 5. Ecosystem */}
      <section aria-labelledby="ecosystem-title" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading
            id="ecosystem-title"
            eyebrow="Technology ecosystem"
            title="Modern, proven technologies."
            description="We choose well-supported technologies your team can own long term. Trademarks belong to their respective owners."
            className="mb-12"
          />
          <div data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {techCategories.map((c) => (
              <div key={c.id} className="rounded-[22px] bg-white p-5 ring-1 ring-ink/[0.07]">
                <h3 className="text-[12px] font-semibold tracking-[0.16em] text-electric uppercase">{c.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {technologies
                    .filter((t) => t.category === c.id)
                    .map((t) => (
                      <li key={t.name}>
                        <TechBadge name={t.name} />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Engagement models */}
      <section id="engagement" aria-labelledby="engagement-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="engagement-title" eyebrow="Engagement models" title="Work with us the way that suits you." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m, i) => (
              <li key={m.title} className={i === 1 ? "rounded-[24px] bg-ink p-7 text-white" : "rounded-[24px] bg-cloud p-7 ring-1 ring-ink/[0.06]"}>
                <Icon name={m.icon} className={i === 1 ? "size-7 text-cyan" : "size-7 text-electric"} />
                <h3 className="mt-8 text-xl font-semibold">{m.title}</h3>
                <p className={i === 1 ? "mt-3 text-white/75" : "mt-3 text-muted"}>{m.text}</p>
                <p className={i === 1 ? "mt-6 border-t border-white/15 pt-4 text-sm text-white/60" : "mt-6 border-t border-ink/10 pt-4 text-sm text-ink/55"}>
                  <span className="font-semibold">Best for:</span> {m.bestFor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Methodology */}
      <section aria-labelledby="method-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="method-title"
              eyebrow="Engineering methodology"
              title="A delivery approach built to reduce risk."
              description="Short iterations, early validation and automation at every stage keep projects predictable and outcomes measurable."
            />
          </div>
          <ProcessTimeline steps={engineeringProcess} />
        </div>
      </section>

      {/* 8. FAQs */}
      <section aria-labelledby="faq-title" className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="FAQs" title="Questions we're often asked." />
          <FAQAccordion faqs={servicesFaqs} />
        </div>
        <JsonLd data={faqSchema(servicesFaqs)} />
      </section>

      {/* 9. CTA */}
      <CTABanner
        title="Not sure which service you need?"
        description="Describe your challenge and an Assistora engineer will recommend the right approach — no obligation."
        primary={{ label: "Book a Consultation", href: contactHref(undefined, "services-cta"), track: "services-cta" }}
        secondary={{ label: "View Solutions", href: "/solutions" }}
      />
    </>
  );
}
