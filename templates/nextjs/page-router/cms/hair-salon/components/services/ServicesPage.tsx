import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import type { SectionHero } from "@/lib/services-defaults";

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string | null;
};

export interface ServicesPageProps {
  hero: SectionHero;
  services: ServiceItem[];
}

export function ServicesPage({ hero, services }: ServicesPageProps) {
  const categories = Array.from(
    new Set(services.map((s) => s.category || "Services"))
  );

  return (
    <>
      <Section>
        <SectionHeading
          kicker={hero.kicker}
          title={hero.title}
          subtitle={hero.subtitle}
        />
      </Section>

      {services.length === 0 ? (
        <Section className="border-t border-border pt-0">
          <p className="text-muted-foreground">
            Our service menu is being updated. Please check back soon or{" "}
            <Link href="/booking" className="text-brand underline">
              book a consultation
            </Link>
            .
          </p>
        </Section>
      ) : (
        categories.map((category) => (
          <Section key={category} className="border-t border-border">
            <h2 className="font-display text-2xl text-foreground">
              {category}
            </h2>
            <div className="mt-6 divide-y divide-border">
              {services
                .filter((s) => (s.category || "Services") === category)
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div className="max-w-xl">
                      <h3 className="font-medium text-foreground">{s.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                      <span className="text-foreground">{s.price}</span>
                      {s.duration && <span className="block">{s.duration}</span>}
                    </div>
                  </div>
                ))}
            </div>
          </Section>
        ))
      )}

      <Section className="border-t border-border">
        <div className="flex flex-col items-start gap-4">
          <p className="text-muted-foreground">
            Not sure what you need? Book a consultation and we&apos;ll guide you.
          </p>
          <LinkButton href="/booking">Book an appointment</LinkButton>
        </div>
      </Section>
    </>
  );
}
