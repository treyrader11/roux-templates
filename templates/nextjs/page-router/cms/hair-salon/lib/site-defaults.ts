// Site-wide CMS content (shared chrome like the top banner).

export type SiteBanner = {
  message: string;
  enabled: boolean;
};

export const DEFAULT_SITE_BANNER: SiteBanner = {
  message: "FREE SHIPPING ON ALL ORDERS OVER $99.00 ✈️",
  enabled: true,
};

export const SITE_SECTION_SLUGS = {
  banner: "site:banner",
} as const;
