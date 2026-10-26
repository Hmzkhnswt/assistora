import { AlertTriangle } from "lucide-react";
import { PageHero } from "./PageHero";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero crumbs={[{ label: title, href: path }]} title={title} description={intro} compact />
      <section className="bg-white section-y-sm">
        <div className="container-x max-w-3xl">
          <div role="note" className="mb-12 flex gap-3 rounded-2xl bg-[#fff8e6] p-5 text-[#7a5600]">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p className="text-sm leading-relaxed">
              <strong>Draft — pending legal review.</strong> This document is a working draft provided for structure only. It has not been reviewed or approved by legal counsel and must be finalised before the website is launched.
            </p>
          </div>
          <div className="space-y-10 text-[17px] leading-relaxed text-ink/80">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`legal-${i}`}>
                <h2 id={`legal-${i}`} className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
