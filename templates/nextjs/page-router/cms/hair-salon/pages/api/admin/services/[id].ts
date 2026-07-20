import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { service } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const id = String(req.query.id);

  if (req.method === "PUT") {
    const { name, description, duration, price, category, imageUrl, order, active } =
      req.body;
    const [updated] = await db
      .update(service)
      .set({ name, description, duration, price, category, imageUrl, order, active })
      .where(eq(service.id, id))
      .returning();
    await revalidatePaths(res, ["/services"]);
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await db.delete(service).where(eq(service.id, id));
    await revalidatePaths(res, ["/services"]);
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
