import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminPricingHub() {
  return (
    <AdminHub
      title="Pricing"
      description="Edit the pricing page header and manage packages."
      sections={[
        { name: "Hero", description: "Pricing page heading", href: "/admin/pricing/hero" },
        { name: "Packages", description: "Add, edit, and reorder pricing packages", href: "/admin/pricing/packages" },
      ]}
    />
  );
}
