"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Article } from "@/types/content";
import { ArticleCard } from "./ArticleCard";
import { cn } from "@/lib/utils";

export function InsightsExplorer({ articles, categories }: { articles: Article[]; categories: readonly string[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const available = useMemo(() => categories.filter((c) => articles.some((a) => a.category === c || a.tags.includes(c))), [articles, categories]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const inCat = category === "All" || a.category === category || a.tags.includes(category);
      const inQuery = !q || [a.title, a.excerpt, a.category, ...a.tags].join(" ").toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...available].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-11 rounded-full px-4 text-sm font-semibold transition-colors",
                category === c ? "bg-ink text-white" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="insight-search" className="sr-only">
            Search insights
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            id="insight-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="h-12 w-full rounded-full bg-white pr-10 pl-11 text-[15px] ring-1 ring-ink/10 outline-none focus:ring-2 focus:ring-electric"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted hover:text-ink">
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
      <p aria-live="polite" className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "article" : "articles"}
      </p>
      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] bg-white p-10 text-center ring-1 ring-ink/[0.07]">
          <p className="text-lg font-semibold">No articles match your filters.</p>
          <button type="button" onClick={() => { setCategory("All"); setQuery(""); }} className="mt-4 text-sm font-semibold text-electric">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
