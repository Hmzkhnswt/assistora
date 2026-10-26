import { MapPin, Radio } from "lucide-react";
import { globalDelivery } from "@/data/company";
import { siteConfig } from "@/data/site-config";
import { LazyGlobe } from "@/components/three/LazyGlobe";
import { RevealWords } from "@/components/ui/SectionHeading";

export function GlobalDelivery() {
  return (
    <section aria-labelledby="global-title" className="relative overflow-hidden bg-[#0b1636] section-y text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p data-reveal className="mb-5 text-[12px] font-semibold tracking-[0.18em] text-cyan uppercase">
            Global Delivery
          </p>
          <h2 id="global-title" data-reveal-words className="text-h2 font-semibold text-balance">
            <RevealWords text="Rooted in Pakistan. Connected to the World." />
          </h2>
          <p data-reveal className="text-lead mt-6 text-slate">
            Assistora is headquartered in Pakistan and delivers remotely to businesses around the world. Our remote-first model combines strong engineering talent with structured, transparent collaboration across time zones.
          </p>
          <ul data-reveal-stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {globalDelivery.map((g) => (
              <li key={g.title} className="border-l-2 border-cyan/40 pl-4">
                <p className="font-semibold">{g.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{g.text}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-white/50 uppercase">Regions we serve remotely</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {siteConfig.serviceRegions.map((r) => (
                <li key={r} className="rounded-full border border-white/12 px-3 py-1 text-sm text-white/80">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-reveal className="relative mx-auto w-full max-w-[600px]">
          <LazyGlobe />
          <div className="relative mt-4 flex flex-wrap gap-2 text-sm sm:absolute sm:bottom-6 sm:left-0 sm:mt-0 sm:flex-col">
            <span className="inline-flex items-center gap-2 rounded-full bg-midnight/80 px-3 py-1.5 backdrop-blur">
              <MapPin aria-hidden="true" className="size-4 text-mint" /> Headquarters — Pakistan
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-midnight/80 px-3 py-1.5 backdrop-blur">
              <Radio aria-hidden="true" className="size-4 text-cyan" /> Remote delivery worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
