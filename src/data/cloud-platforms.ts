import type { CloudPlatform } from "@/components/visuals/CloudVisual";

export const cloudPlatforms: {
  id: CloudPlatform;
  name: string;
  tagline: string;
  description: string;
  services: string[];
  badges: string[];
  href: string;
}[] = [
  {
    id: "aws",
    name: "AWS",
    tagline: "Breadth, maturity and a vast managed-service catalogue.",
    description:
      "We design secure multi-account AWS foundations, migrate workloads with minimal disruption and build serverless and container platforms aligned to the AWS Well-Architected Framework.",
    services: ["Landing zones with AWS Organizations & Control Tower", "EKS, ECS and Lambda platforms", "Migration & modernisation", "Cost optimisation and FinOps"],
    badges: ["EKS", "Lambda", "RDS", "CloudFormation", "Terraform", "CloudWatch"],
    href: "/services/cloud-computing#aws-consulting",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    tagline: "Data, analytics and AI at planetary scale.",
    description:
      "We build Google Cloud environments with clean resource hierarchies and policy, run containers on GKE and Cloud Run, and create BigQuery-centred data platforms ready for Vertex AI.",
    services: ["Organisation & project hierarchy design", "GKE and Cloud Run platforms", "BigQuery data platforms", "Vertex AI foundations"],
    badges: ["GKE", "Cloud Run", "BigQuery", "Vertex AI", "Pub/Sub", "Terraform"],
    href: "/services/cloud-computing#google-cloud-consulting",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    tagline: "Enterprise integration and the Microsoft ecosystem.",
    description:
      "We implement Azure landing zones with management groups and policy, integrate Entra ID, and run applications on AKS and App Service with hybrid connectivity to existing estates.",
    services: ["Azure landing zones & governance", "AKS and App Service platforms", "Entra ID integration", "Hybrid connectivity & migration"],
    badges: ["AKS", "App Service", "Azure Functions", "Entra ID", "Bicep", "Azure Monitor"],
    href: "/services/cloud-computing#azure-consulting",
  },
];
