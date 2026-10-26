import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = buildMetadata({ title: "Privacy Policy (Draft)", description: "Draft privacy policy for the Assistora website — pending legal review.", path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro="How Assistora collects, uses and protects personal information submitted through this website."
      sections={[
        { heading: "Who we are", body: ["This website is operated by Assistora, a technology services company headquartered in Pakistan. [Insert registered legal entity name, registration details and contact address once confirmed.]"] },
        { heading: "Information we collect", body: ["When you submit our contact form we collect the details you provide: your name, business email, company, country, the service you are interested in, optional budget and timeline, and your project description.", "If analytics are enabled and you consent, we may collect information about how you use the site, such as pages visited and interactions, through cookies or similar technologies."] },
        { heading: "How we use information", body: ["We use contact form information to respond to your inquiry, discuss potential services and maintain records of business communications.", "We use optional analytics data, where consented, to understand and improve the website."] },
        { heading: "Legal bases", body: ["[To be confirmed by counsel — for example, legitimate interests in responding to business inquiries and consent for optional analytics cookies, as applicable under GDPR, UK GDPR and other relevant laws.]"] },
        { heading: "Sharing and processors", body: ["We use service providers to operate the website and deliver messages, such as hosting and email delivery providers. They process data on our behalf under appropriate agreements. [List processors once confirmed.]", "We do not sell personal information."] },
        { heading: "International transfers", body: ["Because we serve clients globally, information may be processed in countries other than your own. [Describe safeguards once confirmed.]"] },
        { heading: "Retention", body: ["We retain inquiry information only as long as necessary for the purposes described above. [Insert retention periods.]"] },
        { heading: "Your rights", body: ["Depending on your location, you may have rights to access, correct, delete or restrict the use of your personal information, and to object or withdraw consent. To exercise these rights, contact us using the details on our contact page."] },
        { heading: "Security", body: ["We apply appropriate technical and organisational measures to protect personal information, including encryption in transit and access controls."] },
        { heading: "Changes", body: ["We may update this policy from time to time. The latest version will always be available on this page."] },
      ]}
    />
  );
}
