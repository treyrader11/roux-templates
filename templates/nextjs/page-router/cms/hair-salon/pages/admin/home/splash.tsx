import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import ImageCollectionManager from "@/components/admin/ImageCollectionManager";
import { createSectionGSSP } from "@/lib/admin-section";
import { cn } from "@/lib/utils";
import {
  COLLECTION_SLUGS,
  collectionFolder,
} from "@/lib/collections";
import {
  DEFAULT_HOME_SPLASH,
  HOME_SECTION_SLUGS,
  type HomeSplash,
} from "@/lib/home-defaults";

export const getServerSideProps = createSectionGSSP(
  HOME_SECTION_SLUGS.splash,
  DEFAULT_HOME_SPLASH
);

export default function AdminHomeSplash({ initial }: { initial: HomeSplash }) {
  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-foreground">Splash Screen</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          The intro animation shown when visitors land on the home page.
        </p>
      </div>

      <div className="mb-10">
        <SectionEditor
          slug={HOME_SECTION_SLUGS.splash}
          initialData={initial}
          previewHref="/"
        >
          {({ data, update }) => (
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="font-medium text-foreground">
                  Show only once per visitor
                </span>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  When on, the splash plays once and is remembered on the
                  visitor&apos;s device, so it&apos;s skipped on future visits.
                  When off, it plays every time someone lands on the home page.
                </p>
              </div>
              <Toggle
                checked={data.showOnce}
                onChange={(v) => update("showOnce", v as HomeSplash["showOnce"])}
              />
            </div>
          )}
        </SectionEditor>
      </div>

      <ImageCollectionManager
        collection={COLLECTION_SLUGS.splash}
        title="Splash Images"
        description="Images revealed during the intro animation. They animate in one after another — reorder to set the sequence."
        folder={collectionFolder(COLLECTION_SLUGS.splash)}
        aspect={16 / 9}
      />
    </AdminLayout>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-brand" : "border border-border bg-muted"
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
}
