import { ButtonLink } from "./Button";
import { RevealWords } from "./SectionHeading";

export function CTABanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string; track?: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-white section-y-sm">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-midnight px-5 py-14 text-white sm:px-12 sm:py-20 lg:px-20">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
          <div aria-hidden="true" className="absolute -top-40 -right-24 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(134_93_255/0.50),transparent)]" />
          <div aria-hidden="true" className="absolute -bottom-48 -left-24 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(71_118_255/0.50),transparent)]" />
          <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 data-reveal-words className="text-h2 font-semibold text-balance">
                <RevealWords text={title} />
              </h2>
              <p data-reveal className="text-lead mt-5 max-w-xl text-slate">
                {description}
              </p>
            </div>
            <div data-reveal className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={primary.href} arrow="up-right" size="lg" track={primary.track ?? "cta-banner"} className="w-full sm:w-auto">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-light" size="lg" className="w-full sm:w-auto">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
