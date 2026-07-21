"use client";
import { useState } from "react";

export default function BookingPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Book Us
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
          Start a Booking
        </h1>
        <p className="mt-4 text-muted-foreground">
          Tell us about your event and we&apos;ll be in touch within 48 hours.
        </p>

        {sent && (
          <div className="mt-8 rounded-sm border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
            Thanks — your request is in. We&apos;ll reach out soon.
          </div>
        )}
        {error && (
          <div className="mt-8 rounded-sm border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <Field name="clientName" label="Name" required />
          <Field name="clientEmail" label="Email" type="email" required />
          <Field name="clientPhone" label="Phone" />
          <Field name="eventType" label="Event type" placeholder="Wedding, festival, brand film…" />
          <Field name="eventDate" label="Event date" type="date" />
          <Field name="budget" label="Budget range" placeholder="$5k–$10k" />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-sm border border-border bg-secondary px-4 py-3 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
              placeholder="Tell us about your vision…"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send Request"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-sm border border-border bg-secondary px-4 py-3 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
      />
    </div>
  );
}
