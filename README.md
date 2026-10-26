# Assistora — Corporate Website

Marketing and lead-generation site for **Assistora**, a global technology services and engineering company headquartered in Pakistan.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Three.js, React Hook Form and Zod.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` (run `npx next typegen` first on a fresh clone) |
| `npm run test:e2e` | Playwright end-to-end suite against a running server (`BASE_URL`, optional `CHROME_PATH`) |

## Environment variables

See `.env.example`. Everything is optional: anything left empty is hidden on the site, and the site never shows invented data in its place.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph (defaults to `https://www.assistora.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public inquiry email (footer, contact page, mobile menu) |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a consultation" link on the contact page |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_GITHUB_URL` | Social links |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager. Only loaded after the visitor accepts the consent banner |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact form email delivery via Resend (server-only) |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | Optional JSON webhook for HubSpot workflows, Zapier, Make, n8n, etc. |

**Contact form without delivery configured:** the API returns `503 not_configured` and the form says the message was *not* sent. In development it also lists the missing variables. It never shows a false success.

## Project structure

```
src/
  app/                 Routes (App Router), sitemap.ts, robots.ts, OG image, /api/contact
  components/
    layout/            Header (mega menu + mobile nav), Footer, PageHero, analytics/consent
    hero/              Homepage hero, infinite mosaic, SVG technology tiles, GSAP intro
    home/              The homepage sections
    visuals/           Animated illustrations (cloud, shield, pipeline, neural network, devices…)
    three/             Lazy-loaded WebGL globe (single context, paused off-screen)
    services/ insights/ forms/ ui/ animations/
  data/                Typed content: services, solutions, industries, insights, company, certifications, site-config
  lib/                 SEO/JSON-LD helpers, analytics, contact schema, rate limiting, lead delivery
  types/content.ts     Content model
tests/e2e.mjs          Playwright checks
```

## Editing content

All content is typed data in `src/data/`. Pages, the mega menu, footer links, contact-form options and the sitemap are generated from it.

- **Services** (`services.ts`): each service has capabilities with `id`s, which the mega menu deep-links to (`megaMenu`).
- **Solutions / Industries**: `solutions.ts`, `industries.ts`. Industry "scenarios" are labelled as illustrative on the page; they are not case studies.
- **Insights** (`insights.ts`): only `status: "published"` articles appear anywhere. Swap `getPublishedArticles()` for a CMS fetch later.
- **Certifications** (`certifications.ts`): add credentials only once verified, each with a public `verificationUrl`.
- **Company** (`company.ts`): `founded`, `teamSize` and `leadership` render only when filled in.
- **Site config** (`site-config.ts`): name, taglines, headquarters, service regions, CTA text.

## Lead routing & tracking

- **Service preselection:** service CTAs link to `/contact?service=<slug>&source=<origin>`, and the form preselects that service.
- **Server-side checks** in `/api/contact`:
  - Zod validation
  - Same-origin check
  - Size limit
  - Per-IP rate limit (in-memory; replace with Redis/KV for multi-instance hosting)
  - Honeypot field and a minimum fill time
- **Delivery channels:** pluggable, in `src/lib/lead-delivery.ts`.
- **Events:** `src/lib/analytics.ts` pushes `cta_click`, `service_page_view`, `contact_form_start`, `contact_form_submit_success`, `consultation_booking_click` and `email_link_click` to `dataLayer`. Elements opt in with `data-track="label"`.

## Motion

- **Scroll reveals:** set with data attributes (`data-reveal`, `data-reveal-stagger`, `data-reveal-words`, `data-parallax`, `data-tilt`) and driven by one `MotionController`.
- **Reduced motion:** every animation honours `prefers-reduced-motion`.
- **Visuals:** the canvas and WebGL visuals pause when off-screen.
- **Fallback:** if scripts never load, a CSS fallback reveals all content after 5 seconds.

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL`, contact email, and Resend (or CRM webhook) credentials
- [ ] Replace the **draft** Privacy Policy and Terms with counsel-approved text
- [ ] Review the four Insights articles (currently `published`) and the illustrative industry scenarios
- [ ] Add verified certifications and any confirmed company details
- [ ] Confirm usage of third-party technology names and logos (Simple Icons, CC0; AWS and Azure are text-only)
