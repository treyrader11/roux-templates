import Head from "next/head";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { formatPrice, formatDuration } from "@/lib/utils";
import { SERVICES, BOOKING_HREF, SITE } from "@/lib/content";

export default function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)));

  return (
    <>
      <Head>
        <title>{`Services — ${SITE.name}`}</title>
      </Head>

      <Section>
        <SectionHeading
          kicker="Menu"
          title="Services & pricing"
          subtitle="Every appointment includes a consultation, wash, and finishing style. Prices start at the listed rate and vary with hair length and density."
        />
      </Section>

      {categories.map((category) => (
        <Section key={category} className="border-t border-border">
          <h2 className="font-display text-2xl text-foreground">{category}</h2>
          <div className="mt-6 divide-y divide-border">
            {SERVICES.filter((s) => s.category === category).map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="max-w-xl">
                  <h3 className="font-medium text-foreground">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                  <span className="text-foreground">{formatPrice(s.price)}</span>
                  <span className="block">{formatDuration(s.duration)}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section className="border-t border-border">
        <div className="flex flex-col items-start gap-4">
          <p className="text-muted-foreground">
            Not sure what you need? Book a consultation and we&apos;ll guide you.
          </p>
          <LinkButton href={BOOKING_HREF}>Book an appointment</LinkButton>
        </div>
      </Section>
    </>
  );
}
