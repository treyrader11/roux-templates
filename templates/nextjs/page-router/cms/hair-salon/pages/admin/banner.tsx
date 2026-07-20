import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_SITE_BANNER,
  SITE_SECTION_SLUGS,
  type SiteBanner,
} from "@/lib/site-defaults";

export const getServerSideProps = createSectionGSSP(
  SITE_SECTION_SLUGS.banner,
  DEFAULT_SITE_BANNER
);

export default function AdminBanner({ initial }: { initial: SiteBanner }) {
  return (
    <AdminLayout backHref="/admin" backLabel="Dashboard">
      <h1 className="mb-6 font-display text-2xl text-foreground">Top Banner</h1>
      <p className="mb-4 max-w-xl text-sm text-muted-foreground">
        The announcement bar shown above the header on every public page.
        Visitors can dismiss it; it stays hidden for them until they clear their
        browser storage.
      </p>
      <SectionEditor
        slug={SITE_SECTION_SLUGS.banner}
        initialData={initial}
        previewHref="/"
      >
        {({ data, update, inputStyles }) => (
          <div className="space-y-5">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={data.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
              />
              Show the banner
            </label>
            <Field label="Message">
              <input
                className={inputStyles}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="FREE SHIPPING ON ALL ORDERS OVER $99.00 ✈️"
              />
            </Field>
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
