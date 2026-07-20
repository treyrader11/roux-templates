import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

const SECTIONS = [
  {
    name: "Nav Logo",
    description: "The logo shown in the site navigation bar",
    href: "/admin/brand/nav-logo",
  },
];

export default function AdminBrandHub() {
  return (
    <AdminHub
      title="Brand"
      description="Manage logos and brand assets."
      sections={SECTIONS}
    />
  );
}
