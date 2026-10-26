import "server-only";
import type { ContactInput } from "@/lib/contact-schema";
import { getService } from "@/data/services";

/**
 * Lead delivery channels. Each is enabled only when its environment variables exist.
 *   - Email via Resend (RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)
 *   - Optional CRM / automation webhook (CRM_WEBHOOK_URL [+ CRM_WEBHOOK_SECRET])
 * Add further adapters (e.g. HubSpot Forms API) by implementing `LeadChannel`.
 */
interface LeadChannel {
  name: string;
  send(lead: ContactInput, meta: LeadMeta): Promise<void>;
}

export interface LeadMeta {
  receivedAt: string;
  userAgent?: string;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function serviceLabel(slug: string) {
  return getService(slug)?.title ?? "Other / not sure yet";
}

function summaryRows(lead: ContactInput) {
  return [
    ["Name", lead.fullName],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Country", lead.country],
    ["Service", serviceLabel(lead.service)],
    ["Budget", lead.budget || "—"],
    ["Timeline", lead.timeline || "—"],
    ["Source", lead.source || "—"],
  ] as const;
}

const resendChannel = (apiKey: string, from: string, to: string): LeadChannel => ({
  name: "resend",
  async send(lead, meta) {
    const rows = summaryRows(lead);
    const html = `<h2>New project inquiry</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table><h3>Project description</h3><p style="white-space:pre-wrap">${escapeHtml(
      lead.description,
    )}</p><p style="color:#888">Received ${meta.receivedAt}</p>`;
    const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${lead.description}\n\nReceived ${meta.receivedAt}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: lead.email,
        subject: `New inquiry: ${serviceLabel(lead.service)} — ${lead.company}`,
        html,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  },
});

const webhookChannel = (url: string, secret?: string): LeadChannel => ({
  name: "crm-webhook",
  async send(lead, meta) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret ? { "X-Webhook-Secret": secret } : {}) },
      body: JSON.stringify({
        type: "contact_inquiry",
        ...meta,
        lead: {
          fullName: lead.fullName,
          email: lead.email,
          company: lead.company,
          country: lead.country,
          service: lead.service,
          serviceLabel: serviceLabel(lead.service),
          budget: lead.budget || null,
          timeline: lead.timeline || null,
          description: lead.description,
          source: lead.source || null,
        },
      }),
    });
    if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
  },
});

export function getLeadChannels(): LeadChannel[] {
  const channels: LeadChannel[] = [];
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, CRM_WEBHOOK_URL, CRM_WEBHOOK_SECRET } = process.env;
  if (RESEND_API_KEY && CONTACT_FROM_EMAIL && CONTACT_TO_EMAIL) {
    channels.push(resendChannel(RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL));
  }
  if (CRM_WEBHOOK_URL) channels.push(webhookChannel(CRM_WEBHOOK_URL, CRM_WEBHOOK_SECRET));
  return channels;
}

export async function deliverLead(lead: ContactInput, meta: LeadMeta) {
  const channels = getLeadChannels();
  const results = await Promise.allSettled(channels.map((c) => c.send(lead, meta)));
  const failed = results
    .map((r, i) => (r.status === "rejected" ? `${channels[i].name}: ${String(r.reason)}` : null))
    .filter(Boolean) as string[];
  return { attempted: channels.length, delivered: channels.length - failed.length, failed };
}
