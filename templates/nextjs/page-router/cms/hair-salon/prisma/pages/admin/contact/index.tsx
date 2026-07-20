import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminContactHub() {
  return (
    <AdminHub
      title="Contact"
      description="Edit the contact page header and salon details."
      sections={[
        { name: "Hero", description: "Contact page heading", href: "/admin/contact/hero" },
        { name: "Info", description: "Address, phone, hours, and social links", href: "/admin/contact/info" },
      ]}
    />
  );
}
