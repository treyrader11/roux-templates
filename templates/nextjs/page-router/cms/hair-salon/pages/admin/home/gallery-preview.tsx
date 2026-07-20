import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_HOME_GALLERY_PREVIEW,
  HOME_SECTION_SLUGS,
  type HomeGalleryPreview,
} from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.galleryPreview,
  DEFAULT_HOME_GALLERY_PREVIEW
);

export default function AdminHomeGalleryPreview({
  initial,
}: {
  initial: HomeGalleryPreview;
}) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-6 font-display text-2xl text-foreground">Gallery Preview</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Portfolio images come from the Gallery section. This edits the heading only.
      </p>
      <SectionEditor
        slug={HOME_SECTION_SLUGS.galleryPreview}
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
