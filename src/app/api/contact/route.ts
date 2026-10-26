import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { deliverLead, getLeadChannels } from "@/lib/lead-delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 20_000;
const MIN_FILL_MS = 2_500;

function json(body: Record<string, unknown>, status = 200, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  // Same-origin check (blocks simple cross-site form posts)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, code: "forbidden", message: "Invalid request origin." }, 403);
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "unsupported", message: "Expected JSON." }, 415);
  }

  const limit = rateLimit(`contact:${clientIp(req)}`);
  if (!limit.ok) {
    return json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again later." }, 429, { "Retry-After": String(limit.retryAfter) });
  }

  const raw = await req.text();
  if (raw.length > MAX_BYTES) return json({ ok: false, code: "too_large", message: "Submission is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "invalid_json", message: "Invalid request body." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, code: "validation", message: "Please review the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors }, 400);
  }
  const lead = parsed.data;

  // Spam traps: honeypot filled or form submitted implausibly fast. Respond as success so bots learn nothing.
  const tooFast = !lead.startedAt || Date.now() - lead.startedAt < MIN_FILL_MS;
  if ((lead.website && lead.website.length > 0) || tooFast) {
    return json({ ok: true });
  }

  if (getLeadChannels().length === 0) {
    const dev = process.env.NODE_ENV !== "production";
    return json(
      {
        ok: false,
        code: "not_configured",
        message: dev
          ? "Development notice: no delivery channel is configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL (and/or CRM_WEBHOOK_URL) in .env.local. Your message was NOT sent."
          : "Our contact form is temporarily unavailable. Please email us directly and we'll respond as soon as possible.",
      },
      503,
    );
  }

  const result = await deliverLead(lead, { receivedAt: new Date().toISOString(), userAgent: req.headers.get("user-agent") ?? undefined });
  if (result.failed.length) console.error("[contact] delivery failures:", result.failed);
  if (result.delivered === 0) {
    return json({ ok: false, code: "delivery_failed", message: "We couldn't send your message right now. Please try again shortly." }, 502);
  }
  return json({ ok: true });
}
