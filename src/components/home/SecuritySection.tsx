import Link from "next/link";
import { ShieldVisual } from "@/components/visuals/ShieldVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RevealWords } from "@/components/ui/SectionHeading";
import { serviceHref } from "@/data/services";
import type { IconName } from "@/types/content";

const items: { title: string; icon: IconName; anchor: string }[] = [
  { title: "Cloud Security", icon: "cloud", anchor: "cloud-security" },
  { title: "Application Security", icon: "code", anchor: "application-security" },
  { title: "DevSecOps", icon: "workflow", anchor: "devsecops" },
  { title: "Identity & Access Management", icon: "key", anchor: "iam" },
  { title: "Vulnerability Assessment", icon: "search", anchor: "vulnerability-assessment" },
  { title: "Security Architecture", icon: "layers", anchor: "zero-trust" },
];

export function SecuritySection() {
  return (
    <section aria-labelledby="security-title" className="relative overflow-hidden bg-deep section-y text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(101,242,198,0.12),transparent_60%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div data-reveal className="order-2 lg:order-1">
          <ShieldVisual />
        </div>
        <div className="order-1 lg:order-2">
          <p data-reveal className="mb-5 text-[12px] font-semibold tracking-[0.18em] text-mint uppercase">
            Cybersecurity
          </p>
          <h2 id="security-title" data-reveal-words className="text-h2 font-semibold text-balance">
            <RevealWords text="Security Is Not an Add-On. It's the Foundation." />
          </h2>
          <p data-reveal className="text-lead mt-6 text-slate">
            We engineer protection into cloud platforms, applications and delivery pipelines — reducing risk without slowing the business down.
          </p>
          <ul data-reveal-stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i.title}>
                <Link href={serviceHref("cybersecurity", i.anchor)} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-mint/40 hover:bg-mint/[0.06]">
                  <Icon name={i.icon} className="size-5 text-mint" />
                  <span className="font-medium">{i.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <ButtonLink href="/services/cybersecurity" variant="light" track="security-explore">
              Explore Cybersecurity
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
