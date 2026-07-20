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

export default function AdminHomeHeroCarousel() {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <ImageCollectionManager
        collection={COLLECTION_SLUGS.homeHeroCarousel}
        title="Hero Carousel"
        description="Full-width sliding images shown below the hero on the home page. Drag to set the slide order."
        folder={collectionFolder(COLLECTION_SLUGS.homeHeroCarousel)}
        aspect={16 / 9}
      />
    </AdminLayout>
  );
}
