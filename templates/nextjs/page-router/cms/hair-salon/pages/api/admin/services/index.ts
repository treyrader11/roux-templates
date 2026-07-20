import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { service } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const services = await db.select().from(service).orderBy(asc(service.order));
    return res.json(services);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { name, description, duration, price, category, imageUrl, order } =
      req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [created] = await db
      .insert(service)
      .values({
        name,
        description,
        duration: duration ?? "",
        price: price ?? "",
        category: category ?? null,
        imageUrl: imageUrl ?? null,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, ["/services"]);
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
