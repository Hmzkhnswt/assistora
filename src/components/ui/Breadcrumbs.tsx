import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items, dark = true, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className={cn("transition-colors", dark ? "text-slate hover:text-white" : "text-muted hover:text-ink")}>
                      {item.label}
                    </Link>
                    <ChevronRight aria-hidden="true" className={cn("size-3.5", dark ? "text-slate/60" : "text-muted/60")} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
