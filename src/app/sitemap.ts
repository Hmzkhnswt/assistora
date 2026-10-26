import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { getPublishedArticles } from "@/data/insights";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/solutions", 0.8],
    ["/industries", 0.8],
    ["/about", 0.7],
    ["/insights", 0.7],
    ["/contact", 0.8],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...statics.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...solutions.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getPublishedArticles().map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: new Date(a.updatedAt ?? a.publishedAt), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
