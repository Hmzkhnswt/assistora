import { buildMetadata } from "@/lib/seo";
import { company, engagementModels, engineeringProcess, globalDelivery, whyAssistora } from "@/data/company";
import { serviceCategories } from "@/data/services";
import { contactHref, siteConfig } from "@/data/site-config";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, RevealWords } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTABanner } from "@/components/ui/CTABanner";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CertificationShowcase } from "@/components/home/CertificationsSection";
import { LazyGlobe } from "@/components/three/LazyGlobe";
import { HeroMosaic } from "@/components/hero/HeroMosaic";

export const metadata = buildMetadata({
  title: "About Assistora — Global Technology Engineering, Headquartered in Pakistan",
  description: "Assistora is a technology services and engineering company headquartered in Pakistan, delivering cloud, DevOps, AI, cybersecurity and software engineering to businesses worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us", href: "/about" }]}
        eyebrow="About Assistora"
        title="Engineering the Future, Together."
        description={siteConfig.statement}
        actions={
          <>
            <ButtonLink href={contactHref(undefined, "about-hero")} arrow="up-right" track="about-hero">
              Work With Us
            </ButtonLink>
            <ButtonLink href="#methodology" variant="outline-light">
              How we work
            </ButtonLink>
          </>
        }
        visual={
          <div aria-hidden="true" className="relative h-[360px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] lg:h-[480px]">
            <HeroMosaic />
          </div>
        }
      />

      {/* 1. Introduction */}
      <section aria-labelledby="intro-title" className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="intro-title" eyebrow="Who we are" title="A technology partner built for ambitious businesses." />
          <div data-reveal className="space-y-6 text-lg leading-relaxed text-muted">
            {company.introduction.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl text-ink" : undefined}>
                {p}
              </p>
            ))}
            <dl className="grid gap-4 border-t border-ink/10 pt-8 text-base sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Headquarters</dt>
                <dd className="mt-1 font-semibold text-ink">{siteConfig.headquarters.country}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Service coverage</dt>
                <dd className="mt-1 font-semibold text-ink">Global, remote-first</dd>
              </div>
              {company.founded && (
                <div>
                  <dt className="text-sm text-muted">Founded</dt>
                  <dd className="mt-1 font-semibold text-ink">{company.founded}</dd>
                </div>
              )}
              {company.teamSize && (
                <div>
                  <dt className="text-sm text-muted">Team</dt>
                  <dd className="mt-1 font-semibold text-ink">{company.teamSize}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* 2–3. Mission & vision */}
      <section aria-label="Mission and vision" className="relative overflow-hidden bg-midnight section-y text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-x relative grid gap-5 lg:grid-cols-2">
          {[
            { label: "Mission", text: company.mission, cls: "from-electric/30" },
            { label: "Vision", text: company.vision, cls: "from-violet/30" },
          ].map((b) => (
            <div key={b.label} data-reveal className={`rounded-[28px] bg-gradient-to-br ${b.cls} to-transparent p-8 ring-1 ring-white/10 sm:p-12`}>
              <p className="text-[12px] font-semibold tracking-[0.18em] text-cyan uppercase">Our {b.label}</p>
              <p className="mt-6 font-display text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.3] font-medium tracking-[-0.02em]">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Philosophy */}
      <section aria-labelledby="philosophy-title" className="bg-white section-y">
        <div className="container-x">
          <p data-reveal className="text-[12px] font-semibold tracking-[0.18em] text-electric uppercase">
            Engineering philosophy
          </p>
          <h2 id="philosophy-title" data-reveal-words className="mt-6 max-w-5xl font-display text-[clamp(2rem,4.6vw,4.1rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            <RevealWords text={siteConfig.philosophy} />
          </h2>
          <ul data-reveal-stagger className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {company.philosophy.map((p, i) => (
              <li key={p.title} className="bg-white p-7">
                <span className="font-display text-sm text-electric">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Values */}
      <section aria-labelledby="values-title" className="bg-gradient-to-br from-lavender via-[#e6ecff] to-[#dcefff] section-y">
        <div className="container-x">
          <SectionHeading id="values-title" eyebrow="Core values" title="What we stand for." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((v) => (
              <li key={v.title} className="group rounded-[24px] bg-white/80 p-7 ring-1 ring-ink/[0.06] backdrop-blur transition-all hover:bg-white hover:shadow-xl">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-electric text-white transition-transform duration-500 ease-expo group-hover:rotate-[-8deg]">
                  <Icon name={v.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Technical expertise */}
      <section aria-labelledby="expertise-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="expertise-title" eyebrow="Technical expertise" title="Depth across the full technology stack." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {serviceCategories.map((c) => (
              <li key={c.id} className="rounded-[22px] bg-cloud p-6 ring-1 ring-ink/[0.06]">
                <Icon name={c.icon} className="size-7 text-electric" />
                <h3 className="mt-6 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.description}</p>
              </li>
            ))}
          </ul>
          <ul data-reveal-stagger className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyAssistora.map((w) => (
              <li key={w.title} className="flex gap-4 border-t border-ink/10 py-6">
                <Icon name={w.icon} className="size-5 shrink-0 text-violet" />
                <div>
                  <p className="font-semibold">{w.title}</p>
                  <p className="mt-1 text-sm text-muted">{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Global delivery */}
      <section aria-labelledby="global-title" className="relative overflow-hidden bg-[#0b1636] section-y text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="global-title" dark eyebrow="Global delivery approach" title="Headquartered in Pakistan. Working worldwide." />
            <ul data-reveal-stagger className="mt-10 space-y-6">
              {globalDelivery.map((g) => (
                <li key={g.title} className="border-l-2 border-cyan/40 pl-5">
                  <p className="font-semibold">{g.title}</p>
                  <p className="mt-1 text-slate">{g.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="mx-auto w-full max-w-[520px]">
            <LazyGlobe />
          </div>
        </div>
      </section>

      {/* 8. Certified expertise */}
      <section aria-labelledby="certs-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading
            id="certs-title"
            eyebrow="Certified team expertise"
            title="Credentials across cloud, security and AI."
            description="Individual certifications are published here only after verification, each linked to its official record."
            className="mb-12"
          />
          <CertificationShowcase />
          {company.leadership.length > 0 && (
            <ul className="mt-16 grid gap-5 md:grid-cols-3">
              {company.leadership.map((l) => (
                <li key={l.name} className="rounded-[22px] bg-cloud p-6">
                  <p className="text-lg font-semibold">{l.name}</p>
                  <p className="text-sm text-electric">{l.role}</p>
                  <p className="mt-3 text-sm text-muted">{l.bio}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 9. Methodology */}
      <section id="methodology" aria-labelledby="method-title" className="bg-[#f1f2f9] section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="method-title" eyebrow="Working methodology" title="Transparent, iterative, measurable." description="The same six-stage approach underpins every Assistora engagement, scaled to the size of the challenge." />
          </div>
          <ProcessTimeline steps={engineeringProcess} />
        </div>
      </section>

      {/* 10. Engagement models */}
      <section id="engagement" aria-labelledby="engage-title" className="bg-white section-y">
        <div className="container-x">
          <SectionHeading id="engage-title" eyebrow="Engagement models" title="Flexible ways to work together." className="mb-12" />
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m) => (
              <li key={m.title} className="rounded-[24px] bg-cloud p-7 ring-1 ring-ink/[0.06]">
                <Icon name={m.icon} className="size-7 text-electric" />
                <h3 className="mt-8 text-xl font-semibold">{m.title}</h3>
                <p className="mt-3 text-muted">{m.text}</p>
                <p className="mt-6 border-t border-ink/10 pt-4 text-sm text-ink/60">
                  <span className="font-semibold">Best for:</span> {m.bestFor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. CTA */}
      <CTABanner
        title="Let's engineer what's next — together."
        description="Whether you're planning a migration, launching a product or exploring AI, we'd love to hear about it."
        primary={{ label: "Contact Assistora", href: contactHref(undefined, "about-cta"), track: "about-cta" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
