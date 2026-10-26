import { techIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function BrandGlyph({ name, className }: { name: string; className?: string }) {
  const icon = techIcon(name);
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 shrink-0", className)} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

export function TechBadge({ name, dark = false, className }: { name: string; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
        dark ? "border-white/12 bg-white/[0.04] text-white/85 hover:border-white/30" : "border-ink/10 bg-white text-ink/80 hover:border-ink/25",
        className,
      )}
    >
      <BrandGlyph name={name} className="size-3.5 opacity-80" />
      {name}
    </span>
  );
}

export function TechList({ items, dark = false, className }: { items: string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((t) => (
        <li key={t}>
          <TechBadge name={t} dark={dark} />
        </li>
      ))}
    </ul>
  );
}
