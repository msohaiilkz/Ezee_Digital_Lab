import { NextRequest, NextResponse } from "next/server";

type LeadPayload = Record<string, string | undefined>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function toPayload(formData: FormData): LeadPayload {
  return {
    fullName: clean(formData.get("fullName")),
    company: clean(formData.get("company")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    website: clean(formData.get("website")),
    service: clean(formData.get("service")),
    budget: clean(formData.get("budget")),
    timeline: clean(formData.get("timeline")),
    message: clean(formData.get("message")),
    sourcePage: clean(formData.get("sourcePage")),
    formType: clean(formData.get("formType"))
  };
}

export async function handleLeadRequest(request: NextRequest, type: string) {
  try {
    const formData = await request.formData();
    const payload = toPayload(formData);

    const required = ["fullName", "email", "message"] as const;
    const missing = required.filter((field) => !payload[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (!payload.email || !emailPattern.test(payload.email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const lead = {
      ...payload,
      type,
      submittedAt: new Date().toISOString(),
      internalLeadEmail: process.env.INTERNAL_LEAD_EMAIL || "consultation@ezeetechnologies.com"
    };

    if (process.env.LEAD_WEBHOOK_URL) {
      const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CRM_API_KEY ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` } : {})
        },
        body: JSON.stringify(lead)
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: "The lead was validated but the CRM endpoint did not accept it." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your request has been received. Our Digital Labs team will review it and get back with a practical next step.",
      lead
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting your request." },
      { status: 500 }
    );
  }
}
