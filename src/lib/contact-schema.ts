import { z } from "zod";
import { services } from "@/data/services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Something else / not sure yet" },
];

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const budgetOptions = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3 – 6 months", "Exploring options"];

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string().trim().min(1, "Please enter your business email.").max(160).pipe(z.email("Please enter a valid email address.")),
  company: z.string().trim().min(2, "Please enter your company name.").max(120, "Company name is too long."),
  country: z.string().trim().min(2, "Please select your country.").max(80),
  service: z.enum(serviceValues, { error: "Please choose the service you need." }),
  budget: z.string().max(40).optional(),
  timeline: z.string().max(40).optional(),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(5000, "Please keep your description under 5,000 characters."),
  consent: z.boolean().refine((v) => v === true, { message: "Please agree to the privacy policy so we can respond." }),
  /** Honeypot — must stay empty. */
  website: z.string().max(200).optional(),
  /** Timestamp when the form was rendered, used as a simple bot time-trap. */
  startedAt: z.number().int().nonnegative(),
  source: z.string().max(80).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
