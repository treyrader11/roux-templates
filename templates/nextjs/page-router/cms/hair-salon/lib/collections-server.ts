// Server-only read helper for image collections. Kept separate from
// `lib/collections.ts` so the DB client (neon) is never bundled into client
// code (e.g. admin pages that import the collection constants).
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { collectionImage } from "@/db/schema";
import { safeList } from "@/lib/cms";
import type { CollectionImage, CollectionSlug } from "@/lib/collections";

/**
 * Read an ordered collection for a public page. Returns [] on any DB error so
 * pages render without their managed images rather than failing.
 */
export function getCollectionImages(
  slug: CollectionSlug
): Promise<CollectionImage[]> {
  return safeList(() =>
    db
      .select({
        id: collectionImage.id,
        url: collectionImage.url,
        alt: collectionImage.alt,
      })
      .from(collectionImage)
      .where(eq(collectionImage.collection, slug))
      .orderBy(asc(collectionImage.order))
  );
}
