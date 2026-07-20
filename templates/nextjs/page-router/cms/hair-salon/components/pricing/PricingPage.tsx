import { Section, SectionHeading } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { SectionHero } from "@/lib/services-defaults";

export type PricingItem = {
  id: string;
  name: string;
  price: string;
  description: string | null;
  features: string[];
  featured: boolean;
};

export interface PricingPageProps {
  hero: SectionHero;
  packages: PricingItem[];
}

export function PricingPage({ hero, packages }: PricingPageProps) {
  return (
    <>
      <Section>
        <SectionHeading
          kicker={hero.kicker}
          title={hero.title}
          subtitle={hero.subtitle}
          align="center"
        />
      </Section>

      <Section className="border-t border-border pt-8">
        {packages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Pricing packages are being finalized. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "flex flex-col rounded-3xl border p-8",
                  p.featured
                    ? "border-brand bg-brand text-brand-foreground shadow-lg"
                    : "border-border bg-card"
                )}
              >
                <h3 className="font-display text-xl">{p.name}</h3>
                <p className="mt-2 font-display text-4xl">{p.price}</p>
                {p.description && (
                  <p
                    className={cn(
                      "mt-2 text-sm",
                      p.featured ? "opacity-90" : "text-muted-foreground"
                    )}
                  >
                    {p.description}
                  </p>
                )}
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className={cn(
                          "mt-0.5 shrink-0",
                          p.featured ? "text-brand-foreground" : "text-brand"
                        )}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href="/booking"
                  variant={p.featured ? "outlined" : "filled"}
                  className={cn(
                    "mt-8",
                    p.featured &&
                      "border-brand-foreground text-brand-foreground hover:bg-brand-foreground/10"
                  )}
                >
                  Book this
                </LinkButton>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
