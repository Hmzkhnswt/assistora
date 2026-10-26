/**
 * Lightweight, vendor-neutral event layer.
 * Events are pushed to `window.dataLayer` (GA4 / GTM compatible) and re-emitted as a DOM
 * event so other integrations can subscribe. Nothing is sent anywhere unless a tag manager
 * has been configured AND the visitor has granted consent (see ConsentManager).
 */
export type AnalyticsEvent =
  | "cta_click"
  | "service_page_view"
  | "contact_form_start"
  | "contact_form_submit_success"
  | "consultation_booking_click"
  | "email_link_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const CONSENT_KEY = "assistora-consent";

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...params, page_path: window.location.pathname };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("assistora:track", { detail: payload }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
