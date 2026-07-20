import AdminLayout from "@/components/admin/AdminLayout";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_STYLISTS_HERO, STYLISTS_SECTION_SLUGS } from "@/lib/stylists-defaults";
import type { SectionHero } from "@/lib/services-defaults";

export const getServerSideProps = createSectionGSSP(
  STYLISTS_SECTION_SLUGS.hero,
  DEFAULT_STYLISTS_HERO
);

export default function AdminStylistsHero({ initial }: { initial: SectionHero }) {
  return (
    <AdminLayout backHref="/admin/stylists" backLabel="Stylists">
      <h1 className="mb-6 font-display text-2xl text-foreground">Stylists Hero</h1>
      <HeroSectionEditor
        slug={STYLISTS_SECTION_SLUGS.hero}
        initial={initial}
        previewHref="/stylists"
      />
    </AdminLayout>
  );
}
