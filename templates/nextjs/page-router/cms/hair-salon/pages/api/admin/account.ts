import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { user as users } from "@/db/schema";
import { hashPassword } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, password } = req.body as { name?: string; password?: string };

  const data: { name?: string; hashedPassword?: string } = {};
  if (typeof name === "string") data.name = name;
  if (password) data.hashedPassword = await hashPassword(password);

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  await db.update(users).set(data).where(eq(users.id, session.user.id));
  return res.json({ ok: true });
}
