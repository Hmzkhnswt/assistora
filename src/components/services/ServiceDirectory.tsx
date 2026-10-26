"use client";

import { useState } from "react";
import { serviceCategories, services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { TabList } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

export function ServiceDirectory() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? services : services.filter((s) => s.category === cat);
  return (
    <div>
      <TabList
        idBase="dir"
        label="Filter services by category"
        value={cat}
        onChange={setCat}
        items={[{ id: "all", label: "All services" }, ...serviceCategories.map((c) => ({ id: c.id, label: c.title }))]}
      />
      <div role="tabpanel" id={`dir-panel-${cat}`} aria-labelledby={`dir-tab-${cat}`} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => {
          // A lone card on the final row spans the full width as a wide card instead of leaving a gap.
          const last = i === list.length - 1 && list.length > 1;
          const orphan = last && list.length % 3 === 1;
          const mdOrphan = last && list.length % 2 === 1;
          return (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i}
              layout={orphan ? "wide" : "stack"}
              className={cn("animate-[mega-in_0.5s_var(--ease-expo)_both]", mdOrphan && "md:col-span-2", orphan && "lg:col-span-3", mdOrphan && !orphan && "lg:col-span-1")}
            />
          );
        })}
      </div>
    </div>
  );
}
