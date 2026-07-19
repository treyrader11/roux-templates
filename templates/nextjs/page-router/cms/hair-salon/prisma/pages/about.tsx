import Head from "next/head";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stats } from "@/components/sections/Stats";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { SITE, STYLISTS } from "@/lib/content";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{`About — ${SITE.name}`}</title>
      </Head>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker="Our story"
              title="A boutique studio for cut, color & care"
              subtitle={`${SITE.name} opened its doors with a simple belief: great hair starts with a great relationship. Our stylists take the time to understand you — your routine, your texture, your goals — and craft a look you can actually recreate at home.`}
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80&auto=format&fit=crop"
              alt="Inside the studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Stats />

      <Section className="border-t border-border">
        <SectionHeading kicker="The team" title="Meet your stylists" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STYLISTS.map((s) => (
            <div key={s.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">{s.name}</h3>
              <p className="text-sm text-brand">{s.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
