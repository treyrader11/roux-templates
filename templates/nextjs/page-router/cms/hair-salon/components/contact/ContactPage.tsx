import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/forms";
import type { SectionHero } from "@/lib/services-defaults";
import type { ContactInfo } from "@/lib/contact-defaults";

export interface ContactPageProps {
  hero: SectionHero;
  info: ContactInfo;
}

export function ContactPage({ hero, info }: ContactPageProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Section>
        <SectionHeading
          kicker={hero.kicker}
          title={hero.title}
          subtitle={hero.subtitle}
        />
      </Section>

      <Section className="border-t border-border pt-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <InfoRow icon={<MapPin size={18} />} label="Visit">
              {info.address}
            </InfoRow>
            <InfoRow icon={<Phone size={18} />} label="Call">
              <a href={`tel:${info.phone}`} className="hover:text-brand">
                {info.phone}
              </a>
            </InfoRow>
            <InfoRow icon={<Mail size={18} />} label="Email">
              <a href={`mailto:${info.email}`} className="hover:text-brand">
                {info.email}
              </a>
            </InfoRow>
            <InfoRow icon={<Clock size={18} />} label="Hours">
              <ul className="space-y-1">
                {info.hours.map((h) => (
                  <li key={h.day}>
                    <span className="text-foreground">{h.day}:</span> {h.hours}
                  </li>
                ))}
              </ul>
            </InfoRow>
            {info.social.length > 0 && (
              <div className="flex gap-4 pt-2">
                {info.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-brand"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <Field label="Name" error={errors.name?.message}>
              <Input {...register("name")} placeholder="Your name" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="you@email.com" />
            </Field>
            <Field label="Phone (optional)" error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="(555) 000-0000" />
            </Field>
            <Field label="Message" error={errors.message?.message}>
              <Textarea {...register("message")} placeholder="How can we help?" />
            </Field>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>

            {status === "success" && (
              <p className="text-sm text-emerald-500">
                Thanks! We&apos;ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-1 text-foreground">{children}</div>
      </div>
    </div>
  );
}
