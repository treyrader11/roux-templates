// Home page CMS content — types, defaults, and slug map.

export type Cta = { label: string; href: string; variant: "primary" | "outlined" };

export type HomeHero = {
  kicker: string;
  headline: string;
  subheadline: string;
  /** Cloudinary URL for the split-hero portrait. Empty = show placeholder. */
  image: string;
  ctas: Cta[];
};

export type HomeServicesOverview = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
};

export type HomeFeaturedStylists = {
  title: string;
  subtitle: string;
};

export type HomeGalleryPreview = {
  title: string;
  subtitle: string;
};

export type HomeCta = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
};

export type HomeShowcase = {
  title: string;
  /** Seconds each carousel slide stays before auto-advancing. */
  autoplaySeconds: number;
};

export type HomeSplash = {
  /**
   * When true, the splash intro plays once per visitor (remembered on their
   * device) and is skipped afterwards. When false, it plays every time someone
   * lands on the home page.
   */
  showOnce: boolean;
};

export const SHOWCASE_AUTOPLAY_OPTIONS = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 6,
] as const;

export const DEFAULT_HOME_HERO: HomeHero = {
  kicker: "TOP-TIER BRANDS FOR",
  headline: "HAIR AND BEAUTY ESSENTIALS",
  subheadline:
    "ELEVATE YOUR HAIR CARE NEEDS WITH OUR LUXURIOUS COLLECTIONS",
  image: "",
  ctas: [
    { label: "BROWSE OUR SELECTION", href: "/booking", variant: "primary" },
    { label: "View services", href: "/services", variant: "outlined" },
  ],
};

export const DEFAULT_HOME_SERVICES_OVERVIEW: HomeServicesOverview = {
  title: "What we do",
  subtitle: "Precision cuts, dimensional color, and treatments that bring hair back to life.",
  items: [
    { title: "Cuts & Styling", description: "Tailored cuts and finishes for every texture." },
    { title: "Color & Balayage", description: "Lived-in color, gloss, and hand-painted highlights." },
    { title: "Treatments", description: "Bond-building, gloss, and scalp care rituals." },
  ],
};

export const DEFAULT_HOME_FEATURED_STYLISTS: HomeFeaturedStylists = {
  title: "Meet the team",
  subtitle: "A small, senior team obsessed with healthy, beautiful hair.",
};

export const DEFAULT_HOME_GALLERY_PREVIEW: HomeGalleryPreview = {
  title: "Recent work",
  subtitle: "A glimpse of transformations from our chairs.",
};

export const DEFAULT_HOME_CTA: HomeCta = {
  title: "Ready for a change?",
  subtitle: "Book your appointment today and let us take care of the rest.",
  buttonLabel: "Book now",
  buttonHref: "/booking",
};

export const DEFAULT_HOME_SHOWCASE: HomeShowcase = {
  title: "Premium Style, Endless Options",
  autoplaySeconds: 3,
};

export const DEFAULT_HOME_SPLASH: HomeSplash = {
  showOnce: true,
};

export const HOME_SECTION_SLUGS = {
  hero: "home:hero",
  splash: "home:splash",
  showcase: "home:showcase",
  servicesOverview: "home:services-overview",
  featuredStylists: "home:featured-stylists",
  galleryPreview: "home:gallery-preview",
  cta: "home:cta",
} as const;
