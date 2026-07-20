import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_HOME_SERVICES_OVERVIEW,
  HOME_SECTION_SLUGS,
  type HomeServicesOverview,
} from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.servicesOverview,
  DEFAULT_HOME_SERVICES_OVERVIEW
);

export default function AdminHomeServicesOverview({
  initial,
}: {
  initial: HomeServicesOverview;
}) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-6 font-display text-2xl text-foreground">Services Overview</h1>
      <SectionEditor
        slug={HOME_SECTION_SLUGS.servicesOverview}
        initialData={initial}
        previewHref="/"
      >
        {({ data, update, updateNested, inputStyles }) => (
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
            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Cards</span>
              {data.items.map((item, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={inputStyles}
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => updateNested(`items.${i}.title`, e.target.value)}
                  />
                  <input
                    className={inputStyles}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateNested(`items.${i}.description`, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
