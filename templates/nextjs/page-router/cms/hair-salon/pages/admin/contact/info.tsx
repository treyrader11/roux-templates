import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_CONTACT_INFO,
  CONTACT_SECTION_SLUGS,
  type ContactInfo,
} from "@/lib/contact-defaults";

export const getServerSideProps = createSectionGSSP(
  CONTACT_SECTION_SLUGS.info,
  DEFAULT_CONTACT_INFO
);

export default function AdminContactInfo({ initial }: { initial: ContactInfo }) {
  return (
    <AdminLayout backHref="/admin/contact" backLabel="Contact">
      <h1 className="mb-6 font-display text-2xl text-foreground">Salon Info</h1>
      <SectionEditor
        slug={CONTACT_SECTION_SLUGS.info}
        initialData={initial}
        previewHref="/contact"
      >
        {({ data, update, updateNested, inputStyles }) => (
          <div className="space-y-5">
            <Field label="Address">
              <input
                className={inputStyles}
                value={data.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Phone">
                <input
                  className={inputStyles}
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputStyles}
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Map embed URL (optional)">
              <input
                className={inputStyles}
                value={data.mapEmbedUrl}
                onChange={(e) => update("mapEmbedUrl", e.target.value)}
              />
            </Field>

            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Opening hours</span>
              {data.hours.map((h, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={inputStyles}
                    placeholder="Day(s)"
                    value={h.day}
                    onChange={(e) => updateNested(`hours.${i}.day`, e.target.value)}
                  />
                  <input
                    className={inputStyles}
                    placeholder="Hours"
                    value={h.hours}
                    onChange={(e) => updateNested(`hours.${i}.hours`, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Social links</span>
              {data.social.map((s, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={inputStyles}
                    placeholder="Label"
                    value={s.label}
                    onChange={(e) => updateNested(`social.${i}.label`, e.target.value)}
                  />
                  <input
                    className={inputStyles}
                    placeholder="URL"
                    value={s.href}
                    onChange={(e) => updateNested(`social.${i}.href`, e.target.value)}
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
