export type IconName =
  | "cloud"
  | "server"
  | "workflow"
  | "brain"
  | "shield"
  | "globe"
  | "smartphone"
  | "database"
  | "code"
  | "testTube"
  | "compass"
  | "layers"
  | "gitBranch"
  | "container"
  | "boxes"
  | "lock"
  | "activity"
  | "cpu"
  | "sparkles"
  | "bot"
  | "messageSquare"
  | "mic"
  | "lineChart"
  | "zap"
  | "plug"
  | "rocket"
  | "target"
  | "users"
  | "handshake"
  | "award"
  | "landmark"
  | "heartPulse"
  | "shoppingCart"
  | "radioTower"
  | "truck"
  | "graduationCap"
  | "factory"
  | "lightbulb"
  | "search"
  | "fileCheck"
  | "refresh"
  | "eye"
  | "key"
  | "network"
  | "gauge"
  | "wrench"
  | "map"
  | "clock"
  | "scale";

/** Illustration key used to pick an animated visual component. */
export type VisualKey =
  | "cloud"
  | "pipeline"
  | "neural"
  | "shield"
  | "browser"
  | "phone"
  | "data"
  | "architecture"
  | "testing"
  | "enterprise";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Capability extends TitledText {
  /** Anchor id used for deep links from the mega menu. */
  id: string;
  icon?: IconName;
}

export interface TechGroup {
  label: string;
  items: string[];
}

export interface ProcessStep extends TitledText {
  duration?: string;
}

export type ServiceCategoryId = "cloud" | "devops" | "ai-data" | "software" | "security";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategoryId;
  icon: IconName;
  visual: VisualKey;
  /** Accent colour used for the service's visual treatment. */
  accent: string;
  featured: boolean;
  shortDescription: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  overview: string[];
  highlights: string[];
  challenges: TitledText[];
  capabilities: Capability[];
  technologies: TechGroup[];
  solutions: TitledText[];
  process: ProcessStep[];
  benefits: TitledText[];
  industries: string[];
  faqs: FAQ[];
  relatedServices: string[];
  ctaLabel: string;
  seo: SEOConfig;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  description: string;
  icon: IconName;
}

export interface MegaMenuLink {
  label: string;
  /** Service slug the link resolves to. */
  service: string;
  /** Optional capability anchor on that service page. */
  anchor?: string;
  icon: IconName;
}

export interface MegaMenuGroup {
  category: ServiceCategoryId;
  title: string;
  links: MegaMenuLink[];
}

export interface Solution {
  slug: string;
  title: string;
  icon: IconName;
  visual: VisualKey;
  accent: string;
  summary: string;
  heroHeadline: string;
  heroDescription: string;
  outcomes: string[];
  challenge: { intro: string; points: TitledText[] };
  approach: TitledText[];
  services: string[];
  architecture: { layer: string; detail: string }[];
  benefits: TitledText[];
  methodology: ProcessStep[];
  technologies: string[];
  faqs: FAQ[];
  seo: SEOConfig;
}

export interface Industry {
  slug: string;
  title: string;
  icon: IconName;
  accent: string;
  summary: string;
  heroHeadline: string;
  heroDescription: string;
  challenges: TitledText[];
  solutions: { solution: string; text: string }[];
  technologies: string[];
  scenarios: TitledText[];
  services: string[];
  faqs: FAQ[];
  seo: SEOConfig;
}

export type ArticleStatus = "draft" | "review" | "published";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; language: string; code: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  status: ArticleStatus;
  featured?: boolean;
  relatedServices: string[];
  body: ArticleBlock[];
  seo: SEOConfig;
}

export interface Credential {
  name: string;
  issuer: string;
  /** Link to a public verification page (e.g. Credly). Required before publishing. */
  verificationUrl: string;
  holder?: string;
}

export interface CertificationCategory {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  /** Only verified credentials belong here. Empty arrays render as "verification in progress". */
  credentials: Credential[];
}

export interface Technology {
  name: string;
  /** simple-icons export key, when a licensed logo is available. */
  icon?: string;
  category: "cloud" | "devops" | "ai-data" | "software" | "security";
}
