// Seeds the admin user from SEED_ADMIN_* env vars (idempotent upsert).
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";

async function main() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const db = drizzle(sql, { schema });

  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@reversegen.salon";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "change-me-in-production";
  const hashedPassword = await bcrypt.hash(password, 12);

  await db
    .insert(schema.user)
    .values({
      email,
      name: "Salon Admin",
      role: "ADMIN",
      hashedPassword,
      emailVerified: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.user.email,
      set: { role: "ADMIN", hashedPassword, emailVerified: new Date() },
    });

  console.log(`Seeded admin user: ${email}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
