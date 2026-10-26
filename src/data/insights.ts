import type { Article } from "@/types/content";

/**
 * Insights content. Shaped so it can later be replaced by a headless CMS adapter
 * (see `getPublishedArticles`) without changing page components.
 * Only `status: "published"` articles appear in listings, sitemap and routes.
 */
export const insightCategories = [
  "Cloud",
  "AWS",
  "Google Cloud",
  "Azure",
  "DevOps",
  "AI",
  "Cybersecurity",
  "Software Engineering",
  "Mobile Development",
  "Data Engineering",
] as const;

const articles: Article[] = [
  {
    slug: "choosing-aws-google-cloud-or-azure",
    title: "Choosing Between AWS, Google Cloud and Azure: A Practical Framework",
    excerpt:
      "There is no universally best cloud. Here is the decision framework we use to match workloads, teams and commercial realities to the right platform.",
    category: "Cloud",
    tags: ["AWS", "Google Cloud", "Azure", "Cloud strategy"],
    author: "Assistora Engineering",
    publishedAt: "2026-09-08",
    status: "published",
    featured: true,
    relatedServices: ["cloud-computing", "it-consulting"],
    seo: {
      title: "AWS vs Google Cloud vs Azure: A Practical Decision Framework",
      description: "A vendor-neutral framework for choosing between AWS, Google Cloud and Microsoft Azure based on workloads, skills, data and cost.",
    },
    body: [
      { type: "p", text: "Comparisons of cloud providers often focus on feature checklists. In practice, all three major hyperscalers can run almost any workload well. The better question is which platform best fits your organisation's workloads, skills, existing agreements and future direction." },
      { type: "h2", text: "1. Start with workloads, not vendors" },
      { type: "p", text: "List the systems you intend to run and group them by type: web applications, data and analytics, machine learning, Windows and .NET estates, or latency-sensitive services. Each provider has areas of particular strength, and the shape of your portfolio usually points toward a natural primary platform." },
      { type: "ul", items: [
        "Heavy Microsoft licensing, Active Directory and .NET workloads often align naturally with Azure.",
        "Analytics-centred estates frequently benefit from BigQuery and the wider Google Cloud data ecosystem.",
        "Organisations wanting the broadest catalogue of managed services and a large talent pool often choose AWS.",
      ] },
      { type: "h2", text: "2. Weigh your team's skills honestly" },
      { type: "p", text: "The cost of a platform includes the time it takes your engineers to operate it well. Existing experience, certifications and hiring markets matter. A technically superior service operated poorly will underperform a familiar one operated expertly." },
      { type: "h2", text: "3. Model cost realistically" },
      { type: "p", text: "List prices rarely decide the outcome. Commitment discounts, enterprise agreements, data egress, support plans and the engineering effort required for each architecture typically have a much larger impact. Build a simple model for your top workloads and include operational effort." },
      { type: "callout", title: "Multi-cloud by intent, not by accident", text: "Using more than one provider can add resilience and access to best-of-breed services, but it also multiplies identity, networking, security and skills requirements. Choose multi-cloud deliberately, for specific workloads, with consistent tooling." },
      { type: "h2", text: "4. Consider data gravity and compliance" },
      { type: "p", text: "Where your data lives today, data residency requirements and the regions each provider offers in your markets can narrow the choice quickly. Moving large datasets later is expensive, so place data-heavy workloads thoughtfully." },
      { type: "h2", text: "5. Decide, document and revisit" },
      { type: "p", text: "Record the decision and its reasoning in an architecture decision record. Revisit it when your workloads, commercial position or the market changes significantly. Infrastructure as code and container-based platforms keep future options open without designing for the lowest common denominator." },
    ],
  },
  {
    slug: "rag-in-production",
    title: "Retrieval-Augmented Generation in Production: What Changes After the Demo",
    excerpt:
      "A RAG prototype can be built in an afternoon. Making it accurate, secure and dependable takes engineering. These are the areas that matter most.",
    category: "AI",
    tags: ["Generative AI", "RAG", "LLM", "Evaluation"],
    author: "Assistora Engineering",
    publishedAt: "2026-09-22",
    status: "published",
    featured: true,
    relatedServices: ["artificial-intelligence", "data-engineering"],
    seo: {
      title: "RAG in Production: Engineering Reliable Retrieval-Augmented Generation",
      description: "Ingestion, retrieval quality, permissions, evaluation and monitoring — what it takes to run retrieval-augmented generation in production.",
    },
    body: [
      { type: "p", text: "Retrieval-augmented generation (RAG) grounds a language model's answers in your own documents. It is one of the most practical ways to apply generative AI in a business. But the gap between a convincing demo and a system people trust every day is significant." },
      { type: "h2", text: "Ingestion is a data engineering problem" },
      { type: "p", text: "Answer quality is bounded by the quality of what you index. Production pipelines need to handle many document formats, extract tables and structure, remove duplicates, track versions and re-index when sources change. Treat ingestion as a pipeline with tests and monitoring, not a one-off script." },
      { type: "h2", text: "Retrieval quality deserves the most attention" },
      { type: "ul", items: [
        "Chunk documents along natural boundaries such as headings and sections, preserving context.",
        "Combine semantic vector search with keyword search — hybrid retrieval handles names, codes and acronyms better.",
        "Use a re-ranking step to promote the most relevant passages.",
        "Attach metadata such as product, region and date to enable filtering.",
      ] },
      { type: "h2", text: "Respect permissions" },
      { type: "p", text: "An assistant must never reveal content a user could not otherwise access. Enforce authorisation at retrieval time by filtering on access-control metadata synchronised from source systems, rather than relying on the model to withhold information." },
      { type: "callout", title: "Evaluate before you scale", text: "Create a representative set of questions with expected answers and sources. Measure retrieval relevance and answer faithfulness on every change to prompts, models or chunking. Without evaluation, improvements are guesswork." },
      { type: "h2", text: "Design for transparency" },
      { type: "p", text: "Show citations so users can verify answers, and make it acceptable for the system to say it does not know. Clear source attribution builds trust faster than fluent but unverifiable responses." },
      { type: "h2", text: "Operate it like any other production system" },
      { type: "p", text: "Monitor latency, cost per query, retrieval hit rates and user feedback. Log interactions in line with your privacy policy so you can investigate issues and continuously improve the system." },
    ],
  },
  {
    slug: "measuring-devops-with-dora-metrics",
    title: "Measuring DevOps Performance With DORA Metrics",
    excerpt:
      "Four metrics give engineering leaders a balanced view of delivery speed and stability. Here is how to measure them without gaming them.",
    category: "DevOps",
    tags: ["DevOps", "DORA", "Platform engineering"],
    author: "Assistora Engineering",
    publishedAt: "2026-10-06",
    status: "published",
    relatedServices: ["devops-platform-engineering", "quality-engineering"],
    seo: {
      title: "Measuring DevOps Performance With DORA Metrics",
      description: "How to measure deployment frequency, lead time for changes, change failure rate and time to restore service — and use them to improve.",
    },
    body: [
      { type: "p", text: "The DORA research programme identified four key metrics that together describe software delivery performance. They are valuable because they balance speed with stability: improving one at the expense of the other shows up immediately." },
      { type: "h2", text: "The four key metrics" },
      { type: "ol", items: [
        "Deployment frequency — how often you successfully release to production.",
        "Lead time for changes — how long it takes a committed change to reach production.",
        "Change failure rate — the percentage of deployments that cause a failure requiring remediation.",
        "Time to restore service — how long it takes to recover from a failure in production.",
      ] },
      { type: "h2", text: "Collect data automatically" },
      { type: "p", text: "Derive the metrics from systems you already use: version control for commits, your CI/CD platform for deployments and your incident tooling for failures and recovery. Manual collection is slow and inconsistent." },
      { type: "code", language: "yaml", code: "# Example: tag each production deployment so it can be counted\n- name: Record deployment\n  run: |\n    curl -X POST \"$METRICS_ENDPOINT/deployments\" \\\n      -d service=$SERVICE -d sha=$GITHUB_SHA -d env=production" },
      { type: "h2", text: "Use metrics for learning, not targets" },
      { type: "p", text: "When metrics become targets for individuals, they tend to be gamed. Review them at team level, look at trends rather than absolute numbers, and use them to identify constraints worth investigating." },
      { type: "callout", title: "Pair metrics with context", text: "Numbers show where to look. Conversations with engineers explain why. Combine DORA metrics with developer experience feedback for a complete picture." },
      { type: "h2", text: "Where improvement usually comes from" },
      { type: "ul", items: [
        "Smaller batch sizes and trunk-based development.",
        "Fast, reliable automated tests.",
        "Infrastructure as code and consistent environments.",
        "Progressive delivery with automated rollback.",
        "Good observability and practised incident response.",
      ] },
    ],
  },
  {
    slug: "least-privilege-in-the-cloud",
    title: "Least Privilege in the Cloud: A Practical Starting Point",
    excerpt:
      "Over-permissive identities remain one of the most common cloud risks. A pragmatic path to least privilege that does not stall delivery.",
    category: "Cybersecurity",
    tags: ["Cloud security", "IAM", "Zero trust"],
    author: "Assistora Engineering",
    publishedAt: "2026-10-15",
    status: "published",
    relatedServices: ["cybersecurity", "cloud-computing"],
    seo: {
      title: "Least Privilege in the Cloud: A Practical Starting Point",
      description: "A pragmatic approach to least-privilege identity and access management across AWS, Google Cloud and Azure.",
    },
    body: [
      { type: "p", text: "Most cloud security incidents involve identities with more access than they need, long-lived credentials or misconfigured resources. Least privilege reduces the impact of any single compromise — but aiming for perfection on day one often stalls progress. Start with the changes that remove the most risk." },
      { type: "h2", text: "1. Centralise human identity" },
      { type: "p", text: "Federate cloud access through a single identity provider with multi-factor authentication. Remove individual cloud user accounts and long-lived access keys for people wherever possible." },
      { type: "h2", text: "2. Replace static keys for workloads" },
      { type: "p", text: "Use workload identity features — IAM roles, service account impersonation, managed identities and OIDC federation for CI/CD — so applications and pipelines receive short-lived credentials automatically." },
      { type: "h2", text: "3. Right-size permissions using real usage" },
      { type: "p", text: "Each provider offers tools that analyse which permissions are actually used. Use them to replace broad roles with narrower ones incrementally, starting with the most privileged identities." },
      { type: "callout", title: "Guardrails beat reviews", text: "Organisation-level policies that prevent risky actions — such as disabling logging or making storage public — protect every account automatically, including ones created tomorrow." },
      { type: "h2", text: "4. Make privileged access temporary" },
      { type: "p", text: "Administrative access should be requested, approved and time-limited, with a clear audit trail. Standing administrator access should be the exception." },
      { type: "h2", text: "5. Monitor continuously" },
      { type: "p", text: "Centralise audit logs, alert on sensitive changes and review access regularly. Least privilege is a continuous practice, not a one-time project." },
    ],
  },
  {
    slug: "modular-monolith-first",
    title: "Why We Often Start With a Modular Monolith",
    excerpt: "Microservices solve real problems — but not every problem. A case for starting simpler.",
    category: "Software Engineering",
    tags: ["Architecture", "Microservices"],
    author: "Assistora Engineering",
    publishedAt: "2026-11-01",
    status: "draft",
    relatedServices: ["software-engineering"],
    seo: { title: "Why We Often Start With a Modular Monolith", description: "Draft article." },
    body: [{ type: "p", text: "Draft — pending editorial review." }],
  },
];

/** Public API — swap this for a CMS fetch later. */
export function getPublishedArticles(): Article[] {
  return articles
    .filter((a) => a.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((a) => a.slug === slug);
}

export function readingTime(article: Article): number {
  const words = article.body
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "callout") return `${b.title} ${b.text}`;
      if (b.type === "code") return b.code;
      return b.text;
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
