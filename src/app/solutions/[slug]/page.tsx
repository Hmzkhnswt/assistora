import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/data/solutions";
import { getServices } from "@/data/services";
import { industries } from "@/data/industries";
import { contactHref } from "@/data/site-config";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { TechList } from "@/components/ui/TechBadge";
import { BenefitGrid, LinkPills, StepRow } from "@/components/ui/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return buildMetadata({ title: s.seo.title, description: s.seo.description, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const relatedServices = getServices(solution.services);
  const contact = contactHref(solution.services[0], `solution-${solution.slug}`);
  const relevantIndustries = industries.filter((i) => i.solutions.some((s) => s.solution === solution.slug));

  return (
    <>
      <JsonLd data={faqSchema(solution.faqs)} />
      <PageHero
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: solution.title, href: `/solutions/${solution.slug}` },
        ]}
        eyebrow={`Solution · ${solution.title}`}
        title={solution.heroHeadline}
        description={solution.heroDescription}
        accent={solution.accent}
        actions={
          <>
            <ButtonLink href={contact} arrow="up-right" track={`solution-hero-${solution.slug}`}>
              Discuss {solution.title}
            </ButtonLink>
            <ButtonLink href="#approach" variant="outline-light">
              Our approach
            </ButtonLink>
          </>
        }
        visual={<ServiceVisual visual={solution.visual} />}
      >
        <ul data-reveal className="mt-10 grid max-w-xl grid-cols-2 gap-3">
          {solution.outcomes.map((o) => (
            <li key={o} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85">
              {o}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Challenge */}
      <section aria-labelledby="challenge-title" className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading id="challenge-title" eyebrow="The business challenge" title="Why this is harder than it looks." />
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
              {solution.challenge.intro}
            </p>
          </div>
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2">
            {solution.challenge.points.map((p) => (
              <li key={p.title} className="rounded-[22px] bg-cloud p-6 ring-1 ring-ink/[0.06]">
                <span className="block h-1 w-10 rounded-full" style={{ background: solution.accent }} />
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" aria-labelledby="approach-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x">
          <SectionHeading id="approach-title" eyebrow="Technical approach" title="How we approach it." className="mb-12" />
          <StepRow steps={solution.approach} />
        </div>
      </section>

      {/* Architecture */}
      <section aria-labelledby="arch-title" className="relative overflow-hidden bg-midnight section-y text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="arch-title"
            dark
            eyebrow="Architecture concepts"
            title="A layered reference architecture."
            description="Every engagement is tailored, but these layers form the backbone of a well-engineered solution."
          />
          <ol data-reveal-stagger className="space-y-3">
            {solution.architecture.map((a, i) => (
              <li
                key={a.layer}
                className="grid gap-2 rounded-[20px] border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-6 lg:mr-[var(--mr)] lg:ml-[var(--ml)]"
                style={{ ["--ml" as string]: `${i * 2}%`, ["--mr" as string]: `${(solution.architecture.length - 1 - i) * 2}%` }}
              >
                <span className="flex items-center gap-3 font-display text-lg font-semibold">
                  <span className="size-2.5 rounded-full" style={{ background: solution.accent }} />
                  {a.layer}
                </span>
                <span className="text-slate">{a.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="services-title" eyebrow="Relevant services" title="The capabilities behind this solution." className="mb-12" />
          <div data-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading id="benefits-title" eyebrow="Business benefits" title="The outcomes you can expect." className="mb-12" />
          <BenefitGrid items={solution.benefits} />
        </div>
      </section>

      {/* Methodology */}
      <section aria-labelledby="method-title" className="bg-white section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="method-title" eyebrow="Delivery methodology" title="A phased, low-risk path." description="Indicative durations — actual timelines are agreed after discovery." />
            <div data-reveal className="mt-10">
              <h3 className="text-[12px] font-semibold tracking-[0.16em] text-electric uppercase">Related technologies</h3>
              <TechList items={solution.technologies} className="mt-4" />
            </div>
          </div>
          <ProcessTimeline steps={solution.methodology} />
        </div>
      </section>

      {/* FAQs + industries */}
      <section aria-labelledby="faq-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQs" title="Common questions." />
            {relevantIndustries.length > 0 && (
              <div data-reveal className="mt-10">
                <p className="mb-4 text-[12px] font-semibold tracking-[0.16em] text-electric uppercase">Relevant industries</p>
                <LinkPills items={relevantIndustries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` }))} />
              </div>
            )}
          </div>
          <FAQAccordion faqs={solution.faqs} />
        </div>
      </section>

      <CTABanner
        title={`Let's plan your ${solution.title.toLowerCase()}.`}
        description="A short consultation is the fastest way to understand scope, risks and a realistic path forward."
        primary={{ label: "Book a Consultation", href: contact, track: `solution-cta-${solution.slug}` }}
        secondary={{ label: "All solutions", href: "/solutions" }}
      />
    </>
  );
}
