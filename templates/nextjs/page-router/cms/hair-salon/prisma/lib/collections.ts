// Ordered image collections — shared slugs, Cloudinary folders, and types.
// Client-safe: this module must NOT import the DB client, since it is pulled
// into admin page bundles. The server-only read helper lives in
// `lib/collections-server.ts`.

/** Collection identifiers stored in `collection_image.collection`. */
export const COLLECTION_SLUGS = {
  splash: "splash",
  homeHeroCarousel: "home-hero-carousel",
  navLogo: "brand-nav-logo",
} as const;

export type CollectionSlug =
  (typeof COLLECTION_SLUGS)[keyof typeof COLLECTION_SLUGS];

const SLUG_VALUES = Object.values(COLLECTION_SLUGS) as string[];

/** True when `slug` is a known collection identifier. */
export function isCollectionSlug(slug: string): slug is CollectionSlug {
  return SLUG_VALUES.includes(slug);
}

/** Cloudinary folder a collection's uploads live in. */
export function collectionFolder(slug: CollectionSlug): string {
  return `reverse-gen/collections/${slug}`;
}

/** Human labels for admin UI. */
export const COLLECTION_LABELS: Record<CollectionSlug, string> = {
  [COLLECTION_SLUGS.splash]: "Splash Screen",
  [COLLECTION_SLUGS.homeHeroCarousel]: "Hero Carousel",
  [COLLECTION_SLUGS.navLogo]: "Nav Logo",
};

export type CollectionImage = {
  id: string;
  url: string;
  alt: string | null;
};
