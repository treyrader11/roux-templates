import type { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/db/schema";
import { parseCms } from "@/lib/utils";
import { DEFAULT_SITE_BANNER, SITE_SECTION_SLUGS } from "@/lib/site-defaults";

// Public read of the top-banner CMS content. Falls back to defaults on any error.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let record: { content: string } | null = null;
  try {
    const rows = await db
      .select({ content: siteContent.content })
      .from(siteContent)
      .where(eq(siteContent.slug, SITE_SECTION_SLUGS.banner))
      .limit(1);
    record = rows[0] ?? null;
  } catch {
    record = null;
  }

  // Cache at the edge for a minute; banner copy changes rarely.
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.json(parseCms(record, DEFAULT_SITE_BANNER));
}
