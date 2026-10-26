import type { IconName, ProcessStep, TitledText } from "@/types/content";

/**
 * Editable company content for the About page and shared sections.
 * Leave optional fields empty until confirmed — empty values are not rendered.
 * Do not add founder biographies, team size, office addresses or history until verified.
 */
export const company = {
  introduction: [
    "Assistora is a technology services and engineering company headquartered in Pakistan, working with businesses around the world. We help organisations design, build, secure and scale the technology that drives their growth — from cloud infrastructure and DevOps to artificial intelligence, cybersecurity and custom software.",
    "We combine multi-cloud engineering expertise with complete software engineering capability, so clients can work with one accountable partner from strategy through implementation and ongoing operation.",
  ],
  mission:
    "To give ambitious businesses everywhere access to exceptional engineering — turning complex technology challenges into reliable, secure and scalable solutions.",
  vision:
    "To be the engineering partner businesses trust to build what's next — recognised for technical excellence, integrity and global collaboration.",
  philosophy: [
    { title: "Engineer for outcomes", text: "Technology choices start from business goals and measurable results, not trends." },
    { title: "Simplicity scales", text: "We prefer the simplest architecture that meets today's needs and leaves room for tomorrow's." },
    { title: "Automate the repeatable", text: "Infrastructure, testing and delivery are code — consistent, reviewable and fast." },
    { title: "Security from the first line", text: "Security and privacy are design inputs, not final checks." },
  ] satisfies TitledText[],
  values: [
    { title: "Integrity", text: "We are honest about trade-offs, timelines and what we know.", icon: "scale" },
    { title: "Craftsmanship", text: "We take pride in clean, tested, well-documented work.", icon: "wrench" },
    { title: "Ownership", text: "We act as accountable partners, not order-takers.", icon: "handshake" },
    { title: "Curiosity", text: "We keep learning so clients benefit from current best practice.", icon: "lightbulb" },
    { title: "Collaboration", text: "We work openly with client teams across time zones and cultures.", icon: "users" },
    { title: "Respect for data", text: "We treat client and user data with the care it deserves.", icon: "lock" },
  ] satisfies (TitledText & { icon: IconName })[],
  /** Optional, verified details — rendered only when filled in. */
  founded: "",
  teamSize: "",
  leadership: [] as { name: string; role: string; bio: string; linkedin?: string }[],
};

export const whyAssistora: (TitledText & { icon: IconName })[] = [
  { icon: "award", title: "Internationally Certified Specialists", text: "Our engineers pursue recognised industry certifications across cloud, Kubernetes, security and data — and apply that knowledge in real delivery." },
  { icon: "cloud", title: "Multi-Cloud Expertise", text: "Hands-on engineering across AWS, Google Cloud and Microsoft Azure means recommendations based on fit, not familiarity." },
  { icon: "layers", title: "End-to-End Engineering", text: "Strategy, architecture, software, cloud, data, AI and security from one accountable team." },
  { icon: "shield", title: "Security-Conscious Delivery", text: "Least privilege, secure defaults and automated checks are part of how we build — on every project." },
  { icon: "handshake", title: "Flexible Engagement Models", text: "Project delivery, dedicated teams or expert augmentation, scaled to what you need." },
  { icon: "globe", title: "Global Collaboration", text: "Remote-first delivery with structured communication and overlap across international time zones." },
];

export const engineeringProcess: ProcessStep[] = [
  { title: "Discover", text: "We listen first — understanding your goals, users, constraints and existing systems through workshops and technical discovery." },
  { title: "Architect", text: "We design a target architecture and delivery plan, documenting key decisions, risks and trade-offs." },
  { title: "Design", text: "We shape user experiences, interfaces, APIs and data models, validating them early with prototypes." },
  { title: "Engineer", text: "We build in short iterations with automated testing, code review and continuous integration." },
  { title: "Deploy", text: "We release safely through automated pipelines, progressive delivery and observability." },
  { title: "Optimise", text: "We measure, learn and improve performance, cost, reliability and user outcomes over time." },
];

export const engagementModels: (TitledText & { icon: IconName; bestFor: string })[] = [
  { icon: "target", title: "Project Delivery", text: "A defined scope delivered end to end by an Assistora team, with clear milestones and acceptance criteria.", bestFor: "Well-defined initiatives such as migrations, MVPs or platform builds." },
  { icon: "users", title: "Dedicated Team", text: "A cross-functional team working as an extension of your organisation on an evolving roadmap.", bestFor: "Ongoing product development and long-running programmes." },
  { icon: "zap", title: "Expert Augmentation", text: "Specialist engineers or architects who join your team to add capacity or specific expertise.", bestFor: "Filling skill gaps in cloud, DevOps, AI or security." },
  { icon: "compass", title: "Advisory & Assessment", text: "Time-boxed assessments, architecture reviews and strategic guidance.", bestFor: "Decisions that need independent, expert input." },
];

export const globalDelivery: TitledText[] = [
  { title: "Remote-first by design", text: "Our delivery model is built for distributed collaboration — clear documentation, asynchronous updates and well-run ceremonies." },
  { title: "Time-zone overlap", text: "We plan working hours to provide meaningful overlap with clients in North America, Europe, the Middle East, Asia and Australia." },
  { title: "Transparent communication", text: "Shared backlogs, regular demos and written status updates keep everyone aligned." },
  { title: "Secure collaboration", text: "Access is granted on least-privilege principles through your identity provider wherever possible." },
];

export const servicesFaqs = [
  { question: "How do engagements typically start?", answer: "Most engagements begin with a short discovery conversation, followed by a scoped assessment or proposal. This keeps the first commitment small while giving both sides a clear understanding of goals, constraints and approach." },
  { question: "Can you work alongside our in-house team?", answer: "Yes. We regularly work as an extension of internal engineering teams — pairing, sharing knowledge and adopting your tools and rituals where that works best." },
  { question: "Which time zones do you cover?", answer: "We are headquartered in Pakistan and plan working hours to create meaningful overlap with clients in North America, Europe, the Middle East, Asia and Australia." },
  { question: "How do you price projects?", answer: "We offer fixed-scope pricing for well-defined deliverables and time-and-materials or monthly team pricing for evolving roadmaps. We recommend the model that best fits the level of uncertainty in your project." },
  { question: "Who owns the intellectual property?", answer: "Ownership is defined in your agreement. Our standard approach is that clients own the code, infrastructure definitions and documentation we create for them." },
  { question: "How do you protect our systems and data?", answer: "We follow least-privilege access, use your identity provider where possible, keep secrets out of code, and agree data-handling requirements up front — including NDAs where needed." },
];
