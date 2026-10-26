"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cloudPlatforms } from "@/data/cloud-platforms";
import { CloudVisual, type CloudPlatform } from "@/components/visuals/CloudVisual";
import { TabList } from "@/components/ui/Tabs";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Interactive multi-cloud tabs — reused on the homepage and the Cloud Computing service page. */
export function CloudPlatformTabs({ idBase = "cloud" }: { idBase?: string }) {
  const [active, setActive] = useState<CloudPlatform>("aws");

  return (
    <div>
      <TabList
        idBase={idBase}
        label="Cloud platforms"
        dark
        value={active}
        onChange={(id) => setActive(id as CloudPlatform)}
        items={cloudPlatforms.map((c) => ({ id: c.id, label: c.name }))}
      />
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative rounded-[28px] bg-white/[0.02] p-2 ring-1 ring-white/10">
          <CloudVisual active={active} />
        </div>
        {cloudPlatforms.map((c) => (
          <div
            key={c.id}
            role="tabpanel"
            id={`${idBase}-panel-${c.id}`}
            aria-labelledby={`${idBase}-tab-${c.id}`}
            hidden={c.id !== active}
            tabIndex={0}
            className={cn(c.id === active && "animate-[mega-in_0.6s_var(--ease-expo)_both]")}
          >
            <p className="text-[12px] font-semibold tracking-[0.16em] text-cyan uppercase">{c.tagline}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{c.name}</h3>
            <p className="mt-4 leading-relaxed text-slate">{c.description}</p>
            <ul className="mt-6 space-y-3">
              {c.services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${c.name} technologies`}>
              {c.badges.map((b) => (
                <li key={b} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[13px] text-white/75">
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href={c.href} variant="light" track={`cloud-tab-${c.id}`}>
                Explore {c.name} consulting
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CloudSpotlight() {
  return (
    <section aria-labelledby="cloud-title" className="relative overflow-hidden bg-midnight section-y text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden="true" className="absolute -top-60 right-0 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(71_118_255/0.31),transparent)]" />
      <div className="container-x relative">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 text-[12px] font-semibold tracking-[0.18em] text-cyan uppercase">Cloud Engineering</p>
            <h2 id="cloud-title" className="text-h1 font-semibold">
              Cloud Without <span className="text-gradient">Limits.</span>
            </h2>
          </div>
          <div>
            <p className="text-lead text-slate">Architect, migrate, optimize, and operate cloud environments across AWS, Google Cloud, and Microsoft Azure.</p>
            <div className="mt-6">
              <ButtonLink href="/services/cloud-computing" variant="ghost-light" track="cloud-explore">
                Explore Cloud Services
              </ButtonLink>
            </div>
          </div>
        </div>
        <CloudPlatformTabs idBase="home-cloud" />
      </div>
    </section>
  );
}
