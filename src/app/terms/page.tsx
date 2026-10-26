import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = buildMetadata({ title: "Terms of Use (Draft)", description: "Draft website terms of use for Assistora — pending legal review.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      intro="The terms that apply to your use of the Assistora website."
      sections={[
        { heading: "Acceptance", body: ["By accessing this website you agree to these terms. If you do not agree, please do not use the website."] },
        { heading: "Website content", body: ["Content on this website is provided for general information about Assistora and its services. It does not constitute professional advice or an offer capable of acceptance. Any engagement is governed by a separate written agreement."] },
        { heading: "Intellectual property", body: ["Unless otherwise stated, the website design, text, graphics and illustrations are owned by Assistora. Third-party names and trademarks referenced on the site belong to their respective owners and their mention does not imply endorsement or partnership."] },
        { heading: "Acceptable use", body: ["You must not misuse the website, attempt to gain unauthorised access to it, interfere with its operation, or submit unlawful, misleading or malicious content through its forms."] },
        { heading: "Third-party links", body: ["The website may link to third-party sites. We are not responsible for their content or practices."] },
        { heading: "Disclaimer and limitation of liability", body: ["[To be drafted by counsel, including applicable limitations and exclusions under governing law.]"] },
        { heading: "Governing law", body: ["[Insert governing law and jurisdiction once confirmed.]"] },
        { heading: "Changes", body: ["We may update these terms from time to time. Continued use of the website after changes means you accept the revised terms."] },
      ]}
    />
  );
}
