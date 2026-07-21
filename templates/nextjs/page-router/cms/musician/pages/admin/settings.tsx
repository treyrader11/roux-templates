import Head from "next/head";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

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

export default function SettingsPage() {
  return (
    <div>
      <Head>
        <title>Admin · Settings</title>
      </Head>
      <AdminHeader title="Settings" description="Manage site configuration." />
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Site Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Row label="Site name" value="Lemon Kelly" />
            <Row label="Tagline" value="Film. Music. Vision." />
            <Row label="Contact email" value="hello@lemonkelly.com" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
