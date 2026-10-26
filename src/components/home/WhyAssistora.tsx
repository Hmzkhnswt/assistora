import { whyAssistora } from "@/data/company";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function WhyAssistora() {
  return (
    <section aria-labelledby="why-title" className="relative bg-cloud section-y">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Assistora"
            title="Engineering Expertise. Business Understanding."
            description="We combine deep technical capability with a clear focus on the outcomes that matter to your business — and we're honest about trade-offs along the way."
          />
          <div data-reveal className="mt-8">
            <ButtonLink href="/about" variant="outline">
              About Assistora
            </ButtonLink>
          </div>
        </div>
        <ol data-reveal-stagger className="grid gap-x-10 sm:grid-cols-2">
          {whyAssistora.map((item, i) => (
            <li key={item.title} className="group border-t border-ink/10 py-8">
              <div className="flex items-center justify-between">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-white text-electric shadow-sm ring-1 ring-ink/[0.06]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric to-violet opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Icon name={item.icon} className="relative size-6 transition-all duration-500 ease-expo group-hover:scale-110 group-hover:text-white motion-safe:group-hover:rotate-[-8deg]" />
                </span>
                <span className="font-display text-sm text-ink/30">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
