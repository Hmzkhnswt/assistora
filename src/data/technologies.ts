import type { Technology } from "@/types/content";

/**
 * Technologies Assistora works with. Logos come from simple-icons (CC0) where the brand
 * permits it; brands without a licensed mark (e.g. AWS, Azure) render as a wordmark.
 * Listing a technology does not imply a formal partnership with its vendor.
 */
export const technologies: Technology[] = [
  { name: "AWS", category: "cloud" },
  { name: "Google Cloud", icon: "siGooglecloud", category: "cloud" },
  { name: "Microsoft Azure", category: "cloud" },
  { name: "Kubernetes", icon: "siKubernetes", category: "devops" },
  { name: "Docker", icon: "siDocker", category: "devops" },
  { name: "Terraform", icon: "siTerraform", category: "devops" },
  { name: "Helm", icon: "siHelm", category: "devops" },
  { name: "Argo CD", icon: "siArgo", category: "devops" },
  { name: "GitHub Actions", icon: "siGithubactions", category: "devops" },
  { name: "Prometheus", icon: "siPrometheus", category: "devops" },
  { name: "Grafana", icon: "siGrafana", category: "devops" },
  { name: "OpenTelemetry", icon: "siOpentelemetry", category: "devops" },
  { name: "Python", icon: "siPython", category: "software" },
  { name: "TypeScript", icon: "siTypescript", category: "software" },
  { name: "React", icon: "siReact", category: "software" },
  { name: "Next.js", icon: "siNextdotjs", category: "software" },
  { name: "Node.js", icon: "siNodedotjs", category: "software" },
  { name: "FastAPI", icon: "siFastapi", category: "software" },
  { name: "Angular", icon: "siAngular", category: "software" },
  { name: "Flutter", icon: "siFlutter", category: "software" },
  { name: "Kotlin", icon: "siKotlin", category: "software" },
  { name: "Swift", icon: "siSwift", category: "software" },
  { name: "Go", icon: "siGo", category: "software" },
  { name: "PostgreSQL", icon: "siPostgresql", category: "ai-data" },
  { name: "BigQuery", icon: "siGooglebigquery", category: "ai-data" },
  { name: "Snowflake", icon: "siSnowflake", category: "ai-data" },
  { name: "Apache Kafka", icon: "siApachekafka", category: "ai-data" },
  { name: "Apache Spark", icon: "siApachespark", category: "ai-data" },
  { name: "Databricks", icon: "siDatabricks", category: "ai-data" },
  { name: "PyTorch", icon: "siPytorch", category: "ai-data" },
  { name: "TensorFlow", icon: "siTensorflow", category: "ai-data" },
  { name: "LangChain", icon: "siLangchain", category: "ai-data" },
  { name: "HashiCorp Vault", icon: "siVault", category: "security" },
];

export const marqueeTechnologies = [
  "AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Docker", "Terraform", "Python",
  "React", "Next.js", "TypeScript", "Node.js", "Flutter", "PostgreSQL", "Apache Kafka",
  "Snowflake", "PyTorch", "GitHub Actions", "Prometheus",
].map((name) => technologies.find((t) => t.name === name)!);
