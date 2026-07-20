import { Scissors, Palette, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { formatPrice, formatDuration } from "@/lib/utils";
import { SERVICES } from "@/lib/content";

const CATEGORY_ICONS = [Scissors, Palette, Sparkles];

// Homepage services overview — three highlighted categories + a link to the
// full menu. Mirrors ReverseGen's 3-up card grid.
export function Services() {
  const featured = ["Cuts", "Color", "Treatments"].map((category) => ({
    category,
    items: SERVICES.filter((s) => s.category === category).slice(0, 2),
  }));

  return (
    <Section className="border-t border-border">
      <SectionHeading kicker="Our craft" title="Services made for you" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map(({ category, items }, i) => {
          const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
          return (
            <div key={category} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl text-foreground">{category}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-foreground">{s.name}</span>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {formatPrice(s.price)} · {formatDuration(s.duration)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <LinkButton href="/services" variant="outlined">
          View full menu
        </LinkButton>
      </div>
    </Section>
  );
}
