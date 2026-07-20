import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { collectionImage } from "@/db/schema";
import { isCollectionSlug } from "@/lib/collections";
import cloudinary from "@/lib/cloudinary";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const collection = String(req.query.collection);
  const id = String(req.query.id);
  if (!isCollectionSlug(collection)) {
    return res.status(404).json({ error: "Unknown collection" });
  }
  const scope = and(
    eq(collectionImage.id, id),
    eq(collectionImage.collection, collection)
  );

  if (req.method === "PUT") {
    const { alt, order } = req.body ?? {};
    const set: { alt?: string | null; order?: number } = {};
    if (alt !== undefined) set.alt = alt;
    if (order !== undefined) set.order = order;
    const [updated] = await db
      .update(collectionImage)
      .set(set)
      .where(scope)
      .returning();
    await revalidatePaths(res, ["/"]);
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    const existing = await db
      .select({ publicId: collectionImage.publicId })
      .from(collectionImage)
      .where(scope)
      .limit(1);
    if (existing[0]) {
      await cloudinary.uploader.destroy(existing[0].publicId).catch(() => {});
    }
    await db.delete(collectionImage).where(scope);
    await revalidatePaths(res, ["/"]);
    return res.json({ ok: true });
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
