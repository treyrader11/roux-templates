import Head from "next/head";
import AdminHeader from "@/components/admin/AdminHeader";

import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: { destination: "/sign-in?callbackUrl=" + ctx.resolvedUrl, permanent: false },
    };
  }
  return { props: {} };
};

export default function MediaPage() {
  return (
    <div>
      <Head>
        <title>Admin · Media</title>
      </Head>
      <AdminHeader title="Media" description="Manage photos and video assets." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-sm border border-border bg-card" />
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Placeholder grid — wire to the media table + your upload provider.
      </p>
    </div>
  );
}
