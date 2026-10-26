import { BrowserMockup } from "@/components/visuals/BrowserMockup";
import { PhoneMockup } from "@/components/visuals/PhoneMockup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const web = ["SaaS Platforms", "Enterprise Applications", "E-commerce", "Custom Web Portals", "API Integrations"];
const mobile = ["iOS", "Android", "Flutter", "React Native", "Cross-Platform Applications"];

function CapList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium ring-1 ring-ink/10">
          {i}
        </li>
      ))}
    </ul>
  );
}

export function WebMobileSection() {
  return (
    <section aria-labelledby="digital-title" className="relative overflow-hidden bg-white section-y">
      <div className="container-x">
        <SectionHeading id="digital-title" eyebrow="Web & Mobile Engineering" title="Digital Experiences. Engineered to Perform." align="center" className="mx-auto" />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <div data-reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cloud to-[#e8eeff] p-6 ring-1 ring-ink/[0.06] sm:p-10">
            <div data-parallax="4">
              <BrowserMockup />
            </div>
            <div className="relative mt-10">
              <h3 className="text-h3 font-semibold">Web platforms that load fast and scale further</h3>
              <CapList items={web} />
              <div className="mt-8">
                <ButtonLink href="/services/web-development" variant="secondary" track="web-explore">
                  Web Development
                </ButtonLink>
              </div>
            </div>
          </div>
          <div data-reveal data-reveal-delay="0.1" className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e9fff7] to-[#dcf8ff] p-6 ring-1 ring-ink/[0.06] sm:p-10">
            <div className="py-6 [perspective:1200px]">
              <div data-tilt>
                <PhoneMockup />
              </div>
            </div>
            <div className="relative mt-6">
              <h3 className="text-h3 font-semibold">Mobile apps people return to</h3>
              <CapList items={mobile} />
              <div className="mt-8">
                <ButtonLink href="/services/mobile-app-development" variant="secondary" track="mobile-explore">
                  Mobile Development
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
