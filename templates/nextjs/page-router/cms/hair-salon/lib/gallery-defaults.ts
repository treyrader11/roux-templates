// Gallery page CMS content.
import type { SectionHero } from "@/lib/services-defaults";

export const DEFAULT_GALLERY_HERO: SectionHero = {
  kicker: "Portfolio",
  title: "Our work",
  subtitle: "Color, cuts, and transformations from the Reverse Gen chairs.",
};

export const GALLERY_SECTION_SLUGS = {
  hero: "gallery:hero",
  images: "gallery:images",
} as const;
