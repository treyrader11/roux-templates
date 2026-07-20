// Services page CMS content.

export type SectionHero = {
  kicker: string;
  title: string;
  subtitle: string;
};

export const DEFAULT_SERVICES_HERO: SectionHero = {
  kicker: "Services",
  title: "Every service, thoughtfully done",
  subtitle:
    "From a fresh trim to a full transformation, our menu is built around healthy hair and honest advice.",
};

export const SERVICES_SECTION_SLUGS = {
  hero: "services:hero",
  list: "services:list",
} as const;
