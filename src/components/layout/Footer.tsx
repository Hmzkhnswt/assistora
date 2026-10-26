import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Globe } from "lucide-react";
import { companyLinks, contactHref, legalLinks, siteConfig } from "@/data/site-config";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { socialIcons } from "@/lib/tech-icons";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-[12px] font-semibold tracking-[0.18em] text-white/50 uppercase">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    siteConfig.social.linkedin && { label: "LinkedIn", href: siteConfig.social.linkedin, glyph: <span className="text-[13px] font-bold">in</span> },
    siteConfig.social.x && {
      label: "X",
      href: siteConfig.social.x,
      glyph: (
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d={socialIcons.x.path} />
        </svg>
      ),
    },
    siteConfig.social.github && {
      label: "GitHub",
      href: siteConfig.social.github,
      glyph: (
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d={socialIcons.github.path} />
        </svg>
      ),
    },
  ].filter(Boolean) as { label: string; href: string; glyph: React.ReactNode }[];

  return (
    <footer className="relative overflow-hidden bg-[#050916] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-56 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-electric/25 blur-[120px] motion-safe:animate-[pulse-soft_9s_ease-in-out_infinite]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between lg:py-20">
          <div className="max-w-2xl">
            <p className="font-display text-[clamp(2rem,4.3vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Have a challenge worth <span className="text-gradient">engineering?</span>
            </p>
          </div>
          <Link
            href={contactHref(undefined, "footer")}
            data-track="footer-cta"
            className="group inline-flex h-16 items-center gap-4 self-start rounded-full bg-white pr-2 pl-7 text-lg font-semibold text-ink transition-all duration-500 ease-expo hover:bg-cyan md:self-auto"
          >
            Start a conversation
            <span className="grid size-12 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-expo group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-6 leading-relaxed text-slate">{siteConfig.statement}</p>
            <ul className="mt-8 space-y-3 text-[15px] text-white/75">
              <li className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="size-4 text-cyan" /> {siteConfig.headquarters.label}
              </li>
              <li className="flex items-center gap-3">
                <Globe aria-hidden="true" className="size-4 text-cyan" /> Serving clients worldwide
              </li>
              {siteConfig.email && (
                <li className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-4 text-cyan" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                </li>
              )}
            </ul>
            {social.length > 0 && (
              <ul className="mt-8 flex gap-2" aria-label="Social media">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Assistora on ${s.label}`}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                    >
                      {s.glyph}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <FooterColumn title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
          <FooterColumn
            title="Solutions"
            links={[...solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })), { label: "All industries", href: "/industries" }]}
          />
          <div className="grid gap-12">
            <FooterColumn title="Company" links={[...companyLinks]} />
            <FooterColumn title="Industries" links={industries.slice(0, 4).map((i) => ({ label: i.title, href: `/industries/${i.slug}` }))} />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. {siteConfig.philosophy}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
