import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { getIndustry, industries } from "@/data/industries";
import { getSolution } from "@/data/solutions";
import { getServices } from "@/data/services";
import { contactHref } from "@/data/site-config";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, ArrowCircle } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { TechList } from "@/components/ui/TechBadge";
import { ChallengeGrid } from "@/components/ui/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return buildMetadata({ title: i.seo.title, description: i.seo.description, path: `/industries/${i.slug}` });
}

function IndustryEmblem({ icon, accent }: { icon: Parameters<typeof Icon>[0]["name"]; accent: string }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-white/15 motion-safe:animate-spin-slow" />
      <div className="absolute inset-[26%] rounded-full blur-2xl" style={{ background: accent, opacity: 0.35 }} />
      <div className="absolute inset-[30%] grid place-items-center rounded-[32%] shadow-2xl" style={{ background: `linear-gradient(140deg, ${accent}, #865DFF)` }}>
        <Icon name={icon} className="size-1/2 text-white" strokeWidth={1.4} />
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <span
            key={i}
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_#35E5F5]"
            style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%`, animation: `pulse-soft 2.6s ease-in-out ${i * 0.3}s infinite` }}
          />
        );
      })}
    </div>
  );
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const services = getServices(industry.services);
  const contact = contactHref(industry.services[0], `industry-${industry.slug}`);

  return (
    <>
      <JsonLd data={faqSchema(industry.faqs)} />
      <PageHero
        crumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.title, href: `/industries/${industry.slug}` },
        ]}
        eyebrow={industry.title}
        title={industry.heroHeadline}
        description={industry.heroDescription}
        accent={industry.accent}
        actions={
          <>
            <ButtonLink href={contact} arrow="up-right" track={`industry-hero-${industry.slug}`}>
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="#solutions" variant="outline-light">
              Relevant solutions
            </ButtonLink>
          </>
        }
        visual={<IndustryEmblem icon={industry.icon} accent={industry.accent} />}
      />

      <section aria-labelledby="challenges-title" className="relative overflow-hidden bg-deep section-y text-white">
        <div className="container-x">
          <SectionHeading id="challenges-title" dark eyebrow="Common technical challenges" title={`What ${industry.title.toLowerCase()} teams tell us.`} className="mb-12" />
          <ChallengeGrid items={industry.challenges} />
        </div>
      </section>

      <section id="solutions" aria-labelledby="solutions-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="solutions-title" eyebrow="Relevant Assistora solutions" title="How we can help." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-3">
            {industry.solutions.map(({ solution, text }) => {
              const s = getSolution(solution)!;
              return (
                <li key={solution}>
                  <Link href={`/solutions/${s.slug}`} className="group flex h-full flex-col rounded-[24px] bg-cloud p-7 ring-1 ring-ink/[0.06] transition-all hover:bg-white hover:shadow-xl">
                    <span className="grid size-12 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.accent}, #865DFF)` }}>
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <h3 className="mt-8 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{text}</p>
                    <span className="mt-auto flex items-center justify-between pt-8 text-sm font-semibold">
                      View solution <ArrowCircle />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="scenarios-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="scenarios-title" eyebrow="Example engagement scenarios" title="What an engagement could look like." />
            <p data-reveal className="mt-6 flex gap-3 rounded-2xl bg-white p-4 text-sm text-muted ring-1 ring-ink/[0.06]">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
              These are illustrative scenarios describing how our services can be applied. They are not case studies or descriptions of past client projects.
            </p>
            <div data-reveal className="mt-10">
              <h3 className="text-[12px] font-semibold tracking-[0.16em] text-electric uppercase">Recommended technologies</h3>
              <TechList items={industry.technologies} className="mt-4" />
            </div>
          </div>
          <ol data-reveal-stagger className="space-y-4">
            {industry.scenarios.map((sc, i) => (
              <li key={sc.title} className="rounded-[22px] bg-white p-6 ring-1 ring-ink/[0.07] sm:p-8">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-ink/40 uppercase">Illustrative scenario 0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{sc.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{sc.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="services-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="services-title" eyebrow="Related services" title="Capabilities we bring." className="mb-12" />
          <div data-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-cloud section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="FAQs" title="Questions from the sector." />
          <FAQAccordion faqs={industry.faqs} />
        </div>
      </section>

      <CTABanner
        title={`Building for ${industry.title.toLowerCase()}?`}
        description="Tell us about your goals and constraints, and we'll recommend a practical engineering approach."
        primary={{ label: "Discuss Your Project", href: contact, track: `industry-cta-${industry.slug}` }}
        secondary={{ label: "All industries", href: "/industries" }}
      />
    </>
  );
}
