import { CalendarDays, Globe, Mail, MapPin, MessageSquare, Search, FileText } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";
import { serviceOptions } from "@/lib/contact-schema";
import { getService } from "@/data/services";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Contact Assistora — Start Your Project",
  description: "Tell us about your project, infrastructure or technology challenge. Assistora's engineering team will help you find the right solution.",
  path: "/contact",
});

const next = [
  { icon: MessageSquare, title: "We review your inquiry", text: "An engineer — not a sales script — reads your message." },
  { icon: Search, title: "Discovery conversation", text: "A focused call to understand goals, constraints and context." },
  { icon: FileText, title: "Recommended approach", text: "A clear proposal with scope, approach and next steps." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const requested = typeof sp.service === "string" ? sp.service : undefined;
  const defaultService = serviceOptions.some((o) => o.value === requested) ? requested : undefined;
  const source = typeof sp.source === "string" ? sp.source.slice(0, 80) : undefined;
  const preselected = defaultService ? getService(defaultService) : undefined;
  const linkedin = siteConfig.social.linkedin;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Let's Build What's Next."
        description="Tell us about your project, infrastructure, or technology challenge. Our engineering team is ready to explore the right solution."
        compact
      />
      <section aria-label="Contact Assistora" className="bg-cloud section-y-sm">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <aside className="space-y-6">
            {preselected && (
              <div className="rounded-[22px] bg-gradient-to-br from-electric to-violet p-6 text-white">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-white/70 uppercase">You&apos;re asking about</p>
                <p className="mt-2 font-display text-2xl font-semibold">{preselected.title}</p>
                <p className="mt-2 text-sm text-white/80">We&apos;ve preselected this service in the form. You can change it at any time.</p>
              </div>
            )}
            <div className="rounded-[22px] bg-white p-6 ring-1 ring-ink/[0.07]">
              <ul className="space-y-5">
                {siteConfig.email && (
                  <li className="flex gap-4">
                    <Mail aria-hidden="true" className="mt-0.5 size-5 text-electric" />
                    <div>
                      <p className="text-sm text-muted">Business inquiries</p>
                      <a href={`mailto:${siteConfig.email}`} className="font-semibold hover:text-electric">
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                )}
                <li className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 text-electric" />
                  <div>
                    <p className="text-sm text-muted">Headquarters</p>
                    <p className="font-semibold">{siteConfig.headquarters.country}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Globe aria-hidden="true" className="mt-0.5 size-5 text-electric" />
                  <div>
                    <p className="text-sm text-muted">Service coverage</p>
                    <p className="font-semibold">Global — remote-first delivery</p>
                  </div>
                </li>
                {siteConfig.bookingUrl && (
                  <li className="flex gap-4">
                    <CalendarDays aria-hidden="true" className="mt-0.5 size-5 text-electric" />
                    <div>
                      <p className="text-sm text-muted">Prefer to talk?</p>
                      <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" data-booking className="font-semibold hover:text-electric">
                        Book a consultation
                      </a>
                    </div>
                  </li>
                )}
                {linkedin && (
                  <li className="flex gap-4">
                    <span aria-hidden="true" className="mt-0.5 grid size-5 place-items-center rounded bg-action text-[10px] font-bold text-white">
                      in
                    </span>
                    <div>
                      <p className="text-sm text-muted">Follow us</p>
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-electric">
                        Assistora on LinkedIn
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-[22px] bg-midnight p-6 text-white">
              <p className="font-display text-xl font-semibold">What happens next</p>
              <ol className="mt-5 space-y-5">
                {next.map((n, i) => (
                  <li key={n.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                      <n.icon aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold">
                        {i + 1}. {n.title}
                      </p>
                      <p className="mt-0.5 text-sm text-slate">{n.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div>
            <ContactForm defaultService={defaultService} source={source} />
          </div>
        </div>
      </section>
    </>
  );
}
