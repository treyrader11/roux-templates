import type { GetServerSideProps } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageCollectionManager from "@/components/admin/ImageCollectionManager";
import { requireAdminSession } from "@/lib/admin-guard";
import { COLLECTION_SLUGS, collectionFolder } from "@/lib/collections";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminBrandNavLogo() {
  return (
    <AdminLayout backHref="/admin/brand" backLabel="Brand">
      <ImageCollectionManager
        collection={COLLECTION_SLUGS.navLogo}
        title="Nav Logo"
        description="The logo displayed in the site navigation bar. Uploads use the same drag-and-drop tool as the home hero carousel."
        folder={collectionFolder(COLLECTION_SLUGS.navLogo)}
        aspect={1824 / 560}
      />
    </AdminLayout>
  );
}
