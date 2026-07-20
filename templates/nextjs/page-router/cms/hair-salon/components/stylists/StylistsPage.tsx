import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/section";
import { Instagram } from "lucide-react";
import type { SectionHero } from "@/lib/services-defaults";

export type StylistItem = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
  instagram: string | null;
};

export interface StylistsPageProps {
  hero: SectionHero;
  stylists: StylistItem[];
}

export function StylistsPage({ hero, stylists }: StylistsPageProps) {
  return (
    <>
      <Section>
        <SectionHeading
          kicker={hero.kicker}
          title={hero.title}
          subtitle={hero.subtitle}
        />
      </Section>

      <Section className="border-t border-border">
        {stylists.length === 0 ? (
          <p className="text-muted-foreground">
            Our team profiles are coming soon.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {stylists.map((s) => (
              <div key={s.id}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                  {s.imageUrl && (
                    <Image
                      src={s.imageUrl}
                      alt={s.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {s.name}
                </h3>
                <p className="text-sm text-brand">{s.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.bio}</p>
                {s.instagram && (
                  <a
                    href={s.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"
                  >
                    <Instagram size={15} />
                    Instagram
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
