import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadSlot from "@/components/admin/ImageUploadSlot";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import { DEFAULT_HOME_HERO, HOME_SECTION_SLUGS, type HomeHero } from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.hero,
  DEFAULT_HOME_HERO
);

export default function AdminHomeHero({ initial }: { initial: HomeHero }) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-6 font-display text-2xl text-foreground">Hero</h1>
      <SectionEditor slug={HOME_SECTION_SLUGS.hero} initialData={initial} previewHref="/#hero">
        {({ data, update, updateNested, inputStyles }) => (
          <div className="space-y-5">
            <Field label="Portrait image">
              <ImageUploadSlot
                label="Hero portrait"
                slug="home-hero-image"
                currentImageUrl={data.image || undefined}
                folder="reverse-gen/home"
                onUploadSuccess={(_slug, url) =>
                  update("image", url as HomeHero["image"])
                }
                onDelete={() => update("image", "" as HomeHero["image"])}
              />
            </Field>
            <Field label="Kicker">
              <input
                className={inputStyles}
                value={data.kicker}
                onChange={(e) => update("kicker", e.target.value)}
              />
            </Field>
            <Field label="Headline">
              <textarea
                className={inputStyles}
                rows={2}
                value={data.headline}
                onChange={(e) => update("headline", e.target.value)}
              />
            </Field>
            <Field label="Subheadline">
              <textarea
                className={inputStyles}
                rows={3}
                value={data.subheadline}
                onChange={(e) => update("subheadline", e.target.value)}
              />
            </Field>
            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Call-to-action buttons</span>
              {data.ctas.map((cta, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-3">
                  <input
                    className={inputStyles}
                    placeholder="Label"
                    value={cta.label}
                    onChange={(e) => updateNested(`ctas.${i}.label`, e.target.value)}
                  />
                  <input
                    className={inputStyles}
                    placeholder="Href"
                    value={cta.href}
                    onChange={(e) => updateNested(`ctas.${i}.href`, e.target.value)}
                  />
                  <select
                    className={inputStyles}
                    value={cta.variant}
                    onChange={(e) => updateNested(`ctas.${i}.variant`, e.target.value)}
                  >
                    <option value="primary">Primary (solid)</option>
                    <option value="outlined">Outlined</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
