import Link from "next/link";
import type { Article } from "@/types/content";
import { formatDate, readingTime } from "@/data/insights";
import { ArrowCircle } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const categoryArt: Record<string, string> = {
  Cloud: "from-electric to-cyan",
  AI: "from-violet to-electric",
  DevOps: "from-cyan to-mint",
  Cybersecurity: "from-deep to-mint",
  "Software Engineering": "from-violet to-[#c4a8ff]",
};

export function ArticleCard({ article, featured = false, className }: { article: Article; featured?: boolean; className?: string }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-ink/[0.07] transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgb(8_13_31/0.35)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-gradient-to-br", categoryArt[article.category] ?? "from-electric to-violet", featured ? "aspect-[16/8]" : "aspect-[16/9]")}>
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div aria-hidden="true" className="absolute -right-8 -bottom-16 size-56 rounded-full border-[28px] border-white/15 transition-transform duration-700 ease-expo group-hover:scale-110" />
        <div aria-hidden="true" className="absolute top-6 left-6 size-16 rounded-2xl border border-white/30 bg-white/10 backdrop-blur" />
        <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-muted">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {readingTime(article)} min read
        </p>
        <h3 className={cn("mt-3 font-semibold text-balance", featured ? "text-h3 sm:text-[1.9rem] sm:leading-tight" : "text-[1.3rem] leading-snug tracking-[-0.02em]")}>{article.title}</h3>
        <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-medium">{article.author}</span>
          <ArrowCircle className="text-ink" />
        </div>
      </div>
    </Link>
  );
}
