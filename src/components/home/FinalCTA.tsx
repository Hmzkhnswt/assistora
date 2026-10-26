import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { contactHref } from "@/data/site-config";
import { RevealWords } from "@/components/ui/SectionHeading";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-white p-3 sm:p-5">
      <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#2f5bff,#4776FF_30%,#865DFF_70%,#5b2fe0)] bg-[length:200%_200%] px-6 py-24 text-white motion-safe:animate-gradient sm:px-12 lg:py-36">
        <svg aria-hidden="true" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-40">
          {Array.from({ length: 22 }, (_, i) => {
            const x1 = (i * 137) % 1200;
            const y1 = (i * 89) % 500;
            const x2 = (i * 211 + 300) % 1200;
            const y2 = (i * 157 + 120) % 500;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity=".18" />
                <circle cx={x1} cy={y1} r="3" fill="#35E5F5" style={{ transformBox: "fill-box", transformOrigin: "center", animation: `pulse-soft ${2 + (i % 5) * 0.4}s ease-in-out ${i * 0.2}s infinite` }} />
              </g>
            );
          })}
        </svg>
        <div aria-hidden="true" className="absolute -top-40 left-1/4 size-[520px] rounded-full bg-cyan/30 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 id="final-cta-title" data-reveal-words className="text-h1 font-semibold text-balance">
            <RevealWords text="Your Next Big Idea Deserves Exceptional Engineering." />
          </h2>
          <p data-reveal className="text-lead mx-auto mt-7 max-w-2xl text-white/85">
            Tell us what you&apos;re building. We&apos;ll help you find the right technology, architecture, and engineering approach.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={contactHref(undefined, "final-cta")}
              data-track="final-cta-build"
              className="group inline-flex h-16 items-center gap-3 rounded-full bg-white pr-2 pl-8 text-lg font-semibold text-ink transition-colors hover:bg-cyan"
            >
              Let&apos;s Build Together
              <span className="grid size-12 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-expo group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </span>
            </Link>
            <Link href="/services" className="group inline-flex h-16 items-center gap-2 rounded-full border border-white/40 px-8 text-lg font-semibold transition-colors hover:bg-white/10">
              Explore Our Expertise
              <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
