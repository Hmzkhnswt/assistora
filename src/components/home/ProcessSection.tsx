import { engineeringProcess } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="relative bg-white section-y">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="process-title"
            eyebrow="Our Engineering Process"
            title="From Idea to Impact."
            description="A transparent, iterative process that reduces risk early, delivers working software continuously and keeps improving after launch."
          />
          <div data-reveal aria-hidden="true" className="mt-12 hidden aspect-square max-w-sm rounded-[32px] bg-midnight p-8 lg:block">
            <svg viewBox="0 0 200 200" className="size-full">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                const x = 100 + Math.cos(a) * 70;
                const y = 100 + Math.sin(a) * 70;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="13" fill="#4776FF" fillOpacity=".15" stroke="#4776FF" />
                    <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="var(--font-sora)">
                      0{i + 1}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#35E5F5" strokeOpacity=".5" strokeDasharray="4 8" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "spin 30s linear infinite" }} />
              <circle cx="100" cy="100" r="30" fill="url(#pg)" />
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4776FF" />
                  <stop offset="1" stopColor="#865DFF" />
                </linearGradient>
              </defs>
              <path d="M90 108 100 88 110 108M94 101h12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <ProcessTimeline steps={engineeringProcess} />
      </div>
    </section>
  );
}
