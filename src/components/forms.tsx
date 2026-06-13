"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { MiniServiceSelector } from "@/components/interactive";
import { cn } from "@/lib/utils";

type LeadFormProps = {
  title: string;
  description: string;
  endpoint: string;
  formType: string;
  defaultService?: string;
  compact?: boolean;
  eyebrow?: string;
  submitLabel?: string;
};

const budgetOptions = ["Under $2,500", "$2,500 - $5,000", "$5,000 - $15,000", "$15,000+", "Need guidance"];
const timelineOptions = ["This month", "1-3 months", "3-6 months", "Exploring options"];

function trackEvent(event: string, payload: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, ...payload });
}

function eventNameForForm(formType: string) {
  if (formType.includes("free-digital-audit")) return "audit_form_submit";
  if (formType.includes("consultation")) return "consultation_form_submit";
  if (formType.includes("service")) return "service_cta_click";
  if (formType.includes("case-study")) return "case_study_inquiry_submit";
  if (formType.includes("blog")) return "blog_cta_click";
  return "contact_form_submit";
}

export function LeadForm({
  title,
  description,
  endpoint,
  formType,
  defaultService = "",
  compact = false,
  eyebrow = "Start the Conversation",
  submitLabel
}: LeadFormProps) {
  const [service, setService] = useState(defaultService);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    formData.set("service", service);
    formData.set("sourcePage", pathname);
    formData.set("formType", formType);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok || !data.ok) {
      setError(data.error || "Please check the form and try again.");
      return;
    }

    setSuccess(data.message || "Your request has been received.");
    trackEvent(eventNameForForm(formType), {
      formType,
      service,
      sourcePage: pathname
    });
    setTimeout(() => {
      router.push(`/thank-you?form=${encodeURIComponent(formType)}`);
    }, 700);
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-brand-blue/10 bg-white p-5 shadow-sm lg:p-7">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-brand-blue">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-brand-dark/75">{description}</p>
      </div>

      <div className={cn("grid gap-4", compact ? "md:grid-cols-1" : "md:grid-cols-2")}>
        <TextField label="Full name" name="fullName" required />
        <TextField label="Company name" name="company" />
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Phone" name="phone" />
        <TextField label="Website or social link" name="website" />
        <label>
          <span className="mb-2 block text-sm font-semibold text-brand-blue">Service interested in</span>
          <MiniServiceSelector value={service} onChange={setService} />
        </label>
        <SelectField label="Budget range" name="budget" options={budgetOptions} />
        <SelectField label="Timeline" name="timeline" options={timelineOptions} />
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-brand-blue">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Share your goal, current challenge, timeline, and the result you want from Ezee Technologies."
          className="w-full rounded-lg border border-brand-blue/10 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15"
        />
      </label>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      {success && <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Submitting" : submitLabel || title}
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formData = new FormData(event.currentTarget);
    formData.set("fullName", "Newsletter Subscriber");
    formData.set("message", "Newsletter and insight subscription request.");
    formData.set("formType", "newsletter");
    formData.set("sourcePage", "footer");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: formData
    });
    setState(response.ok ? "success" : "error");
    if (response.ok) {
      trackEvent("newsletter_submit", { sourcePage: "footer" });
      setEmail("");
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Work email"
        className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/55 focus:border-brand-aqua"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-5 text-sm font-bold text-white"
      >
        {state === "loading" ? "Joining" : "Subscribe"}
      </button>
      {state === "success" && <p className="text-sm text-brand-aqua sm:basis-full">You are subscribed.</p>}
      {state === "error" && <p className="text-sm text-red-200 sm:basis-full">Please try again.</p>}
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-brand-blue">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 w-full rounded-lg border border-brand-blue/10 bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-brand-blue">{label}</span>
      <select
        name={name}
        className="h-12 w-full rounded-lg border border-brand-blue/10 bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
