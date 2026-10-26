import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CloudSpotlight } from "@/components/home/CloudSpotlight";
import { AISection } from "@/components/home/AISection";
import { DevOpsSection } from "@/components/home/DevOpsSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { WebMobileSection } from "@/components/home/WebMobileSection";
import { WhyAssistora } from "@/components/home/WhyAssistora";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { GlobalDelivery } from "@/components/home/GlobalDelivery";
import { InsightsSection } from "@/components/home/InsightsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: { absolute: "Assistora — We Engineer What's Next | Cloud, DevOps, AI & Software Engineering" },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesOverview />
      <CloudSpotlight />
      <AISection />
      <DevOpsSection />
      <SecuritySection />
      <WebMobileSection />
      <WhyAssistora />
      <ProcessSection />
      <IndustriesSection />
      <CertificationsSection />
      <GlobalDelivery />
      <InsightsSection />
      <FinalCTA />
    </>
  );
}
