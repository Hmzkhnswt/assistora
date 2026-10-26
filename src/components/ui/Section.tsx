import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "white" | "cloud" | "midnight" | "deep" | "lavender" | "mist";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  cloud: "bg-cloud text-ink",
  midnight: "bg-midnight text-white",
  deep: "bg-deep text-white",
  lavender: "bg-gradient-to-br from-lavender via-[#e4ebff] to-[#dff4ff] text-ink",
  mist: "bg-[#f1f2f9] text-ink",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  containerClassName,
  bare = false,
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  containerClassName?: string;
  bare?: boolean;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden section-y", tones[tone], className)} {...rest}>
      {bare ? children : <div className={cn("container-x relative", containerClassName)}>{children}</div>}
    </section>
  );
}

export function isDarkTone(tone: Tone) {
  return tone === "midnight" || tone === "deep";
}
