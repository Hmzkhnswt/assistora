import { BadgeCheck, ExternalLink } from "lucide-react";
import { certificationCategories } from "@/data/certifications";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CertificationShowcase({ dark = false }: { dark?: boolean }) {
  return (
    <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {certificationCategories.map((c, i) => (
        <li
          key={c.id}
          className={
            i === 0
              ? "rounded-[24px] bg-gradient-to-br from-electric to-violet p-6 text-white sm:row-span-2 sm:flex sm:flex-col"
              : dark
                ? "rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
                : "rounded-[24px] bg-cloud p-6 ring-1 ring-ink/[0.06]"
          }
        >
          <span className={i === 0 ? "grid size-12 place-items-center rounded-2xl bg-white/15" : "grid size-12 place-items-center rounded-2xl bg-white text-electric shadow-sm ring-1 ring-ink/[0.06]"}>
            <Icon name={c.icon} className="size-6" />
          </span>
          <h3 className={i === 0 ? "mt-6 text-2xl font-semibold sm:mt-auto" : "mt-5 text-lg font-semibold"}>{c.title}</h3>
          <p className={i === 0 ? "mt-2 text-white/80" : dark ? "mt-2 text-sm text-slate" : "mt-2 text-sm text-muted"}>{c.description}</p>
          {c.credentials.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {c.credentials.map((cr) => (
                <li key={cr.name}>
                  <a href={cr.verificationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
                    <BadgeCheck aria-hidden="true" className="size-4 text-mint" /> {cr.name}
                    <ExternalLink aria-hidden="true" className="size-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={i === 0 ? "mt-4 text-xs text-white/60" : "mt-4 text-xs text-ink/40"}>Credentials listed after verification</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CertificationsSection() {
  return (
    <section aria-labelledby="certs-title" className="relative bg-white section-y">
      <div className="container-x">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading id="certs-title" eyebrow="Certified Engineering Expertise" title="Expertise Backed by Recognized Credentials." />
          <p data-reveal className="text-muted">
            Our engineers build and validate their skills through recognised industry certification programmes. We publish individual credentials only once they are verified, each linked to its official verification record.
          </p>
        </div>
        <CertificationShowcase />
      </div>
    </section>
  );
}
