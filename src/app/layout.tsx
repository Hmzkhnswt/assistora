import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/layout/AnalyticsProvider";
import { MotionController } from "@/components/animations/MotionController";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Assistora — We Engineer What's Next | Cloud, DevOps, AI & Software Engineering",
    template: "%s | Assistora",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["cloud consulting", "DevOps services", "AI development", "cybersecurity services", "software engineering company", "AWS", "Google Cloud", "Azure"],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
    title: "Assistora — We Engineer What's Next",
    description: siteConfig.statement,
  },
  twitter: { card: "summary_large_image", title: "Assistora — We Engineer What's Next", description: siteConfig.statement },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#080D1F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Runs before first paint: enables JS-only reveal styles, arms the homepage hero intro,
 * and adds a fallback so content can never stay hidden if scripts fail to load.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm&&location.pathname==='/'){d.classList.add('hero-intro');setTimeout(function(){d.classList.remove('hero-intro')},4000)}setTimeout(function(){if(!d.dataset.motion)d.classList.add('reveal-fallback')},5000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-electric px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionController />
        <AnalyticsProvider gtmId={siteConfig.gtmId} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
