"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { CONSENT_KEY, track } from "@/lib/analytics";

type Consent = "granted" | "denied" | "unset";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}
function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable — choice applies to this page view only */
  }
  listeners.forEach((l) => l());
}

/** Global click tracking + consent-gated tag manager loading. */
export function AnalyticsProvider({ gtmId }: { gtmId?: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a,button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) track("email_link_click", { href });
      if (el.hasAttribute("data-booking")) track("consultation_booking_click", { href });
      const label = el.getAttribute("data-track");
      if (label) track("cta_click", { label, href, text: el.textContent?.trim().slice(0, 80) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!gtmId) return null;
  return <ConsentManager gtmId={gtmId} />;
}

function ConsentManager({ gtmId }: { gtmId: string }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => "denied" as Consent);

  return (
    <>
      {consent === "granted" && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      )}
      {consent === "unset" && (
        <div role="dialog" aria-live="polite" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-ink p-5 text-white shadow-2xl sm:inset-x-6 sm:bottom-6">
          <p className="text-sm leading-relaxed text-white/80">
            We use optional analytics cookies to understand how our website is used and improve it. You can accept or decline — the site works either way.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => setConsent("granted")} className="h-10 rounded-full bg-action px-5 text-sm font-semibold">
              Accept analytics
            </button>
            <button type="button" onClick={() => setConsent("denied")} className="h-10 rounded-full border border-white/20 px-5 text-sm font-semibold">
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
