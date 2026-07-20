import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import {
  DEFAULT_BOOKING_HERO,
  BOOKING_SECTION_SLUGS,
  type BookingHero,
} from "@/lib/booking-defaults";

export const getServerSideProps = createSectionGSSP(
  BOOKING_SECTION_SLUGS.hero,
  DEFAULT_BOOKING_HERO
);

export default function AdminBookingSettings({ initial }: { initial: BookingHero }) {
  return (
    <AdminLayout backHref="/admin/booking" backLabel="Booking">
      <h1 className="mb-6 font-display text-2xl text-foreground">Booking Page Settings</h1>
      <SectionEditor
        slug={BOOKING_SECTION_SLUGS.hero}
        initialData={initial}
        previewHref="/booking"
      >
        {({ data, update, inputStyles }) => (
          <div className="space-y-5">
            <Field label="Kicker">
              <input
                className={inputStyles}
                value={data.kicker}
                onChange={(e) => update("kicker", e.target.value)}
              />
            </Field>
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
            <Field label="Bookable services (one per line)">
              <textarea
                className={inputStyles}
                rows={5}
                value={data.services.join("\n")}
                onChange={(e) =>
                  update(
                    "services",
                    e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
            </Field>
            <Field label="Success message">
              <textarea
                className={inputStyles}
                rows={2}
                value={data.successMessage}
                onChange={(e) => update("successMessage", e.target.value)}
              />
            </Field>
          </div>
        )}
      </SectionEditor>
    </AdminLayout>
  );
}
