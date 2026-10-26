import type { CertificationCategory } from "@/types/content";

/**
 * Certification showcase.
 *
 * IMPORTANT: Only add entries to `credentials` once they are verified and the holder has
 * consented to publication. Each entry needs a public verification URL (e.g. Credly).
 * Categories with no verified credentials are shown as expertise domains without claims.
 */
export const certificationCategories: CertificationCategory[] = [
  { id: "aws", title: "AWS", icon: "cloud", description: "Architecture, development, operations and security on Amazon Web Services.", credentials: [] },
  { id: "google-cloud", title: "Google Cloud", icon: "cloud", description: "Cloud architecture, data engineering and DevOps on Google Cloud.", credentials: [] },
  { id: "azure", title: "Microsoft Azure", icon: "cloud", description: "Azure administration, solution architecture and DevOps engineering.", credentials: [] },
  { id: "kubernetes", title: "Kubernetes", icon: "boxes", description: "Cluster administration, application development and security for Kubernetes.", credentials: [] },
  { id: "terraform", title: "Terraform", icon: "layers", description: "Infrastructure as code with HashiCorp Terraform.", credentials: [] },
  { id: "security", title: "Cybersecurity", icon: "shield", description: "Cloud security, application security and security operations.", credentials: [] },
  { id: "ai-data", title: "AI & Data", icon: "brain", description: "Machine learning, generative AI and data engineering.", credentials: [] },
];

export const verifiedCredentialCount = certificationCategories.reduce((n, c) => n + c.credentials.length, 0);
