import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminGalleryHub() {
  return (
    <AdminHub
      title="Gallery"
      description="Edit the gallery page header and manage portfolio images."
      sections={[
        { name: "Hero", description: "Gallery page heading", href: "/admin/gallery/hero" },
        { name: "Images", description: "Upload and manage portfolio images", href: "/admin/gallery/images" },
      ]}
    />
  );
}
