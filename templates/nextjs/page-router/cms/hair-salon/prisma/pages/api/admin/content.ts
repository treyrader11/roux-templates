import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { like } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { siteContent } from "@/db/schema";
import { revalidatePaths, pathsForSlug } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { prefix } = req.query;
    const content = prefix
      ? await db
          .select()
          .from(siteContent)
          .where(like(siteContent.slug, `${String(prefix)}%`))
      : await db.select().from(siteContent);
    return res.json(content);
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { slug, content } = req.body;
    if (!slug || typeof content !== "string") {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [record] = await db
      .insert(siteContent)
      .values({ slug, content, updatedBy: session.user.email })
      .onConflictDoUpdate({
        target: siteContent.slug,
        set: { content, updatedBy: session.user.email, updatedAt: new Date() },
      })
      .returning();

    await revalidatePaths(res, pathsForSlug(slug));
    return res.json(record);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
