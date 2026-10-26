/**
 * Central company configuration.
 * Values that differ per environment come from NEXT_PUBLIC_* variables (see .env.example).
 * Anything left empty is hidden from the site rather than replaced with invented data.
 */
const env = (value: string | undefined) => (value && value.trim().length > 0 ? value.trim() : undefined);

export const siteConfig = {
  name: "Assistora",
  legalName: "Assistora",
  tagline: "We engineer what's next.",
  statement:
    "From cloud infrastructure to intelligent software, Assistora designs, builds, secures, and scales the technology powering ambitious businesses.",
  philosophy: "Your challenges. Our engineering. Infinite possibilities.",
  description:
    "Assistora is a global technology services and engineering company delivering cloud consulting, DevOps, artificial intelligence, cybersecurity, and custom software for businesses worldwide.",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.assistora.com").replace(/\/$/, ""),
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL),
  gtmId: env(process.env.NEXT_PUBLIC_GTM_ID),
  headquarters: {
    country: "Pakistan",
    countryCode: "PK",
    label: "Headquartered in Pakistan",
  },
  serviceCoverage: "Global — remote-first delivery",
  serviceRegions: [
    "United States",
    "Canada",
    "United Kingdom",
    "Europe",
    "Middle East",
    "Australia",
    "Asia",
  ],
  social: {
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    x: env(process.env.NEXT_PUBLIC_X_URL),
    github: env(process.env.NEXT_PUBLIC_GITHUB_URL),
  },
  cta: {
    primary: "Let's Talk",
    project: "Start Your Project",
    consult: "Book a Consultation",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  { label: "Services", href: "/services", mega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const companyLinks = [
  { label: "About Assistora", href: "/about" },
  { label: "Our Process", href: "/about#methodology" },
  { label: "Engagement Models", href: "/about#engagement" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
] as const;

/** Build a contact link that preselects a service in the inquiry form. */
export function contactHref(service?: string, source?: string) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (source) params.set("source", source);
  const qs = params.toString();
  return qs ? `/contact?${qs}` : "/contact";
}
