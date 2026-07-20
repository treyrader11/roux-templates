import AdminLayout from "@/components/admin/AdminLayout";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_SERVICES_HERO, SERVICES_SECTION_SLUGS, type SectionHero } from "@/lib/services-defaults";

export const getServerSideProps = createSectionGSSP(
  SERVICES_SECTION_SLUGS.hero,
  DEFAULT_SERVICES_HERO
);

export default function AdminServicesHero({ initial }: { initial: SectionHero }) {
  return (
    <AdminLayout backHref="/admin/services" backLabel="Services">
      <h1 className="mb-6 font-display text-2xl text-foreground">Services Hero</h1>
      <HeroSectionEditor
        slug={SERVICES_SECTION_SLUGS.hero}
        initial={initial}
        previewHref="/services"
      />
    </AdminLayout>
  );
}
