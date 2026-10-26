import type { Solution } from "@/types/content";

export const solutions: Solution[] = [
  {
    slug: "cloud-migration",
    title: "Cloud Migration",
    icon: "rocket",
    visual: "cloud",
    accent: "#4776FF",
    summary: "Move applications and data to the cloud with a plan, not a leap — minimising risk, downtime and surprise costs.",
    heroHeadline: "Move to the Cloud Without Losing Momentum.",
    heroDescription:
      "A structured, wave-based migration approach that takes you from on-premises or legacy hosting to a well-governed cloud foundation on AWS, Google Cloud or Azure.",
    outcomes: ["Data-centre or hosting exit", "Lower operational burden", "Elastic capacity for growth", "Modernisation-ready workloads"],
    challenge: {
      intro:
        "Migration projects fail less often because of technology than because of planning: unknown dependencies, unclear ownership, underestimated data movement and cost models that ignore how cloud pricing really works.",
      points: [
        { title: "Hidden dependencies", text: "Applications rely on shared databases, file systems and network paths nobody documented." },
        { title: "Downtime risk", text: "Critical systems cannot simply be switched off while they move." },
        { title: "Cost uncertainty", text: "Lift-and-shift without rightsizing can cost more than the original environment." },
        { title: "Skills and operations", text: "Teams need new operating practices once workloads run in the cloud." },
      ],
    },
    approach: [
      { title: "Portfolio discovery", text: "Automated and interview-based inventory of applications, infrastructure and dependencies." },
      { title: "Strategy per workload", text: "Each application assigned a path — rehost, replatform, refactor, repurchase or retire." },
      { title: "Landing zone first", text: "A secure, governed foundation built as code before any workload moves." },
      { title: "Wave execution", text: "Grouped migrations with rehearsals, data replication, cutover runbooks and rollback criteria." },
      { title: "Optimise after move", text: "Rightsizing, autoscaling and managed services adopted once workloads are stable." },
    ],
    services: ["cloud-computing", "devops-platform-engineering", "cybersecurity"],
    architecture: [
      { layer: "Landing zone", detail: "Account / project hierarchy, policies, identity federation and centralised logging." },
      { layer: "Connectivity", detail: "Hybrid networking with VPN or dedicated interconnect during the transition." },
      { layer: "Workload platforms", detail: "Virtual machines, containers or serverless targets matched to each application." },
      { layer: "Data migration", detail: "Replication, validation and synchronisation tooling for databases and storage." },
      { layer: "Operations", detail: "Monitoring, backup, patching and cost reporting from day one." },
    ],
    benefits: [
      { title: "Predictable migration", text: "Clear waves, runbooks and success criteria reduce risk at every cutover." },
      { title: "Controlled cost", text: "Rightsizing and FinOps practices prevent post-migration bill shock." },
      { title: "Improved resilience", text: "Multi-zone designs and automated backups raise availability." },
      { title: "Platform for innovation", text: "Managed data, AI and analytics services become accessible." },
    ],
    methodology: [
      { title: "Assess", text: "Inventory, dependency mapping, business case and target architecture.", duration: "Weeks 1–4" },
      { title: "Mobilise", text: "Landing zone, pipelines, migration tooling and pilot workload.", duration: "Weeks 3–8" },
      { title: "Migrate", text: "Wave-based migration with hypercare after each cutover.", duration: "Per wave" },
      { title: "Optimise", text: "Rightsizing, modernisation backlog and operational handover.", duration: "Ongoing" },
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Terraform", "AWS Application Migration Service", "Azure Migrate", "Migrate to Virtual Machines", "Database Migration Service"],
    faqs: [
      { question: "How long does a cloud migration take?", answer: "It depends on the number and complexity of workloads. A small estate may move in weeks; larger portfolios are migrated in waves over several months. The assessment phase produces a realistic timeline." },
      { question: "Should we refactor everything during migration?", answer: "Usually not. Rehosting or replatforming first and modernising afterwards often delivers value sooner with less risk. We refactor during migration only where it clearly pays off." },
    ],
    seo: {
      title: "Cloud Migration Solutions — AWS, Google Cloud & Azure",
      description: "Plan and execute low-risk cloud migrations with landing zones, wave planning, data migration and post-migration optimisation.",
    },
  },
  {
    slug: "enterprise-ai",
    title: "Enterprise AI",
    icon: "brain",
    visual: "neural",
    accent: "#865DFF",
    summary: "Put generative AI and machine learning to work on real business processes — securely, measurably and at scale.",
    heroHeadline: "Enterprise AI That Earns Its Place in Production.",
    heroDescription:
      "We help organisations move from AI experiments to dependable systems: knowledge assistants, document intelligence, agents and predictive models grounded in company data and governed by clear controls.",
    outcomes: ["Automated knowledge work", "Faster information retrieval", "Measurable AI quality", "Governed, secure adoption"],
    challenge: {
      intro:
        "Most organisations have already tried AI. The hard part is turning experiments into systems that people rely on every day — which requires trustworthy data, evaluation, security and integration with existing workflows.",
      points: [
        { title: "Accuracy and trust", text: "Users abandon tools that give wrong or unverifiable answers." },
        { title: "Data access and privacy", text: "Assistants must respect existing permissions and protect sensitive information." },
        { title: "Integration", text: "Value appears only when AI is embedded in the tools people already use." },
        { title: "Cost and governance", text: "Usage-based pricing and model choice need active management." },
      ],
    },
    approach: [
      { title: "Use-case prioritisation", text: "Score opportunities by value, feasibility, data readiness and risk." },
      { title: "Evaluation-driven design", text: "Build representative test sets and quality metrics before scaling." },
      { title: "Grounded architecture", text: "Retrieval, permissions-aware search and structured outputs reduce errors." },
      { title: "Guardrails & oversight", text: "Input and output filtering, human approval for high-impact actions, full audit logs." },
      { title: "LLMOps", text: "Monitoring of quality, latency, cost and user feedback in production." },
    ],
    services: ["artificial-intelligence", "data-engineering", "software-engineering"],
    architecture: [
      { layer: "Experience", detail: "Chat, embedded copilots, APIs or workflow automations in existing tools." },
      { layer: "Orchestration", detail: "Prompting, tool calling, agents and routing between models." },
      { layer: "Knowledge", detail: "Ingestion, chunking, embeddings, hybrid search and re-ranking with access control." },
      { layer: "Models", detail: "Hosted foundation models or private deployments selected per task." },
      { layer: "Governance", detail: "Evaluation, guardrails, logging, cost tracking and policy enforcement." },
    ],
    benefits: [
      { title: "Productivity gains", text: "Teams spend less time searching, summarising and re-keying information." },
      { title: "Consistent answers", text: "Grounded responses with citations improve trust and quality." },
      { title: "Safe scaling", text: "Shared platform components accelerate each new use case." },
      { title: "Clear ROI", text: "Defined metrics show where AI is creating measurable value." },
    ],
    methodology: [
      { title: "Explore", text: "Workshops to identify and prioritise high-value use cases.", duration: "1–2 weeks" },
      { title: "Prove", text: "Focused proof of value evaluated against agreed success metrics.", duration: "3–6 weeks" },
      { title: "Productionise", text: "Security, integration, guardrails and monitoring for rollout.", duration: "6–12 weeks" },
      { title: "Scale", text: "Reusable AI platform components and additional use cases.", duration: "Ongoing" },
    ],
    technologies: ["Azure OpenAI", "Amazon Bedrock", "Vertex AI", "Anthropic Claude", "LangChain", "LlamaIndex", "pgvector", "MLflow"],
    faqs: [
      { question: "Can AI assistants respect our existing document permissions?", answer: "Yes. We design retrieval so users only receive answers drawn from content they are already authorised to access." },
      { question: "Which model should we use?", answer: "We evaluate models against your specific task, quality, latency, data-residency and cost requirements, and design so models can be swapped as the market evolves." },
    ],
    seo: {
      title: "Enterprise AI Solutions — Generative AI, RAG & AI Agents",
      description: "Move from AI pilots to production with grounded knowledge assistants, AI agents, evaluation and governance from Assistora.",
    },
  },
  {
    slug: "devops-transformation",
    title: "DevOps Transformation",
    icon: "workflow",
    visual: "pipeline",
    accent: "#35E5F5",
    summary: "Transform how software is delivered — from slow, manual releases to automated, reliable, continuous delivery.",
    heroHeadline: "From Release Day Anxiety to Continuous Delivery.",
    heroDescription:
      "A practical DevOps transformation that combines automation, platform engineering and team practices to increase delivery speed while improving stability.",
    outcomes: ["Higher deployment frequency", "Shorter lead times", "Lower change failure rate", "Faster recovery"],
    challenge: {
      intro:
        "DevOps is often reduced to buying tools. Lasting improvement comes from removing bottlenecks across the whole delivery system — code, infrastructure, testing, approvals and operations.",
      points: [
        { title: "Manual handoffs", text: "Tickets and approvals add days of waiting to every change." },
        { title: "Inconsistent tooling", text: "Each team maintains its own pipelines and scripts." },
        { title: "Fragile environments", text: "Hand-configured infrastructure causes unpredictable releases." },
        { title: "Reactive operations", text: "Incidents are discovered by users and fixed under pressure." },
      ],
    },
    approach: [
      { title: "Value stream mapping", text: "Visualise the path from idea to production and measure where time is lost." },
      { title: "Golden paths", text: "Standardised templates and pipelines teams can adopt quickly." },
      { title: "Everything as code", text: "Infrastructure, configuration and policies managed through version control." },
      { title: "Progressive delivery", text: "Canary releases, feature flags and automated rollback." },
      { title: "Reliability practice", text: "SLOs, alerting and incident learning reviews." },
    ],
    services: ["devops-platform-engineering", "quality-engineering", "cloud-computing"],
    architecture: [
      { layer: "Source & review", detail: "Trunk-based development with automated checks on every pull request." },
      { layer: "Build & test", detail: "Cached, parallel pipelines producing signed, versioned artefacts." },
      { layer: "Deploy", detail: "GitOps-driven promotion across environments with policy gates." },
      { layer: "Run", detail: "Kubernetes or managed platforms with autoscaling and self-healing." },
      { layer: "Observe", detail: "Metrics, logs, traces and SLO dashboards feeding back into planning." },
    ],
    benefits: [
      { title: "Speed with safety", text: "Smaller, automated changes are both faster and less risky." },
      { title: "Developer experience", text: "Self-service platforms remove waiting and repetitive work." },
      { title: "Operational stability", text: "Consistent environments and observability reduce incidents." },
      { title: "Measurable progress", text: "DORA metrics show improvement over time." },
    ],
    methodology: [
      { title: "Baseline", text: "Value stream mapping and DORA metric measurement.", duration: "2–3 weeks" },
      { title: "Pilot", text: "Apply new practices and platform to one or two teams.", duration: "6–10 weeks" },
      { title: "Scale", text: "Roll golden paths out across teams with enablement.", duration: "Quarterly waves" },
      { title: "Sustain", text: "Platform ownership, metrics reviews and continuous improvement.", duration: "Ongoing" },
    ],
    technologies: ["GitHub Actions", "GitLab CI", "Argo CD", "Kubernetes", "Terraform", "Backstage", "OpenTelemetry", "Grafana"],
    faqs: [
      { question: "Do we need to change our organisation structure?", answer: "Not necessarily. We focus on practices and platforms first; organisational changes are recommended only where they remove clear bottlenecks." },
      { question: "How do you prove the transformation is working?", answer: "We baseline DORA metrics at the start and track them throughout, alongside developer experience feedback." },
    ],
    seo: {
      title: "DevOps Transformation Solutions — CI/CD, GitOps & Platform Engineering",
      description: "Increase delivery speed and stability with value stream mapping, golden paths, GitOps, progressive delivery and SRE practices.",
    },
  },
  {
    slug: "digital-product-engineering",
    title: "Digital Product Engineering",
    icon: "rocket",
    visual: "browser",
    accent: "#65F2C6",
    summary: "Design, build and scale web and mobile products — from first prototype to a platform customers depend on.",
    heroHeadline: "From Idea to Product Customers Love.",
    heroDescription:
      "A cross-functional product engineering approach that brings discovery, design, web and mobile engineering, cloud and quality together to launch and grow digital products.",
    outcomes: ["Validated product direction", "Faster time to market", "Scalable architecture", "Continuous product improvement"],
    challenge: {
      intro:
        "Building the wrong product well is as costly as building the right product badly. Successful digital products balance user insight, technical quality and speed of learning.",
      points: [
        { title: "Uncertain demand", text: "Assumptions about users and features remain untested until launch." },
        { title: "Time-to-market pressure", text: "Competitors move fast, and windows of opportunity close." },
        { title: "Scaling surprises", text: "MVP shortcuts become blockers when usage grows." },
        { title: "Coordination overhead", text: "Separate vendors for design, web, mobile and cloud slow decisions." },
      ],
    },
    approach: [
      { title: "Product discovery", text: "User research, problem framing and prioritised hypotheses." },
      { title: "Design systems", text: "Reusable components that keep web and mobile consistent." },
      { title: "Evolutionary architecture", text: "Start simple, with clear seams that allow scaling later." },
      { title: "Continuous delivery", text: "Ship small increments frequently to learn from real users." },
      { title: "Product analytics", text: "Instrument journeys to measure adoption and guide the roadmap." },
    ],
    services: ["web-development", "mobile-app-development", "software-engineering", "quality-engineering"],
    architecture: [
      { layer: "Experience", detail: "Next.js web application and Flutter or React Native mobile apps." },
      { layer: "API layer", detail: "Typed APIs or GraphQL gateway shared across channels." },
      { layer: "Domain services", detail: "Modular back-end with clear domain boundaries." },
      { layer: "Data & analytics", detail: "Operational database plus product analytics pipeline." },
      { layer: "Platform", detail: "Cloud hosting, CI/CD, monitoring and feature flags." },
    ],
    benefits: [
      { title: "Reduced product risk", text: "Validate assumptions before investing heavily." },
      { title: "One accountable team", text: "Design, engineering and cloud working as a single unit." },
      { title: "Built to grow", text: "Architecture choices that support future scale." },
      { title: "Data-informed roadmap", text: "Analytics show what users actually value." },
    ],
    methodology: [
      { title: "Discover", text: "Research, problem definition and product vision.", duration: "2–4 weeks" },
      { title: "Prototype", text: "Interactive prototypes tested with real users.", duration: "2–4 weeks" },
      { title: "Build MVP", text: "Core product delivered in short increments.", duration: "8–16 weeks" },
      { title: "Grow", text: "Iterate on feedback, scale and extend the platform.", duration: "Ongoing" },
    ],
    technologies: ["React", "Next.js", "Flutter", "React Native", "Node.js", "PostgreSQL", "Figma", "Vercel"],
    faqs: [
      { question: "Can you work with our in-house product team?", answer: "Yes. We can provide a complete product team or augment your designers and engineers where you need capacity or expertise." },
      { question: "How quickly can we launch an MVP?", answer: "Timelines depend on scope, but a focused MVP is commonly delivered within a few months. Discovery helps define the smallest valuable release." },
    ],
    seo: {
      title: "Digital Product Engineering — Web & Mobile Product Development",
      description: "End-to-end digital product engineering: discovery, design, web and mobile development, cloud architecture and product analytics.",
    },
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    icon: "shield",
    visual: "shield",
    accent: "#65F2C6",
    summary: "Secure multi-cloud environments with identity-first controls, continuous posture management and automated guardrails.",
    heroHeadline: "Cloud Security That Scales With Your Cloud.",
    heroDescription:
      "Identify and close cloud security gaps, then keep them closed with policy as code, continuous monitoring and secure-by-default platform patterns across AWS, Google Cloud and Azure.",
    outcomes: ["Reduced misconfiguration risk", "Least-privilege access", "Continuous compliance evidence", "Faster incident detection"],
    challenge: {
      intro:
        "Cloud environments change constantly. Manual reviews cannot keep up with new accounts, services and deployments — security must be automated into the platform itself.",
      points: [
        { title: "Excessive permissions", text: "Broad roles and long-lived keys increase the blast radius of any compromise." },
        { title: "Public exposure", text: "Storage buckets, databases and services can be accidentally exposed." },
        { title: "Fragmented visibility", text: "Each cloud has different tools, logs and alerts." },
        { title: "Audit pressure", text: "Customers and regulators want evidence of effective controls." },
      ],
    },
    approach: [
      { title: "Posture assessment", text: "Benchmark accounts against CIS and provider security best practices." },
      { title: "Identity-first redesign", text: "Federated SSO, short-lived credentials and least-privilege roles." },
      { title: "Guardrails as code", text: "Preventive policies that stop insecure configurations from being deployed." },
      { title: "Centralised detection", text: "Unified logging, threat detection and alert routing." },
      { title: "Continuous compliance", text: "Automated evidence collection mapped to your control framework." },
    ],
    services: ["cybersecurity", "cloud-computing", "devops-platform-engineering"],
    architecture: [
      { layer: "Identity", detail: "Central identity provider, SSO, role design and privileged access workflows." },
      { layer: "Network", detail: "Segmentation, private connectivity and controlled egress." },
      { layer: "Data protection", detail: "Encryption, key management and data classification." },
      { layer: "Guardrails", detail: "Organisation policies, SCPs and Azure Policy enforced as code." },
      { layer: "Detection & response", detail: "Centralised logs, threat detection and runbooks." },
    ],
    benefits: [
      { title: "Smaller attack surface", text: "Misconfigurations are prevented rather than discovered later." },
      { title: "Consistent controls", text: "The same security baseline applied across every cloud." },
      { title: "Faster response", text: "Centralised detection shortens time to investigate." },
      { title: "Easier audits", text: "Evidence is available on demand." },
    ],
    methodology: [
      { title: "Assess", text: "Cloud posture review and prioritised risk register.", duration: "2–3 weeks" },
      { title: "Remediate", text: "Fix critical findings with your engineering teams.", duration: "4–8 weeks" },
      { title: "Automate", text: "Guardrails, detection and compliance automation.", duration: "4–8 weeks" },
      { title: "Operate", text: "Continuous posture monitoring and periodic reviews.", duration: "Ongoing" },
    ],
    technologies: ["AWS Security Hub", "Amazon GuardDuty", "Security Command Center", "Microsoft Defender for Cloud", "Open Policy Agent", "HashiCorp Vault", "Terraform", "Microsoft Entra ID"],
    faqs: [
      { question: "Do you replace our security team?", answer: "No. We complement your security and engineering teams by implementing controls and automation, and leave them with clear ownership and documentation." },
      { question: "Can you secure multiple cloud providers consistently?", answer: "Yes. We define a common security baseline and implement it using each provider's native controls plus cross-cloud policy tooling." },
    ],
    seo: {
      title: "Cloud Security Solutions — Posture Management, IAM & Guardrails",
      description: "Secure AWS, Google Cloud and Azure with identity-first access, guardrails as code, centralised detection and continuous compliance.",
    },
  },
  {
    slug: "data-modernization",
    title: "Data Modernisation",
    icon: "database",
    visual: "data",
    accent: "#35E5F5",
    summary: "Replace fragmented, legacy data systems with a modern, governed platform ready for analytics and AI.",
    heroHeadline: "A Modern Data Foundation for Analytics and AI.",
    heroDescription:
      "Consolidate data from across the business into a governed cloud platform with reliable pipelines, shared metrics and the quality needed for machine learning and AI.",
    outcomes: ["Unified, trusted data", "Self-service analytics", "Real-time where it matters", "AI-ready foundation"],
    challenge: {
      intro:
        "Legacy warehouses, nightly batch jobs and spreadsheet-based reporting slow decisions and block AI initiatives. Modernisation is as much about governance and trust as technology.",
      points: [
        { title: "Siloed sources", text: "Data spread across ERP, CRM, product and finance systems." },
        { title: "Conflicting metrics", text: "Teams calculate the same KPI in different ways." },
        { title: "Legacy limits", text: "On-premises warehouses struggle with scale and new data types." },
        { title: "Limited governance", text: "Unclear ownership, lineage and access rules." },
      ],
    },
    approach: [
      { title: "Data strategy", text: "Align data priorities to business decisions and AI ambitions." },
      { title: "Platform design", text: "Choose warehouse or lakehouse architecture with open formats." },
      { title: "Pipeline engineering", text: "Tested, version-controlled ingestion and transformation." },
      { title: "Semantic layer", text: "Shared, documented business metrics." },
      { title: "Governance", text: "Ownership, cataloguing, lineage, access control and quality monitoring." },
    ],
    services: ["data-engineering", "artificial-intelligence", "cloud-computing"],
    architecture: [
      { layer: "Sources", detail: "Operational databases, SaaS applications, files and event streams." },
      { layer: "Ingestion", detail: "Batch connectors and change data capture or streaming." },
      { layer: "Storage", detail: "Cloud warehouse or lakehouse with open table formats." },
      { layer: "Transformation", detail: "Layered models with dbt or Spark and automated tests." },
      { layer: "Consumption", detail: "BI dashboards, data products, ML features and AI retrieval." },
    ],
    benefits: [
      { title: "Trusted reporting", text: "Consistent metrics across every team and dashboard." },
      { title: "Faster insight", text: "Fresh data available when decisions are made." },
      { title: "Lower cost", text: "Managed, elastic platforms replace legacy hardware and licences." },
      { title: "AI enablement", text: "Clean, governed data accelerates ML and generative AI." },
    ],
    methodology: [
      { title: "Assess", text: "Current state, priority use cases and target architecture.", duration: "2–4 weeks" },
      { title: "Foundation", text: "Platform, governance and first priority data domain.", duration: "6–10 weeks" },
      { title: "Expand", text: "Additional domains, migration of legacy reports.", duration: "Iterative" },
      { title: "Optimise", text: "Performance, cost and self-service enablement.", duration: "Ongoing" },
    ],
    technologies: ["BigQuery", "Snowflake", "Databricks", "dbt", "Apache Airflow", "Apache Kafka", "Looker", "Power BI"],
    faqs: [
      { question: "Will our existing reports keep working during modernisation?", answer: "Yes. We run old and new platforms in parallel and reconcile results before decommissioning legacy reports." },
      { question: "Do we need a data lake or a data warehouse?", answer: "Many organisations benefit from a lakehouse that combines both. We recommend an architecture based on your data types, users and workloads." },
    ],
    seo: {
      title: "Data Modernisation Solutions — Cloud Data Platforms & Governance",
      description: "Modernise legacy data systems into governed cloud warehouses and lakehouses ready for analytics, BI and AI.",
    },
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
