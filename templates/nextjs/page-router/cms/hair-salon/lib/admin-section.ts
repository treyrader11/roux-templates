import type { GetServerSideProps } from "next";
import { eq } from "drizzle-orm";
import { requireAdminSession } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { siteContent } from "@/db/schema";
import { parseCms } from "@/lib/utils";

/**
 * Builds a `getServerSideProps` for an admin section-editor page:
 * guards the session, fetches the site_content row by slug, and returns
 * `{ initial }` parsed against the provided defaults.
 */
export function createSectionGSSP<T>(
  slug: string,
  defaults: T
): GetServerSideProps<{ initial: T }> {
  return async (ctx) => {
    const redirect = await requireAdminSession(ctx);
    if (redirect) return redirect;

    let record: { content: string } | null = null;
    try {
      const rows = await db
        .select({ content: siteContent.content })
        .from(siteContent)
        .where(eq(siteContent.slug, slug))
        .limit(1);
      record = rows[0] ?? null;
    } catch {
      record = null;
    }

    return { props: { initial: parseCms(record, defaults) } };
  };
}
