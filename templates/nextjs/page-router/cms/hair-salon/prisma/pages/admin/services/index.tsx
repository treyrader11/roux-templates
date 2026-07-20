import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminServicesHub() {
  return (
    <AdminHub
      title="Services"
      description="Edit the services page header and manage your service menu."
      sections={[
        { name: "Hero", description: "Services page heading", href: "/admin/services/hero" },
        { name: "Service Menu", description: "Add, edit, and reorder services", href: "/admin/services/list" },
      ]}
    />
  );
}
