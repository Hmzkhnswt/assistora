/**
 * End-to-end checks for the Assistora site.
 * Usage: start the app (npm run build && PORT=3100 npm start), then: BASE_URL=http://localhost:3100 node tests/e2e.mjs
 * Set CHROME_PATH to use a local Chrome instead of Playwright's bundled Chromium.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const SHOTS = new URL("./screenshots/", import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

const results = [];
const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const fail = (name, detail = "") => results.push({ ok: false, name, detail });
const check = (cond, name, detail) => (cond ? pass(name, detail) : fail(name, detail));

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

async function newPage(viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, ...opts });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(BASE) && !r.url().includes("/api/contact")) errors.push(`HTTP ${r.status()} ${r.url()}`);
  });
  return { ctx, page, errors };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 1400));
  });
}

// ---------------------------------------------------------------- routes
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
check(routes.length >= 37, "sitemap lists all routes", `${routes.length} URLs`);

const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const shotRoutes = new Set(["/", "/services", "/services/cloud-computing", "/services/artificial-intelligence", "/solutions/enterprise-ai", "/industries/healthcare", "/about", "/insights", "/insights/rag-in-production", "/contact"]);
const internalLinks = new Map();

for (const [vpName, vp] of Object.entries(viewports)) {
  const { ctx, page, errors } = await newPage(vp);
  for (const route of routes) {
    errors.length = 0;
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    const status = res?.status() ?? 0;
    await scrollThrough(page);
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const hidden = [...document.querySelectorAll("[data-reveal], [data-reveal-stagger] > *")].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && parseFloat(getComputedStyle(el).opacity) < 0.95;
      }).length;
      const bodyOverflow = getComputedStyle(document.body).overflowY;
      // Masked text (word reveals + hero lines) must have settled back into its mask.
      const masked = [...document.querySelectorAll(".rw > span, [data-intro='line'] > span")].filter((el) => {
        const r = el.getBoundingClientRect();
        const pr = el.parentElement.getBoundingClientRect();
        return r.height > 0 && Math.abs(r.top - pr.top) > 4;
      }).length;
      return {
        overflowX: de.scrollWidth - window.innerWidth,
        scrollable: de.scrollHeight > window.innerHeight,
        bodyOverflow,
        hidden: hidden + masked,
        h1: document.querySelectorAll("h1").length,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      };
    });
    const ok = status === 200 && m.overflowX <= 1 && m.hidden === 0 && m.h1 === 1 && errors.length === 0 && m.bodyOverflow !== "hidden" && !!m.canonical && !!m.description;
    check(
      ok,
      `[${vpName}] ${route}`,
      ok ? `200 · ${m.title.slice(0, 60)}` : JSON.stringify({ status, overflowX: m.overflowX, hidden: m.hidden, h1: m.h1, canonical: !!m.canonical, desc: !!m.description, bodyOverflow: m.bodyOverflow, errors: errors.slice(0, 4) }),
    );
    if (vpName === "desktop" && !m.scrollable && route !== "/404") fail(`[desktop] ${route} scrolls`, "page not scrollable");
    for (const href of m.links) if (href.startsWith("/")) internalLinks.set(href, route);
    if (shotRoutes.has(route)) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${SHOTS}${vpName}${route === "/" ? "-home" : route.replaceAll("/", "-")}.png`, fullPage: true });
    }
  }
  await ctx.close();
}

// ---------------------------------------------------------------- links + anchors
try {
  const pageIds = new Map();
  let broken = [];
  for (const href of internalLinks.keys()) {
    const [path, hash] = href.split("#");
    const p = path || "/";
    const res = await fetch(BASE + p, { redirect: "manual" });
    if (res.status !== 200) {
      broken.push(`${href} → ${res.status} (from ${internalLinks.get(href)})`);
      continue;
    }
    if (hash) {
      if (!pageIds.has(p)) {
        const html = await res.text();
        pageIds.set(p, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1])));
      }
      if (!pageIds.get(p).has(hash)) broken.push(`${href} → missing #${hash}`);
    }
  }
  check(broken.length === 0, "all internal links & anchors resolve", broken.length ? broken.join("; ") : `${internalLinks.size} unique links`);
} catch (e) {
  fail("links + anchors block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- mega menu
try {
  const { ctx, page, errors } = await newPage(viewports.desktop);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Services" });
  await trigger.hover();
  await page.waitForTimeout(500);
  check(await page.locator("#mega-menu").isVisible(), "mega menu opens on hover");
  check((await page.locator("#mega-menu a").count()) >= 26, "mega menu lists all service links", `${await page.locator("#mega-menu a").count()} links`);
  await page.mouse.move(5, 600);
  await page.waitForTimeout(500);
  check(!(await page.locator("#mega-menu").isVisible()), "mega menu closes on mouse leave");
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(300);
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check(focused === "Cloud Computing", "ArrowDown focuses first mega link", focused);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check(!(await page.locator("#mega-menu").isVisible()) && (await trigger.evaluate((el) => el === document.activeElement)), "Escape closes mega menu and restores focus");
  await trigger.click();
  await page.locator("#mega-menu").getByRole("link", { name: "AWS Consulting" }).click();
  await page.waitForURL("**/services/cloud-computing#aws-consulting");
  check(page.url().endsWith("/services/cloud-computing#aws-consulting"), "mega menu link navigates to service anchor");
  check(errors.length === 0, "no console errors during mega menu use", errors.join("; "));
  await ctx.close();
} catch (e) {
  fail("mega menu block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- mobile menu
try {
  const { ctx, page } = await newPage(viewports.mobile, { hasTouch: true, isMobile: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  check(await page.locator("#mobile-menu").isVisible(), "mobile menu opens");
  await page.screenshot({ path: `${SHOTS}mobile-menu.png` });
  await page.locator("#mobile-menu").getByRole("button", { name: "Services" }).click();
  await page.locator("#mobile-menu").getByRole("button", { name: "AI & Data" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Generative AI" }).click();
  await page.waitForURL("**/services/artificial-intelligence#generative-ai");
  await page.waitForTimeout(300);
  check(!(await page.locator("#mobile-menu").isVisible()), "mobile menu link navigates and closes menu", page.url());
  await page.evaluate(() => window.scrollBy(0, -300));
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  check(!(await page.locator("#mobile-menu").isVisible()), "Escape closes mobile menu");
  await ctx.close();
} catch (e) {
  fail("mobile menu block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- interactions
try {
  const { ctx, page } = await newPage(viewports.desktop);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const tab = page.locator("#home-cloud-tab-gcp");
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  check(await page.locator("#home-cloud-panel-gcp").isVisible(), "cloud platform tab switches panel");
  await tab.press("ArrowRight");
  check(await page.locator("#home-cloud-panel-azure").isVisible(), "cloud tabs support arrow keys");

  await page.goto(BASE + "/services/cybersecurity", { waitUntil: "networkidle" });
  const q = page.getByRole("button", { name: /SOC 2 or ISO 27001/ });
  await q.scrollIntoViewIfNeeded();
  await q.click();
  check((await q.getAttribute("aria-expanded")) === "true", "FAQ accordion expands");

  await page.goto(BASE + "/insights", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "DevOps", exact: true }).click();
  check((await page.locator("main a[href^='/insights/']").count()) >= 1, "insights category filter works");
  await page.fill("#insight-search", "zzzz-no-match");
  check(await page.getByText("No articles match your filters.").isVisible(), "insights search empty state");
  const draft = await fetch(BASE + "/insights/modular-monolith-first");
  check(draft.status === 404, "draft articles are not published", `status ${draft.status}`);
  await ctx.close();
} catch (e) {
  fail("interactions block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- contact form
try {
  const { ctx, page } = await newPage(viewports.desktop);
  await page.goto(BASE + "/contact?service=artificial-intelligence&source=test", { waitUntil: "networkidle" });
  check((await page.locator("#service").inputValue()) === "artificial-intelligence", "contact form preselects service from query");
  await page.getByRole("button", { name: /Send inquiry/ }).click();
  await page.waitForTimeout(300);
  const invalid = await page.locator('[aria-invalid="true"]').count();
  check(invalid >= 6, "client-side validation flags required fields", `${invalid} invalid fields`);
  await page.fill("#fullName", "Test Person");
  await page.fill("#email", "not-an-email");
  await page.getByRole("button", { name: /Send inquiry/ }).click();
  check(await page.getByText("Please enter a valid email address.").isVisible(), "email validation message shown");
  await page.fill("#email", "test@example.com");
  await page.fill("#company", "Example Co");
  await page.selectOption("#country", "Canada");
  await page.fill("#description", "We want to build a retrieval-augmented assistant over our internal documentation.");
  await page.check('input[name="consent"]');
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: /Send inquiry/ }).click();
  await page.waitForSelector("text=Message not sent", { timeout: 8000 }).catch(() => {});
  check(await page.getByText("Message not sent").isVisible(), "unconfigured delivery shows explicit configuration state (no fake success)");
  await page.screenshot({ path: `${SHOTS}contact-not-configured.png`, fullPage: false });
  await ctx.close();

  const bad = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Origin: BASE }, body: JSON.stringify({ fullName: "x" }) });
  const badJson = await bad.json();
  check(bad.status === 400 && !!badJson.fieldErrors, "API rejects invalid payload server-side", `status ${bad.status}`);
  const cross = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" }, body: "{}" });
  check(cross.status === 403, "API rejects cross-origin posts", `status ${cross.status}`);
  const honey = await fetch(BASE + "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: BASE, "X-Forwarded-For": "10.9.9.9" },
    body: JSON.stringify({ fullName: "Bot", email: "b@b.co", company: "Bot", country: "Canada", service: "other", description: "spam spam spam spam spam", consent: true, website: "http://spam", startedAt: 1 }),
  });
  check(honey.status === 200, "honeypot submissions are silently dropped", `status ${honey.status}`);
} catch (e) {
  fail("contact form block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- reduced motion
try {
  const { ctx, page, errors } = await newPage(viewports.desktop, { reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => ({
    intro: document.documentElement.classList.contains("hero-intro"),
    lineTransform: getComputedStyle(document.querySelector('[data-intro="line"] > span')).transform,
    hiddenReveal: [...document.querySelectorAll("[data-reveal]")].filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.95).length,
    colAnim: getComputedStyle(document.querySelector(".mosaic-col")).animationName,
  }));
  check(!state.intro && state.lineTransform === "none" && state.hiddenReveal === 0 && state.colAnim === "none", "reduced motion: content visible, mosaic static", JSON.stringify(state));
  check(errors.length === 0, "reduced motion: no console errors", errors.join("; "));
  await ctx.close();
} catch (e) {
  fail("reduced motion block", String(e).split("\n")[0]);
}

// ---------------------------------------------------------------- responsive sweep (no horizontal overflow)
try {
  const widths = [360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
  const sample = ["/", "/services", "/services/devops-platform-engineering", "/solutions/cloud-migration", "/industries/logistics", "/about", "/contact"];
  const issues = [];
  for (const w of widths) {
    const { ctx, page } = await newPage({ width: w, height: 900 });
    for (const r of sample) {
      await page.goto(BASE + r, { waitUntil: "networkidle" });
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) issues.push(`${w}px ${r} overflow ${over}px`);
    }
    if (w === 1024 || w === 1920 || w === 360) await page.goto(BASE + "/", { waitUntil: "networkidle" }), await page.waitForTimeout(2500), await page.screenshot({ path: `${SHOTS}hero-${w}.png` });
    await ctx.close();
  }
  check(issues.length === 0, "no horizontal overflow at 360–1920px", issues.join("; ") || `${widths.length} widths × ${sample.length} pages`);
} catch (e) {
  fail("responsive sweep (no horizontal overflow) block", String(e).split("\n")[0]);
}

await browser.close();

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
