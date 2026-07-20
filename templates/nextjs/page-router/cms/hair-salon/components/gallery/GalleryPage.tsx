import Image from "next/image";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { SectionHero } from "@/lib/services-defaults";

export type GalleryItem = {
  id: string;
  url: string;
  alt: string | null;
  category: string | null;
};

export interface GalleryPageProps {
  hero: SectionHero;
  images: GalleryItem[];
}

export function GalleryPage({ hero, images }: GalleryPageProps) {
  const categories = [
    "All",
    ...Array.from(new Set(images.map((i) => i.category).filter(Boolean))),
  ] as string[];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? images : images.filter((i) => i.category === active);

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
        {images.length === 0 ? (
          <p className="text-muted-foreground">
            Portfolio images are coming soon.
          </p>
        ) : (
          <>
            {categories.length > 1 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      active === c
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border text-muted-foreground hover:border-brand/40"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  className="mb-3 break-inside-avoid overflow-hidden rounded-xl bg-muted"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? "Portfolio image"}
                    width={500}
                    height={600}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
