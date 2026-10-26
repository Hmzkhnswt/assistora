import type { Industry } from "@/types/content";

/**
 * Industry pages describe common challenges and how Assistora's services apply.
 * Scenarios are illustrative examples — not case studies — and are labelled as such on the page.
 */
export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    icon: "landmark",
    accent: "#4776FF",
    summary: "Secure, compliant and resilient platforms for banking, payments, lending, insurance and fintech.",
    heroHeadline: "Engineering Trust Into Financial Technology.",
    heroDescription:
      "Financial organisations need to modernise quickly while meeting demanding expectations for security, availability and regulatory compliance. We help them build platforms that do both.",
    challenges: [
      { title: "Regulatory and audit demands", text: "Controls, data residency and evidence requirements shape every architecture decision." },
      { title: "Legacy core systems", text: "Mainframe and monolithic platforms constrain new digital products." },
      { title: "Fraud and security threats", text: "Financial services remain a high-value target for attackers." },
      { title: "Real-time expectations", text: "Customers expect instant payments, decisions and notifications." },
    ],
    solutions: [
      { solution: "cloud-security", text: "Identity-first cloud controls, encryption and continuous compliance evidence." },
      { solution: "data-modernization", text: "Unified, governed data for reporting, risk and customer insight." },
      { solution: "enterprise-ai", text: "Document intelligence and knowledge assistants with strong governance." },
    ],
    technologies: ["AWS", "Microsoft Azure", "Kubernetes", "Apache Kafka", "PostgreSQL", "Snowflake", "HashiCorp Vault", "Terraform"],
    scenarios: [
      { title: "Digital onboarding platform", text: "A web and mobile onboarding journey integrating identity verification, document capture and core banking APIs." },
      { title: "Real-time transaction analytics", text: "Streaming pipelines that feed fraud signals and customer notifications within seconds." },
      { title: "Regulated cloud landing zone", text: "A governed cloud foundation with guardrails mapped to internal control frameworks." },
    ],
    services: ["cybersecurity", "cloud-computing", "data-engineering", "artificial-intelligence"],
    faqs: [
      { question: "Can you work within our regulatory requirements?", answer: "Yes. We design architectures around your control framework, data residency and audit requirements, working closely with your risk and compliance teams." },
      { question: "Do you have experience with payments integrations?", answer: "Our engineers build integrations with payment gateways and financial APIs. We will discuss relevant experience and references specific to your use case during discovery." },
    ],
    seo: {
      title: "Technology Services for Financial Services & Fintech",
      description: "Secure cloud, data, AI and software engineering for banks, payments, insurance and fintech organisations.",
    },
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: "heartPulse",
    accent: "#65F2C6",
    summary: "Secure, interoperable and patient-centred technology for providers, digital health and life sciences.",
    heroHeadline: "Technology That Supports Better Care.",
    heroDescription:
      "Healthcare organisations must protect sensitive data, integrate complex systems and deliver accessible digital experiences. We engineer solutions designed around privacy and reliability.",
    challenges: [
      { title: "Sensitive data protection", text: "Health information demands strict access control, encryption and auditability." },
      { title: "Interoperability", text: "Clinical, administrative and third-party systems rarely share data easily." },
      { title: "Accessible patient experiences", text: "Digital services must work for every patient, on every device." },
      { title: "Operational efficiency", text: "Administrative workload takes time away from care." },
    ],
    solutions: [
      { solution: "cloud-security", text: "Secure cloud environments designed to support healthcare compliance requirements." },
      { solution: "digital-product-engineering", text: "Accessible patient portals and mobile apps." },
      { solution: "enterprise-ai", text: "AI-assisted document processing and administrative automation with human oversight." },
    ],
    technologies: ["HL7 FHIR", "Google Cloud Healthcare API", "Microsoft Azure", "AWS", "React", "Flutter", "PostgreSQL", "Python"],
    scenarios: [
      { title: "Patient appointment app", text: "A cross-platform mobile app for booking, reminders and secure messaging integrated with scheduling systems." },
      { title: "Clinical data integration", text: "An integration layer using FHIR APIs to consolidate data from multiple systems." },
      { title: "Administrative document automation", text: "AI-assisted extraction of data from referral and claims documents with reviewer approval." },
    ],
    services: ["cybersecurity", "mobile-app-development", "artificial-intelligence", "software-engineering"],
    faqs: [
      { question: "Can you help with HIPAA or GDPR requirements?", answer: "We implement technical safeguards that support these requirements, such as encryption, access control and audit logging. Formal compliance responsibility remains with your organisation and its advisers." },
      { question: "Do you work with FHIR?", answer: "Yes. Our engineers build integrations using HL7 FHIR APIs and cloud healthcare data services." },
    ],
    seo: {
      title: "Healthcare Technology Services — Secure Cloud, Apps & AI",
      description: "Secure, interoperable healthcare software, patient apps, cloud platforms and AI automation engineered by Assistora.",
    },
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    icon: "shoppingCart",
    accent: "#35E5F5",
    summary: "Fast, scalable commerce experiences and the data and infrastructure behind them.",
    heroHeadline: "Commerce Experiences Built for Peak Demand.",
    heroDescription:
      "Online retail depends on speed, reliability and personalisation. We engineer storefronts, integrations and cloud platforms that perform when it matters most.",
    challenges: [
      { title: "Peak traffic", text: "Promotions and seasonal events create sudden spikes in demand." },
      { title: "Page performance", text: "Every second of load time affects conversion." },
      { title: "Fragmented systems", text: "Inventory, orders, payments and fulfilment live in different platforms." },
      { title: "Personalisation", text: "Customers expect relevant recommendations and search." },
    ],
    solutions: [
      { solution: "digital-product-engineering", text: "Headless storefronts and mobile commerce apps." },
      { solution: "data-modernization", text: "Unified customer, product and order data for analytics." },
      { solution: "enterprise-ai", text: "AI-powered search, recommendations and customer support." },
    ],
    technologies: ["Next.js", "React", "Shopify APIs", "Stripe", "Algolia", "Google Cloud", "BigQuery", "Redis"],
    scenarios: [
      { title: "Headless storefront", text: "A high-performance Next.js storefront decoupled from the commerce engine." },
      { title: "Peak readiness programme", text: "Load testing, autoscaling and caching improvements ahead of a major sales event." },
      { title: "AI shopping assistant", text: "A grounded assistant that answers product questions using catalogue data." },
    ],
    services: ["web-development", "cloud-computing", "data-engineering", "quality-engineering"],
    faqs: [
      { question: "Do you work with existing commerce platforms?", answer: "Yes. We integrate with commerce platforms through their APIs, including headless approaches that keep your existing engine." },
      { question: "Can you help us prepare for high-traffic events?", answer: "Yes. We combine performance testing, caching and autoscaling to validate capacity before peak events." },
    ],
    seo: {
      title: "E-commerce Technology Services — Headless Commerce & Scale",
      description: "Headless commerce, performance engineering, data platforms and AI personalisation for online retailers.",
    },
  },
  {
    slug: "telecommunications",
    title: "Telecommunications",
    icon: "radioTower",
    accent: "#865DFF",
    summary: "Scalable platforms, automation and data for network operators and communications providers.",
    heroHeadline: "Engineering for Always-Connected Networks.",
    heroDescription:
      "Telecommunications businesses operate at massive scale with demanding availability requirements. We help them automate operations, modernise platforms and use data more effectively.",
    challenges: [
      { title: "Massive data volumes", text: "Network and usage data arrives continuously at high velocity." },
      { title: "Legacy OSS/BSS", text: "Older operational and billing systems slow new product launches." },
      { title: "Operational automation", text: "Manual processes cannot keep pace with network complexity." },
      { title: "Customer experience", text: "Self-service and support channels must be fast and reliable." },
    ],
    solutions: [
      { solution: "devops-transformation", text: "Automated delivery and cloud-native platforms for faster change." },
      { solution: "data-modernization", text: "Streaming data platforms for network and customer analytics." },
      { solution: "enterprise-ai", text: "AI-assisted customer support and operational insights." },
    ],
    technologies: ["Kubernetes", "Apache Kafka", "Apache Spark", "Google Cloud", "AWS", "Prometheus", "Grafana", "Go"],
    scenarios: [
      { title: "Network telemetry pipeline", text: "A streaming pipeline that aggregates telemetry for real-time operational dashboards." },
      { title: "Self-service customer portal", text: "Account, billing and plan management connected to back-office systems." },
      { title: "Platform modernisation", text: "Moving internal services onto Kubernetes with GitOps delivery." },
    ],
    services: ["devops-platform-engineering", "data-engineering", "cloud-computing", "artificial-intelligence"],
    faqs: [
      { question: "Can your platforms handle telecom-scale data?", answer: "We design streaming and processing architectures with Kafka, Spark and cloud-native services built to scale horizontally. Capacity is validated through performance testing." },
      { question: "Do you replace OSS/BSS systems?", answer: "We typically modernise incrementally — integrating, extending and gradually replacing components rather than attempting high-risk replacements." },
    ],
    seo: {
      title: "Telecommunications Technology Services — Cloud, Data & Automation",
      description: "Cloud-native platforms, streaming data, DevOps automation and AI for telecommunications providers.",
    },
  },
  {
    slug: "logistics",
    title: "Logistics",
    icon: "truck",
    accent: "#4776FF",
    summary: "Real-time visibility, optimisation and mobile tools for supply chain and transportation operations.",
    heroHeadline: "Real-Time Visibility Across Every Shipment.",
    heroDescription:
      "Logistics runs on timely information. We build the integrations, data pipelines, mobile tools and AI that help operations teams see, predict and act.",
    challenges: [
      { title: "Limited visibility", text: "Shipment status is scattered across carriers, warehouses and partners." },
      { title: "Partner integration", text: "Every carrier and customer has different data formats and APIs." },
      { title: "Field operations", text: "Drivers and warehouse staff need reliable tools, often offline." },
      { title: "Demand volatility", text: "Planning must adapt to changing volumes and disruptions." },
    ],
    solutions: [
      { solution: "data-modernization", text: "Real-time tracking data and operational dashboards." },
      { solution: "digital-product-engineering", text: "Driver and warehouse mobile apps with offline support." },
      { solution: "enterprise-ai", text: "Forecasting and exception detection to anticipate delays." },
    ],
    technologies: ["Apache Kafka", "Flutter", "Kotlin", "Google Maps Platform", "BigQuery", "PostgreSQL", "AWS", "Python"],
    scenarios: [
      { title: "Shipment visibility platform", text: "Integrating carrier APIs and EDI feeds into a single tracking view for customers." },
      { title: "Proof-of-delivery app", text: "An offline-capable driver app capturing signatures, photos and timestamps." },
      { title: "Volume forecasting", text: "Machine learning forecasts to support staffing and capacity planning." },
    ],
    services: ["software-engineering", "mobile-app-development", "data-engineering", "artificial-intelligence"],
    faqs: [
      { question: "Can you integrate with carrier and partner systems?", answer: "Yes. We build integration layers for APIs, EDI and file-based exchanges with monitoring and error handling." },
      { question: "Do your mobile apps work offline?", answer: "Yes. We design offline-first data synchronisation for field and warehouse environments with unreliable connectivity." },
    ],
    seo: {
      title: "Logistics Technology Services — Visibility, Integration & Mobile",
      description: "Shipment visibility, partner integrations, driver apps and forecasting for logistics and supply chain operations.",
    },
  },
  {
    slug: "education",
    title: "Education",
    icon: "graduationCap",
    accent: "#65F2C6",
    summary: "Engaging, accessible learning platforms and the cloud and data systems behind them.",
    heroHeadline: "Technology That Helps Every Learner Thrive.",
    heroDescription:
      "Education providers and edtech companies need platforms that are accessible, scalable during peak periods and secure for student data. We engineer them.",
    challenges: [
      { title: "Accessibility", text: "Learning platforms must work for students of all abilities and devices." },
      { title: "Peak usage", text: "Enrolment and exam periods create sharp spikes in demand." },
      { title: "Student data privacy", text: "Personal and academic records require careful protection." },
      { title: "Disconnected tools", text: "Learning, administrative and communication systems rarely integrate." },
    ],
    solutions: [
      { solution: "digital-product-engineering", text: "Accessible web and mobile learning experiences." },
      { solution: "cloud-migration", text: "Elastic cloud hosting that scales for peak academic periods." },
      { solution: "enterprise-ai", text: "AI-assisted tutoring and content tools with appropriate safeguards." },
    ],
    technologies: ["Next.js", "React Native", "LTI", "Google Cloud", "AWS", "PostgreSQL", "Python", "Vertex AI"],
    scenarios: [
      { title: "Learning platform", text: "A scalable, accessible web platform for courses, assessments and progress tracking." },
      { title: "Student mobile app", text: "Timetables, notifications and course content in a cross-platform app." },
      { title: "AI study assistant", text: "A grounded assistant answering questions from approved course materials." },
    ],
    services: ["web-development", "mobile-app-development", "cloud-computing", "artificial-intelligence"],
    faqs: [
      { question: "Can you integrate with our learning management system?", answer: "Yes. We integrate through standards such as LTI and the LMS's APIs." },
      { question: "How do you approach AI in education?", answer: "With care: grounding responses in approved materials, protecting student data and keeping educators in control." },
    ],
    seo: {
      title: "Education Technology Services — Learning Platforms & Edtech",
      description: "Accessible learning platforms, student apps, scalable cloud and responsible AI for education providers and edtech.",
    },
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: "factory",
    accent: "#35E5F5",
    summary: "Connected operations, data and automation for modern manufacturers.",
    heroHeadline: "Smarter Operations From Factory Floor to Cloud.",
    heroDescription:
      "Manufacturers are connecting machines, systems and people to improve quality and efficiency. We engineer the integrations, data platforms and applications that make it possible.",
    challenges: [
      { title: "Operational data silos", text: "Machine, MES and ERP data rarely come together in one place." },
      { title: "Quality control", text: "Defects found late are expensive to correct." },
      { title: "Legacy systems", text: "Ageing applications are difficult to integrate and maintain." },
      { title: "Planning accuracy", text: "Demand and maintenance planning rely on incomplete information." },
    ],
    solutions: [
      { solution: "data-modernization", text: "Unified operational and business data for analytics." },
      { solution: "enterprise-ai", text: "Computer vision inspection and predictive maintenance models." },
      { solution: "digital-product-engineering", text: "Shop-floor applications and dashboards for operators." },
    ],
    technologies: ["Azure IoT", "AWS IoT", "MQTT", "Apache Kafka", "Databricks", "Python", "PyTorch", "Power BI"],
    scenarios: [
      { title: "Production analytics", text: "Collecting machine and MES data into a cloud platform for OEE dashboards." },
      { title: "Visual quality inspection", text: "A computer vision model flagging potential defects for operator review." },
      { title: "ERP integration", text: "Connecting production systems with ERP for accurate inventory and order status." },
    ],
    services: ["data-engineering", "artificial-intelligence", "software-engineering", "it-consulting"],
    faqs: [
      { question: "Can you work with industrial protocols?", answer: "Our engineers integrate with common protocols such as MQTT and OPC UA through gateways and cloud IoT services." },
      { question: "Do we need to replace our existing systems?", answer: "Usually not. We integrate and extend existing MES and ERP platforms before considering replacement." },
    ],
    seo: {
      title: "Manufacturing Technology Services — Data, AI & Integration",
      description: "Industrial data platforms, computer vision, predictive maintenance and system integration for manufacturers.",
    },
  },
  {
    slug: "startups-saas",
    title: "Startups & SaaS",
    icon: "rocket",
    accent: "#865DFF",
    summary: "Engineering capacity and cloud expertise to launch, scale and harden SaaS products.",
    heroHeadline: "Build Fast. Scale Smart. Stay Secure.",
    heroDescription:
      "Startups and SaaS companies need to move quickly without accumulating technical debt that slows them down later. We provide senior engineering across product, cloud, AI and security.",
    challenges: [
      { title: "Speed to market", text: "Small teams must ship quickly with limited resources." },
      { title: "Scaling architecture", text: "MVP shortcuts can block growth and enterprise deals." },
      { title: "Enterprise readiness", text: "Larger customers require SSO, audit logs and security evidence." },
      { title: "Cloud cost", text: "Infrastructure spend can grow faster than revenue." },
    ],
    solutions: [
      { solution: "digital-product-engineering", text: "From MVP to scalable multi-tenant product." },
      { solution: "devops-transformation", text: "Automated delivery that keeps small teams fast." },
      { solution: "cloud-security", text: "Security foundations that support enterprise sales." },
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Vercel", "AWS", "Google Cloud", "Stripe"],
    scenarios: [
      { title: "MVP to multi-tenant", text: "Evolving an MVP into a multi-tenant SaaS platform with billing and tenant isolation." },
      { title: "Enterprise readiness", text: "Adding SSO, role-based access, audit logging and security documentation." },
      { title: "Cloud cost optimisation", text: "Reducing infrastructure spend while preparing for growth." },
    ],
    services: ["web-development", "devops-platform-engineering", "cloud-computing", "cybersecurity"],
    faqs: [
      { question: "Can you work as our extended engineering team?", answer: "Yes. Flexible engagement models let you add senior engineers, a full product team or specialist expertise as needed." },
      { question: "Can you help us prepare for SOC 2?", answer: "We implement the technical controls and evidence collection SOC 2 typically requires, and help you work effectively with your auditor." },
    ],
    seo: {
      title: "Engineering Services for Startups & SaaS Companies",
      description: "MVP development, SaaS architecture, DevOps, cloud cost optimisation and enterprise-readiness engineering for startups.",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function getIndustries(slugs: string[]) {
  return slugs.map(getIndustry).filter((i): i is Industry => Boolean(i));
}
