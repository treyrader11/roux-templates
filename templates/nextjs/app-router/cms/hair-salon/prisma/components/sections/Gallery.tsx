import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { GALLERY } from "@/lib/content";

interface GalleryProps {
  /** Show all images (gallery page) vs. a preview grid (homepage). */
  full?: boolean;
}

// Portfolio grid — ReverseGen's 2/3/4-column square masonry.
export function Gallery({ full = false }: GalleryProps) {
  const items = full ? GALLERY : GALLERY.slice(0, 8);

  return (
    <Section className="border-t border-border">
      {!full && (
        <SectionHeading kicker="Portfolio" title="Recent work from the chair" />
      )}
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div
            key={g.id}
            className="relative aspect-square overflow-hidden rounded-xl bg-muted"
          >
            <Image
              src={g.url}
              alt={g.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      {!full && (
        <div className="mt-8">
          <LinkButton href="/gallery" variant="outlined">
            View full gallery
          </LinkButton>
        </div>
      )}
    </Section>
  );
}
