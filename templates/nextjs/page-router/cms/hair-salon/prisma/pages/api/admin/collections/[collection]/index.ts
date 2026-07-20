import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc, eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { collectionImage } from "@/db/schema";
import { isCollectionSlug } from "@/lib/collections";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = String(req.query.collection);
  if (!isCollectionSlug(collection)) {
    return res.status(404).json({ error: "Unknown collection" });
  }

  if (req.method === "GET") {
    const images = await db
      .select()
      .from(collectionImage)
      .where(eq(collectionImage.collection, collection))
      .orderBy(asc(collectionImage.order));
    return res.json(images);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { url, publicId, alt, order } = req.body ?? {};
    if (!url || !publicId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [created] = await db
      .insert(collectionImage)
      .values({
        collection,
        url,
        publicId,
        alt: alt ?? null,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, ["/"]);
    return res.json(created);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
