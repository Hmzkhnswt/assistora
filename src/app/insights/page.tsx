import { buildMetadata } from "@/lib/seo";
import { getPublishedArticles, insightCategories } from "@/data/insights";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/ui/CTABanner";
import { contactHref } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "Insights — Cloud, AI, DevOps & Security Engineering",
  description: "Practical engineering insights from Assistora on cloud, AI, DevOps, cybersecurity, data engineering and software development.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getPublishedArticles();
  const featured = articles.filter((a) => a.featured).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights", href: "/insights" }]}
        eyebrow="Insights"
        title="Ideas, Engineering & What's Next."
        description="Practical perspectives from Assistora engineers on building, securing and scaling modern technology."
        compact
      />
      {featured.length > 0 && (
        <section aria-labelledby="featured-title" className="bg-white section-y-sm">
          <div className="container-x">
            <SectionHeading id="featured-title" eyebrow="Featured" title="Start here." className="mb-10" />
            <div data-reveal-stagger className="grid gap-5 lg:grid-cols-2">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} featured />
              ))}
            </div>
          </div>
        </section>
      )}
      <section aria-labelledby="all-title" className="bg-cloud section-y-sm">
        <div className="container-x">
          <h2 id="all-title" className="text-h3 mb-8 font-semibold">
            All articles
          </h2>
          <InsightsExplorer articles={articles} categories={insightCategories} />
        </div>
      </section>
      <CTABanner
        title="Facing a challenge like these?"
        description="Our engineers are happy to discuss your specific context."
        primary={{ label: "Talk to an Engineer", href: contactHref(undefined, "insights"), track: "insights-cta" }}
      />
    </>
  );
}
