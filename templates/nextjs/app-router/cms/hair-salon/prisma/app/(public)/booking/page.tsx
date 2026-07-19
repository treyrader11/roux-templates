"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDuration } from "@/lib/utils";
import { SERVICES } from "@/lib/content";

export default function BookingPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
    } catch {
      // Template demo — the API persists when the DB is configured.
    }
    setStatus("done");
  }

  return (
    <Section>
      <SectionHeading
        kicker="Appointments"
        title="Book your visit"
        subtitle="Choose a service and a preferred time — we'll confirm by email."
      />

      {status === "done" ? (
        <div className="mt-12 max-w-lg rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-xl text-foreground">Request received</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for booking with us. We&apos;ll reach out shortly to confirm your
            appointment.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-12 grid max-w-2xl gap-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="clientName" />
            <Field label="Email" name="clientEmail" type="email" />
            <Field label="Phone" name="clientPhone" type="tel" required={false} />
            <Field label="Preferred date" name="date" type="date" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-foreground">Service</label>
            <select
              name="serviceId"
              required
              defaultValue=""
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="" disabled>
                Select a service…
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {formatPrice(s.price)} · {formatDuration(s.duration)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-foreground">Notes</label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <Button type="submit" disabled={status === "submitting"} className="w-full">
            {status === "submitting" ? "Sending…" : "Request appointment"}
          </Button>
        </form>
      )}
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
