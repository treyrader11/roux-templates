import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { bookingSchema, type BookingInput } from "@/lib/validations/forms";
import type { BookingHero } from "@/lib/booking-defaults";

export interface BookingPageProps {
  hero: BookingHero;
  stylists: { id: string; name: string }[];
}

export function BookingPage({ hero, stylists }: BookingPageProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (data: BookingInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/booking", {
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
        {status === "success" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <p className="text-lg text-foreground">{hero.successMessage}</p>
            <Button className="mt-6" onClick={() => setStatus("idle")}>
              Make another request
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Your name" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <Input type="email" {...register("email")} placeholder="you@email.com" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone (optional)" error={errors.phone?.message}>
                <Input {...register("phone")} placeholder="(555) 000-0000" />
              </Field>
              <Field label="Service" error={errors.service?.message}>
                <Select {...register("service")} defaultValue="">
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {hero.services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Preferred stylist" error={errors.stylist?.message}>
                <Select {...register("stylist")} defaultValue="">
                  <option value="">No preference</option>
                  {stylists.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Date" error={errors.date?.message}>
                <Input type="date" {...register("date")} />
              </Field>
              <Field label="Time" error={errors.time?.message}>
                <Input type="time" {...register("time")} />
              </Field>
            </div>
            <Field label="Notes (optional)" error={errors.notes?.message}>
              <Textarea {...register("notes")} placeholder="Anything we should know?" />
            </Field>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Request appointment"}
            </Button>

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </Section>
    </>
  );
}
