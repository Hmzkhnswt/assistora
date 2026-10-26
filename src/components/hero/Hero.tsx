import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { contactHref } from "@/data/site-config";
import { HeroMosaic } from "./HeroMosaic";
import { HeroIntro } from "./HeroIntro";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-midnight text-white lg:min-h-[max(100svh,760px)]">
      {/* Ambient lighting */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_75%)]" />
        <div className="absolute -top-40 -left-40 size-[680px] rounded-full bg-electric/35 blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 size-[520px] rounded-full bg-violet/30 blur-[140px]" />
        <div className="absolute right-0 bottom-0 size-[420px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <div className="container-x relative grid gap-12 pt-32 pb-0 lg:min-h-[max(100svh,760px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:pt-28 lg:pb-16">
        <div className="relative z-10 max-w-[640px]">
          <p data-intro="fade" className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-4 pl-1.5 text-[13px] text-white/80 backdrop-blur">
            <span className="rounded-full bg-gradient-to-r from-electric to-violet px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] uppercase">Global</span>
            <span>
              Cloud · DevOps · AI · Security<span className="hidden sm:inline"> · Software</span>
            </span>
          </p>
          <h1 id="hero-title" className="font-display text-hero font-bold uppercase">
            <span data-intro="line" className="block overflow-hidden pb-[0.06em]">
              <span className="block">We engineer</span>
            </span>
            <span data-intro="line" className="block overflow-hidden pb-[0.06em]">
              <span className="text-gradient block">what&apos;s next.</span>
            </span>
          </h1>
          <p data-intro="fade" className="text-lead mt-7 max-w-[560px] text-slate">
            From cloud infrastructure and DevOps to artificial intelligence, cybersecurity, and custom software, Assistora helps businesses worldwide turn complex technology into lasting competitive advantage.
          </p>
          <div data-intro="fade" className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={contactHref(undefined, "hero")}
              data-track="hero-start-project"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white pr-2 pl-7 text-base font-semibold text-ink transition-colors duration-300 hover:bg-cyan"
            >
              Start Your Project
              <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-expo group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="size-[18px]" />
              </span>
            </Link>
            <Link href="/services" data-track="hero-explore-services" className="group inline-flex h-14 items-center gap-2 rounded-full px-1 text-base font-semibold text-white hover:text-cyan sm:px-5">
              Explore Our Services
              <ArrowRight aria-hidden="true" className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul data-intro="fade" className="mt-12 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-white/55 sm:flex">
            {["AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Generative AI"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-cyan" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Mosaic: band below copy on mobile, full-height column on desktop */}
        <div
          aria-hidden="true"
          className="relative -mx-2 h-[440px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_80%,transparent)] sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-[clamp(1.25rem,4vw,2.5rem)] lg:mx-0 lg:h-auto lg:w-[min(46%,620px)] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)]"
        >
          <HeroMosaic />
        </div>
      </div>
      <HeroIntro />
    </section>
  );
}
