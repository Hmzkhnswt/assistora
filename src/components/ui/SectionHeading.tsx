import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Splits a headline into masked words for the scroll reveal. */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="rw">
            <span style={{ ["--i" as string]: i }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.18em] uppercase",
        dark ? "text-cyan" : "text-electric",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", dark ? "bg-cyan/70" : "bg-electric/70")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "left",
  as: As = "h2",
  id,
  className,
  size = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  size?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div data-reveal className={cn("mb-5", align === "center" && "flex justify-center")}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <As id={id} data-reveal-words className={cn(size === "h1" ? "text-h1" : "text-h2", "font-semibold text-balance")}>
        <RevealWords text={title} />
      </As>
      {description && (
        <div data-reveal className={cn("text-lead mt-6", dark ? "text-slate" : "text-muted")}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
