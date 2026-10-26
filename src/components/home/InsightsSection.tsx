import { getPublishedArticles } from "@/data/insights";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function InsightsSection() {
  const articles = getPublishedArticles().slice(0, 3);
  if (articles.length === 0) return null;
  return (
    <section aria-labelledby="insights-title" className="relative bg-cloud section-y">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="insights-title" eyebrow="Insights" title="Ideas, Engineering & What's Next." />
          <div data-reveal>
            <ButtonLink href="/insights" variant="outline">
              All Insights
            </ButtonLink>
          </div>
        </div>
        <div data-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
