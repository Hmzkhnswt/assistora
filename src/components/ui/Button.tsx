import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "light" | "ghost" | "ghost-light";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white shadow-[0_10px_30px_-10px_rgb(71_118_255/0.8)] hover:bg-[#3a68f0] hover:shadow-[0_14px_36px_-10px_rgb(71_118_255/0.9)]",
  secondary: "bg-ink text-white hover:bg-deep",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06]",
  light: "bg-white text-ink hover:bg-cloud shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]",
  ghost: "text-ink hover:text-electric px-0!",
  "ghost-light": "text-white hover:text-cyan px-0!",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[15px] gap-2.5",
  lg: "h-14 px-7 text-base gap-3",
};

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: "right" | "up-right" | false;
  className?: string;
  /** Analytics label; emits a `cta_click` event via the global tracker. */
  track?: string;
  external?: boolean;
  "aria-label"?: string;
}

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = "right", className, track, external, ...rest }: ButtonLinkProps) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  const cls = cn(
    "group/btn relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-300 ease-expo",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow
          aria-hidden="true"
          className={cn(
            "size-[1.05em] transition-transform duration-300 ease-expo",
            arrow === "up-right" ? "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" : "group-hover/btn:translate-x-1",
          )}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} data-track={track} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track} {...rest}>
      {content}
    </Link>
  );
}

export function ArrowCircle({ className, up = false }: { className?: string; up?: boolean }) {
  const A = up ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-10 shrink-0 place-items-center rounded-full border border-current/20 transition-all duration-300 ease-expo group-hover:border-transparent group-hover:bg-electric group-hover:text-white",
        className,
      )}
    >
      <A className="size-4 transition-transform duration-300 ease-expo group-hover:-rotate-45" />
    </span>
  );
}
