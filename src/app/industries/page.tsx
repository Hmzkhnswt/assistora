import { buildMetadata } from "@/lib/seo";
import { contactHref } from "@/data/site-config";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { IndustryGrid } from "@/components/home/IndustriesSection";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/content";

export const metadata = buildMetadata({
  title: "Industries — Technology Services for Every Sector",
  description: "Cloud, AI, security and software engineering applied to financial services, healthcare, e-commerce, telecommunications, logistics, education, manufacturing and SaaS.",
  path: "/industries",
});

const principles: { title: string; text: string; icon: IconName }[] = [
  { icon: "scale", title: "Regulation-aware", text: "Architectures shaped around the compliance and data-protection expectations of your sector." },
  { icon: "users", title: "Domain-led discovery", text: "We learn your operating model, customers and constraints before recommending technology." },
  { icon: "shield", title: "Risk-proportionate security", text: "Controls matched to the sensitivity of your data and the threats your industry faces." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }]}
        eyebrow="Industries"
        title="Technology Built for Every Ambition."
        description="Every sector has its own regulations, legacy systems and customer expectations. We apply Assistora's engineering capabilities with those realities in mind."
        actions={
          <ButtonLink href={contactHref(undefined, "industries-hero")} arrow="up-right" track="industries-hero">
            Talk to an Engineer
          </ButtonLink>
        }
      />
      <section aria-labelledby="sectors" className="bg-[#f1f2f9] section-y">
        <div className="container-x">
          <SectionHeading id="sectors" eyebrow="Sectors" title="Choose your industry." className="mb-12" />
          <IndustryGrid />
        </div>
      </section>
      <section aria-labelledby="principles" className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="principles" eyebrow="How we work across sectors" title="Industry context, engineering discipline." />
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="rounded-[22px] bg-cloud p-6 ring-1 ring-ink/[0.06]">
                <Icon name={p.icon} className="size-7 text-electric" />
                <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABanner
        title="Don't see your industry?"
        description="Our engineering capabilities apply across sectors. Tell us about your context and challenge."
        primary={{ label: "Start a Conversation", href: contactHref(undefined, "industries-cta"), track: "industries-cta" }}
        secondary={{ label: "Browse Services", href: "/services" }}
      />
    </>
  );
}
