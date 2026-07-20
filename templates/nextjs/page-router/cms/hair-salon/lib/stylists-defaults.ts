// Stylists page CMS content.
import type { SectionHero } from "@/lib/services-defaults";

export const DEFAULT_STYLISTS_HERO: SectionHero = {
  kicker: "The team",
  title: "Meet your stylists",
  subtitle:
    "A senior team of colorists and cutters, each with a distinct point of view and a shared standard of care.",
};

export const STYLISTS_SECTION_SLUGS = {
  hero: "stylists:hero",
  team: "stylists:team",
} as const;
