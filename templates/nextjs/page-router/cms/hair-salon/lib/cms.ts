import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/db/schema";

/**
 * Fetch multiple site_content rows by slug, tolerant of DB errors.
 * Returns a map of slug -> { content } (or null when missing/unreachable),
 * so callers fall back to their in-code defaults.
 */
export async function getContentBySlugs(
  slugs: string[]
): Promise<Record<string, { content: string } | null>> {
  const map: Record<string, { content: string } | null> = {};
  for (const slug of slugs) map[slug] = null;

  try {
    const rows = await db
      .select({ slug: siteContent.slug, content: siteContent.content })
      .from(siteContent)
      .where(inArray(siteContent.slug, slugs));
    for (const row of rows) map[row.slug] = { content: row.content };
  } catch {
    // DB unreachable — defaults will be used.
  }

  return map;
}

/** Safe list fetch returning [] on any DB error. */
export async function safeList<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch {
    return [];
  }
}
