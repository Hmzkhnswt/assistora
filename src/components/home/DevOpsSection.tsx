import { PipelineVisual } from "@/components/visuals/PipelineVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/content";

const highlights: { title: string; text: string; icon: IconName }[] = [
  { title: "Automated delivery", text: "Every commit built, tested and deployable.", icon: "rocket" },
  { title: "Infrastructure as Code", text: "Reproducible environments, reviewed like software.", icon: "code" },
  { title: "Kubernetes", text: "Secure, scalable container platforms.", icon: "boxes" },
  { title: "Observability", text: "Metrics, logs and traces tied to SLOs.", icon: "eye" },
  { title: "Platform Engineering", text: "Golden paths that remove developer toil.", icon: "layers" },
  { title: "DevSecOps", text: "Security checks built into the pipeline.", icon: "shield" },
];

export function DevOpsSection() {
  return (
    <section aria-labelledby="devops-title" className="relative bg-white section-y">
      <div className="container-x">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHeading id="devops-title" eyebrow="DevOps & Platform Engineering" title="Ship Faster. Scale Smarter. Operate Reliably." className="max-w-4xl" />
          <div data-reveal>
            <p className="text-lead text-muted">We build the delivery systems that turn every change into a safe, observable production release.</p>
            <div className="mt-6">
              <ButtonLink href="/services/devops-platform-engineering" variant="ghost" track="devops-explore">
                Explore DevOps Services
              </ButtonLink>
            </div>
          </div>
        </div>
        <div data-reveal className="rounded-[30px] bg-cloud p-4 ring-1 ring-ink/[0.06] sm:p-8">
          <PipelineVisual dark={false} />
        </div>
        <ul data-reveal-stagger className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <li key={h.title} className="group flex gap-4 bg-white p-6 transition-colors hover:bg-cloud">
              <Icon name={h.icon} className="size-6 shrink-0 text-electric transition-transform duration-500 ease-expo group-hover:scale-110" />
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="mt-1 text-sm text-muted">{h.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
