"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/content";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Section>
      <SectionHeading
        kicker="Say hello"
        title="Contact us"
        subtitle="Questions about a service or your next appointment? Drop us a line."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoRow icon={MapPin} label="Studio">{SITE.address}</InfoRow>
          <InfoRow icon={Phone} label="Phone">{SITE.phone}</InfoRow>
          <InfoRow icon={Mail} label="Email">{SITE.email}</InfoRow>
          <InfoRow icon={Clock} label="Hours">
            <ul className="space-y-1">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="text-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
          </InfoRow>
        </div>

        {sent ? (
          <div className="flex items-center rounded-2xl border border-border bg-card p-8 text-muted-foreground">
            Thanks — we&apos;ll be in touch soon.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <div>
              <label className="mb-1.5 block text-sm text-foreground">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon size={18} />
      </span>
      <div className="text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
