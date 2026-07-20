import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Shared session guard for admin `getServerSideProps`.
 * Returns a redirect result when unauthenticated, otherwise null.
 */
export async function requireAdminSession(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: `/admin/login?callbackUrl=${encodeURIComponent(ctx.resolvedUrl)}`,
        permanent: false,
      },
    } as const;
  }
  return null;
}
