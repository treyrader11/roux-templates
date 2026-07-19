import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <Section className="border-t border-border">
      <SectionHeading kicker="Kind words" title="Loved by our clients" align="center" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex gap-1 text-brand">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
              “{t.content}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
              — {t.clientName}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
