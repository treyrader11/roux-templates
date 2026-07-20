// Pricing page CMS content.
import type { SectionHero } from "@/lib/services-defaults";

export const DEFAULT_PRICING_HERO: SectionHero = {
  kicker: "Pricing",
  title: "Simple, transparent pricing",
  subtitle:
    "Curated packages for every occasion. Prices start from — a consultation confirms your exact quote.",
};

export const PRICING_SECTION_SLUGS = {
  hero: "pricing:hero",
  packages: "pricing:packages",
} as const;
