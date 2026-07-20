import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminStylistsHub() {
  return (
    <AdminHub
      title="Stylists"
      description="Edit the stylists page header and manage team profiles."
      sections={[
        { name: "Hero", description: "Stylists page heading", href: "/admin/stylists/hero" },
        { name: "Team", description: "Add, edit, and reorder stylist profiles", href: "/admin/stylists/team" },
      ]}
    />
  );
}
