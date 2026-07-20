import AdminLayout from "@/components/admin/AdminLayout";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_PRICING_HERO, PRICING_SECTION_SLUGS } from "@/lib/pricing-defaults";
import type { SectionHero } from "@/lib/services-defaults";

export const getServerSideProps = createSectionGSSP(
  PRICING_SECTION_SLUGS.hero,
  DEFAULT_PRICING_HERO
);

export default function AdminPricingHero({ initial }: { initial: SectionHero }) {
  return (
    <AdminLayout backHref="/admin/pricing" backLabel="Pricing">
      <h1 className="mb-6 font-display text-2xl text-foreground">Pricing Hero</h1>
      <HeroSectionEditor
        slug={PRICING_SECTION_SLUGS.hero}
        initial={initial}
        previewHref="/pricing"
      />
    </AdminLayout>
  );
}
