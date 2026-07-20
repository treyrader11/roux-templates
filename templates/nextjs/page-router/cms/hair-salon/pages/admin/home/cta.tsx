import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_HOME_CTA,
  HOME_SECTION_SLUGS,
  type HomeCta,
} from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.cta,
  DEFAULT_HOME_CTA
);

export default function AdminHomeCta({ initial }: { initial: HomeCta }) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-6 font-display text-2xl text-foreground">Call to Action</h1>
      <SectionEditor slug={HOME_SECTION_SLUGS.cta} initialData={initial} previewHref="/">
        {({ data, update, inputStyles }) => (
          <div className="space-y-5">
            <Field label="Title">
              <input
                className={inputStyles}
                value={data.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Field>
            <Field label="Subtitle">
              <textarea
                className={inputStyles}
                rows={2}
                value={data.subtitle}
                onChange={(e) => update("subtitle", e.target.value)}
              />
            </Field>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Button label">
                <input
                  className={inputStyles}
                  value={data.buttonLabel}
                  onChange={(e) => update("buttonLabel", e.target.value)}
                />
              </Field>
              <Field label="Button href">
                <input
                  className={inputStyles}
                  value={data.buttonHref}
                  onChange={(e) => update("buttonHref", e.target.value)}
                />
              </Field>
            </div>
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
