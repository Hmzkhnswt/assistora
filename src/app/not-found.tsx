import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-midnight text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden="true" className="absolute -top-40 left-1/3 size-[520px] rounded-full bg-violet/30 blur-[130px]" />
      <div className="container-x relative pt-28 pb-20">
        <p className="font-display text-[clamp(5.5rem,18vw,12rem)] leading-none font-bold tracking-[-0.03em] text-gradient">404</p>
        <h1 className="mt-4 text-h2 font-semibold">This page hasn&apos;t been engineered yet.</h1>
        <p className="text-lead mt-4 max-w-xl text-slate">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="outline-light">
            Explore services
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-white/50">
          Need help? <Link href="/contact" className="underline hover:text-white">Contact us</Link>.
        </p>
      </div>
    </section>
  );
}
