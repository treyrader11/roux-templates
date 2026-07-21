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

export default function Page() {
  return (
    <div>
      <Head>
        <title>Admin · Bookings</title>
      </Head>
      <AdminHeader title="Bookings" description="View and manage booking requests." />
      <div className="overflow-hidden rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Client</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Event</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-16 text-center text-muted-foreground">
                No records yet — connect your database and add some.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
