import { Section } from "@/components/ui/Section";
import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <Section className="border-t border-border">
      <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="font-display text-4xl text-brand sm:text-5xl">
              {stat.value}
            </dt>
            <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
