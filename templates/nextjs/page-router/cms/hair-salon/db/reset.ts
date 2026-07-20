// Drops everything in the public schema so `db:push` can recreate it cleanly.
// Safe for early development only — this destroys all data.
import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  await sql`DROP SCHEMA IF EXISTS public CASCADE`;
  await sql`CREATE SCHEMA public`;
  console.log("Public schema reset.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
