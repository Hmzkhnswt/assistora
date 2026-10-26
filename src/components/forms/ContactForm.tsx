"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowUpRight, CheckCircle2, LoaderCircle, Settings } from "lucide-react";
import Link from "next/link";
import { budgetOptions, contactSchema, serviceOptions, timelineOptions, type ContactInput } from "@/lib/contact-schema";
import { countries } from "@/data/countries";
import { siteConfig } from "@/data/site-config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; message: string }
  | { kind: "not_configured"; message: string };

const inputCls =
  "mt-2 block w-full rounded-2xl border-0 bg-cloud px-4 py-3.5 text-[15px] text-ink ring-1 ring-ink/10 transition-shadow outline-none placeholder:text-ink/35 focus:bg-white focus:ring-2 focus:ring-electric aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#e5484d]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-[#d23b40]">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm({ defaultService, source }: { defaultService?: string; source?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const started = useRef(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      country: "",
      service: defaultService ?? "",
      budget: "",
      timeline: "",
      description: "",
      consent: false,
      website: "",
      startedAt: 0,
      source: source ?? "",
    },
  });

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("contact_form_start", { service: defaultService ?? "none" });
  };

  async function onSubmit(values: ContactInput) {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
        fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
      };
      if (res.ok && data.ok) {
        track("contact_form_submit_success", { service: values.service });
        setStatus({ kind: "success" });
        reset();
        return;
      }
      if (res.status === 400 && data.fieldErrors) {
        for (const [field, msgs] of Object.entries(data.fieldErrors)) {
          if (msgs?.[0]) setError(field as keyof ContactInput, { message: msgs[0] });
        }
        setStatus({ kind: "error", message: "Please review the highlighted fields." });
        return;
      }
      if (data.code === "not_configured") {
        setStatus({ kind: "not_configured", message: data.message ?? "Form delivery is not configured." });
        return;
      }
      setStatus({ kind: "error", message: data.message ?? "Something went wrong. Please try again in a moment." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="flex flex-col items-start rounded-[28px] bg-white p-8 ring-1 ring-ink/[0.07] sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-mint/20 text-[#0e9f72]">
          <CheckCircle2 aria-hidden="true" className="size-8" />
        </span>
        <h2 className="mt-6 text-h3 font-semibold">Thank you — your message is on its way.</h2>
        <p className="mt-3 max-w-lg text-muted">An Assistora engineer will review your project details and reply to the email address you provided. If your request is urgent, mention it in a follow-up email.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-8 text-sm font-semibold text-electric">
          Send another message
        </button>
      </div>
    );
  }

  const fieldProps = (name: keyof ContactInput) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={onFirstInteraction}
      className="rounded-[28px] bg-white p-6 ring-1 ring-ink/[0.07] sm:p-10"
      aria-describedby="form-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-semibold">
            Full name <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <input id="fullName" autoComplete="name" className={inputCls} {...fieldProps("fullName")} {...register("fullName")} />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Business email <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <input id="email" type="email" autoComplete="email" inputMode="email" className={inputCls} {...fieldProps("email")} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-semibold">
            Company name <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <input id="company" autoComplete="organization" className={inputCls} {...fieldProps("company")} {...register("company")} />
          <FieldError id="company-error" message={errors.company?.message} />
        </div>
        <div>
          <label htmlFor="country" className="text-sm font-semibold">
            Country <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <select id="country" autoComplete="country-name" className={inputCls} {...fieldProps("country")} {...register("country")}>
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FieldError id="country-error" message={errors.country?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="text-sm font-semibold">
            Service required <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <select id="service" className={inputCls} {...fieldProps("service")} {...register("service")}>
            <option value="">Choose a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError id="service-error" message={errors.service?.message} />
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-semibold">
            Project budget <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="budget" className={inputCls} {...register("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="text-sm font-semibold">
            Project timeline <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="timeline" className={inputCls} {...register("timeline")}>
            <option value="">Not sure yet</option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Project description <span aria-hidden="true" className="text-electric">*</span>
          </label>
          <textarea
            id="description"
            rows={6}
            placeholder="What are you building or trying to solve? Share any context about current systems, goals or constraints."
            className={cn(inputCls, "resize-y")}
            {...fieldProps("description")}
            {...register("description")}
          />
          <FieldError id="description-error" message={errors.description?.message} />
        </div>

        {/* Honeypot — hidden from people, attractive to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <input type="checkbox" className="mt-0.5 size-5 shrink-0 rounded accent-electric" {...fieldProps("consent")} {...register("consent")} />
            <span>
              I agree that Assistora may use the information I provide to respond to my inquiry, as described in the{" "}
              <Link href="/privacy-policy" className="font-semibold text-ink underline underline-offset-2">
                Privacy Policy
              </Link>
              . <span aria-hidden="true" className="text-electric">*</span>
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent?.message} />
        </div>
      </div>

      <div aria-live="polite" className="mt-6 empty:hidden">
        {status.kind === "error" && (
          <p role="alert" className="flex items-start gap-2 rounded-2xl bg-[#fff1f1] p-4 text-sm text-[#b42328]">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </p>
        )}
        {status.kind === "not_configured" && (
          <div role="alert" className="rounded-2xl bg-[#fff8e6] p-4 text-sm text-[#7a5600]">
            <p className="flex items-center gap-2 font-semibold">
              <Settings aria-hidden="true" className="size-4" /> Message not sent
            </p>
            <p className="mt-1">{status.message}</p>
            {siteConfig.email && (
              <p className="mt-2">
                You can also email us directly at{" "}
                <a className="font-semibold underline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                .
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm text-muted">
          <span aria-hidden="true" className="text-electric">*</span> Required fields. We never share your details.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-action px-8 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgb(71_118_255/0.8)] transition-colors hover:bg-action-hover disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send inquiry <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
