import Link from "next/link";
import { NeuralNetwork } from "@/components/visuals/NeuralNetwork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { serviceHref } from "@/data/services";
import type { IconName } from "@/types/content";

const aiServices: { label: string; icon: IconName; anchor: string }[] = [
  { label: "Generative AI", icon: "sparkles", anchor: "generative-ai" },
  { label: "AI Agents", icon: "bot", anchor: "ai-agents" },
  { label: "Enterprise Chatbots", icon: "messageSquare", anchor: "chatbots" },
  { label: "Voice AI", icon: "mic", anchor: "voice-ai" },
  { label: "RAG Systems", icon: "search", anchor: "rag" },
  { label: "Machine Learning", icon: "cpu", anchor: "machine-learning" },
  { label: "Predictive Analytics", icon: "lineChart", anchor: "predictive-analytics" },
  { label: "Intelligent Automation", icon: "zap", anchor: "ai-agents" },
];

export function AISection() {
  return (
    <section aria-labelledby="ai-title" className="relative overflow-hidden bg-gradient-to-br from-lavender via-[#e6ecff] to-[#dcefff] section-y">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            id="ai-title"
            eyebrow="AI & Intelligent Automation"
            title="Intelligence Built Into Everything."
            description="We design AI systems that are grounded in your data, measured against clear quality criteria and integrated into the workflows your teams already use — so intelligence creates value, not risk."
          />
          <ul data-reveal-stagger className="mt-10 grid grid-cols-2 gap-2.5">
            {aiServices.map((s) => (
              <li key={s.label}>
                <Link
                  href={serviceHref("artificial-intelligence", s.anchor)}
                  className="group flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-ink/[0.06] backdrop-blur transition-all hover:bg-white hover:shadow-lg"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-electric text-white transition-transform duration-500 ease-expo group-hover:rotate-[-8deg]">
                    <Icon name={s.icon} className="size-[18px]" />
                  </span>
                  <span className="text-[15px] font-semibold">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <ButtonLink href="/services/artificial-intelligence" variant="secondary" track="ai-explore">
              Explore AI Solutions
            </ButtonLink>
          </div>
        </div>
        <div data-reveal className="relative">
          <div className="relative overflow-hidden rounded-[32px] bg-midnight shadow-[0_60px_120px_-50px_rgb(80_50_200/0.7)] ring-1 ring-white/10">
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-80 rounded-full bg-violet/40 blur-3xl" />
            <div className="relative aspect-[5/4]">
              <NeuralNetwork />
            </div>
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-mint motion-safe:animate-pulse" /> Grounded · Evaluated · Governed
              </span>
              <span className="text-white/40">Move your pointer across the network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
