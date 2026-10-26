import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import { formatDate, getArticle, getPublishedArticles, readingTime } from "@/data/insights";
import { getServices } from "@/data/services";
import { contactHref } from "@/data/site-config";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { LinkPills } from "@/components/ui/blocks";
import { RevealWords } from "@/components/ui/SectionHeading";
import type { ArticleBlock } from "@/types/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ title: a.seo.title, description: a.seo.description, path: `/insights/${a.slug}`, type: "article", publishedTime: a.publishedAt, keywords: a.tags });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 className="!mt-14 font-display text-[1.9rem] leading-tight font-semibold tracking-[-0.03em] text-ink">{block.text}</h2>;
    case "h3":
      return <h3 className="!mt-10 text-xl font-semibold text-ink">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-electric">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-electric">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="!my-10 rounded-[22px] bg-gradient-to-br from-lavender to-[#e3f0ff] p-6 sm:p-8">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Lightbulb aria-hidden="true" className="size-5 text-violet" /> {block.title}
          </p>
          <p className="mt-2">{block.text}</p>
        </aside>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-2xl bg-midnight p-5 text-sm leading-relaxed text-white/90">
          <code>{block.code}</code>
        </pre>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getPublishedArticles()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);
  const services = getServices(article.relatedServices);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <article>
        <header className="relative overflow-hidden bg-midnight pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
          <div aria-hidden="true" className="absolute -top-40 left-1/4 size-[520px] rounded-full bg-electric/30 blur-[130px]" />
          <div className="container-x relative max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: article.title, href: `/insights/${article.slug}` },
              ]}
              className="mb-8"
            />
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-cyan">{article.category}</p>
            <h1 data-reveal-words className="mt-6 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
              <RevealWords text={article.title} />
            </h1>
            <p data-reveal className="text-lead mt-6 text-slate">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span>
                By <span className="font-semibold text-white">{article.author}</span>
              </span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" /> {readingTime(article)} min read
              </span>
            </div>
          </div>
        </header>
        <div className="bg-white section-y-sm">
          <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0 max-w-3xl space-y-6 text-[18px] leading-[1.75] text-ink/80">
              {article.body.map((b, i) => (
                <Block key={i} block={b} />
              ))}
              <div className="!mt-14 flex flex-wrap gap-2 border-t border-ink/10 pt-8">
                {article.tags.map((t) => (
                  <span key={t} className="rounded-full bg-cloud px-3 py-1 text-sm text-ink/70">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[22px] bg-cloud p-6">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-electric uppercase">Related services</p>
                <div className="mt-4">
                  <LinkPills items={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
                </div>
              </div>
              <div className="rounded-[22px] bg-midnight p-6 text-white">
                <p className="font-display text-xl font-semibold">Need help with this?</p>
                <p className="mt-2 text-sm text-slate">Talk to an Assistora engineer about your context.</p>
                <ButtonLink href={contactHref(article.relatedServices[0], `article-${article.slug}`)} size="sm" className="mt-5" track={`article-${article.slug}`}>
                  Start a conversation
                </ButtonLink>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
                <ArrowLeft aria-hidden="true" className="size-4" /> All insights
              </Link>
            </aside>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-cloud section-y-sm">
          <div className="container-x">
            <h2 id="related-title" className="text-h3 mb-8 font-semibold">
              Related articles
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
