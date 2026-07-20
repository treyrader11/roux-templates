import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc, eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { user as users } from "@/db/schema";
import { hashPassword } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET") {
    const list = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(asc(users.createdAt));
    return res.json(list);
  }

  if (req.method === "POST") {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existing[0]) return res.status(409).json({ error: "User already exists" });

    const [created] = await db
      .insert(users)
      .values({
        name: name ?? null,
        email,
        role: role === "ADMIN" ? "ADMIN" : "USER",
        hashedPassword: await hashPassword(password),
        emailVerified: new Date(),
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      });
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
