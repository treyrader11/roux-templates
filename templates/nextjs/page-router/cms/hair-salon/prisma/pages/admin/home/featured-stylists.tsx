import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_HOME_FEATURED_STYLISTS,
  HOME_SECTION_SLUGS,
  type HomeFeaturedStylists,
} from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.featuredStylists,
  DEFAULT_HOME_FEATURED_STYLISTS
);

export default function AdminHomeFeaturedStylists({
  initial,
}: {
  initial: HomeFeaturedStylists;
}) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-6 font-display text-2xl text-foreground">Featured Stylists</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        The actual stylist cards come from the Stylists section. This edits the heading only.
      </p>
      <SectionEditor
        slug={HOME_SECTION_SLUGS.featuredStylists}
        initialData={initial}
        previewHref="/"
      >
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
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
