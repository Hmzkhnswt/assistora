import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { contactHref } from "@/data/site-config";
import { HeroMosaic, HeroStrip } from "./HeroMosaic";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-midnight text-white lg:min-h-[max(100svh,760px)]">
      {/* Ambient lighting */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_75%)]" />
        {/* Radial gradients instead of blurred blobs: same glow, no costly filter paint */}
        <div className="absolute inset-0 bg-[radial-gradient(42rem_34rem_at_8%_6%,rgb(71_118_255/0.34),transparent_70%),radial-gradient(34rem_28rem_at_48%_58%,rgb(134_93_255/0.24),transparent_70%),radial-gradient(28rem_24rem_at_100%_100%,rgb(53_229_245/0.10),transparent_70%)]" />
      </div>

      <div className="container-x relative grid grid-cols-1 gap-10 pt-28 pb-12 sm:pt-32 lg:min-h-[max(100svh,760px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:pt-28 lg:pb-16">
        <div className="relative z-10 max-w-[640px]">
          <p className="intro-rise mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-3 pl-1.5 text-[12px] whitespace-nowrap text-white/80 min-[360px]:gap-3 min-[360px]:pr-4 min-[360px]:text-[13px]">
            <span className="rounded-full bg-gradient-to-r from-electric to-violet px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] uppercase">Global</span>
            <span>
              Cloud · DevOps · AI · Security<span className="hidden sm:inline"> · Software</span>
            </span>
          </p>
          <h1 id="hero-title" className="font-display text-hero font-bold uppercase">
            <span className="intro-line block overflow-hidden pb-[0.06em]" style={{ ["--d" as string]: "0.15s" }}>
              <span className="block">We engineer</span>
            </span>
            <span className="intro-line block overflow-hidden pb-[0.06em]" style={{ ["--d" as string]: "0.27s" }}>
              <span className="text-gradient block">what&apos;s next.</span>
            </span>
          </h1>
          <p className="intro-rise-solid text-lead mt-6 max-w-[560px] text-slate sm:mt-7" style={{ ["--d" as string]: "0.45s" }}>
            From cloud infrastructure and DevOps to artificial intelligence, cybersecurity, and custom software, Assistora helps businesses worldwide turn complex technology into lasting competitive advantage.
          </p>
          <div className="intro-rise mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4" style={{ ["--d" as string]: "0.6s" }}>
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
          <ul className="intro-rise mt-12 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-white/55 sm:flex" style={{ ["--d" as string]: "0.75s" }}>
            {["AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Generative AI"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-cyan" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Phones & tablets: a single drifting row of still cards beneath the copy */}
        <div aria-hidden="true" className="intro-rise -mx-[clamp(1.25rem,4vw,2.5rem)] lg:hidden" style={{ ["--d" as string]: "0.7s" }}>
          <HeroStrip />
        </div>

        {/* Desktop: full-height animated column mosaic */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-[clamp(1.25rem,4vw,2.5rem)] hidden w-[min(46%,620px)] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)] lg:block"
        >
          <HeroMosaic />
        </div>
      </div>
    </section>
  );
}
