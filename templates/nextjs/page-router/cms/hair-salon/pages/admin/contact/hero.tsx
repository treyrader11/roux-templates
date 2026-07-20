import AdminLayout from "@/components/admin/AdminLayout";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_CONTACT_HERO, CONTACT_SECTION_SLUGS } from "@/lib/contact-defaults";
import type { SectionHero } from "@/lib/services-defaults";

export const getServerSideProps = createSectionGSSP(
  CONTACT_SECTION_SLUGS.hero,
  DEFAULT_CONTACT_HERO
);

export default function AdminContactHero({ initial }: { initial: SectionHero }) {
  return (
    <AdminLayout backHref="/admin/contact" backLabel="Contact">
      <h1 className="mb-6 font-display text-2xl text-foreground">Contact Hero</h1>
      <HeroSectionEditor
        slug={CONTACT_SECTION_SLUGS.hero}
        initial={initial}
        previewHref="/contact"
      />
    </AdminLayout>
  );
}
