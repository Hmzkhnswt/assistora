import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices, services } from "@/data/services";
import { getIndustries } from "@/data/industries";
import { contactHref } from "@/data/site-config";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { PipelineVisual } from "@/components/visuals/PipelineVisual";
import { CloudPlatformTabs } from "@/components/home/CloudSpotlight";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, ArrowCircle } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { BenefitGrid, ChallengeGrid, TechGroups } from "@/components/ui/blocks";
import { TrackEvent } from "@/components/animations/TrackEvent";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.seo.title, description: s.seo.description, keywords: s.seo.keywords, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getServices(service.relatedServices);
  const industries = getIndustries(service.industries);
  const contact = contactHref(service.slug, `service-${service.slug}`);

  return (
    <>
      <TrackEvent event="service_page_view" params={{ service: service.slug }} />
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />

      {/* 1. Hero */}
      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        eyebrow={service.eyebrow}
        title={service.heroHeadline}
        description={service.heroDescription}
        accent={service.accent}
        actions={
          <>
            <ButtonLink href={contact} arrow="up-right" track={`service-hero-${service.slug}`}>
              {service.ctaLabel}
            </ButtonLink>
            <ButtonLink href="#capabilities" variant="outline-light">
              Explore capabilities
            </ButtonLink>
          </>
        }
        visual={<ServiceVisual visual={service.visual} />}
      >
        <ul data-reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: service.accent }} />
              {h}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* 2. Overview */}
      <section aria-labelledby="overview-title" className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="overview-title" eyebrow="Overview" title={`${service.title} at Assistora`} />
          <div data-reveal className="space-y-6 text-lg leading-relaxed text-muted">
            {service.overview.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Challenges */}
      <section aria-labelledby="challenges-title" className="relative overflow-hidden bg-midnight section-y text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-x relative">
          <SectionHeading id="challenges-title" dark eyebrow="Business challenges" title="The problems we help you solve." className="mb-12" />
          <ChallengeGrid items={service.challenges} />
        </div>
      </section>

      {/* 4. Capabilities */}
      <section id="capabilities" aria-labelledby="capabilities-title" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            title="What we deliver."
            description={`End-to-end ${service.title.toLowerCase()} expertise, from strategy through implementation and ongoing operation.`}
            className="mb-12"
          />
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c) => (
              <li
                key={c.id}
                id={c.id}
                className="group rounded-[22px] bg-white p-6 ring-1 ring-ink/[0.07] transition-all duration-500 target:ring-2 target:ring-electric target:shadow-[0_0_0_6px_rgb(71_118_255/0.12)] hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="grid size-11 place-items-center rounded-xl text-white transition-transform duration-500 ease-expo group-hover:rotate-[-6deg]" style={{ background: `linear-gradient(135deg, ${service.accent}, #865DFF)` }}>
                  <Icon name={c.icon ?? service.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service-specific interactive deep dives */}
      {service.slug === "cloud-computing" && (
        <section aria-labelledby="platforms-deep-title" className="relative overflow-hidden bg-midnight section-y text-white">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
          <div className="container-x relative">
            <SectionHeading id="platforms-deep-title" dark eyebrow="Platform capabilities" title="AWS, Google Cloud and Azure — compared by fit, not familiarity." className="mb-12" />
            <CloudPlatformTabs idBase="cc-cloud" />
          </div>
        </section>
      )}
      {service.slug === "devops-platform-engineering" && (
        <section aria-labelledby="pipeline-deep-title" className="relative overflow-hidden bg-midnight section-y text-white">
          <div className="container-x relative">
            <SectionHeading id="pipeline-deep-title" dark eyebrow="Interactive pipeline" title="Every commit, from repository to production." className="mb-12" />
            <PipelineVisual />
          </div>
        </section>
      )}

      {/* 5. Technologies */}
      <section aria-labelledby="tech-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading
            id="tech-title"
            eyebrow="Platforms & technologies"
            title="The stack we work with."
            description="Technology choices are always driven by your context. Listing a technology does not imply a vendor partnership."
            className="mb-12"
          />
          <TechGroups groups={service.technologies} />
        </div>
      </section>

      {/* 6. Typical solutions */}
      <section aria-labelledby="solutions-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x">
          <SectionHeading id="solutions-title" eyebrow="Typical solutions" title="Where clients usually start." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-2">
            {service.solutions.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-[22px] bg-white p-6 ring-1 ring-ink/[0.07] sm:p-8">
                <span className="font-display text-sm font-semibold" style={{ color: service.accent }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Process */}
      <section aria-labelledby="process-title" className="bg-white section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="process-title" eyebrow="Delivery process" title="How we deliver." description="A clear, iterative path from discovery to measurable results." />
          </div>
          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* 8. Benefits */}
      <section aria-labelledby="benefits-title" className="bg-cloud section-y">
        <div className="container-x">
          <SectionHeading id="benefits-title" eyebrow="Business benefits" title="What it means for your business." className="mb-12" />
          <BenefitGrid items={service.benefits} />
        </div>
      </section>

      {/* 9. Industries */}
      <section aria-labelledby="industries-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="industries-title" eyebrow="Relevant industries" title="Applied across sectors." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}`} className="group flex h-full flex-col rounded-[22px] bg-cloud p-6 ring-1 ring-ink/[0.06] transition-colors hover:bg-ink hover:text-white">
                  <Icon name={ind.icon} className="size-7" style={{ color: ind.accent }} />
                  <span className="mt-8 text-lg font-semibold">{ind.title}</span>
                  <span className="mt-2 line-clamp-2 text-sm text-muted group-hover:text-white/70">{ind.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. FAQs */}
      <section aria-labelledby="faq-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="FAQs" title={`${service.shortTitle} questions, answered.`} />
          <FAQAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* 11. Related services */}
      <section aria-labelledby="related-title" className="bg-white section-y">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading id="related-title" eyebrow="Related services" title="Often delivered together." />
            <Link href="/services" className="group hidden items-center gap-3 font-semibold sm:inline-flex">
              All services <ArrowCircle />
            </Link>
          </div>
          <div data-reveal-stagger className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA */}
      <CTABanner
        title={`Ready to talk ${service.shortTitle.toLowerCase() === "ai" ? "AI" : service.title.toLowerCase()}?`}
        description="Share your goals and constraints. An Assistora engineer will respond with practical next steps."
        primary={{ label: service.ctaLabel, href: contact, track: `service-cta-${service.slug}` }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </>
  );
}
