import {
  siAngular, siApachekafka, siApachespark, siArgo, siDatabricks, siDocker, siFastapi, siFlutter, siGithubactions,
  siGo, siGooglebigquery, siGooglecloud, siGrafana, siHelm, siKotlin, siKubernetes, siLangchain, siNextdotjs,
  siNodedotjs, siOpentelemetry, siPostgresql, siPrometheus, siPython, siPytorch, siReact, siSnowflake, siSwift,
  siTensorflow, siTerraform, siTypescript, siVault, siGithub, siX,
} from "simple-icons";

export interface BrandIcon {
  title: string;
  path: string;
  hex: string;
}

const byName: Record<string, BrandIcon> = {
  "Google Cloud": siGooglecloud, Kubernetes: siKubernetes, Docker: siDocker, Terraform: siTerraform, Helm: siHelm,
  "Argo CD": siArgo, "GitHub Actions": siGithubactions, Prometheus: siPrometheus, Grafana: siGrafana,
  OpenTelemetry: siOpentelemetry, Python: siPython, TypeScript: siTypescript, React: siReact, "Next.js": siNextdotjs,
  "Node.js": siNodedotjs, FastAPI: siFastapi, Angular: siAngular, Flutter: siFlutter, Kotlin: siKotlin, Swift: siSwift,
  Go: siGo, PostgreSQL: siPostgresql, BigQuery: siGooglebigquery, Snowflake: siSnowflake, "Apache Kafka": siApachekafka,
  "Apache Spark": siApachespark, Databricks: siDatabricks, PyTorch: siPytorch, TensorFlow: siTensorflow,
  LangChain: siLangchain, "HashiCorp Vault": siVault,
};

export function techIcon(name: string): BrandIcon | undefined {
  return byName[name];
}

export const socialIcons = { github: siGithub, x: siX };
