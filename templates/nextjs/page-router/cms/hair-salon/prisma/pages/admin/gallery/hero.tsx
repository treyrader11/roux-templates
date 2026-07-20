import AdminLayout from "@/components/admin/AdminLayout";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_GALLERY_HERO, GALLERY_SECTION_SLUGS } from "@/lib/gallery-defaults";
import type { SectionHero } from "@/lib/services-defaults";

export const getServerSideProps = createSectionGSSP(
  GALLERY_SECTION_SLUGS.hero,
  DEFAULT_GALLERY_HERO
);

export default function AdminGalleryHero({ initial }: { initial: SectionHero }) {
  return (
    <AdminLayout backHref="/admin/gallery" backLabel="Gallery">
      <h1 className="mb-6 font-display text-2xl text-foreground">Gallery Hero</h1>
      <HeroSectionEditor
        slug={GALLERY_SECTION_SLUGS.hero}
        initial={initial}
        previewHref="/gallery"
      />
    </AdminLayout>
  );
}
